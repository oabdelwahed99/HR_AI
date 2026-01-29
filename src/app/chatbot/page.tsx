"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/navbar";
import { HRChatbot } from "@/components/chatbot/hr-chatbot";

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <Navbar />
      
      <main className="ml-64 mt-16 h-[calc(100vh-4rem)]">
        <div className="h-full max-w-5xl mx-auto p-8">
          <div className="h-full glassmorphism rounded-2xl border border-slate-800/50 overflow-hidden">
            <HRChatbot />
          </div>
        </div>
      </main>
    </div>
  );
}
