import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message, captchaAnswer } = await req.json();

    // Server-side validation
    if (
      typeof name !== "string" || name.trim().length === 0 || name.length > 100
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid name" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      typeof email !== "string" || !emailRegex.test(email) || email.length > 255
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validSubjects = [
      "collabs", "sales", "support", "advertising",
      "publishing", "marketing", "general",
    ];
    if (!validSubjects.includes(subject)) {
      return new Response(
        JSON.stringify({ error: "Invalid subject" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (
      typeof message !== "string" || message.trim().length === 0 || message.length > 2000
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid message" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (
      typeof captchaAnswer !== "string" || !/^\d{1,3}$/.test(captchaAnswer) || captchaAnswer === "11"
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid captcha" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
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
