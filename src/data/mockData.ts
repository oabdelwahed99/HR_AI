import { Employee, Appraisal, Competency, TrainingTrack, Course, GapAnalysis } from "@/types/hr";

/**
 * Expanded Mock Data for HR-OS Pulse Demo
 * 15 Diverse Employees across Engineering, Sales, and Leadership
 */

// Expanded Course Catalog (10 courses)
export const courseCatalog: Course[] = [
  {
    id: "course-1",
    title: "Advanced React Architecture",
    category: "Technical",
    description: "Master advanced React patterns, state management, and performance optimization",
    duration: 24,
    difficulty: "Advanced",
    skills: ["React", "TypeScript", "State Management", "Performance"],
    completionRate: 82,
  },
  {
    id: "course-2",
    title: "Empathetic Leadership",
    category: "Leadership",
    description: "Develop emotional intelligence and empathetic leadership skills for modern teams",
    duration: 18,
    difficulty: "Intermediate",
    skills: ["Emotional Intelligence", "Team Management", "Communication"],
    completionRate: 75,
  },
  {
    id: "course-3",
    title: "Conflict Resolution",
    category: "Core",
    description: "Learn effective strategies for resolving workplace conflicts and building consensus",
    duration: 12,
    difficulty: "Intermediate",
    skills: ["Negotiation", "Mediation", "Communication"],
    completionRate: 88,
  },
  {
    id: "course-4",
    title: "Cloud Infrastructure & DevOps",
    category: "Technical",
    description: "Comprehensive guide to cloud platforms, CI/CD, and infrastructure as code",
    duration: 32,
    difficulty: "Advanced",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
    completionRate: 70,
  },
  {
    id: "course-5",
    title: "Strategic Sales Methodology",
    category: "Core",
    description: "Advanced sales techniques and strategic account management",
    duration: 20,
    difficulty: "Intermediate",
    skills: ["Sales Strategy", "Account Management", "Negotiation"],
    completionRate: 80,
  },
  {
    id: "course-6",
    title: "Data Engineering Fundamentals",
    category: "Technical",
    description: "Build scalable data pipelines and data processing systems",
    duration: 28,
    difficulty: "Intermediate",
    skills: ["Python", "SQL", "Data Pipelines", "ETL"],
    completionRate: 73,
  },
  {
    id: "course-7",
    title: "Executive Presence & Influence",
    category: "Leadership",
    description: "Develop executive presence and learn to influence at the C-suite level",
    duration: 16,
    difficulty: "Advanced",
    skills: ["Executive Communication", "Strategic Thinking", "Influence"],
    completionRate: 68,
  },
  {
    id: "course-8",
    title: "Customer Success Management",
    category: "Core",
    description: "Master customer success strategies and retention techniques",
    duration: 14,
    difficulty: "Intermediate",
    skills: ["Customer Relations", "Retention", "Account Growth"],
    completionRate: 85,
  },
  {
    id: "course-9",
    title: "System Design & Architecture",
    category: "Technical",
    description: "Design scalable, distributed systems for enterprise applications",
    duration: 36,
    difficulty: "Advanced",
    skills: ["System Design", "Distributed Systems", "Scalability"],
    completionRate: 65,
  },
  {
    id: "course-10",
    title: "Change Management & Transformation",
    category: "Leadership",
    description: "Lead organizational change and digital transformation initiatives",
    duration: 22,
    difficulty: "Advanced",
    skills: ["Change Management", "Transformation", "Stakeholder Alignment"],
    completionRate: 72,
  },
];

