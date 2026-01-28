import { NextRequest, NextResponse } from "next/server";

/**
 * API Route to test AI functionality
 * POST /api/ai/test
 */
export async function POST(request: NextRequest) {
  try {
    const { testPrompt } = await request.json();

    // Check if API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          configured: false,
          error: "OpenAI API key not found. Please set OPENAI_API_KEY in .env.local file.",
          message: "Create a .env.local file in the root directory with: OPENAI_API_KEY=sk-your-key-here",
        },
        { status: 200 } // Return 200 so frontend can handle gracefully
      );
    }
    
    if (!apiKey.startsWith("sk-")) {
      return NextResponse.json(
        {
          success: false,
          configured: false,
          error: "Invalid API key format. OpenAI API keys should start with 'sk-'",
          message: "Please check your OPENAI_API_KEY in .env.local",
        },
        { status: 200 }
      );
    }

    // Try to import and use OpenAI
    try {
      const OpenAI = require("openai");
      const openai = new OpenAI({ apiKey });

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a test assistant. Respond briefly.",
          },
          {
            role: "user",
            content: testPrompt || "Say 'AI is working' if you can read this.",
          },
        ],
        max_tokens: 20,
      });

      const response = completion.choices[0]?.message?.content;

      return NextResponse.json({
        success: true,
        response: response,
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        message: "AI is working correctly!",
      });
    } catch (openaiError: any) {
      console.error("OpenAI API error:", openaiError);
      return NextResponse.json(
        {
          success: false,
          error: openaiError.message || "Failed to connect to OpenAI API",
          details: openaiError.error?.message,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to test AI",
      },
      { status: 500 }
    );
  }
}
