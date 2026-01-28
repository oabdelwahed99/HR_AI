"use client";

import { useState, useMemo } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/navbar";
import { EmployeeCard } from "@/components/talent/employee-card";
import { AuditRationaleSidebar } from "@/components/succession/audit-rationale-sidebar";
import { seedEmployees } from "@/data/seed-data";
import { Employee } from "@/types/hr";
import { motion } from "framer-motion";
import { Search, Filter, Users, Building2, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TalentMatrixPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [potentialFilter, setPotentialFilter] = useState<string>("all");

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedEmployee(null);
  };

  // Get unique departments
  const departments = useMemo(() => {
    const depts = new Set(seedEmployees.map(emp => emp.department));
    return Array.from(depts);
  }, []);

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return seedEmployees.filter(emp => {
      const matchesSearch = 
        emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDepartment = departmentFilter === "all" || emp.department === departmentFilter;
      const matchesRisk = riskFilter === "all" || emp.riskLevel === riskFilter;
      
      // Potential filter
      let matchesPotential = true;
      if (potentialFilter !== "all") {
        const { calculatePotential } = require("@/lib/business-rules");
        const potential = calculatePotential(emp);
        matchesPotential = potential.level === potentialFilter;
      }

      return matchesSearch && matchesDepartment && matchesRisk && matchesPotential;
    });
  }, [searchQuery, departmentFilter, riskFilter, potentialFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const highPotential = filteredEmployees.filter(emp => emp.isHighPotential).length;
    const atRisk = filteredEmployees.filter(emp => 
      emp.riskLevel === "High" || emp.riskLevel === "Critical"
    ).length;
    const avgPerformance = filteredEmployees.reduce((sum, emp) => {
      const latestAppraisal = emp.appraisals[emp.appraisals.length - 1];
      return sum + (latestAppraisal?.overallScore || 0);
    }, 0) / filteredEmployees.length || 0;

    return { highPotential, atRisk, avgPerformance, total: filteredEmployees.length };
  }, [filteredEmployees]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <Navbar />

      <main className="ml-64 mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Talent Matrix
            </h1>
            <p className="text-slate-400">
              Comprehensive view of organizational talent distribution
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glassmorphism rounded-xl p-4 border border-slate-800/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Total Employees</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-indigo-400 opacity-50" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glassmorphism rounded-xl p-4 border border-slate-800/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 mb-1">High Potential</p>
                  <p className="text-2xl font-bold text-green-400">{stats.highPotential}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400 opacity-50" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glassmorphism rounded-xl p-4 border border-slate-800/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 mb-1">At Risk</p>
                  <p className="text-2xl font-bold text-red-400">{stats.atRisk}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400 opacity-50" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glassmorphism rounded-xl p-4 border border-slate-800/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Avg Performance</p>
                  <p className="text-2xl font-bold text-indigo-400">{stats.avgPerformance.toFixed(1)}</p>
                </div>
                <Building2 className="w-8 h-8 text-indigo-400 opacity-50" />
              </div>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="glassmorphism rounded-xl p-6 border border-slate-800/50 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Search */}
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                  />
                </div>
              </div>

              {/* Department Filter */}
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-400" />
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Risk Filter */}
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-slate-400" />
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              {/* Potential Filter */}
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-slate-400" />
                <select
                  value={potentialFilter}
                  onChange={(e) => setPotentialFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="all">All Potential</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Employee Grid */}
          {filteredEmployees.length === 0 ? (
            <div className="glassmorphism rounded-xl p-12 border border-slate-800/50 text-center">
              <p className="text-slate-400">No employees found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEmployees.map((employee, index) => (
                <motion.div
                  key={employee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <EmployeeCard
                    employee={employee}
                    onClick={() => handleEmployeeClick(employee)}
                  />
                </motion.div>
              ))}
            </div>
          )}
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
