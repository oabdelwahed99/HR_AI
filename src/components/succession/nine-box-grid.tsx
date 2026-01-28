"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Employee, PerformanceLevel, PotentialLevel } from "@/types/hr";
import { getNineBoxPosition } from "@/lib/business-rules";
import { cn } from "@/lib/utils";
import { User, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface NineBoxGridProps {
  employees: Employee[];
  onEmployeeClick: (employee: Employee) => void;
}

interface GridCell {
  performance: PerformanceLevel;
  potential: PotentialLevel;
  employees: Employee[];
  label: string;
  description: string;
  color: string;
  bgColor: string;
}

export function NineBoxGrid({ employees, onEmployeeClick }: NineBoxGridProps) {
  // Categorize employees into 9 boxes
  const categorizeEmployees = (): GridCell[] => {
    const boxes: Record<string, Employee[]> = {
      "high-high": [],
      "high-medium": [],
      "high-low": [],
      "medium-high": [],
      "medium-medium": [],
      "medium-low": [],
      "low-high": [],
      "low-medium": [],
      "low-low": [],
    };

    employees.forEach((emp) => {
      const position = getNineBoxPosition(emp);
      // Map performance levels to keys
      const perfKey = position.performance === "Exceeds" ? "high" : 
                      position.performance === "Meets" ? "medium" : "low";
      // Map potential levels to keys
      const potKey = position.potential === "High" ? "high" :
                     position.potential === "Medium" ? "medium" : "low";
      const key = `${perfKey}-${potKey}`;
      if (key in boxes) {
        boxes[key].push(emp);
      }
    });

    return [
      {
        performance: "Exceeds",
        potential: "High",
        employees: boxes["high-high"],
        label: "Future Leaders",
        description: "Elite performers with high potential",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/30",
      },
      {
        performance: "Exceeds",
        potential: "Medium",
        employees: boxes["high-medium"],
        label: "Key Players",
        description: "High performers, moderate potential",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/30",
      },
      {
        performance: "Exceeds",
        potential: "Low",
        employees: boxes["high-low"],
        label: "Specialists",
        description: "High performers, limited growth",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/30",
      },
      {
        performance: "Meets",
        potential: "High",
        employees: boxes["medium-high"],
        label: "Rising Stars",
        description: "Solid performers, high potential",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10 border-yellow-500/30",
      },
      {
        performance: "Meets",
        potential: "Medium",
        employees: boxes["medium-medium"],
        label: "Core Talent",
        description: "Solid contributors, steady growth",
        color: "text-slate-400",
        bgColor: "bg-slate-500/10 border-slate-500/30",
      },
      {
        performance: "Meets",
        potential: "Low",
        employees: boxes["medium-low"],
        label: "Reliable",
        description: "Meets expectations, limited growth",
        color: "text-slate-500",
        bgColor: "bg-slate-600/10 border-slate-600/30",
      },
      {
        performance: "Below",
        potential: "High",
        employees: boxes["low-high"],
        label: "High Potential",
        description: "Underperforming, but high potential",
        color: "text-orange-400",
        bgColor: "bg-orange-500/10 border-orange-500/30",
      },
      {
        performance: "Below",
        potential: "Medium",
        employees: boxes["low-medium"],
        label: "Development",
        description: "Needs support, some potential",
        color: "text-red-400",
        bgColor: "bg-red-500/10 border-red-500/30",
      },
      {
        performance: "Below",
        potential: "Low",
        employees: boxes["low-low"],
        label: "At Risk",
        description: "Performance concerns, low potential",
        color: "text-red-500",
        bgColor: "bg-red-600/10 border-red-600/30",
      },
    ];
  };

  const gridCells = categorizeEmployees();

  return (
    <div className="grid grid-cols-3 gap-4 auto-rows-fr">
      {gridCells.map((cell, index) => (
        <motion.div
          key={`${cell.performance}-${cell.potential}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={cn(
            "glassmorphism rounded-xl p-6 border-2 h-[320px] flex flex-col hover:shadow-lg hover:shadow-indigo-500/10 transition-all",
            cell.bgColor
          )}
        >
          {/* Header */}
          <div className="mb-4 pb-4 border-b border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <h3 className={cn("text-lg font-bold", cell.color)}>
                {cell.label}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">
                  {cell.employees.length}
                </span>
                {cell.employees.length > 0 && (
                  <span className="text-xs text-slate-500">
                    {cell.employees.length === 1 ? "employee" : "employees"}
                  </span>
                )}
              </div>
            </div>
            <p className="text-xs text-slate-400">{cell.description}</p>
          </div>

          {/* Employee List */}
          <div className="flex-1 space-y-2 overflow-y-auto max-h-[220px] pr-1">
            {cell.employees.length === 0 ? (
              <div className="text-center text-slate-500 text-sm py-8">
                <p className="text-slate-400">No employees</p>
                <p className="text-xs text-slate-600 mt-1">in this category</p>
              </div>
            ) : (
              cell.employees.map((emp) => {
                const position = getNineBoxPosition(emp);
                const latestAppraisal = emp.appraisals[emp.appraisals.length - 1];
                const appraisalScore = latestAppraisal?.overallScore || 0;
                const riskBadge = emp.riskLevel !== "Low" ? (
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-xs font-medium",
                    emp.riskLevel === "High" && "bg-red-500/20 text-red-400",
                    emp.riskLevel === "Medium" && "bg-orange-500/20 text-orange-400"
                  )}>
                    {emp.riskLevel}
                  </span>
                ) : null;
                
                return (
                  <motion.button
                    key={emp.id}
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onEmployeeClick(emp)}
                    className="w-full text-left p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-all border border-slate-700/50 hover:border-indigo-500/50 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-white truncate group-hover:text-indigo-300 transition-colors">
                            {emp.firstName} {emp.lastName}
                          </p>
                          {emp.isHighPotential && (
                            <span className="px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 text-xs font-medium">
                              ⭐
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 truncate mb-1">
                          {emp.role} • {emp.department}
                        </p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-slate-500">
                            Appraisal: <span className="text-white font-medium">{appraisalScore}/5</span>
                          </span>
                          <span className="text-slate-500">
                            Potential: <span className="text-indigo-400 font-medium">{position.potentialScore.toFixed(0)}%</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {position.performance === "Exceeds" && (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        )}
                        {position.performance === "Below" && (
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        )}
                        {position.performance === "Meets" && (
                          <Minus className="w-4 h-4 text-slate-400" />
                        )}
                        {riskBadge}
                      </div>
                    </div>
                  </motion.button>
                );
              })
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
