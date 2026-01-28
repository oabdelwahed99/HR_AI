"use client";

import { motion } from "framer-motion";
import { GapAnalysis, Course } from "@/types/hr";
import { cn } from "@/lib/utils";
import { GraduationCap, AlertTriangle, Target, TrendingUp } from "lucide-react";

interface GapAnalysisCardProps {
  gapAnalysis: GapAnalysis;
  recommendedCourses: Course[];
}

export function GapAnalysisCard({ gapAnalysis, recommendedCourses }: GapAnalysisCardProps) {
  const priorityColors = {
    Critical: "bg-red-500/10 text-red-400 border-red-500/30",
    High: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    Low: "bg-green-500/10 text-green-400 border-green-500/30",
  };

  return (
    <div className="glassmorphism rounded-xl p-6 border border-slate-800/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" />
          Gap Analysis
        </h3>
        <div className={cn("px-3 py-1 rounded-lg text-sm font-medium border", priorityColors[gapAnalysis.priority])}>
          {gapAnalysis.priority} Priority
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
          <p className="text-xs text-slate-400 mb-1">Competency Gaps</p>
          <p className="text-2xl font-bold text-white">{gapAnalysis.competencyGaps.length}</p>
        </div>
        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
          <p className="text-xs text-slate-400 mb-1">Estimated Impact</p>
          <p className="text-2xl font-bold text-indigo-400">{gapAnalysis.estimatedImpact}%</p>
        </div>
        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
          <p className="text-xs text-slate-400 mb-1">Recommended Courses</p>
          <p className="text-2xl font-bold text-green-400">{recommendedCourses.length}</p>
        </div>
      </div>

      {/* AI Rationale */}
      <div className="mb-6 p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded bg-indigo-500/20 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-indigo-400">AI Rationale</p>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{gapAnalysis.rationale}</p>
      </div>

      {/* Competency Gaps List */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Identified Gaps
        </h4>
        <div className="space-y-2">
          {gapAnalysis.competencyGaps.map((gap, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white">{gap.name}</span>
                <span className="text-xs text-slate-400">{gap.category}</span>
              </div>
              <div className="flex items-center gap-4 text-xs mt-2">
                <div>
                  <span className="text-slate-500">Current: </span>
                  <span className="text-slate-300 font-medium">{gap.currentLevel.toFixed(1)}/5</span>
                </div>
                <div>
                  <span className="text-slate-500">Required: </span>
                  <span className="text-green-400 font-medium">{gap.requiredLevel}/5</span>
                </div>
                <div>
                  <span className="text-slate-500">Gap: </span>
                  <span className="text-red-400 font-medium">{gap.gap.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Courses */}
      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          Recommended Training
        </h4>
        <div className="space-y-3">
          {recommendedCourses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ x: 4 }}
              className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h5 className="text-sm font-semibold text-white">{course.title}</h5>
                <span className={cn(
                  "px-2 py-0.5 rounded text-xs font-medium",
                  course.category === "Technical" && "bg-blue-500/20 text-blue-400",
                  course.category === "Leadership" && "bg-purple-500/20 text-purple-400",
                  course.category === "Core" && "bg-green-500/20 text-green-400"
                )}>
                  {course.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-2">{course.description}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>{course.duration} hours</span>
                <span>{course.difficulty}</span>
                {course.completionRate && (
                  <span className="text-green-400">{course.completionRate}% completion rate</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
