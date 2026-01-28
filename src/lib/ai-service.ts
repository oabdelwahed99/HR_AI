import { Employee, GapAnalysis, Competency, MessageTemplate, MessageTone } from "@/types/hr";

/**
 * AI Service for HR-OS Pulse
 * OpenAI GPT integration for generating AI-powered rationale and insights
 */

// Initialize OpenAI client (will use OPENAI_API_KEY from environment)
const getOpenAIClient = () => {
  try {
    // Dynamic import to handle cases where package isn't installed
    const OpenAI = require("openai");
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.warn("OPENAI_API_KEY not found. AI features will use fallback responses.");
      return null;
    }
    
    return new OpenAI({ apiKey });
  } catch (error) {
    console.warn("OpenAI package not installed. Run: npm install openai");
    return null;
  }
};

/**
 * Generate AI rationale for gap analysis
 */
export async function generateGapAnalysisRationale(
  employee: Employee,
  gapAnalysis: GapAnalysis
): Promise<string> {
  const client = getOpenAIClient();
  
  if (!client) {
    // Fallback to existing rationale if no API key
    return gapAnalysis.rationale || "AI analysis unavailable. Please configure OPENAI_API_KEY.";
  }

  const latestAppraisal = employee.appraisals[employee.appraisals.length - 1];
  const avgCompetencyScore = latestAppraisal
    ? latestAppraisal.competencies.reduce((sum, comp) => sum + comp.currentLevel, 0) / latestAppraisal.competencies.length
    : 0;

  const prompt = `You are an HR analytics expert. Generate a concise, data-driven rationale explaining why this employee needs the recommended training.

Employee Profile:
- Name: ${employee.firstName} ${employee.lastName}
- Role: ${employee.role} (${employee.level} level)
- Department: ${employee.department}
- Years of Tenure: ${Math.round((Date.now() - new Date(employee.hireDate).getTime()) / (1000 * 60 * 60 * 24 * 365))}

Competency Gaps:
${gapAnalysis.competencyGaps.map(gap => 
  `- ${gap.name}: Current ${gap.currentLevel.toFixed(1)}/5, Required ${gap.requiredLevel}/5 (Gap: ${gap.gap.toFixed(1)})`
).join('\n')}

Training Progress: ${employee.trainingTracks.reduce((sum, t) => sum + t.progress, 0) / employee.trainingTracks.length || 0}%
Average Competency Score: ${avgCompetencyScore.toFixed(1)}/5
Gap Priority: ${gapAnalysis.priority}
Estimated Impact: ${gapAnalysis.estimatedImpact}%

Generate a professional, concise rationale (2-3 sentences) explaining:
1. The specific competency gaps identified
2. Why these gaps matter for their role/level
3. The expected impact of addressing these gaps
4. Any urgency factors (if priority is Critical or High)

Tone: Professional, data-driven, actionable.`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // Using cost-effective model, can upgrade to gpt-4 if needed
      messages: [
        {
          role: "system",
          content: "You are an expert HR analytics consultant specializing in talent development and competency gap analysis. Provide concise, data-driven insights."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return completion.choices[0]?.message?.content || gapAnalysis.rationale;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return gapAnalysis.rationale || "Unable to generate AI rationale. Please try again later.";
  }
}

/**
 * Generate AI rationale for dashboard insights
 */
export async function generateDashboardInsight(
  metricName: string,
  value: number | string,
  trend: "up" | "down" | "stable",
  change: number,
  context: {
    totalEmployees?: number;
    employees?: Employee[];
    historicalData?: any;
  }
): Promise<string> {
  const client = getOpenAIClient();
  
  if (!client) {
    // Fallback rationale
    return `Metric ${metricName} shows ${trend} trend with ${change}% change. Analysis requires API configuration.`;
  }

  const prompt = `You are an HR analytics expert. Generate a concise insight explaining this workforce metric.

Metric: ${metricName}
Current Value: ${value}
Trend: ${trend === "up" ? "Improving" : trend === "down" ? "Declining" : "Stable"}
Change: ${change}% ${trend === "up" ? "increase" : trend === "down" ? "decrease" : ""}
Total Employees: ${context.totalEmployees || "N/A"}

Generate a professional, concise insight (2-3 sentences) that:
1. Explains what this metric means
2. Interprets the trend and change
3. Provides actionable context (what's driving it, what it means for the organization)

Tone: Executive-level, data-driven, strategic.`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert HR analytics consultant providing executive-level insights on workforce metrics."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return completion.choices[0]?.message?.content || "AI insight unavailable.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "Unable to generate AI insight. Please try again later.";
  }
}

/**
 * Generate personalized message using AI
 */
