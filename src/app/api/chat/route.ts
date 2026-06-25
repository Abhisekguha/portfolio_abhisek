import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/system-prompt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json({ error: "Missing messages field" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const model = body.model || process.env.OPENROUTER_MODEL || "openrouter/auto";
    const referer = req.headers.get("host")
      ? `${req.headers.get("x-forwarded-proto") || "https"}://${req.headers.get("host")}`
      : "https://portfolio.vercel.app";

    const messages = [
      { role: "system", content: buildSystemPrompt() },
      ...body.messages,
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": referer,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: body.temperature ?? 0.65,
        max_tokens: body.max_tokens ?? 1500,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `OpenRouter error: ${response.status}`, debug: errText.slice(0, 200) },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