// Helper function to generate competencies
const generateCompetencies = (
  technical: number,
  leadership: number,
  core: number
): Competency[] => {
  return [
    {
      id: `comp-tech-${Math.random().toString(36).substr(2, 9)}`,
      name: "Technical Architecture",
      category: "Technical",
      description: "Ability to design scalable technical solutions",
      requiredLevel: 5,
      currentLevel: technical,
      gap: 5 - technical,
    },
    {
      id: `comp-tech-${Math.random().toString(36).substr(2, 9)}`,
      name: "Code Quality & Best Practices",
      category: "Technical",
      description: "Writing maintainable, high-quality code",
      requiredLevel: 4,
      currentLevel: technical - 0.3,
      gap: 4 - (technical - 0.3),
    },
    {
      id: `comp-lead-${Math.random().toString(36).substr(2, 9)}`,
      name: "Team Leadership",
      category: "Leadership",
      description: "Leading and mentoring team members",
      requiredLevel: 4,
      currentLevel: leadership,
      gap: 4 - leadership,
    },
    {
      id: `comp-lead-${Math.random().toString(36).substr(2, 9)}`,
      name: "Strategic Vision",
      category: "Leadership",
      description: "Developing and communicating strategic direction",
      requiredLevel: 3,
      currentLevel: leadership - 0.4,
      gap: 3 - (leadership - 0.4),
    },
    {
      id: `comp-core-${Math.random().toString(36).substr(2, 9)}`,
      name: "Communication",
      category: "Core",
      description: "Effective verbal and written communication",
      requiredLevel: 4,
      currentLevel: core,
      gap: 4 - core,
    },
    {
      id: `comp-core-${Math.random().toString(36).substr(2, 9)}`,
      name: "Problem Solving",
      category: "Core",
      description: "Analytical thinking and problem-solving abilities",
      requiredLevel: 4,
      currentLevel: core + 0.2,
      gap: 4 - (core + 0.2),
    },
  ];
};

// RISING STARS (High Performance + High Potential)
const risingStar1: Employee = {
  id: "emp-001",
  firstName: "Sarah",
  lastName: "Chen",
  email: "sarah.chen@company.com",
  department: "Engineering",
  role: "Senior Software Architect",
  level: "Senior",
  hireDate: "2020-03-15",
  managerId: "mgr-001",
  appraisals: [
    {
      id: "appr-001",
      employeeId: "emp-001",
      period: "2024-Q1",
      overallScore: 5,
      competencies: generateCompetencies(4.8, 4.2, 4.5),
      feedback: "Exceptional technical leadership. Ready for principal role.",
      reviewerId: "mgr-001",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-001",
      name: "Technical Excellence Path",
      courses: [courseCatalog[0], courseCatalog[3]],
      estimatedDuration: 56,
      priority: "High",
      completionStatus: "In Progress",
      progress: 75,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-001",
    competencyGaps: generateCompetencies(4.8, 4.2, 4.5).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[1]],
    priority: "Medium",
    estimatedImpact: 85,
    rationale:
      "Sarah demonstrates exceptional technical capabilities (4.8/5) but has a moderate gap in Strategic Vision (2.8/3). Leadership training would unlock her potential for principal-level responsibilities.",
  },
  performanceTrend: [4.2, 4.5, 4.7, 4.9, 5.0],
  riskLevel: "Low",
  isHighPotential: true,
};

const risingStar2: Employee = {
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
      overallScore: 4.8,
      competencies: generateCompetencies(3.5, 4.5, 4.8),
      feedback: "Top performer with exceptional client relationships. Leadership material.",
      reviewerId: "mgr-002",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-002",
      name: "Leadership Development",
      courses: [courseCatalog[1], courseCatalog[6]],
      estimatedDuration: 34,
      priority: "High",
      completionStatus: "In Progress",
      progress: 65,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-002",
    competencyGaps: generateCompetencies(3.5, 4.5, 4.8).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[3]],
    priority: "Low",
    estimatedImpact: 60,
    rationale:
      "Alex excels in sales and leadership (4.5/4) but has minor technical gaps. Technical training would enhance credibility with technical clients.",
  },
  performanceTrend: [4.0, 4.3, 4.5, 4.7, 4.8],
  riskLevel: "Low",
  isHighPotential: true,
};

// TECHNICAL SPECIALISTS (High Performance + Low Leadership Potential)
const techSpecialist1: Employee = {
  id: "emp-003",
  firstName: "David",
  lastName: "Kim",
  email: "david.kim@company.com",
  department: "Engineering",
  role: "Principal Engineer",
  level: "Senior",
  hireDate: "2018-09-12",
  managerId: "mgr-001",
  appraisals: [
    {
      id: "appr-003",
      employeeId: "emp-003",
      period: "2024-Q1",
      overallScore: 4.7,
      competencies: generateCompetencies(5.0, 2.5, 3.8),
      feedback: "Technical excellence unmatched. Prefers individual contributor role.",
      reviewerId: "mgr-001",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-003",
      name: "Technical Mastery",
      courses: [courseCatalog[8], courseCatalog[5]],
      estimatedDuration: 64,
      priority: "Medium",
      completionStatus: "Completed",
      progress: 100,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-003",
    competencyGaps: generateCompetencies(5.0, 2.5, 3.8).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[1]],
    priority: "Low",
    estimatedImpact: 40,
    rationale:
      "David is a technical expert (5.0/5) with minimal leadership interest. Optional leadership training available but not critical for his career path.",
  },
  performanceTrend: [4.5, 4.6, 4.6, 4.7, 4.7],
  riskLevel: "Low",
  isHighPotential: false,
};

