
-- Remove public INSERT policies since submissions now go through edge function with service role key
DROP POLICY "Anyone can submit contact form" ON public.contact_submissions;
DROP POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;

-- Replace with deny-all policies
CREATE POLICY "No public insert on contact submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (false);

CREATE POLICY "No public insert on newsletter subscribers"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (false);
