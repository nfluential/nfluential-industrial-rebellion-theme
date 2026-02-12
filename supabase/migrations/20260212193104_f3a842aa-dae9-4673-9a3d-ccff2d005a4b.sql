
-- Contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  captcha_answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public contact form)
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

-- No select/update/delete for anon - admin only via service role
CREATE POLICY "No public reads on contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (false);

-- Newsletter subscribers
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- No public reads
CREATE POLICY "No public reads on newsletter subscribers"
  ON public.newsletter_subscribers FOR SELECT
  USING (false);