const techSpecialist2: Employee = {
  id: "emp-004",
  firstName: "Priya",
  lastName: "Patel",
  email: "priya.patel@company.com",
  department: "Engineering",
  role: "Senior Data Engineer",
  level: "Senior",
  hireDate: "2019-11-20",
  managerId: "mgr-003",
  appraisals: [
    {
      id: "appr-004",
      employeeId: "emp-004",
      period: "2024-Q1",
      overallScore: 4.5,
      competencies: generateCompetencies(4.6, 2.2, 4.0),
      feedback: "Outstanding technical work. Leadership development needed for team lead role.",
      reviewerId: "mgr-003",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-004",
      name: "Data Engineering Excellence",
      courses: [courseCatalog[5], courseCatalog[3]],
      estimatedDuration: 60,
      priority: "High",
      completionStatus: "In Progress",
      progress: 80,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-004",
    competencyGaps: generateCompetencies(4.6, 2.2, 4.0).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[1], courseCatalog[2]],
    priority: "High",
    estimatedImpact: 75,
    rationale:
      "Priya excels technically (4.6/5) but has significant leadership gaps (2.2/4). Leadership training is critical for her transition to team lead role.",
  },
  performanceTrend: [4.0, 4.1, 4.2, 4.3, 4.5],
  riskLevel: "Low",
  isHighPotential: false,
};

// RISK EMPLOYEE (Dropping Performance + Incomplete Tracks)
const riskEmployee: Employee = {
  id: "emp-005",
  firstName: "James",
  lastName: "Thompson",
  email: "james.thompson@company.com",
  department: "Engineering",
  role: "Software Engineer",
  level: "Junior",
  hireDate: "2023-05-01",
  managerId: "mgr-001",
  appraisals: [
    {
      id: "appr-005",
      employeeId: "emp-005",
      period: "2024-Q1",
      overallScore: 2,
      competencies: generateCompetencies(2.2, 1.8, 2.5),
      feedback: "Needs significant development in all areas. Consider mentorship program.",
      reviewerId: "mgr-001",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-005",
      name: "Foundation Skills",
      courses: [courseCatalog[0], courseCatalog[2], courseCatalog[5]],
      estimatedDuration: 64,
      priority: "Critical",
      completionStatus: "In Progress",
      progress: 35, // Incomplete - should be higher
    },
  ],
  gapAnalysis: {
    employeeId: "emp-005",
    competencyGaps: generateCompetencies(2.2, 1.8, 2.5).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[0], courseCatalog[2], courseCatalog[5]],
    priority: "Critical",
    estimatedImpact: 90,
    rationale:
      "James shows significant gaps across all competency areas. As a junior engineer with 1 year of experience, comprehensive foundational training is essential to prevent performance issues and support career growth. Current training progress (35%) is below expected threshold.",
  },
  performanceTrend: [2.8, 2.5, 2.3, 2.2, 2.0], // Declining trend
  riskLevel: "High",
  isHighPotential: false,
};

// Additional diverse employees
const employee6: Employee = {
  id: "emp-006",
  firstName: "Maria",
  lastName: "Garcia",
  email: "maria.garcia@company.com",
  department: "Sales",
  role: "Account Manager",
  level: "Mid",
  hireDate: "2022-02-14",
  managerId: "mgr-002",
  appraisals: [
    {
      id: "appr-006",
      employeeId: "emp-006",
      period: "2024-Q1",
      overallScore: 3.8,
      competencies: generateCompetencies(2.8, 3.5, 4.2),
      feedback: "Strong sales performance. Technical knowledge would enhance client conversations.",
      reviewerId: "mgr-002",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-006",
      name: "Sales Excellence",
      courses: [courseCatalog[4], courseCatalog[7]],
      estimatedDuration: 36,
      priority: "Medium",
      completionStatus: "In Progress",
      progress: 55,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-006",
    competencyGaps: generateCompetencies(2.8, 3.5, 4.2).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[0]],
    priority: "Medium",
    estimatedImpact: 65,
    rationale:
      "Maria performs well in sales (3.8/5) but has technical knowledge gaps. Technical training would improve her ability to engage with technical decision-makers.",
  },
  performanceTrend: [3.2, 3.4, 3.6, 3.7, 3.8],
  riskLevel: "Low",
  isHighPotential: false,
};

