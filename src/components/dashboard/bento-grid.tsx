"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Target,
  Brain,
  Zap
} from "lucide-react";
import { IntelligenceCard } from "./intelligence-card";
import { WorkforceMetrics } from "@/types/hr";
import { formatPercentage } from "@/lib/utils";

interface BentoGridProps {
  metrics: WorkforceMetrics;
}

export function BentoGrid({ metrics }: BentoGridProps) {
  const gridItems = [
    {
      title: "Workforce Readiness",
      value: formatPercentage(metrics.workforceReadiness),
      change: 5.2,
      trend: "up" as const,
      icon: Target,
      description: "Overall organizational capability score",
      rationale: "Readiness improved 5.2% due to completion of leadership development programs across 3 departments. Technical teams show strongest readiness (87%), while product teams need targeted upskilling.",
      className: "col-span-2 row-span-2",
      delay: 0.1,
    },
    {
      title: "Skill Gaps",
      value: formatPercentage(metrics.averageSkillGap),
      change: -3.1,
      trend: "down" as const,
      icon: Brain,
      description: "Average competency gap across workforce",
      rationale: "Skill gaps reduced by 3.1% following Q1 training initiatives. Critical gaps remain in cloud architecture (12 employees) and strategic leadership (8 employees).",
      className: "col-span-1 row-span-1",
      delay: 0.2,
    },
    {
      title: "At-Risk Talent",
      value: metrics.atRiskTalent,
      change: -1,
      trend: "down" as const,
      icon: AlertTriangle,
      description: "Employees requiring immediate attention",
      rationale: "At-risk count decreased from 2 to 1. James Thompson (Engineering) remains high-risk due to performance gaps. Intervention plan activated with mentorship program.",
      className: "col-span-1 row-span-1",
      delay: 0.3,
    },
    {
      title: "High Potential",
      value: metrics.highPotentialCount,
      change: 1,
      trend: "up" as const,
      icon: Zap,
      description: "Employees identified for succession",
      rationale: "High-potential pool expanded to 3 employees. Sarah Chen and Priya Patel show readiness for promotion. Aisha Al-Mansouri ready for director-level responsibilities.",
      className: "col-span-1 row-span-1",
      delay: 0.4,
    },
    {
      title: "Avg Performance",
      value: metrics.averagePerformanceScore.toFixed(1),
      change: 0.2,
      trend: "up" as const,
      icon: TrendingUp,
      description: "Average appraisal score (1-5 scale)",
      rationale: "Performance scores increased 0.2 points. 60% of employees rated 4+ in Q1. Engineering and Data Science departments lead with 4.2+ averages.",
      className: "col-span-1 row-span-1",
      delay: 0.5,
    },
    {
      title: "Training Completion",
      value: formatPercentage(metrics.trainingCompletionRate),
      change: 8.5,
      trend: "up" as const,
      icon: Users,
      description: "Overall training track completion rate",
      rationale: "Training completion improved 8.5% with new personalized learning paths. Technical tracks show 78% completion, leadership tracks at 65%. Core skills training at 90%.",
      className: "col-span-2 row-span-1",
      delay: 0.6,
    },
  ];

  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-4 auto-rows-fr">
      {gridItems.map((item, index) => (
        <IntelligenceCard
          key={index}
          title={item.title}
          value={item.value}
          change={item.change}
          trend={item.trend}
          icon={item.icon}
          description={item.description}
          rationale={item.rationale}
          className={item.className}
          delay={item.delay}
        />
      ))}
    </div>
  );
}
