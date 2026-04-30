import { supabase } from "@/integrations/supabase/client";

export type AIMode = "summary" | "bullets" | "skills";

export async function aiAssist(args: { mode: AIMode; jobTitle?: string; context?: string }) {
  const { data, error } = await supabase.functions.invoke("ai-resume-assist", { body: args });
  if (error) throw new Error(error.message || "AI request failed");
  if ((data as any)?.error) throw new Error((data as any).error);
  return (data as { result: string | string[] }).result;
}
