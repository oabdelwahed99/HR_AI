"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntelligenceCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "stable";
  icon: LucideIcon;
  description?: string;
  rationale?: string;
  className?: string;
  delay?: number;
}

export function IntelligenceCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description,
  rationale,
  className,
  delay = 0,
}: IntelligenceCardProps) {
  const trendColors = {
    up: "text-green-400",
    down: "text-red-400",
    stable: "text-slate-400",
  };

  const trendIcons = {
    up: "↑",
    down: "↓",
    stable: "→",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "glassmorphism rounded-xl p-6 border border-slate-800/50 hover:border-indigo-500/30 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
          <Icon className="w-6 h-6 text-indigo-400" />
        </div>
        {change !== undefined && trend && (
          <div className={cn("text-sm font-medium", trendColors[trend])}>
            {trendIcons[trend]} {Math.abs(change)}%
          </div>
        )}
      </div>

      <h3 className="text-sm font-medium text-slate-400 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white mb-2">{value}</p>

      {description && (
        <p className="text-xs text-slate-500 mb-3">{description}</p>
      )}

      {rationale && (
        <div className="mt-4 pt-4 border-t border-slate-800/50">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 rounded bg-indigo-500/20 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-xs font-medium text-slate-400">AI Rationale</p>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{rationale}</p>
        </div>
      )}
    </motion.div>
  );
}
