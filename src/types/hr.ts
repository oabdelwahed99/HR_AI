/**
 * HR-OS Pulse Type Definitions
 * Core interfaces for the Talent Intelligence Layer
 */

export type AppraisalScore = 1 | 2 | 3 | 4 | 5;

export type TrainingCategory = "Technical" | "Leadership" | "Core";

export type MessageTone = "Professional" | "Friendly" | "Motivational" | "Celebratory" | "Supportive";

export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export type PerformanceLevel = "Exceeds" | "Meets" | "Below";

export type PotentialLevel = "High" | "Medium" | "Low";

export interface Competency {
  id: string;
  name: string;
  category: TrainingCategory;
  description: string;
  requiredLevel: number; // 1-5 scale
  currentLevel: number; // 1-5 scale
  gap: number; // requiredLevel - currentLevel
}

export interface Appraisal {
  id: string;
  employeeId: string;
  period: string; // e.g., "2024-Q1"
  overallScore: AppraisalScore;
  competencies: Competency[];
  feedback: string;
  reviewerId: string;
  date: string;
}

export interface Course {
  id: string;
  title: string;
  category: TrainingCategory;
  description: string;
  duration: number; // hours
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  skills: string[];
  completionRate?: number; // 0-100
}

export interface TrainingTrack {
  id: string;
  name: string;
  courses: Course[];
  estimatedDuration: number; // hours
  priority: "High" | "Medium" | "Low";
  completionStatus: "Not Started" | "In Progress" | "Completed";
  progress: number; // 0-100
}

export interface GapAnalysis {
  employeeId: string;
  competencyGaps: Competency[];
  recommendedCourses: Course[];
  priority: "High" | "Medium" | "Low" | "Critical";
  estimatedImpact: number; // 0-100
  rationale: string; // AI-generated explanation
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  level: string; // e.g., "Senior", "Mid", "Junior"
  hireDate: string;
  managerId?: string;
  appraisals: Appraisal[];
  trainingTracks: TrainingTrack[];
  gapAnalysis?: GapAnalysis;
  performanceTrend: number[]; // Historical performance scores
  riskLevel: RiskLevel;
  isHighPotential: boolean;
  avatar?: string;
}

export interface WorkforceMetrics {
  totalEmployees: number;
  workforceReadiness: number; // 0-100
  averageSkillGap: number; // 0-100
  atRiskTalent: number;
  highPotentialCount: number;
  averagePerformanceScore: number;
  trainingCompletionRate: number; // 0-100
}

export interface IntelligenceInsight {
  id: string;
  title: string;
  category: "Workforce Readiness" | "Skill Gaps" | "At-Risk Talent" | "High Potential";
  value: number | string;
  trend: "up" | "down" | "stable";
  change: number; // percentage change
  rationale: string; // AI-generated explanation
  timestamp: string;
}

export interface NineBoxPosition {
  performance: PerformanceLevel;
  potential: PotentialLevel;
  employees: Employee[];
}

export interface SuccessionMatrix {
  highPerformanceHighPotential: Employee[];
  highPerformanceMediumPotential: Employee[];
  highPerformanceLowPotential: Employee[];
  mediumPerformanceHighPotential: Employee[];
  mediumPerformanceMediumPotential: Employee[];
  mediumPerformanceLowPotential: Employee[];
  lowPerformanceHighPotential: Employee[];
  lowPerformanceMediumPotential: Employee[];
  lowPerformanceLowPotential: Employee[];
}

export interface MessageTemplate {
  id: string;
  type: "Celebration" | "Motivation" | "Notification";
  tone: MessageTone;
  recipientId: string;
  subject: string;
  body: string;
  generatedAt: string;
  aiRationale: string; // Why this message was generated
}

export interface AuditLog {
  id: string;
  action: string;
  entityType: "Employee" | "Training" | "Appraisal" | "Insight";
  entityId: string;
  rationale: string; // AI reasoning for the action
  timestamp: string;
  userId?: string;
}
