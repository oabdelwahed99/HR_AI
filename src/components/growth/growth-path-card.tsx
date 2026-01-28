"use client";

import { motion } from "framer-motion";
import { Employee, TrainingTrack, Course } from "@/types/hr";
import { cn, formatPercentage } from "@/lib/utils";
import { 
  GraduationCap, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Circle,
  PlayCircle,
  Sparkles
} from "lucide-react";

interface GrowthPathCardProps {
  employee: Employee;
  track: TrainingTrack;
}

export function GrowthPathCard({ employee, track }: GrowthPathCardProps) {
  const completedCourses = track.courses.filter(c => 
    track.completionStatus === "Completed" || track.progress === 100
  ).length;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glassmorphism rounded-xl p-6 border border-slate-800/50 hover:border-indigo-500/50 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{track.name}</h3>
          <p className="text-sm text-slate-400">
            Personalized for {employee.firstName} {employee.lastName}
          </p>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-lg text-xs font-medium",
          track.priority === "High" && "bg-red-500/20 text-red-400",
          track.priority === "Medium" && "bg-yellow-500/20 text-yellow-400",
          track.priority === "Low" && "bg-green-500/20 text-green-400"
        )}>
          {track.priority} Priority
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Progress</span>
          <span>{formatPercentage(track.progress)}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${track.progress}%` }}
            transition={{ duration: 0.5 }}
            className={cn(
              "h-3 rounded-full",
              track.progress === 100 && "bg-green-500",
              track.progress > 0 && track.progress < 100 && "bg-indigo-500",
              track.progress === 0 && "bg-slate-600"
            )}
          />
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2 mb-4">
        {track.completionStatus === "Completed" && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/10 border border-green-500/30">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-xs text-green-400 font-medium">Completed</span>
          </div>
        )}
        {track.completionStatus === "In Progress" && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <PlayCircle className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-blue-400 font-medium">In Progress</span>
          </div>
        )}
        {track.completionStatus === "Not Started" && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-500/10 border border-slate-500/30">
            <Circle className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 font-medium">Not Started</span>
          </div>
        )}
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800/50">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400">{track.estimatedDuration} hours</span>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-slate-300 mb-2">Courses in this Track</h4>
        {track.courses.map((course, index) => {
          const isCompleted = track.progress === 100 || (track.completionStatus === "In Progress" && index < completedCourses);
          return (
            <div
              key={course.id}
              className={cn(
                "p-3 rounded-lg border transition-colors",
                isCompleted
                  ? "bg-green-500/5 border-green-500/20"
                  : "bg-slate-800/50 border-slate-700/50"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium truncate",
                      isCompleted ? "text-green-400" : "text-white"
                    )}>
                      {course.title}
                    </p>
                    <p className="text-xs text-slate-500">{course.duration} hours • {course.difficulty}</p>
                  </div>
                </div>
                <span className={cn(
                  "px-2 py-0.5 rounded text-xs font-medium ml-2",
                  course.category === "Technical" && "bg-blue-500/20 text-blue-400",
                  course.category === "Leadership" && "bg-purple-500/20 text-purple-400",
                  course.category === "Core" && "bg-green-500/20 text-green-400"
                )}>
                  {course.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Recommendation Badge */}
      {track.priority === "High" && (
        <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-indigo-500/20 flex items-center justify-center">
            <Sparkles className="w-2.5 h-2.5 text-indigo-400" />
          </div>
          <p className="text-xs text-slate-400">
            AI-recommended based on competency gaps
          </p>
        </div>
      )}
    </motion.div>
  );
}
