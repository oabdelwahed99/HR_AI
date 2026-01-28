import { Employee, AppraisalScore, PerformanceLevel, PotentialLevel, Competency } from "@/types/hr";

/**
 * Business Rules Engine for HR-OS Pulse
 * High-fidelity logic for performance classification and potential calculation
 */

export type PerformanceCategory = "Elite Performer" | "High Achiever" | "Solid Contributor" | "Needs Intervention";

/**
 * Maps appraisal scores to performance categories
 */
export function mapAppraisalToPerformance(score: AppraisalScore): PerformanceCategory {
  if (score >= 4.5) return "Elite Performer";
  if (score >= 3.5) return "High Achiever";
  if (score >= 2.5) return "Solid Contributor";
  return "Needs Intervention";
}

/**
 * Converts performance category to PerformanceLevel for 9-box grid
 */
export function performanceCategoryToLevel(category: PerformanceCategory): PerformanceLevel {
  switch (category) {
    case "Elite Performer":
    case "High Achiever":
      return "Exceeds";
    case "Solid Contributor":
      return "Meets";
    case "Needs Intervention":
      return "Below";
  }
}

/**
 * Calculates employee potential using weighted formula:
 * 40% Training Completion Rate + 30% Competency Score Growth + 30% Tenure
 */
export function calculatePotential(employee: Employee): {
  score: number;
  level: PotentialLevel;
  breakdown: {
    trainingCompletion: number;
    competencyGrowth: number;
    tenure: number;
  };
} {
  // Training Completion Rate (0-100)
  const trainingCompletion = employee.trainingTracks.length > 0
    ? employee.trainingTracks.reduce((sum, track) => sum + track.progress, 0) / employee.trainingTracks.length
    : 0;

  // Competency Score Growth (calculate improvement over time)
  const latestAppraisal = employee.appraisals[employee.appraisals.length - 1];
  const avgCompetencyScore = latestAppraisal
    ? latestAppraisal.competencies.reduce((sum, comp) => sum + comp.currentLevel, 0) / latestAppraisal.competencies.length
    : 0;
  
  // Use performance trend to estimate growth (if available)
  const trendGrowth = employee.performanceTrend.length >= 2
    ? ((employee.performanceTrend[employee.performanceTrend.length - 1] - employee.performanceTrend[0]) / 5) * 100
    : 0;
  
  const competencyGrowth = Math.max(0, Math.min(100, (avgCompetencyScore / 5) * 100 + trendGrowth));

  // Tenure Score (years of experience, normalized to 0-100)
  const hireDate = new Date(employee.hireDate);
  const yearsOfTenure = (Date.now() - hireDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
  const tenureScore = Math.min(100, (yearsOfTenure / 5) * 100); // 5 years = 100%

  // Weighted calculation
  const weightedScore = (trainingCompletion * 0.4) + (competencyGrowth * 0.3) + (tenureScore * 0.3);

  // Determine potential level
  let level: PotentialLevel;
  if (weightedScore >= 70) level = "High";
  else if (weightedScore >= 40) level = "Medium";
  else level = "Low";

  return {
    score: weightedScore,
    level,
    breakdown: {
      trainingCompletion,
      competencyGrowth,
      tenure: tenureScore,
    },
  };
}

/**
 * Determines if a competency gap is Critical
 * Critical if: required competency is Level 5 AND employee is at Level 2 or lower
 */
export function isCriticalGap(competency: Competency): boolean {
  return competency.requiredLevel === 5 && competency.currentLevel <= 2;
}

/**
 * Determines gap priority based on criticality and size
 */
export function getGapPriority(competency: Competency): "Critical" | "High" | "Medium" | "Low" {
  if (isCriticalGap(competency)) return "Critical";
  if (competency.gap >= 2) return "High";
  if (competency.gap >= 1) return "Medium";
  return "Low";
}

/**
 * Calculates performance level for 9-box grid
 */
export function getPerformanceLevel(employee: Employee): PerformanceLevel {
  const latestAppraisal = employee.appraisals[employee.appraisals.length - 1];
  if (!latestAppraisal) return "Meets";
  
  const category = mapAppraisalToPerformance(latestAppraisal.overallScore);
  return performanceCategoryToLevel(category);
}

/**
 * Gets employee's position in the 9-box grid
 */
export function getNineBoxPosition(employee: Employee): {
  performance: PerformanceLevel;
  potential: PotentialLevel;
  category: PerformanceCategory;
  potentialScore: number;
} {
  const performance = getPerformanceLevel(employee);
  const potential = calculatePotential(employee);
  const latestAppraisal = employee.appraisals[employee.appraisals.length - 1];
  const category = latestAppraisal
    ? mapAppraisalToPerformance(latestAppraisal.overallScore)
    : "Solid Contributor";

  return {
    performance,
    potential: potential.level,
    category,
    potentialScore: potential.score,
  };
}