const employee7: Employee = {
  id: "emp-007",
  firstName: "Aisha",
  lastName: "Al-Mansouri",
  email: "aisha.almansouri@company.com",
  department: "Leadership",
  role: "Engineering Manager",
  level: "Senior",
  hireDate: "2018-09-12",
  managerId: "mgr-004",
  appraisals: [
    {
      id: "appr-007",
      employeeId: "emp-007",
      period: "2024-Q1",
      overallScore: 4.6,
      competencies: generateCompetencies(3.8, 4.5, 4.6),
      feedback: "Strong leader. Consider advanced technical training to stay current.",
      reviewerId: "mgr-004",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-007",
      name: "Executive Leadership",
      courses: [courseCatalog[6], courseCatalog[9]],
      estimatedDuration: 38,
      priority: "High",
      completionStatus: "Completed",
      progress: 100,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-007",
    competencyGaps: generateCompetencies(3.8, 4.5, 4.6).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[8]],
    priority: "Low",
    estimatedImpact: 60,
    rationale:
      "Aisha demonstrates strong leadership (4.5/4) and core competencies (4.6/4). Minor technical gaps (3.8/5) can be addressed through advanced technical training to maintain technical credibility as a manager.",
  },
  performanceTrend: [4.2, 4.3, 4.4, 4.5, 4.6],
  riskLevel: "Low",
  isHighPotential: true,
};

const employee8: Employee = {
  id: "emp-008",
  firstName: "Robert",
  lastName: "Chen",
  email: "robert.chen@company.com",
  department: "Sales",
  role: "Sales Development Representative",
  level: "Junior",
  hireDate: "2023-08-20",
  managerId: "mgr-002",
  appraisals: [
    {
      id: "appr-008",
      employeeId: "emp-008",
      period: "2024-Q1",
      overallScore: 3.2,
      competencies: generateCompetencies(2.5, 2.8, 3.5),
      feedback: "Showing promise. Needs more experience and training.",
      reviewerId: "mgr-002",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-008",
      name: "Sales Fundamentals",
      courses: [courseCatalog[4], courseCatalog[7]],
      estimatedDuration: 34,
      priority: "High",
      completionStatus: "In Progress",
      progress: 60,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-008",
    competencyGaps: generateCompetencies(2.5, 2.8, 3.5).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[4], courseCatalog[7]],
    priority: "High",
    estimatedImpact: 70,
    rationale:
      "Robert is a junior sales rep with foundational gaps. Sales methodology training is critical for quota achievement and career progression.",
  },
  performanceTrend: [2.8, 3.0, 3.1, 3.2, 3.2],
  riskLevel: "Medium",
  isHighPotential: false,
};

const employee9: Employee = {
  id: "emp-009",
  firstName: "Lisa",
  lastName: "Wang",
  email: "lisa.wang@company.com",
  department: "Engineering",
  role: "Frontend Engineer",
  level: "Mid",
  hireDate: "2021-11-15",
  managerId: "mgr-001",
  appraisals: [
    {
      id: "appr-009",
      employeeId: "emp-009",
      period: "2024-Q1",
      overallScore: 3.6,
      competencies: generateCompetencies(3.8, 3.0, 3.5),
      feedback: "Solid contributor. Leadership development would unlock next level.",
      reviewerId: "mgr-001",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-009",
      name: "Frontend Mastery",
      courses: [courseCatalog[0], courseCatalog[1]],
      estimatedDuration: 42,
      priority: "Medium",
      completionStatus: "In Progress",
      progress: 70,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-009",
    competencyGaps: generateCompetencies(3.8, 3.0, 3.5).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[1]],
    priority: "Medium",
    estimatedImpact: 65,
    rationale:
      "Lisa shows solid technical skills (3.8/5) with moderate leadership gaps (3.0/4). Leadership training would support her transition to senior engineer role.",
  },
  performanceTrend: [3.2, 3.3, 3.4, 3.5, 3.6],
  riskLevel: "Low",
  isHighPotential: false,
};

