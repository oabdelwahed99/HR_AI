import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Employee, Competency } from "@/types/hr";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function calculateWorkforceReadiness(employees: Employee[]): number {
  if (employees.length === 0) return 0;
  const avgScore = employees.reduce((sum, emp) => {
    const latestAppraisal = emp.appraisals[emp.appraisals.length - 1];
    return sum + (latestAppraisal?.overallScore || 0);
  }, 0) / employees.length;
  return (avgScore / 5) * 100;
}

export function calculateAverageSkillGap(employees: Employee[]): number {
  if (employees.length === 0) return 0;
  const gaps = employees
    .filter((emp) => emp.gapAnalysis)
    .map((emp) => {
      const gapAnalysis = emp.gapAnalysis;
      if (!gapAnalysis || gapAnalysis.competencyGaps.length === 0) return 0;
      const avgGap = gapAnalysis.competencyGaps.reduce(
        (sum: number, comp: Competency) => sum + Math.abs(comp.gap),
        0
      ) / gapAnalysis.competencyGaps.length;
      return avgGap;
    });
  if (gaps.length === 0) return 0;
  return (gaps.reduce((a, b) => a + b, 0) / gaps.length) * 20; // Convert to percentage
}

export function getAtRiskCount(employees: Employee[]): number {
  return employees.filter((emp) => emp.riskLevel === "High" || emp.riskLevel === "Critical").length;
}
