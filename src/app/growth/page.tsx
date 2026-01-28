"use client";

import { useState, useMemo } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/navbar";
import { GrowthPathCard } from "@/components/growth/growth-path-card";
import { seedEmployees } from "@/data/seed-data";
import { Employee } from "@/types/hr";
import { motion } from "framer-motion";
import { Search, User, TrendingUp, GraduationCap, Target, Sparkles } from "lucide-react";
import { calculatePotential } from "@/lib/business-rules";
import { formatPercentage } from "@/lib/utils";

export default function GrowthPathsPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(seedEmployees[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = seedEmployees.filter(emp =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const potential = selectedEmployee ? calculatePotential(selectedEmployee) : null;
  const totalProgress = selectedEmployee
    ? selectedEmployee.trainingTracks.reduce((sum, track) => sum + track.progress, 0) / 
      (selectedEmployee.trainingTracks.length || 1)
    : 0;

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <Navbar />

      <main className="ml-64 mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-indigo-400" />
              Personalized Growth Paths
            </h1>
            <p className="text-slate-400">
              AI-generated training recommendations tailored to each employee&#39;s competency gaps
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
                    const empPotential = calculatePotential(emp);
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
                          {emp.isHighPotential && (
                            <TrendingUp className="w-4 h-4 text-green-400" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{emp.role}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500">Potential:</span>
                          <span className="text-xs font-medium text-indigo-400">
                            {formatPercentage(empPotential.score)}
                          </span>
                        </div>
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
                  {/* Employee Header with Stats */}
                  <div className="glassmorphism rounded-xl p-6 border border-slate-800/50">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-1">
                          {selectedEmployee.firstName} {selectedEmployee.lastName}
                        </h2>
                        <p className="text-slate-400">{selectedEmployee.role} • {selectedEmployee.department}</p>
                      </div>
                      {selectedEmployee.isHighPotential && (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                          <span className="text-sm text-green-400 font-medium">High Potential</span>
                        </div>
                      )}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-indigo-400" />
                          <p className="text-xs text-slate-400">Potential Score</p>
                        </div>
                        <p className="text-2xl font-bold text-indigo-400">
                          {potential ? formatPercentage(potential.score) : "N/A"}
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-2">
                          <GraduationCap className="w-4 h-4 text-green-400" />
                          <p className="text-xs text-slate-400">Training Progress</p>
                        </div>
                        <p className="text-2xl font-bold text-green-400">
                          {formatPercentage(totalProgress)}
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-blue-400" />
                          <p className="text-xs text-slate-400">Active Tracks</p>
                        </div>
                        <p className="text-2xl font-bold text-blue-400">
                          {selectedEmployee.trainingTracks.length}
                        </p>
                      </div>
                    </div>

                    {/* Potential Breakdown */}
                    {potential && (
                      <div className="mt-6 p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/20">
                        <p className="text-sm font-semibold text-indigo-400 mb-3">Potential Breakdown</p>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span>Training Completion (40%)</span>
                              <span>{formatPercentage(potential.breakdown.trainingCompletion)}</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div
                                className="bg-indigo-500 h-2 rounded-full"
                                style={{ width: `${potential.breakdown.trainingCompletion}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span>Competency Growth (30%)</span>
                              <span>{formatPercentage(potential.breakdown.competencyGrowth)}</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div
                                className="bg-indigo-500 h-2 rounded-full"
                                style={{ width: `${potential.breakdown.competencyGrowth}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span>Tenure (30%)</span>
                              <span>{formatPercentage(potential.breakdown.tenure)}</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div
                                className="bg-indigo-500 h-2 rounded-full"
                                style={{ width: `${potential.breakdown.tenure}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Growth Paths */}
                  {selectedEmployee.trainingTracks.length > 0 ? (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-indigo-400" />
                        Personalized Training Tracks
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {selectedEmployee.trainingTracks.map((track) => (
                          <GrowthPathCard
                            key={track.id}
                            employee={selectedEmployee}
                            track={track}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="glassmorphism rounded-xl p-12 border border-slate-800/50 text-center">
                      <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400 mb-2">No training tracks assigned</p>
                      <p className="text-sm text-slate-500">Training recommendations will appear here based on competency gaps</p>
                    </div>
                  )}

                  {/* Gap Analysis Summary */}
                  {selectedEmployee.gapAnalysis && (
                    <div className="glassmorphism rounded-xl p-6 border border-slate-800/50">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-indigo-400" />
                        Gap Analysis Summary
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                          <p className="text-xs text-slate-400 mb-1">Competency Gaps</p>
                          <p className="text-2xl font-bold text-white">
                            {selectedEmployee.gapAnalysis.competencyGaps.length}
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                          <p className="text-xs text-slate-400 mb-1">Estimated Impact</p>
                          <p className="text-2xl font-bold text-indigo-400">
                            {selectedEmployee.gapAnalysis.estimatedImpact}%
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-4 h-4 rounded bg-indigo-500/20 flex items-center justify-center">
                            <Sparkles className="w-2.5 h-2.5 text-indigo-400" />
                          </div>
                          <p className="text-sm font-semibold text-indigo-400">AI Rationale</p>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {selectedEmployee.gapAnalysis.rationale}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="glassmorphism rounded-xl p-12 border border-slate-800/50 text-center">
                  <User className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Select an employee to view their personalized growth paths</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
