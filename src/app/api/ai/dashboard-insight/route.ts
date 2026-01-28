import { NextRequest, NextResponse } from "next/server";
import { generateDashboardInsight } from "@/lib/ai-service";
import { seedEmployees } from "@/data/seed-data";

/**
 * API Route for generating dashboard insights
 * POST /api/ai/dashboard-insight
 */
export async function POST(request: NextRequest) {
  try {
    const { metricName, value, trend, change } = await request.json();

    if (!metricName || value === undefined || !trend) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const rationale = await generateDashboardInsight(
      metricName,
      value,
      trend,
      change || 0,
      {
        totalEmployees: seedEmployees.length,
        employees: seedEmployees,
      }
    );

    return NextResponse.json({ rationale });
  } catch (error) {
    console.error("Error generating dashboard insight:", error);
    return NextResponse.json(
      { error: "Failed to generate insight" },
      { status: 500 }
    );
  }
}
