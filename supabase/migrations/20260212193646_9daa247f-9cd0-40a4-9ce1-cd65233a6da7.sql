
-- Rate limiting table for edge function requests
CREATE TABLE public.rate_limit_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.rate_limit_attempts ENABLE ROW LEVEL SECURITY;

-- No public access at all - only service role
CREATE POLICY "No public access to rate limits"
  ON public.rate_limit_attempts FOR ALL
  USING (false);

-- Auto-cleanup old entries (older than 24h)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.rate_limit_attempts WHERE attempted_at < now() - interval '24 hours';
  RETURN NEW;
END;
$$;

CREATE TRIGGER cleanup_rate_limits
  AFTER INSERT ON public.rate_limit_attempts
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.cleanup_old_rate_limits();

-- Index for fast lookups
CREATE INDEX idx_rate_limit_ip_endpoint_time ON public.rate_limit_attempts (ip_address, endpoint, attempted_at);
