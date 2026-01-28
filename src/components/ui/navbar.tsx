"use client";

import { motion } from "framer-motion";
import { Bell, Search, User } from "lucide-react";
import { AIStatusIndicator } from "@/components/ai/ai-status-indicator";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-64 right-0 h-16 glassmorphism border-b border-slate-800/50 z-30"
    >
      <div className="flex items-center justify-between h-full px-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Global Org Health</h2>
          <p className="text-xs text-slate-400">Real-time workforce intelligence</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search employees, insights..."
              className="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 w-64"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-slate-200 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
          </button>

          {/* AI Status Indicator */}
          <div className="hidden lg:block">
            <AIStatusIndicator />
          </div>

          {/* User */}
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-slate-200">HR Director</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
