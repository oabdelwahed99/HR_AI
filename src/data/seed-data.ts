import { Employee, Appraisal, Competency, TrainingTrack, Course, GapAnalysis } from "@/types/hr";

/**
 * Curated Seed Data for HR-OS Pulse Demo
 * 10 Employees showcasing ALL system features across Engineering, Sales, and Leadership
 */

// Course Catalog (10 courses)
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

// 10 Curated Employees showcasing ALL features:

// 1. FUTURE LEADER (High Performance + High Potential) - Elite Performer
const emp1: Employee = {
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
      feedback: "Exceptional technical leadership. Ready for principal role. Demonstrates strategic thinking and mentorship capabilities.",
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
      "Sarah demonstrates exceptional technical capabilities (4.8/5) but has a moderate gap in Strategic Vision (2.8/3). Leadership training would unlock her potential for principal-level responsibilities. Her high training completion (75%) and 4 years tenure position her as a Future Leader.",
  },
  performanceTrend: [4.2, 4.5, 4.7, 4.9, 5.0],
  riskLevel: "Low",
  isHighPotential: true,
};

// 2. RISING STAR (Medium Performance + High Potential) - High Achiever
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
      overallScore: 4,
      competencies: generateCompetencies(3.5, 4.0, 4.3),
      feedback: "Strong sales performance with exceptional client relationships. Shows leadership potential. Technical knowledge would enhance credibility.",
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
    competencyGaps: generateCompetencies(3.5, 4.0, 4.3).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[3]],
    priority: "Low",
    estimatedImpact: 60,
    rationale:
      "Alex excels in sales and leadership (4.0/4) but has minor technical gaps. With 3 years tenure and 65% training completion, technical training would enhance credibility with technical clients. High potential due to strong leadership indicators.",
  },
  performanceTrend: [3.8, 4.0, 4.1, 4.2, 4.2],
  riskLevel: "Low",
  isHighPotential: true,
};

// 3. TECHNICAL SPECIALIST (High Performance + Low Potential) - Elite Performer
const emp3: Employee = {
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
      overallScore: 5,
      competencies: generateCompetencies(5.0, 2.5, 3.8),
      feedback: "Technical excellence unmatched. Prefers individual contributor role. Leadership development optional.",
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
      "David is a technical expert (5.0/5) with minimal leadership interest. With 6 years tenure and completed training tracks, he's a Technical Specialist. Optional leadership training available but not critical for his career path.",
  },
  performanceTrend: [4.5, 4.6, 4.6, 4.7, 4.7],
  riskLevel: "Low",
  isHighPotential: false,
};

// 4. AT RISK (Low Performance + Low Potential) - Needs Intervention
const emp4: Employee = {
  id: "emp-004",
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
      id: "appr-004",
      employeeId: "emp-004",
      period: "2024-Q1",
      overallScore: 2,
      competencies: generateCompetencies(2.2, 1.8, 2.5),
      feedback: "Needs significant development in all areas. Consider mentorship program. Performance declining.",
      reviewerId: "mgr-001",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-004",
      name: "Foundation Skills",
      courses: [courseCatalog[0], courseCatalog[2], courseCatalog[5]],
      estimatedDuration: 64,
      priority: "High",
      completionStatus: "In Progress",
      progress: 35, // Incomplete - below threshold
    },
  ],
  gapAnalysis: {
    employeeId: "emp-004",
    competencyGaps: generateCompetencies(2.2, 1.8, 2.5).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[0], courseCatalog[2], courseCatalog[5]],
    priority: "Critical",
    estimatedImpact: 90,
    rationale:
      "James shows significant gaps across all competency areas with CRITICAL gaps in Technical Architecture (2.2/5 required). As a junior engineer with 1 year tenure and only 35% training completion, comprehensive foundational training is essential. Declining performance trend (2.8→2.0) indicates immediate intervention needed.",
  },
  performanceTrend: [2.8, 2.5, 2.3, 2.2, 2.0], // Declining
  riskLevel: "High",
  isHighPotential: false,
};