const employee10: Employee = {
  id: "emp-010",
  firstName: "Michael",
  lastName: "Johnson",
  email: "michael.johnson@company.com",
  department: "Sales",
  role: "Regional Sales Director",
  level: "Senior",
  hireDate: "2017-04-10",
  managerId: "mgr-005",
  appraisals: [
    {
      id: "appr-010",
      employeeId: "emp-010",
      period: "2024-Q1",
      overallScore: 4.3,
      competencies: generateCompetencies(3.0, 4.3, 4.5),
      feedback: "Strong sales leader. Technical training would enhance strategic discussions.",
      reviewerId: "mgr-005",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-010",
      name: "Strategic Leadership",
      courses: [courseCatalog[6], courseCatalog[9]],
      estimatedDuration: 38,
      priority: "Medium",
      completionStatus: "Completed",
      progress: 100,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-010",
    competencyGaps: generateCompetencies(3.0, 4.3, 4.5).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[3]],
    priority: "Low",
    estimatedImpact: 55,
    rationale:
      "Michael excels in sales leadership (4.3/4) but has technical knowledge gaps. Technical training would improve strategic client conversations.",
  },
  performanceTrend: [4.0, 4.1, 4.2, 4.2, 4.3],
  riskLevel: "Low",
  isHighPotential: false,
};

const employee11: Employee = {
  id: "emp-011",
  firstName: "Emma",
  lastName: "Brown",
  email: "emma.brown@company.com",
  department: "Engineering",
  role: "DevOps Engineer",
  level: "Mid",
  hireDate: "2022-07-01",
  managerId: "mgr-003",
  appraisals: [
    {
      id: "appr-011",
      employeeId: "emp-011",
      period: "2024-Q1",
      overallScore: 3.7,
      competencies: generateCompetencies(4.0, 2.5, 3.8),
      feedback: "Strong technical skills. Leadership development recommended.",
      reviewerId: "mgr-003",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-011",
      name: "DevOps Excellence",
      courses: [courseCatalog[3], courseCatalog[5]],
      estimatedDuration: 60,
      priority: "High",
      completionStatus: "In Progress",
      progress: 65,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-011",
    competencyGaps: generateCompetencies(4.0, 2.5, 3.8).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[1], courseCatalog[2]],
    priority: "High",
    estimatedImpact: 70,
    rationale:
      "Emma demonstrates strong technical capabilities (4.0/5) but has leadership gaps (2.5/4). Leadership training is important for career advancement.",
  },
  performanceTrend: [3.3, 3.4, 3.5, 3.6, 3.7],
  riskLevel: "Low",
  isHighPotential: false,
};

const employee12: Employee = {
  id: "emp-012",
  firstName: "Kevin",
  lastName: "Lee",
  email: "kevin.lee@company.com",
  department: "Leadership",
  role: "VP of Engineering",
  level: "Executive",
  hireDate: "2015-01-15",
  managerId: "mgr-006",
  appraisals: [
    {
      id: "appr-012",
      employeeId: "emp-012",
      period: "2024-Q1",
      overallScore: 4.8,
      competencies: generateCompetencies(4.2, 4.8, 4.7),
      feedback: "Exceptional executive leadership. Driving organizational transformation.",
      reviewerId: "mgr-006",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-012",
      name: "Executive Excellence",
      courses: [courseCatalog[6], courseCatalog[9]],
      estimatedDuration: 38,
      priority: "High",
      completionStatus: "Completed",
      progress: 100,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-012",
    competencyGaps: generateCompetencies(4.2, 4.8, 4.7).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[8]],
    priority: "Low",
    estimatedImpact: 50,
    rationale:
      "Kevin demonstrates exceptional leadership (4.8/4) across all areas. Minor technical gaps (4.2/5) can be addressed through advanced technical training to maintain technical credibility.",
  },
  performanceTrend: [4.5, 4.6, 4.7, 4.7, 4.8],
  riskLevel: "Low",
  isHighPotential: true,
};

