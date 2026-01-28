"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/navbar";
import { BentoGrid } from "@/components/dashboard/bento-grid";
import { seedEmployees } from "@/data/seed-data";
import { 
  calculateWorkforceReadiness, 
  calculateAverageSkillGap, 
  getAtRiskCount 
} from "@/lib/utils";
import { WorkforceMetrics } from "@/types/hr";

export default function DashboardHome() {
  // Calculate metrics from seed data
  const metrics: WorkforceMetrics = {
    totalEmployees: seedEmployees.length,
    workforceReadiness: calculateWorkforceReadiness(seedEmployees),
    averageSkillGap: calculateAverageSkillGap(seedEmployees),
    atRiskTalent: getAtRiskCount(seedEmployees),
    highPotentialCount: seedEmployees.filter((emp) => emp.isHighPotential).length,
    averagePerformanceScore: seedEmployees.reduce((sum, emp) => {
      const latestAppraisal = emp.appraisals[emp.appraisals.length - 1];
      return sum + (latestAppraisal?.overallScore || 0);
    }, 0) / seedEmployees.length,
    trainingCompletionRate: seedEmployees.reduce((sum, emp) => {
      const totalProgress = emp.trainingTracks.reduce((trackSum, track) => trackSum + track.progress, 0);
      const avgProgress = emp.trainingTracks.length > 0 ? totalProgress / emp.trainingTracks.length : 0;
      return sum + avgProgress;
    }, 0) / seedEmployees.length,
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <Navbar />
      
      <main className="ml-64 mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Intelligence Hub
            </h1>
            <p className="text-slate-400">
              AI-powered insights for strategic talent decisions
            </p>
          </div>

          {/* Bento Grid */}
          <BentoGrid metrics={metrics} />
        </div>
      </main>
    </div>
  );
}