// 5. KEY PLAYER (High Performance + Medium Potential) - High Achiever
const emp5: Employee = {
  id: "emp-005",
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
      id: "appr-005",
      employeeId: "emp-005",
      period: "2024-Q1",
      overallScore: 5,
      competencies: generateCompetencies(4.6, 2.8, 4.0),
      feedback: "Outstanding technical work. Leadership development needed for team lead role.",
      reviewerId: "mgr-003",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-005",
      name: "Data Engineering Excellence",
      courses: [courseCatalog[5], courseCatalog[3]],
      estimatedDuration: 60,
      priority: "High",
      completionStatus: "In Progress",
      progress: 80,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-005",
    competencyGaps: generateCompetencies(4.6, 2.8, 4.0).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[1], courseCatalog[2]],
    priority: "High",
    estimatedImpact: 75,
    rationale:
      "Priya excels technically (4.6/5) but has significant leadership gaps (2.8/4). With 5 years tenure and 80% training completion, leadership training is critical for her transition to team lead role. Medium potential due to leadership development needs.",
  },
  performanceTrend: [4.0, 4.1, 4.2, 4.3, 4.5],
  riskLevel: "Low",
  isHighPotential: false,
};

// 6. CORE TALENT (Medium Performance + Medium Potential) - Solid Contributor
const emp6: Employee = {
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
      overallScore: 3,
      competencies: generateCompetencies(2.8, 3.2, 3.8),
      feedback: "Solid sales performance. Technical knowledge would enhance client conversations.",
      reviewerId: "mgr-002",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-006",
      name: "Sales Excellence",
      courses: [courseCatalog[4], courseCatalog[7]],
      estimatedDuration: 34,
      priority: "Medium",
      completionStatus: "In Progress",
      progress: 55,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-006",
    competencyGaps: generateCompetencies(2.8, 3.2, 3.8).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[0]],
    priority: "Medium",
    estimatedImpact: 65,
    rationale:
      "Maria performs well in sales (3.2/5) with solid core competencies (3.8/4). With 2 years tenure and 55% training completion, technical training would improve her ability to engage with technical decision-makers. Core Talent with steady growth potential.",
  },
  performanceTrend: [3.0, 3.1, 3.1, 3.2, 3.2],
  riskLevel: "Low",
  isHighPotential: false,
};

// 7. HIGH POTENTIAL UNDERPERFORMER (Low Performance + High Potential) - Solid Contributor
const emp7: Employee = {
  id: "emp-007",
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
      id: "appr-007",
      employeeId: "emp-007",
      period: "2024-Q1",
      overallScore: 3,
      competencies: generateCompetencies(3.5, 2.0, 3.2),
      feedback: "Strong technical foundation but underperforming. High potential if properly supported.",
      reviewerId: "mgr-003",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-007",
      name: "DevOps Excellence",
      courses: [courseCatalog[3], courseCatalog[5]],
      estimatedDuration: 60,
      priority: "High",
      completionStatus: "In Progress",
      progress: 70,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-007",
    competencyGaps: generateCompetencies(3.5, 2.0, 3.2).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[1], courseCatalog[2]],
    priority: "High",
    estimatedImpact: 80,
    rationale:
      "Emma demonstrates strong technical capabilities (3.5/5) but has leadership gaps (2.0/4) and underperforming overall (2.8/5). However, with 2 years tenure and 70% training completion, she shows HIGH POTENTIAL. Leadership training critical to unlock performance.",
  },
  performanceTrend: [3.0, 2.9, 2.8, 2.8, 2.8],
  riskLevel: "Medium",
  isHighPotential: true,
};

