import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedOrigins = [
  "https://nfluential.lovable.app",
  "https://nfluential.us",
  "https://www.nfluential.us",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  const allowed = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
}

async function checkRateLimit(
  supabase: ReturnType<typeof createClient>,
  ip: string,
  endpoint: string,
  maxRequests: number,
  windowMinutes: number
): Promise<boolean> {
  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();

  const { count } = await supabase
    .from("rate_limit_attempts")
    .select("*", { count: "exact", head: true })
    .eq("ip_address", ip)
    .eq("endpoint", endpoint)
    .gte("attempted_at", windowStart);

  return (count ?? 0) < maxRequests;
}

async function recordAttempt(
  supabase: ReturnType<typeof createClient>,
  ip: string,
  endpoint: string
) {
  await supabase.from("rate_limit_attempts").insert({ ip_address: ip, endpoint });
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "contact";

    if (action === "newsletter") {
      // Rate limit: 5 per hour
      const allowed = await checkRateLimit(supabase, ip, "newsletter", 5, 60);
      if (!allowed) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { email } = await req.json();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof email !== "string" || !emailRegex.test(email) || email.length > 255) {
        return new Response(
          JSON.stringify({ error: "Invalid email" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      await recordAttempt(supabase, ip, "newsletter");

      const { error: dbError } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.trim().toLowerCase() });

      if (dbError) {
        if (dbError.code === "23505") {
          return new Response(
            JSON.stringify({ error: "already_subscribed" }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        throw dbError;
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Contact form - rate limit: 5 per hour
    const allowed = await checkRateLimit(supabase, ip, "contact", 5, 60);
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { name, email, subject, message, captchaAnswer } = await req.json();

    if (typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid name" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || !emailRegex.test(email) || email.length > 255) {
      return new Response(
        JSON.stringify({ error: "Invalid email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validSubjects = ["collabs", "sales", "support", "advertising", "publishing", "marketing", "general"];
    if (!validSubjects.includes(subject)) {
      return new Response(
        JSON.stringify({ error: "Invalid subject" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (typeof message !== "string" || message.trim().length === 0 || message.length > 2000) {
      return new Response(
        JSON.stringify({ error: "Invalid message" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (typeof captchaAnswer !== "string" || !/^\d{1,3}$/.test(captchaAnswer) || captchaAnswer === "11") {
      return new Response(
        JSON.stringify({ error: "Invalid captcha" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await recordAttempt(supabase, ip, "contact");

    const { error: dbError } = await supabase.from("contact_submissions").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject,
      message: message.trim(),
      captcha_answer: captchaAnswer,
    });

    if (dbError) {
      return new Response(
        JSON.stringify({ error: "Failed to submit" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
