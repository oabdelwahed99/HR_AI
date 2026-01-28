"use client";

import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/navbar";
import { CompetencyRadar } from "@/components/tna/competency-radar";
import { GapAnalysisCard } from "@/components/tna/gap-analysis-card";
import { seedEmployees, courseCatalog } from "@/data/seed-data";
import { Employee } from "@/types/hr";
import { motion } from "framer-motion";
import { Search, User, TrendingUp, AlertTriangle, GraduationCap } from "lucide-react";
import { getGapPriority, isCriticalGap } from "@/lib/business-rules";

export default function TNAPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(seedEmployees[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = seedEmployees.filter(emp =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const criticalGapsCount = selectedEmployee?.gapAnalysis
    ? selectedEmployee.gapAnalysis.competencyGaps.filter(gap => isCriticalGap(gap)).length
    : 0;

  const recommendedCourses = selectedEmployee?.gapAnalysis
    ? courseCatalog.filter(course =>
        selectedEmployee.gapAnalysis!.recommendedCourses.some(rec => rec.id === course.id)
      )
    : [];

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <Navbar />

      <main className="ml-64 mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              TNA & Competency Engine
            </h1>
            <p className="text-slate-400">
              Training Needs Analysis and competency gap identification with AI-powered insights
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar - Employee List */}
            <div className="col-span-3">
              <div className="glassmorphism rounded-xl p-4 border border-slate-800/50 mb-4">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {filteredEmployees.map((emp) => {
                    const latestAppraisal = emp.appraisals[emp.appraisals.length - 1];
                    const hasGaps = emp.gapAnalysis && emp.gapAnalysis.competencyGaps.length > 0;
                    return (
                      <motion.button
                        key={emp.id}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedEmployee(emp)}
                        className={`w-full text-left p-3 rounded-lg transition-all border ${
                          selectedEmployee?.id === emp.id
                            ? "bg-indigo-500/20 border-indigo-500/50 text-white"
                            : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:border-slate-600/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">
                            {emp.firstName} {emp.lastName}
                          </p>
                          {hasGaps && (
                            <AlertTriangle className="w-4 h-4 text-orange-400" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{emp.role}</p>
                        {latestAppraisal && (
                          <p className="text-xs text-slate-500 mt-1">
                            Score: {latestAppraisal.overallScore}/5
                          </p>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-9">
              {selectedEmployee ? (
                <div className="space-y-6">
                  {/* Employee Header */}
                  <div className="glassmorphism rounded-xl p-6 border border-slate-800/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-1">
                          {selectedEmployee.firstName} {selectedEmployee.lastName}
                        </h2>
                        <p className="text-slate-400">{selectedEmployee.role} • {selectedEmployee.department}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {selectedEmployee.isHighPotential && (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-green-400 font-medium">High Potential</span>
                          </div>
                        )}
                        {criticalGapsCount > 0 && (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span className="text-sm text-red-400 font-medium">{criticalGapsCount} Critical Gaps</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Competency Radar Chart */}
                  {selectedEmployee.appraisals.length > 0 && (
                    <CompetencyRadar
                      competencies={selectedEmployee.appraisals[selectedEmployee.appraisals.length - 1].competencies}
                      employeeName={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                    />
                  )}

                  {/* Gap Analysis */}
                  {selectedEmployee.gapAnalysis && (
                    <GapAnalysisCard
                      gapAnalysis={selectedEmployee.gapAnalysis}
                      recommendedCourses={recommendedCourses}
                    />
                  )}

                  {/* Training Tracks */}
                  {selectedEmployee.trainingTracks.length > 0 && (
                    <div className="glassmorphism rounded-xl p-6 border border-slate-800/50">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-indigo-400" />
                        Current Training Tracks
                      </h3>
                      <div className="space-y-4">
                        {selectedEmployee.trainingTracks.map((track) => (
                          <div
                            key={track.id}
                            className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-semibold text-white">{track.name}</h4>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                track.completionStatus === "Completed" && "bg-green-500/20 text-green-400",
                                track.completionStatus === "In Progress" && "bg-blue-500/20 text-blue-400",
                                track.completionStatus === "Not Started" && "bg-slate-500/20 text-slate-400"
                              }`}>
                                {track.completionStatus}
                              </span>
                            </div>
                            <div className="mb-2">
                              <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>Progress</span>
                                <span>{track.progress}%</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-2">
                                <div
                                  className="bg-indigo-500 h-2 rounded-full transition-all"
                                  style={{ width: `${track.progress}%` }}
                                />
                              </div>
                            </div>
                            <div className="text-xs text-slate-500">
                              {track.courses.length} courses • {track.estimatedDuration} hours
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="glassmorphism rounded-xl p-12 border border-slate-800/50 text-center">
                  <User className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Select an employee to view their competency analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
