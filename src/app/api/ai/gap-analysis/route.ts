import { NextRequest, NextResponse } from "next/server";
import { generateGapAnalysisRationale } from "@/lib/ai-service";
import { seedEmployees } from "@/data/seed-data";

/**
 * API Route for generating gap analysis rationale
 * POST /api/ai/gap-analysis
 */
export async function POST(request: NextRequest) {
  try {
    const { employeeId } = await request.json();

    if (!employeeId) {
      return NextResponse.json(
        { error: "Employee ID is required" },
        { status: 400 }
      );
    }

    const employee = seedEmployees.find(emp => emp.id === employeeId);
    
    if (!employee || !employee.gapAnalysis) {
      return NextResponse.json(
        { error: "Employee or gap analysis not found" },
        { status: 404 }
      );
    }

    const rationale = await generateGapAnalysisRationale(
      employee,
      employee.gapAnalysis
    );

    return NextResponse.json({ rationale });
  } catch (error) {
    console.error("Error generating gap analysis rationale:", error);
    return NextResponse.json(
      { error: "Failed to generate rationale" },
      { status: 500 }
    );
  }
}
