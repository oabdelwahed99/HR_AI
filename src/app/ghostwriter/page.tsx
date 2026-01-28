"use client";

import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/navbar";
import { MessageGenerator } from "@/components/ghostwriter/message-generator";
import { seedEmployees } from "@/data/seed-data";
import { Employee } from "@/types/hr";
import { motion } from "framer-motion";
import { Search, User, Mail, Sparkles, MessageSquare } from "lucide-react";

export default function GhostwriterPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(seedEmployees[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = seedEmployees.filter(emp =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              Ghostwriter Suite
            </h1>
            <p className="text-slate-400">
              AI-powered message generation for celebrations, motivation, and notifications
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
                          {emp.gapAnalysis && emp.gapAnalysis.priority === "Critical" && (
                            <Mail className="w-4 h-4 text-orange-400" />
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

              {/* Quick Stats */}
              {selectedEmployee && (
                <div className="glassmorphism rounded-xl p-4 border border-slate-800/50">
                  <h3 className="text-sm font-semibold text-slate-300 mb-3">Message Context</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Training Progress</span>
                      <span className="text-white">
                        {selectedEmployee.trainingTracks.length > 0
                          ? Math.round(
                              selectedEmployee.trainingTracks.reduce((sum, t) => sum + t.progress, 0) /
                                selectedEmployee.trainingTracks.length
                            )
                          : 0}%
                      </span>
                    </div>
                    {selectedEmployee.gapAnalysis && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Gap Priority</span>
                        <span className="text-white">{selectedEmployee.gapAnalysis.priority}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Tracks</span>
                      <span className="text-white">{selectedEmployee.trainingTracks.length}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Main Content - Message Generator */}
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
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
                        <MessageSquare className="w-5 h-5 text-indigo-400" />
                        <span className="text-sm text-indigo-400 font-medium">Message Generator</span>
                      </div>
                    </div>
                  </div>

                  {/* Message Generator */}
                  <MessageGenerator employee={selectedEmployee} />

                  {/* Message Templates Info */}
                  <div className="glassmorphism rounded-xl p-6 border border-slate-800/50">
                    <h3 className="text-sm font-semibold text-slate-300 mb-3">Message Types</h3>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="text-slate-400 mb-2 font-medium">Celebration</p>
                        <p className="text-slate-500">
                          Recognize achievements, milestone completions, and gap closures. Perfect for positive reinforcement.
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-2 font-medium">Motivation</p>
                        <p className="text-slate-500">
                          Encourage employees to complete training tracks. Use when progress is good but completion is needed.
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-2 font-medium">Notification</p>
                        <p className="text-slate-500">
                          Remind about upcoming reviews, deadlines, or important milestones. Professional and timely.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glassmorphism rounded-xl p-12 border border-slate-800/50 text-center">
                  <User className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Select an employee to generate personalized messages</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
