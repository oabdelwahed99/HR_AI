import { NextRequest, NextResponse } from "next/server";
import { generateAIMessage } from "@/lib/ai-service";
import { seedEmployees } from "@/data/seed-data";
import { MessageTone } from "@/types/hr";

/**
 * API Route for generating AI messages
 * POST /api/ai/message
 */
export async function POST(request: NextRequest) {
  try {
    const { 
      type, 
      employeeId, 
      context, 
      tone = "Professional" 
    } = await request.json();

    if (!type || !employeeId) {
      return NextResponse.json(
        { error: "Type and employee ID are required" },
        { status: 400 }
      );
    }

    const employee = seedEmployees.find(emp => emp.id === employeeId);
    
    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    const message = await generateAIMessage(
      type,
      employee,
      context,
      tone as MessageTone
    );

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Error generating message:", error);
    return NextResponse.json(
      { error: "Failed to generate message" },
      { status: 500 }
    );
  }
}