const employee13: Employee = {
  id: "emp-013",
  firstName: "Sophia",
  lastName: "Rodriguez",
  email: "sophia.rodriguez@company.com",
  department: "Sales",
  role: "Customer Success Manager",
  level: "Mid",
  hireDate: "2021-09-10",
  managerId: "mgr-002",
  appraisals: [
    {
      id: "appr-013",
      employeeId: "emp-013",
      period: "2024-Q1",
      overallScore: 3.9,
      competencies: generateCompetencies(3.2, 3.6, 4.3),
      feedback: "Strong customer relationships. Technical knowledge would enhance value delivery.",
      reviewerId: "mgr-002",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-013",
      name: "Customer Success",
      courses: [courseCatalog[7], courseCatalog[2]],
      estimatedDuration: 26,
      priority: "Medium",
      completionStatus: "In Progress",
      progress: 75,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-013",
    competencyGaps: generateCompetencies(3.2, 3.6, 4.3).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[0]],
    priority: "Medium",
    estimatedImpact: 60,
    rationale:
      "Sophia excels in customer relations (4.3/4) but has technical knowledge gaps. Technical training would improve her ability to deliver value to technical customers.",
  },
  performanceTrend: [3.4, 3.5, 3.6, 3.8, 3.9],
  riskLevel: "Low",
  isHighPotential: false,
};

const employee14: Employee = {
  id: "emp-014",
  firstName: "Daniel",
  lastName: "Taylor",
  email: "daniel.taylor@company.com",
  department: "Engineering",
  role: "Backend Engineer",
  level: "Mid",
  hireDate: "2022-03-20",
  managerId: "mgr-001",
  appraisals: [
    {
      id: "appr-014",
      employeeId: "emp-014",
      period: "2024-Q1",
      overallScore: 3.5,
      competencies: generateCompetencies(3.6, 2.8, 3.4),
      feedback: "Solid technical contributor. Leadership development would support growth.",
      reviewerId: "mgr-001",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-014",
      name: "Backend Mastery",
      courses: [courseCatalog[8], courseCatalog[5]],
      estimatedDuration: 64,
      priority: "Medium",
      completionStatus: "In Progress",
      progress: 50,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-014",
    competencyGaps: generateCompetencies(3.6, 2.8, 3.4).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[1]],
    priority: "Medium",
    estimatedImpact: 65,
    rationale:
      "Daniel shows solid technical skills (3.6/5) with leadership gaps (2.8/4). Leadership training would support his transition to senior engineer role.",
  },
  performanceTrend: [3.1, 3.2, 3.3, 3.4, 3.5],
  riskLevel: "Low",
  isHighPotential: false,
};

const employee15: Employee = {
  id: "emp-015",
  firstName: "Olivia",
  lastName: "Anderson",
  email: "olivia.anderson@company.com",
  department: "Leadership",
  role: "Director of Sales",
  level: "Senior",
  hireDate: "2016-08-05",
  managerId: "mgr-005",
  appraisals: [
    {
      id: "appr-015",
      employeeId: "emp-015",
      period: "2024-Q1",
      overallScore: 4.4,
      competencies: generateCompetencies(3.5, 4.4, 4.6),
      feedback: "Strong sales leadership. Technical training would enhance strategic positioning.",
      reviewerId: "mgr-005",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-015",
      name: "Sales Leadership",
      courses: [courseCatalog[6], courseCatalog[4]],
      estimatedDuration: 36,
      priority: "High",
      completionStatus: "Completed",
      progress: 100,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-015",
    competencyGaps: generateCompetencies(3.5, 4.4, 4.6).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[3]],
    priority: "Low",
    estimatedImpact: 55,
    rationale:
      "Olivia demonstrates strong sales leadership (4.4/4) but has technical knowledge gaps. Technical training would improve strategic client conversations.",
  },
  performanceTrend: [4.1, 4.2, 4.3, 4.3, 4.4],
  riskLevel: "Low",
  isHighPotential: true,
};

export const mockEmployees: Employee[] = [
  risingStar1,      // Sarah Chen - Rising Star
  risingStar2,      // Alex Martinez - Rising Star
  techSpecialist1, // David Kim - Technical Specialist
  techSpecialist2, // Priya Patel - Technical Specialist
  riskEmployee,     // James Thompson - RISK
  employee6,        // Maria Garcia
  employee7,        // Aisha Al-Mansouri - High Potential
  employee8,        // Robert Chen
  employee9,        // Lisa Wang
  employee10,       // Michael Johnson
  employee11,       // Emma Brown
  employee12,       // Kevin Lee - High Potential
  employee13,       // Sophia Rodriguez
  employee14,       // Daniel Taylor
  employee15,       // Olivia Anderson - High Potential
];
