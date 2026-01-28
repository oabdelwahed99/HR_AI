"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Employee, MessageTemplate, MessageTone } from "@/types/hr";
import { 
  generateCelebrationMessage, 
  generateMotivationMessage, 
  generateNudgeMessage 
} from "@/lib/message-templates";
import { 
  Sparkles, 
  Mail, 
  Copy, 
  CheckCircle2, 
  Loader2,
  Send,
  Edit3
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageGeneratorProps {
  employee: Employee;
}

export function MessageGenerator({ employee }: MessageGeneratorProps) {
  const [messageType, setMessageType] = useState<"Celebration" | "Motivation" | "Notification">("Celebration");
  const [tone, setTone] = useState<MessageTone>("Professional");
  const [generatedMessage, setGeneratedMessage] = useState<MessageTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customContext, setCustomContext] = useState({
    gapName: "",
    courseName: "",
    progress: 0,
    reviewDate: "",
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    setCopied(false);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let message: MessageTemplate;

    switch (messageType) {
      case "Celebration":
        message = generateCelebrationMessage(
          employee,
          customContext.gapName || undefined,
          tone
        );
        break;
      case "Motivation":
        message = generateMotivationMessage(
          employee,
          employee.trainingTracks[0]?.courses[0],
          tone
        );
        break;
      case "Notification":
        message = generateNudgeMessage(
          employee,
          customContext.reviewDate || undefined,
          tone
        );
        break;
    }

    setGeneratedMessage(message);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (generatedMessage) {
      const text = `${generatedMessage.subject}\n\n${generatedMessage.body}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tones: MessageTone[] = ["Professional", "Friendly", "Motivational", "Celebratory", "Supportive"];

  return (
    <div className="space-y-6">
      {/* Message Type Selection */}
      <div className="glassmorphism rounded-xl p-6 border border-slate-800/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-indigo-400" />
          Message Type
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {(["Celebration", "Motivation", "Notification"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setMessageType(type)}
              className={cn(
                "p-4 rounded-lg border transition-all text-left",
                messageType === type
                  ? "bg-indigo-500/20 border-indigo-500/50 text-white"
                  : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:border-slate-600/50"
              )}
            >
              <p className="font-medium mb-1">{type}</p>
              <p className="text-xs text-slate-400">
                {type === "Celebration" && "Celebrate achievements & milestones"}
                {type === "Motivation" && "Encourage training completion"}
                {type === "Notification" && "Remind about reviews & deadlines"}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Tone Selection */}
      <div className="glassmorphism rounded-xl p-6 border border-slate-800/50">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Message Tone</h3>
        <div className="flex flex-wrap gap-2">
          {tones.map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                tone === t
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Context (if needed) */}
      {(messageType === "Celebration" || messageType === "Notification") && (
        <div className="glassmorphism rounded-xl p-6 border border-slate-800/50">
          <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <Edit3 className="w-4 h-4" />
            Customize Context
          </h3>
          <div className="space-y-3">
            {messageType === "Celebration" && (
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Gap Name (optional)</label>
                <input
                  type="text"
                  value={customContext.gapName}
                  onChange={(e) => setCustomContext({ ...customContext, gapName: e.target.value })}
                  placeholder="e.g., Technical Architecture"
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            )}
            {messageType === "Notification" && (
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Review Date (optional)</label>
                <input
                  type="text"
                  value={customContext.reviewDate}
                  onChange={(e) => setCustomContext({ ...customContext, reviewDate: e.target.value })}
                  placeholder="e.g., in 2 weeks"
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate AI Message
          </>
        )}
      </button>

      {/* Generated Message */}
      {generatedMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphism rounded-xl p-6 border border-indigo-500/30 bg-indigo-500/5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-400" />
              Generated Message
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-colors"
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
              <button className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Subject</label>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 text-sm text-white">
                {generatedMessage.subject}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Body</label>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 text-sm text-slate-300 whitespace-pre-line min-h-[200px]">
                {generatedMessage.body}
              </div>
            </div>

            {/* AI Rationale */}
            <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded bg-indigo-500/20 flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-indigo-400" />
                </div>
                <p className="text-sm font-semibold text-indigo-400">AI Rationale</p>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {generatedMessage.aiRationale}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-800/50">
              <span>Type: {generatedMessage.type}</span>
              <span>Tone: {generatedMessage.tone}</span>
              <span>Generated: {new Date(generatedMessage.generatedAt).toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
