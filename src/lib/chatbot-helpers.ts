import { Employee, TrainingTrack, Competency } from "@/types/hr";

/**
 * Helper functions to query employee data for chatbot
 */

export interface QueryResult {
  type: "employees" | "summary" | "list" | "count";
  data: any;
  message: string;
}

/**
 * Find employees who completed their courses
 */
export function findCompletedCourses(employees: Employee[]): QueryResult {
  const completed = employees.filter((emp) => {
    return emp.trainingTracks.some(
      (track) => track.completionStatus === "Completed"
    );
  });

  const employeesWithCompleted = employees
    .map((emp) => {
      const completedTracks = emp.trainingTracks.filter(
        (track) => track.completionStatus === "Completed"
      );
      return {
        employee: emp,
        completedTracks,
        count: completedTracks.length,
      };
    })
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);

  return {
    type: "employees",
    data: employeesWithCompleted,
    message: `Found ${employeesWithCompleted.length} employee(s) with completed courses.`,
  };
}

/**
 * Find employees who can be team leaders
 */
export function findPotentialTeamLeaders(employees: Employee[]): QueryResult {
  const leaders = employees
    .map((emp) => {
      const latestAppraisal = emp.appraisals[emp.appraisals.length - 1];
      if (!latestAppraisal) return null;

      const leadershipCompetency = latestAppraisal.competencies.find(
        (c) => c.name === "Team Leadership" || c.category === "Leadership"
      );
      const leadershipScore = leadershipCompetency?.currentLevel || 0;
      const performanceScore = latestAppraisal.overallScore;
      const isHighPotential = emp.isHighPotential;

      // Criteria: High performance (4+) OR high leadership competency (3.5+) OR high potential
      const canLead =
        performanceScore >= 4 ||
        leadershipScore >= 3.5 ||
        (isHighPotential && performanceScore >= 3);

      if (!canLead) return null;

      return {
        employee: emp,
        performanceScore,
        leadershipScore,
        isHighPotential,
        rationale: `Performance: ${performanceScore}/5, Leadership: ${leadershipScore.toFixed(1)}/5, High Potential: ${isHighPotential ? "Yes" : "No"}`,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => {
      // Sort by leadership score first, then performance
      if (b.leadershipScore !== a.leadershipScore) {
        return b.leadershipScore - a.leadershipScore;
      }
      return b.performanceScore - a.performanceScore;
    });

  return {
    type: "employees",
    data: leaders,
    message: `Found ${leaders.length} employee(s) who can be team leaders.`,
  };
}

/**
 * Find employees with gaps in specific competencies
 */
export function findEmployeesWithGaps(
  employees: Employee[],
  competencyName?: string,
  category?: "Technical" | "Leadership" | "Core"
): QueryResult {
  const employeesWithGaps = employees
    .map((emp) => {
      if (!emp.gapAnalysis) return null;

      let relevantGaps = emp.gapAnalysis.competencyGaps;

      if (competencyName) {
        relevantGaps = relevantGaps.filter((gap) =>
          gap.name.toLowerCase().includes(competencyName.toLowerCase())
        );
      }

      if (category) {
        relevantGaps = relevantGaps.filter((gap) => gap.category === category);
      }

      if (relevantGaps.length === 0) return null;

      const totalGap = relevantGaps.reduce((sum, gap) => sum + gap.gap, 0);
      const avgGap = totalGap / relevantGaps.length;

      return {
        employee: emp,
        gaps: relevantGaps,
        averageGap: avgGap,
        priority: emp.gapAnalysis.priority,
        count: relevantGaps.length,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => {
      // Sort by priority (Critical > High > Medium > Low)
      const priorityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
      const priorityDiff =
        priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.averageGap - a.averageGap;
    });

  const filterDesc = competencyName
    ? ` in "${competencyName}"`
    : category
    ? ` in ${category} category`
    : "";

  return {
    type: "employees",
    data: employeesWithGaps,
    message: `Found ${employeesWithGaps.length} employee(s) with competency gaps${filterDesc}.`,
  };
}

/**
 * Find employees at risk
 */
export function findAtRiskEmployees(employees: Employee[]): QueryResult {
  const atRisk = employees
    .filter(
      (emp) =>
        emp.riskLevel === "High" || emp.riskLevel === "Critical"
    )
    .map((emp) => {
      const latestAppraisal = emp.appraisals[emp.appraisals.length - 1];
      return {
        employee: emp,
        riskLevel: emp.riskLevel,
        performanceScore: latestAppraisal?.overallScore || 0,
        performanceTrend: emp.performanceTrend,
      };
    })
    .sort((a, b) => {
      const riskOrder = { Critical: 2, High: 1, Medium: 0, Low: 0 };
      return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
    });

  return {
    type: "employees",
    data: atRisk,
    message: `Found ${atRisk.length} employee(s) at risk.`,
  };
}

/**
 * Find high potential employees
 */
export function findHighPotentialEmployees(employees: Employee[]): QueryResult {
  const highPotential = employees
    .filter((emp) => emp.isHighPotential)
    .map((emp) => {
      const latestAppraisal = emp.appraisals[emp.appraisals.length - 1];
      return {
        employee: emp,
        performanceScore: latestAppraisal?.overallScore || 0,
        trainingProgress: emp.trainingTracks.reduce(
          (sum, track) => sum + track.progress,
          0
        ) / emp.trainingTracks.length || 0,
      };
    })
    .sort((a, b) => b.performanceScore - a.performanceScore);

  return {
    type: "employees",
    data: highPotential,
    message: `Found ${highPotential.length} high potential employee(s).`,
  };
}

/**
 * Find employees by department
 */
export function findEmployeesByDepartment(
  employees: Employee[],
  department: string
): QueryResult {
  const deptEmployees = employees.filter((emp) =>
    emp.department.toLowerCase().includes(department.toLowerCase())
  );

  return {
    type: "employees",
    data: deptEmployees.map((emp) => ({ employee: emp })),
    message: `Found ${deptEmployees.length} employee(s) in ${department}.`,
  };
}

/**
 * Get training completion statistics
 */
export function getTrainingStats(employees: Employee[]): QueryResult {
  const stats = {
    totalEmployees: employees.length,
    completedTracks: employees.reduce((sum, emp) => {
      return (
        sum +
        emp.trainingTracks.filter(
          (track) => track.completionStatus === "Completed"
        ).length
      );
    }, 0),
    inProgressTracks: employees.reduce((sum, emp) => {
      return (
        sum +
        emp.trainingTracks.filter(
          (track) => track.completionStatus === "In Progress"
        ).length
      );
    }, 0),
    notStartedTracks: employees.reduce((sum, emp) => {
      return (
        sum +
        emp.trainingTracks.filter(
          (track) => track.completionStatus === "Not Started"
        ).length
      );
    }, 0),
    averageProgress: employees.reduce((sum, emp) => {
      const avgProgress =
        emp.trainingTracks.reduce((trackSum, track) => trackSum + track.progress, 0) /
        (emp.trainingTracks.length || 1);
      return sum + avgProgress;
    }, 0) / employees.length,
  };

  return {
    type: "summary",
    data: stats,
    message: `Training Statistics: ${stats.completedTracks} completed, ${stats.inProgressTracks} in progress, ${stats.notStartedTracks} not started. Average progress: ${stats.averageProgress.toFixed(1)}%.`,
  };
}

/**
 * Find employees with incomplete training
 */
export function findIncompleteTraining(employees: Employee[]): QueryResult {
  const incomplete = employees
    .map((emp) => {
      const incompleteTracks = emp.trainingTracks.filter(
        (track) => track.completionStatus !== "Completed"
      );
      if (incompleteTracks.length === 0) return null;

      const avgProgress =
        incompleteTracks.reduce((sum, track) => sum + track.progress, 0) /
        incompleteTracks.length;

      return {
        employee: emp,
        incompleteTracks,
        averageProgress: avgProgress,
        count: incompleteTracks.length,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => a.averageProgress - b.averageProgress);

  return {
    type: "employees",
    data: incomplete,
    message: `Found ${incomplete.length} employee(s) with incomplete training.`,
  };
}