export async function generateAIMessage(
  type: "Celebration" | "Motivation" | "Notification",
  employee: Employee,
  context?: {
    gapName?: string;
    courseName?: string;
    progress?: number;
    reviewDate?: string;
    incompleteTracks?: string[];
  },
  tone: MessageTone = "Professional"
): Promise<MessageTemplate> {
  const client = getOpenAIClient();
  
  const baseContext = {
    employeeName: `${employee.firstName} ${employee.lastName}`,
    role: employee.role,
    department: employee.department,
    level: employee.level,
    ...context
  };

  if (!client) {
    // Fallback to template-based generation
    return generateFallbackMessage(type, employee, context, tone);
  }

  const messageTypePrompts = {
    Celebration: `Generate a ${tone.toLowerCase()} celebration message for ${baseContext.employeeName} who has closed their ${context?.gapName || "competency"} gap. Make it warm, encouraging, and recognize their achievement.`,
    Motivation: `Generate a ${tone.toLowerCase()} motivation message for ${baseContext.employeeName} who is ${context?.progress || 0}% through ${context?.courseName || "their training"}. Encourage them to finish strong.`,
    Notification: `Generate a ${tone.toLowerCase()} notification message for ${baseContext.employeeName} about their upcoming review on ${context?.reviewDate || "soon"}. Mention that completing ${context?.incompleteTracks?.join(", ") || "training tracks"} would strengthen their case.`
  };

  const prompt = `${messageTypePrompts[type]}

Employee Context:
- Name: ${baseContext.employeeName}
- Role: ${baseContext.role}
- Department: ${baseContext.department}
- Level: ${baseContext.level}

Generate:
1. A compelling subject line
2. A personalized message body (3-4 sentences)
3. A brief AI rationale explaining why this message was generated

Format as JSON:
{
  "subject": "...",
  "body": "...",
  "aiRationale": "..."
}`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert HR communications specialist. Generate professional, personalized messages for employees. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 300,
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0]?.message?.content || "{}");
    
    return {
      id: `msg-${Date.now()}`,
      type,
      tone,
      recipientId: employee.id,
      subject: response.subject || `Message for ${baseContext.employeeName}`,
      body: response.body || "Message content unavailable.",
      generatedAt: new Date().toISOString(),
      aiRationale: response.aiRationale || `Generated ${type} message using AI.`,
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return generateFallbackMessage(type, employee, context, tone);
  }
}

/**
 * Fallback message generation (when API unavailable)
 */
function generateFallbackMessage(
  type: "Celebration" | "Motivation" | "Notification",
  employee: Employee,
  context?: any,
  tone: MessageTone = "Professional"
): MessageTemplate {
  const templates = {
    Celebration: {
      subject: `🎉 Congratulations, ${employee.firstName}!`,
      body: `Hi ${employee.firstName},\n\nCongratulations on closing your ${context?.gapName || "competency"} gap! Your dedication to growth is inspiring.\n\nBest regards,\nHR-OS Pulse`,
      rationale: `Celebration message for ${employee.firstName} closing their ${context?.gapName || "competency"} gap.`
    },
    Motivation: {
      subject: `Keep Going, ${employee.firstName}!`,
      body: `Hi ${employee.firstName},\n\nYou're ${context?.progress || 0}% through ${context?.courseName || "your training"}. Finish strong!\n\nBest regards,\nHR-OS Pulse`,
      rationale: `Motivation message for ${employee.firstName} at ${context?.progress || 0}% completion.`
    },
    Notification: {
      subject: `Review Reminder: ${employee.firstName}`,
      body: `Hi ${employee.firstName},\n\nYour review is coming up. Completing your training tracks would strengthen your case.\n\nBest regards,\nHR-OS Pulse`,
      rationale: `Notification message for ${employee.firstName} regarding upcoming review.`
    }
  };

  const template = templates[type];
  return {
    id: `msg-${Date.now()}`,
    type,
    tone,
    recipientId: employee.id,
    subject: template.subject,
    body: template.body,
    generatedAt: new Date().toISOString(),
    aiRationale: template.rationale,
  };
}

/**
 * Generate succession planning rationale
 */
export async function generateSuccessionRationale(
  employee: Employee,
  position: { performance: string; potential: string; potentialScore: number }
): Promise<string> {
  const client = getOpenAIClient();
  
  if (!client) {
    return `Positioned as ${position.performance} performance with ${position.potential} potential (${position.potentialScore.toFixed(0)}% score).`;
  }

  const prompt = `Generate a concise rationale for this employee's position in the 9-box succession matrix.

Employee: ${employee.firstName} ${employee.lastName}
Role: ${employee.role} (${employee.level})
Department: ${employee.department}
Performance Level: ${position.performance}
Potential Level: ${position.potential}
Potential Score: ${position.potentialScore.toFixed(0)}%

Latest Appraisal: ${employee.appraisals[employee.appraisals.length - 1]?.overallScore || "N/A"}/5
Training Completion: ${employee.trainingTracks.reduce((sum, t) => sum + t.progress, 0) / employee.trainingTracks.length || 0}%

Explain in 2-3 sentences:
1. Why they're positioned here
2. What this means for their career trajectory
3. Key development recommendations

Tone: Professional, strategic.`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert in succession planning and talent management."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return completion.choices[0]?.message?.content || "Rationale unavailable.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "Unable to generate rationale. Please try again later.";
  }
}
