// AI Resume Assistant - generates summary, bullet points, or skill suggestions
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Mode = "summary" | "bullets" | "skills";

const SYSTEM_PROMPTS: Record<Mode, string> = {
  summary:
    "You are a professional resume writer. Write a concise, impactful 2-3 sentence professional summary in first person (no 'I'), focused on value, expertise, and impact. Plain text only, no markdown.",
  bullets:
    "You are a professional resume writer. Generate 4-5 strong, ATS-friendly resume bullet points for the given role. Each bullet must start with a strong action verb and include measurable impact when possible. Return ONLY the bullets, one per line, no numbering, no markdown, no leading dashes.",
  skills:
    "You are a professional resume writer. Suggest 10-12 relevant, in-demand hard and soft skills for the given job title. Return ONLY a comma-separated list, no numbering, no markdown.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { mode, jobTitle, context } = await req.json() as {
      mode: Mode;
      jobTitle?: string;
      context?: string;
    };

    if (!mode || !SYSTEM_PROMPTS[mode]) {
      return new Response(JSON.stringify({ error: "Invalid mode" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const userPrompt =
      mode === "summary"
        ? `Job title: ${jobTitle || "Professional"}.\nContext / experience notes: ${context || "(none provided)"}\n\nWrite the summary.`
        : mode === "bullets"
        ? `Job title: ${jobTitle || "Professional"}.\nContext: ${context || "(none)"}\n\nGenerate the bullet points.`
        : `Job title: ${jobTitle || "Professional"}.\n\nList the skills.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPTS[mode] },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (response.status === 429) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (response.status === 402) {
      return new Response(
        JSON.stringify({ error: "AI credits exhausted. Please add credits to your Lovable workspace." }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "";

    let result: unknown = content.trim();
    if (mode === "bullets") {
      result = content
        .split("\n")
        .map((l) => l.replace(/^[\s\-\*\d\.\)]+/, "").trim())
        .filter(Boolean);
    } else if (mode === "skills") {
      result = content
        .split(/[,\n]/)
        .map((s) => s.replace(/^[\s\-\*\d\.\)]+/, "").trim())
        .filter(Boolean);
    }

    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-resume-assist error:", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
