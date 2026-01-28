"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/navbar";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <Navbar />
      
      <main className="ml-64 mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Settings
            </h1>
            <p className="text-slate-400">
              Configure system preferences and AI parameters
            </p>
          </div>

          <div className="glassmorphism rounded-xl p-12 border border-slate-800/50 text-center">
            <p className="text-slate-400">Settings module coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
