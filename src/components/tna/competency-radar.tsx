"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
import { Competency } from "@/types/hr";

interface CompetencyRadarProps {
  competencies: Competency[];
  employeeName: string;
}

export function CompetencyRadar({ competencies, employeeName }: CompetencyRadarProps) {
  // Prepare data for radar chart
  const chartData = competencies.map(comp => ({
    competency: comp.name.split(" ")[0], // Shortened name
    current: comp.currentLevel,
    required: comp.requiredLevel,
    gap: Math.max(0, comp.gap),
  }));

  return (
    <div className="glassmorphism rounded-xl p-6 border border-slate-800/50">
      <h3 className="text-lg font-semibold text-white mb-4">
        Competency Profile: {employeeName}
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis
            dataKey="competency"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tick={{ fill: "#64748b", fontSize: 10 }}
          />
          <Radar
            name="Current Level"
            dataKey="current"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Radar
            name="Required Level"
            dataKey="required"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.2}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Legend
            wrapperStyle={{ color: "#94a3b8", fontSize: "12px" }}
            iconType="line"
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
        <div className="text-center">
          <p className="text-slate-400 mb-1">Avg Current</p>
          <p className="text-indigo-400 font-semibold">
            {(competencies.reduce((sum, c) => sum + c.currentLevel, 0) / competencies.length).toFixed(1)}/5
          </p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 mb-1">Avg Required</p>
          <p className="text-green-400 font-semibold">
            {(competencies.reduce((sum, c) => sum + c.requiredLevel, 0) / competencies.length).toFixed(1)}/5
          </p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 mb-1">Total Gaps</p>
          <p className="text-red-400 font-semibold">
            {competencies.filter(c => c.gap > 0).length}
          </p>
        </div>
      </div>
    </div>
  );
}
