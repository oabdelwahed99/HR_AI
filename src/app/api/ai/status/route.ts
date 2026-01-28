import { NextResponse } from "next/server";

/**
 * API Route to check AI configuration status
 * GET /api/ai/status
 */
export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;
  const isConfigured = !!apiKey && apiKey.startsWith("sk-");

  return NextResponse.json({
    configured: isConfigured,
    working: null, // Will be tested separately
    lastTested: null,
    message: isConfigured
      ? "OpenAI API key is configured"
      : "OpenAI API key not found. Set OPENAI_API_KEY in .env.local",
  });
}
