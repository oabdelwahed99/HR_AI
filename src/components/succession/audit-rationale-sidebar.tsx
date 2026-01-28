"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, TrendingUp, AlertTriangle, GraduationCap, Brain } from "lucide-react";
import { Employee } from "@/types/hr";
import { getNineBoxPosition, mapAppraisalToPerformance, calculatePotential } from "@/lib/business-rules";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface AuditRationaleSidebarProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AuditRationaleSidebar({
  employee,
  isOpen,
  onClose,
}: AuditRationaleSidebarProps) {
  if (!employee) return null;

  const position = getNineBoxPosition(employee);
  const potential = calculatePotential(employee);
  const latestAppraisal = employee.appraisals[employee.appraisals.length - 1];
  const performanceCategory = latestAppraisal
    ? mapAppraisalToPerformance(latestAppraisal.overallScore)
    : "Solid Contributor";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-96 glassmorphism border-l border-slate-800/50 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Audit & Rationale</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Employee Info */}
              <div className="mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {employee.firstName} {employee.lastName}
                    </h3>
                    <p className="text-sm text-slate-400">{employee.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-slate-500">Department:</span>
                    <p className="text-white">{employee.department}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Level:</span>
                    <p className="text-white">{employee.level}</p>
                  </div>
                </div>
              </div>

              {/* 9-Box Position */}
              <div className="mb-6 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
                <h4 className="text-sm font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  9-Box Grid Position
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Performance:</span>
                    <span className="text-white font-medium">{position.performance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Potential:</span>
                    <span className="text-white font-medium">{position.potential}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Category:</span>
                    <span className="text-white font-medium">{performanceCategory}</span>
                  </div>
                </div>
              </div>

              {/* Potential Breakdown */}
              <div className="mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Potential Calculation
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-slate-400">Training Completion (40%)</span>
                      <span className="text-xs text-white">
                        {potential.breakdown.trainingCompletion.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${potential.breakdown.trainingCompletion}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-slate-400">Competency Growth (30%)</span>
                      <span className="text-xs text-white">
                        {potential.breakdown.competencyGrowth.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${potential.breakdown.competencyGrowth}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-slate-400">Tenure (30%)</span>
                      <span className="text-xs text-white">
                        {potential.breakdown.tenure.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${potential.breakdown.tenure}%` }}
                      />
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-700">
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-white">Total Potential Score</span>
                      <span className="text-lg font-bold text-indigo-400">
                        {potential.score.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Appraisal */}
              {latestAppraisal && (
                <div className="mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Latest Appraisal ({latestAppraisal.period})
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Overall Score:</span>
                      <span className="text-white font-medium">
                        {latestAppraisal.overallScore}/5
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Date:</span>
                      <span className="text-white">{formatDate(latestAppraisal.date)}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-700">
                      <p className="text-xs text-slate-400 mb-1">Feedback:</p>
                      <p className="text-sm text-slate-300">{latestAppraisal.feedback}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Gap Analysis Rationale */}
              {employee.gapAnalysis && (
                <div className="mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Gap Analysis Rationale
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Priority:</span>
                      <span
                        className={cn(
                          "font-medium",
                          employee.gapAnalysis.priority === "Critical" && "text-red-400",
                          employee.gapAnalysis.priority === "High" && "text-orange-400",
                          employee.gapAnalysis.priority === "Medium" && "text-yellow-400",
                          employee.gapAnalysis.priority === "Low" && "text-green-400"
                        )}
                      >
                        {employee.gapAnalysis.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estimated Impact:</span>
                      <span className="text-white font-medium">
                        {employee.gapAnalysis.estimatedImpact}%
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 rounded bg-indigo-500/20 flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <p className="text-xs font-medium text-slate-400">AI Rationale:</p>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {employee.gapAnalysis.rationale}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Risk Indicator */}
              {employee.riskLevel !== "Low" && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <h4 className="text-sm font-semibold text-red-400">Risk Alert</h4>
                  </div>
                  <p className="text-xs text-slate-300">
                    This employee is flagged as {employee.riskLevel} risk. Immediate attention
                    recommended.
                  </p>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