// 8. EXECUTIVE LEADER (High Performance + High Potential) - Elite Performer
const emp8: Employee = {
  id: "emp-008",
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
      id: "appr-008",
      employeeId: "emp-008",
      period: "2024-Q1",
      overallScore: 5,
      competencies: generateCompetencies(4.2, 4.8, 4.7),
      feedback: "Exceptional executive leadership. Driving organizational transformation. Technical credibility maintained.",
      reviewerId: "mgr-006",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-008",
      name: "Executive Excellence",
      courses: [courseCatalog[6], courseCatalog[9]],
      estimatedDuration: 38,
      priority: "High",
      completionStatus: "Completed",
      progress: 100,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-008",
    competencyGaps: generateCompetencies(4.2, 4.8, 4.7).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[8]],
    priority: "Low",
    estimatedImpact: 50,
    rationale:
      "Kevin demonstrates exceptional leadership (4.8/4) across all areas. With 9 years tenure, 100% training completion, and executive role, he's a Future Leader. Minor technical gaps (4.2/5) can be addressed through advanced technical training to maintain technical credibility.",
  },
  performanceTrend: [4.5, 4.6, 4.7, 4.7, 4.8],
  riskLevel: "Low",
  isHighPotential: true,
};

// 9. DEVELOPMENT NEEDED (Low Performance + Medium Potential) - Needs Intervention
const emp9: Employee = {
  id: "emp-009",
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
      id: "appr-009",
      employeeId: "emp-009",
      period: "2024-Q1",
      overallScore: 2,
      competencies: generateCompetencies(2.5, 2.2, 3.0),
      feedback: "Showing promise but needs significant development. Consider mentorship program.",
      reviewerId: "mgr-002",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-009",
      name: "Sales Fundamentals",
      courses: [courseCatalog[4], courseCatalog[7]],
      estimatedDuration: 34,
      priority: "High",
      completionStatus: "In Progress",
      progress: 60,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-009",
    competencyGaps: generateCompetencies(2.5, 2.2, 3.0).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[4], courseCatalog[7]],
    priority: "High",
    estimatedImpact: 70,
    rationale:
      "Robert is a junior sales rep with foundational gaps. With 1 year tenure and 60% training completion, sales methodology training is critical for quota achievement. Medium potential due to early career stage and some promise shown.",
  },
  performanceTrend: [2.2, 2.3, 2.3, 2.4, 2.4],
  riskLevel: "Medium",
  isHighPotential: false,
};

// 10. RELIABLE (Medium Performance + Low Potential) - Solid Contributor
const emp10: Employee = {
  id: "emp-010",
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
      id: "appr-010",
      employeeId: "emp-010",
      period: "2024-Q1",
      overallScore: 3,
      competencies: generateCompetencies(3.6, 2.5, 3.5),
      feedback: "Reliable contributor. Meets expectations consistently. Limited growth trajectory.",
      reviewerId: "mgr-001",
      date: "2024-03-31",
    },
  ],
  trainingTracks: [
    {
      id: "track-010",
      name: "Frontend Mastery",
      courses: [courseCatalog[0], courseCatalog[1]],
      estimatedDuration: 42,
      priority: "Medium",
      completionStatus: "Not Started",
      progress: 0,
    },
  ],
  gapAnalysis: {
    employeeId: "emp-010",
    competencyGaps: generateCompetencies(3.6, 2.5, 3.5).filter((c) => c.gap > 0),
    recommendedCourses: [courseCatalog[1]],
    priority: "Medium",
    estimatedImpact: 55,
    rationale:
      "Lisa shows solid technical skills (3.6/5) with leadership gaps (2.5/4). With 3 years tenure but 0% training completion, she's a Reliable contributor with limited growth potential. Leadership training would support career development but low priority.",
  },
  performanceTrend: [3.2, 3.3, 3.3, 3.4, 3.4],
  riskLevel: "Low",
  isHighPotential: false,
};

export const seedEmployees: Employee[] = [
  emp1, // Future Leader - Elite Performer (High/High)
  emp2, // Rising Star - High Achiever (Medium/High)
  emp3, // Technical Specialist - Elite Performer (High/Low)
  emp4, // At Risk - Needs Intervention (Low/Low)
  emp5, // Key Player - High Achiever (High/Medium)
  emp6, // Core Talent - Solid Contributor (Medium/Medium)
  emp7, // High Potential Underperformer - Solid Contributor (Low/High)
  emp8, // Executive Leader - Elite Performer (High/High)
  emp9, // Development Needed - Needs Intervention (Low/Medium)
  emp10, // Reliable - Solid Contributor (Medium/Low)
];
