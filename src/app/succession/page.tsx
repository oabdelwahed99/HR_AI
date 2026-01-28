"use client";

import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/navbar";
import { NineBoxGrid } from "@/components/succession/nine-box-grid";
import { AuditRationaleSidebar } from "@/components/succession/audit-rationale-sidebar";
import { seedEmployees } from "@/data/seed-data";
import { Employee } from "@/types/hr";
import { motion } from "framer-motion";
import { TrendingUp, Users, Target } from "lucide-react";

export default function SuccessionMatrixPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedEmployee(null);
  };

  // Calculate summary statistics
  const highPotentialCount = seedEmployees.filter((emp) => emp.isHighPotential).length;
  const atRiskCount = seedEmployees.filter(
    (emp) => emp.riskLevel === "High" || emp.riskLevel === "Critical"
  ).length;
  const totalEmployees = seedEmployees.length;

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <Navbar />

      <main className="ml-64 mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Succession & Promotion Matrix
            </h1>
            <p className="text-slate-400">
              9-box grid visualization for high-potential employees and succession planning
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glassmorphism rounded-xl p-6 border border-slate-800/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Total Employees</p>
                  <p className="text-3xl font-bold text-white">{totalEmployees}</p>
                </div>
                <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <Users className="w-6 h-6 text-indigo-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="glassmorphism rounded-xl p-6 border border-slate-800/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">High Potential</p>
                  <p className="text-3xl font-bold text-green-400">{highPotentialCount}</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="glassmorphism rounded-xl p-6 border border-slate-800/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">At Risk</p>
                  <p className="text-3xl font-bold text-red-400">{atRiskCount}</p>
                </div>
                <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <Target className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="glassmorphism rounded-xl p-6 border border-slate-800/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Avg Performance</p>
                  <p className="text-3xl font-bold text-indigo-400">
                    {(
                      seedEmployees.reduce((sum, emp) => {
                        const latestAppraisal = emp.appraisals[emp.appraisals.length - 1];
                        return sum + (latestAppraisal?.overallScore || 0);
                      }, 0) / seedEmployees.length
                    ).toFixed(1)}
                  </p>
                </div>
                <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <TrendingUp className="w-6 h-6 text-indigo-400" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* 9-Box Grid with Proper Labels */}
          <div className="mb-6">
            {/* Top Labels - Potential */}
            <div className="mb-2">
              <div className="grid grid-cols-3 gap-4 ml-32">
                <div className="text-center">
                  <p className="text-sm font-semibold text-indigo-400">High Potential</p>
                  <p className="text-xs text-slate-500 mt-1">70%+ Score</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-400">Medium Potential</p>
                  <p className="text-xs text-slate-500 mt-1">40-69% Score</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-400">Low Potential</p>
                  <p className="text-xs text-slate-500 mt-1">&lt;40% Score</p>
                </div>
              </div>
            </div>

            {/* Grid with Side Labels - Performance */}
            <div className="relative">
              <div className="flex items-start gap-4">
                {/* Side Labels - Positioned absolutely to align with grid rows */}
                <div className="w-32 flex-shrink-0">
                  <div className="sticky top-0">
                    {/* Spacer matching grid header height */}
                    <div className="h-20"></div>
                    {/* Performance labels aligned with each grid row */}
                    <div className="space-y-4">
                      <div className="h-[320px] flex items-center justify-end">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-400">Exceeds</p>
                          <p className="text-xs text-slate-500 mt-1">4.5+ Score</p>
                        </div>
                      </div>
                      <div className="h-[320px] flex items-center justify-end">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-400">Meets</p>
                          <p className="text-xs text-slate-500 mt-1">3.0-4.4 Score</p>
                        </div>
                      </div>
                      <div className="h-[320px] flex items-center justify-end">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-red-400">Below</p>
                          <p className="text-xs text-slate-500 mt-1">&lt;3.0 Score</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid */}
                <div className="flex-1">
                  <NineBoxGrid
                    employees={seedEmployees}
                    onEmployeeClick={handleEmployeeClick}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Grid Explanation */}
          <div className="mt-6 mb-4 p-6 rounded-lg glassmorphism border border-indigo-500/30 bg-indigo-500/5">
            <h3 className="text-base font-semibold text-indigo-300 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Understanding the 9-Box Grid
            </h3>
            <div className="grid grid-cols-2 gap-6 text-sm">
              {/* Vertical Axis Explanation */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-16 bg-gradient-to-b from-green-500 via-slate-400 to-red-500 rounded-full mt-1"></div>
                  <div>
                    <p className="font-semibold text-white mb-2">Vertical Axis (Rows) = <span className="text-indigo-400">Performance</span></p>
                    <p className="text-slate-400 mb-3">Measures current job performance based on appraisal scores:</p>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        <span><strong className="text-green-400">Exceeds</strong> (Top Row): 4.5+ appraisal score</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                        <span><strong className="text-slate-400">Meets</strong> (Middle Row): 3.0-4.4 appraisal score</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-400"></span>
                        <span><strong className="text-red-400">Below</strong> (Bottom Row): &lt;3.0 appraisal score</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Horizontal Axis Explanation */}
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-white mb-2">Horizontal Axis (Columns) = <span className="text-indigo-400">Potential</span></p>
                  <p className="text-slate-400 mb-3">Measures future growth potential based on weighted formula:</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 h-1 bg-gradient-to-r from-indigo-500 via-slate-400 to-slate-600 rounded-full"></div>
                  </div>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                      <span><strong className="text-indigo-400">High Potential</strong> (Left): 70%+ score</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                      <span><strong className="text-slate-400">Medium Potential</strong> (Middle): 40-69% score</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                      <span><strong className="text-slate-500">Low Potential</strong> (Right): &lt;40% score</span>
                    </li>
                  </ul>
                  <div className="mt-3 p-3 rounded bg-slate-800/50 border border-slate-700/50">
                    <p className="text-xs text-slate-400 mb-1">Potential Formula:</p>
                    <p className="text-xs text-slate-300">40% Training Completion + 30% Competency Growth + 30% Tenure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Employee Distribution Summary */}
          <div className="mt-4 mb-4 p-4 rounded-lg glassmorphism border border-slate-800/50">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Employee Distribution</h3>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-slate-400 mb-2">Performance Categories:</p>
                <ul className="space-y-1 text-slate-300">
                  <li>• Elite Performer (4.5+): {seedEmployees.filter(e => {
                    const appr = e.appraisals[e.appraisals.length - 1];
                    return appr && appr.overallScore >= 4.5;
                  }).length} employees</li>
                  <li>• High Achiever (3.5-4.4): {seedEmployees.filter(e => {
                    const appr = e.appraisals[e.appraisals.length - 1];
                    return appr && appr.overallScore >= 3.5 && appr.overallScore < 4.5;
                  }).length} employees</li>
                  <li>• Solid Contributor (2.5-3.4): {seedEmployees.filter(e => {
                    const appr = e.appraisals[e.appraisals.length - 1];
                    return appr && appr.overallScore >= 2.5 && appr.overallScore < 3.5;
                  }).length} employees</li>
                  <li>• Needs Intervention (&lt;2.5): {seedEmployees.filter(e => {
                    const appr = e.appraisals[e.appraisals.length - 1];
                    return appr && appr.overallScore < 2.5;
                  }).length} employees</li>
                </ul>
              </div>
              <div>
                <p className="text-slate-400 mb-2">Potential Calculation:</p>
                <ul className="space-y-1 text-slate-300">
                  <li>• 40% Training Completion</li>
                  <li>• 30% Competency Growth</li>
                  <li>• 30% Tenure (years)</li>
                  <li className="mt-2 text-slate-400">High: 70%+ | Medium: 40-69% | Low: &lt;40%</li>
                </ul>
              </div>
              <div>
                <p className="text-slate-400 mb-2">Interactive Features:</p>
                <ul className="space-y-1 text-slate-300">
                  <li>• Click employee cards for details</li>
                  <li>• View AI rationale & breakdown</li>
                  <li>• See gap analysis & recommendations</li>
                  <li>• Check performance trends</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Audit & Rationale Sidebar */}
      <AuditRationaleSidebar
        employee={selectedEmployee}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
    </div>
  );
}
