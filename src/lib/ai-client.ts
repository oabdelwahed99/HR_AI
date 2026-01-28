/**
 * Client-side AI service utilities
 * For calling AI API routes from React components
 */

/**
 * Generate gap analysis rationale
 */
export async function fetchGapAnalysisRationale(employeeId: string): Promise<string> {
  try {
    const response = await fetch("/api/ai/gap-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate rationale");
    }

    const data = await response.json();
    return data.rationale;
  } catch (error) {
    console.error("Error fetching gap analysis rationale:", error);
    throw error;
  }
}

/**
 * Generate dashboard insight
 */
export async function fetchDashboardInsight(
  metricName: string,
  value: number | string,
  trend: "up" | "down" | "stable",
  change: number
): Promise<string> {
  try {
    const response = await fetch("/api/ai/dashboard-insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ metricName, value, trend, change }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate insight");
    }

    const data = await response.json();
    return data.rationale;
  } catch (error) {
    console.error("Error fetching dashboard insight:", error);
    throw error;
  }
}

/**
 * Generate AI message
 */
export async function fetchAIMessage(
  type: "Celebration" | "Motivation" | "Notification",
  employeeId: string,
  context?: any,
  tone: string = "Professional"
) {
  try {
    const response = await fetch("/api/ai/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, employeeId, context, tone }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate message");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error fetching AI message:", error);
    throw error;
  }
}
