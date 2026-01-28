"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, XCircle, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIStatus {
  isConfigured: boolean;
  isWorking: boolean | null; // null = not tested yet
  lastTested: Date | null;
  error?: string;
}

export function AIStatusIndicator() {
  const [status, setStatus] = useState<AIStatus>({
    isConfigured: false,
    isWorking: null,
    lastTested: null,
  });
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    // Check if API key is configured
    checkConfiguration();
  }, []);

  const checkConfiguration = async () => {
    try {
      const response = await fetch("/api/ai/status");
      const data = await response.json();
      setStatus({
        isConfigured: data.configured,
        isWorking: data.working,
        lastTested: data.lastTested ? new Date(data.lastTested) : null,
        error: data.error,
      });
    } catch (error) {
      setStatus({
        isConfigured: false,
        isWorking: false,
        lastTested: null,
        error: "Failed to check status",
      });
    }
  };

  const testAI = async () => {
    setIsTesting(true);
    try {
      const response = await fetch("/api/ai/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testPrompt: "Say 'AI is working' if you can read this.",
        }),
      });

      const data = await response.json();
      
      setStatus({
        isConfigured: data.configured !== false, // Will be false if not configured
        isWorking: data.success || false,
        lastTested: new Date(),
        error: data.error || data.message,
      });
    } catch (error: any) {
      setStatus({
        isConfigured: false,
        isWorking: false,
        lastTested: new Date(),
        error: error.message || "Test failed - check network connection",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const getStatusColor = () => {
    if (!status.isConfigured) return "text-slate-400";
    if (status.isWorking === null) return "text-yellow-400";
    if (status.isWorking) return "text-green-400";
    return "text-red-400";
  };

  const getStatusIcon = () => {
    if (!status.isConfigured) return <AlertCircle className="w-4 h-4" />;
    if (isTesting) return <Loader2 className="w-4 h-4 animate-spin" />;
    if (status.isWorking === null) return <AlertCircle className="w-4 h-4" />;
    if (status.isWorking) return <CheckCircle2 className="w-4 h-4" />;
    return <XCircle className="w-4 h-4" />;
  };

  const getStatusText = () => {
    if (!status.isConfigured) return "Not Configured";
    if (isTesting) return "Testing...";
    if (status.isWorking === null) return "Not Tested";
    if (status.isWorking) return "AI Active";
    return "AI Error";
  };

  return (
    <div className="glassmorphism rounded-lg px-3 py-1.5 border border-slate-800/50">
      <div className="flex items-center gap-2">
        <div className={cn("flex items-center gap-1.5", getStatusColor())}>
          {getStatusIcon()}
          <span className="text-xs font-medium">{getStatusText()}</span>
        </div>
        {status.isWorking && (
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" />
          </div>
        )}
        <button
          onClick={testAI}
          disabled={isTesting || !status.isConfigured}
          className="text-xs px-2 py-0.5 rounded bg-slate-800/50 hover:bg-slate-800 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Test AI connection"
        >
          {isTesting ? "..." : "Test"}
        </button>
      </div>
      {status.error && (
        <p className="text-xs text-red-400 mt-1 truncate max-w-[200px]" title={status.error}>
          {status.error}
        </p>
      )}
    </div>
  );
}
