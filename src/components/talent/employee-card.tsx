"use client";

import { motion } from "framer-motion";
import { Employee } from "@/types/hr";
import { getNineBoxPosition, mapAppraisalToPerformance } from "@/lib/business-rules";
import { calculatePotential } from "@/lib/business-rules";
import { cn, formatDate } from "@/lib/utils";
import { 
  User, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Star,
  Building2,
  Briefcase,
  Calendar
} from "lucide-react";

interface EmployeeCardProps {
  employee: Employee;
  onClick: () => void;
}

export function EmployeeCard({ employee, onClick }: EmployeeCardProps) {
  const latestAppraisal = employee.appraisals[employee.appraisals.length - 1];
  const position = getNineBoxPosition(employee);
  const potential = calculatePotential(employee);
  const performanceCategory = latestAppraisal
    ? mapAppraisalToPerformance(latestAppraisal.overallScore)
    : "Solid Contributor";

  const riskColors = {
    Low: "bg-green-500/10 text-green-400 border-green-500/30",
    Medium: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    High: "bg-red-500/10 text-red-400 border-red-500/30",
    Critical: "bg-red-600/10 text-red-500 border-red-600/30",
  };

  const performanceColors = {
    "Elite Performer": "text-green-400",
    "High Achiever": "text-blue-400",
    "Solid Contributor": "text-slate-400",
    "Needs Intervention": "text-red-400",
  };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="glassmorphism rounded-xl p-6 border border-slate-800/50 hover:border-indigo-500/50 cursor-pointer transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-slate-400">{employee.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {employee.isHighPotential && (
            <div className="p-1.5 rounded-lg bg-green-500/10 border border-green-500/30">
              <Star className="w-4 h-4 text-green-400 fill-green-400" />
            </div>
          )}
          {employee.riskLevel !== "Low" && (
            <div className={cn("px-2 py-1 rounded text-xs font-medium border", riskColors[employee.riskLevel])}>
              {employee.riskLevel}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="w-4 h-4 text-slate-500" />
          <span className="text-slate-400">{employee.department}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Briefcase className="w-4 h-4 text-slate-500" />
          <span className="text-slate-400">{employee.level}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">Performance</span>
          <div className="flex items-center gap-2">
            {position.performance === "Exceeds" && (
              <TrendingUp className="w-4 h-4 text-green-400" />
            )}
            {position.performance === "Below" && (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span className={cn("text-sm font-semibold", performanceColors[performanceCategory])}>
              {performanceCategory}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">Potential</span>
          <span className="text-sm font-semibold text-indigo-400">
            {position.potential} ({potential.score.toFixed(0)}%)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">Latest Appraisal</span>
          <span className="text-sm font-semibold text-white">
            {latestAppraisal?.overallScore || "N/A"}/5
          </span>
        </div>

        {employee.gapAnalysis && (
          <div className="pt-3 border-t border-slate-800/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-500">Gap Priority</span>
              <span className={cn(
                "text-xs font-medium px-2 py-0.5 rounded",
                employee.gapAnalysis.priority === "Critical" && "bg-red-500/20 text-red-400",
                employee.gapAnalysis.priority === "High" && "bg-orange-500/20 text-orange-400",
                employee.gapAnalysis.priority === "Medium" && "bg-yellow-500/20 text-yellow-400",
                employee.gapAnalysis.priority === "Low" && "bg-green-500/20 text-green-400"
              )}>
                {employee.gapAnalysis.priority}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
