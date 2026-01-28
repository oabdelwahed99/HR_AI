"use client";

import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/navbar";
import { AIStatusIndicator } from "@/components/ai/ai-status-indicator";
import { motion } from "framer-motion";
import { Settings, Sparkles, Key, TestTube, Info } from "lucide-react";

export default function SettingsPage() {
  const [testResult, setTestResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);

  const runAITest = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    try {
      const response = await fetch("/api/ai/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testPrompt: "Say 'AI is working' if you can read this.",
        }),
      });

      const data = await response.json();
      setTestResult(data);
      
      // If not configured, show helpful message
      if (!data.success && !data.configured) {
        setTestResult({
          ...data,
          message: data.message || "Please configure OPENAI_API_KEY in .env.local and restart the server",
        });
      }
    } catch (error: any) {
      setTestResult({
        success: false,
        configured: false,
        error: error.message || "Failed to test AI - check network connection",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <Navbar />

      <main className="ml-64 mt-16 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <Settings className="w-8 h-8 text-indigo-400" />
              Settings
            </h1>
            <p className="text-slate-400">
              Configure system preferences and AI parameters
            </p>
          </div>

          {/* AI Configuration Section */}
          <div className="space-y-6">
            {/* AI Status */}
            <div className="glassmorphism rounded-xl p-6 border border-slate-800/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  AI Configuration Status
                </h2>
              </div>
              <AIStatusIndicator />
            </div>

            {/* Setup Instructions */}
            <div className="glassmorphism rounded-xl p-6 border border-slate-800/50">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Key className="w-5 h-5 text-indigo-400" />
                Setup Instructions
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">1. Get OpenAI API Key</h3>
                  <p className="text-sm text-slate-400 mb-2">
                    Visit{" "}
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 underline"
                    >
                      https://platform.openai.com/api-keys
                    </a>{" "}
                    and create a new API key
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">2. Create .env.local File</h3>
                  <p className="text-sm text-slate-400 mb-2">
                    Create a <code className="px-1.5 py-0.5 bg-slate-900 rounded text-xs">.env.local</code> file in the root directory:
                  </p>
                  <div className="p-3 rounded bg-slate-900/50 border border-slate-800 font-mono text-xs text-slate-300">
                    <div>OPENAI_API_KEY=sk-your-api-key-here</div>
                    <div>OPENAI_MODEL=gpt-4o-mini</div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">3. Restart Dev Server</h3>
                  <p className="text-sm text-slate-400">
                    After adding the API key, restart your development server:
                  </p>
                  <div className="p-3 rounded bg-slate-900/50 border border-slate-800 font-mono text-xs text-slate-300 mt-2">
                    npm run dev
                  </div>
                </div>
              </div>
            </div>

            {/* AI Test Section */}
            <div className="glassmorphism rounded-xl p-6 border border-slate-800/50">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <TestTube className="w-5 h-5 text-indigo-400" />
                Test AI Connection
              </h2>
              <p className="text-sm text-slate-400 mb-4">
                Click the button below to test if OpenAI API is working correctly.
              </p>
              <button
                onClick={runAITest}
                disabled={isTesting}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTesting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <TestTube className="w-5 h-5" />
                    Run AI Test
                  </>
                )}
              </button>

              {testResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-lg border ${
                    testResult.success
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-red-500/10 border-red-500/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {testResult.success ? (
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className={`text-sm font-semibold mb-1 ${
                        testResult.success ? "text-green-400" : "text-red-400"
                      }`}>
                        {testResult.success ? "AI Test Successful!" : "AI Test Failed"}
                      </p>
                      {testResult.response && (
                        <p className="text-sm text-slate-300 mb-2">
                          Response: {testResult.response}
                        </p>
                      )}
                      {testResult.model && (
                        <p className="text-xs text-slate-400 mb-2">
                          Model: {testResult.model}
                        </p>
                      )}
                      {testResult.error && (
                        <p className="text-sm text-red-400">
                          Error: {testResult.error}
                        </p>
                      )}
                      {testResult.details && (
                        <p className="text-xs text-red-300 mt-1">
                          Details: {testResult.details}
                        </p>
                      )}
                      {testResult.message && (
                        <p className="text-sm text-slate-300 mt-2">
                          {testResult.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Info Section */}
            <div className="glassmorphism rounded-xl p-6 border border-slate-800/50">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-400" />
                How to Verify AI is Working
              </h2>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="text-indigo-400">1.</span>
                  <span>
                    <strong>Check Status Indicator:</strong> Look for the AI status indicator at the top of this page. 
                    Green means AI is active, red means there&apos;s an issue.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-400">2.</span>
                  <span>
                    <strong>Run Test:</strong> Click &quot;Run AI Test&quot; button above. If successful, you&apos;ll see a response from OpenAI.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-400">3.</span>
                  <span>
                    <strong>Check AI Rationale:</strong> In any module (TNA, Growth Paths, etc.), look for sections labeled 
                    &quot;AI Rationale&quot; with a sparkle icon. If AI is working, these will be dynamically generated.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-400">4.</span>
                  <span>
                    <strong>Fallback Mode:</strong> If AI is not configured, the system uses fallback responses. 
                    You&apos;ll see the same content, but it won&apos;t be AI-generated.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
