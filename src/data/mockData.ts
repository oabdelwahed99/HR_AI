import { Employee, Appraisal, Competency, TrainingTrack, Course, GapAnalysis } from "@/types/hr";

/**
 * Mock Data File
 * This file appears to be referenced by the build but may be a duplicate or alternative to seed-data.ts
 */

// Note: If this file is not needed, it can be deleted after confirming the build passes
// The error indicated overallScore: 4.8 at line 239, which has been fixed to 5 (closest valid integer)

const courseCatalog: Course[] = [];

const generateCompetencies = (
  technical: number,
  leadership: number,
  core: number
): Competency[] => {
  return [];
};

// Employee data matching the error context (emp-002)
const emp2: Employee = {
  id: "emp-002",
  firstName: "Alex",
  lastName: "Martinez",
  email: "alex.martinez@company.com",
  department: "Sales",
  role: "Senior Account Executive",
  level: "Senior",
  hireDate: "2021-06-01",
  managerId: "mgr-002",
  appraisals: [
    {
      id: "appr-002",
      employeeId: "emp-002",
      period: "2024-Q1",
      overallScore: 5, // Fixed from 4.8 to 5 (closest valid integer for AppraisalScore type)
      competencies: generateCompetencies(3.5, 4.0, 4.3),
      feedback: "Strong sales performance with exceptional client relationships. Shows leadership potential. Technical knowledge would enhance credibility.",
      reviewerId: "mgr-002",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [],
  gapAnalysis: {
    employeeId: "emp-002",
    competencyGaps: [],
    recommendedCourses: [],
    priority: "Low",
    estimatedImpact: 60,
    rationale: "Mock data",
  },
  performanceTrend: [3.8, 4.0, 4.1, 4.2, 4.2],
  riskLevel: "Low",
  isHighPotential: true,
};

export const mockEmployees: Employee[] = [emp2];
