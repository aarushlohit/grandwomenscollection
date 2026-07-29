import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resolveAssistantPrompt } from "@/lib/ai/provider";
import { checkRateLimit } from "@/lib/rate-limit";

const schema = z.object({
  prompt: z.string().min(3).max(400)
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const limit = checkRateLimit(`ai-chat:${ip}`, 10, 60_000);

  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const body = schema.parse(await request.json());
  const result = await resolveAssistantPrompt(body.prompt);

  return NextResponse.json(result);
}
