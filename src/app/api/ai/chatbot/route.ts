import { NextRequest, NextResponse } from "next/server";
import { seedEmployees } from "@/data/seed-data";
import {
  findCompletedCourses,
  findPotentialTeamLeaders,
  findEmployeesWithGaps,
  findAtRiskEmployees,
  findHighPotentialEmployees,
  findEmployeesByDepartment,
  getTrainingStats,
  findIncompleteTraining,
  QueryResult,
} from "@/lib/chatbot-helpers";

/**
 * API Route for HR Chatbot
 * POST /api/ai/chatbot
 * Processes natural language queries about HR data
 */

const getOpenAIClient = () => {
  try {
    const OpenAI = require("openai");
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return null;
    }
    
    return new OpenAI({ apiKey });
  } catch (error) {
    return null;
  }
};

/**
 * Use AI to classify the query and extract parameters
 */
async function classifyQuery(
  query: string,
  client: any
): Promise<{
  intent: string;
  parameters: Record<string, any>;
}> {
  if (!client) {
    // Fallback classification without AI
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("completed") || lowerQuery.includes("finished") || lowerQuery.includes("done")) {
      return { intent: "completed_courses", parameters: {} };
    }
    if (lowerQuery.includes("team leader") || lowerQuery.includes("leadership") || lowerQuery.includes("can lead")) {
      return { intent: "team_leaders", parameters: {} };
    }
    if (lowerQuery.includes("gap") || lowerQuery.includes("missing") || lowerQuery.includes("need")) {
      const technical = lowerQuery.includes("technical") || lowerQuery.includes("tech");
      const leadership = lowerQuery.includes("leadership") || lowerQuery.includes("lead");
      const core = lowerQuery.includes("core") || lowerQuery.includes("communication");
      
      return {
        intent: "gaps",
        parameters: {
          category: technical ? "Technical" : leadership ? "Leadership" : core ? "Core" : undefined,
        },
      };
    }
    if (lowerQuery.includes("risk") || lowerQuery.includes("at risk")) {
      return { intent: "at_risk", parameters: {} };
    }
    if (lowerQuery.includes("high potential") || lowerQuery.includes("potential")) {
      return { intent: "high_potential", parameters: {} };
    }
    if (lowerQuery.includes("department")) {
      const deptMatch = query.match(/department[:\s]+(\w+)/i) || query.match(/(engineering|sales|leadership)/i);
      return {
        intent: "by_department",
        parameters: { department: deptMatch ? deptMatch[1] : undefined },
      };
    }
    if (lowerQuery.includes("training") || lowerQuery.includes("statistics") || lowerQuery.includes("stats")) {
      return { intent: "training_stats", parameters: {} };
    }
    if (lowerQuery.includes("incomplete") || lowerQuery.includes("not finished")) {
      return { intent: "incomplete_training", parameters: {} };
    }
    
    return { intent: "general", parameters: {} };
  }

  const prompt = `You are an HR chatbot assistant. Classify this user query and extract relevant parameters.

Query: "${query}"

Possible intents:
- completed_courses: Who finished/completed their courses
- team_leaders: Who can be a team leader
- gaps: Who has gaps in competencies (may include category: Technical, Leadership, or Core)
- at_risk: Who is at risk
- high_potential: Who has high potential
- by_department: Employees in a specific department
- training_stats: Training statistics/overview
- incomplete_training: Who has incomplete training
- general: General questions

Respond with JSON only:
{
  "intent": "intent_name",
  "parameters": {
    "category": "Technical|Leadership|Core" (if applicable),
    "department": "department_name" (if applicable),
    "competency": "competency_name" (if applicable)
  }
}`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an HR chatbot classifier. Always respond with valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 200,
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || "{}");
    return {
      intent: result.intent || "general",
      parameters: result.parameters || {},
    };
  } catch (error) {
    console.error("Error classifying query:", error);
    return { intent: "general", parameters: {} };
  }
}

/**
 * Execute the query based on intent
 */
function executeQuery(intent: string, parameters: Record<string, any>): QueryResult {
  switch (intent) {
    case "completed_courses":
      return findCompletedCourses(seedEmployees);
    
    case "team_leaders":
      return findPotentialTeamLeaders(seedEmployees);
    
    case "gaps":
      return findEmployeesWithGaps(
        seedEmployees,
        parameters.competency,
        parameters.category
      );
    
    case "at_risk":
      return findAtRiskEmployees(seedEmployees);
    
    case "high_potential":
      return findHighPotentialEmployees(seedEmployees);
    
    case "by_department":
      return findEmployeesByDepartment(
        seedEmployees,
        parameters.department || ""
      );
    
    case "training_stats":
      return getTrainingStats(seedEmployees);
    
    case "incomplete_training":
      return findIncompleteTraining(seedEmployees);
    
    default:
      return {
        type: "summary",
        data: {},
        message: "I can help you with questions about employees, training, gaps, team leaders, and more. Try asking: 'Who finished their courses?' or 'Who can be a team leader?'",
      };
  }
}

/**
 * Format the response using AI for natural language
 */
async function formatResponse(
  query: string,
  queryResult: QueryResult,
  client: any
): Promise<string> {
  if (!client) {
    // Fallback formatting
    return formatResponseFallback(queryResult);
  }

  const resultData = JSON.stringify(queryResult.data, null, 2);
  const resultMessage = queryResult.message;

  const prompt = `You are an HR chatbot assistant. The user asked: "${query}"

Query Result:
${resultMessage}

Data Summary:
${queryResult.type === "employees" && Array.isArray(queryResult.data)
  ? `Found ${queryResult.data.length} employee(s). Here are the key details:\n${queryResult.data
      .slice(0, 5)
      .map((item: any, idx: number) => {
        const emp = item.employee || item;
        const latestAppraisal = emp.appraisals?.[emp.appraisals.length - 1];
        return `${idx + 1}. ${emp.firstName} ${emp.lastName} (${emp.role}, ${emp.department}) - Performance: ${latestAppraisal?.overallScore || "N/A"}/5`;
      })
      .join("\n")}${queryResult.data.length > 5 ? `\n... and ${queryResult.data.length - 5} more` : ""}`
  : resultData}

Generate a natural, conversational response that:
1. Directly answers the user's question
2. Provides key insights from the data
3. Mentions specific employees if relevant (limit to top 3-5)
4. Is concise but informative (2-4 sentences)
5. Uses a professional but friendly tone

Response:`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful HR chatbot assistant. Provide clear, concise, and professional responses.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return completion.choices[0]?.message?.content || formatResponseFallback(queryResult);
  } catch (error) {
    console.error("Error formatting response:", error);
    return formatResponseFallback(queryResult);
  }
}

function formatResponseFallback(result: QueryResult): string {
  if (result.type === "employees" && Array.isArray(result.data)) {
    const topEmployees = result.data.slice(0, 5);
    const employeeList = topEmployees
      .map((item: any, idx: number) => {
        const emp = item.employee || item;
        return `${idx + 1}. ${emp.firstName} ${emp.lastName} (${emp.role})`;
      })
      .join("\n");
    
    return `${result.message}\n\n${employeeList}${result.data.length > 5 ? `\n... and ${result.data.length - 5} more` : ""}`;
  }
  
  return result.message;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const client = getOpenAIClient();
    
    // Classify the query
    const { intent, parameters } = await classifyQuery(message, client);
    
    // Execute the query
    const queryResult = executeQuery(intent, parameters);
    
    // Format the response
    const response = await formatResponse(message, queryResult, client);

    return NextResponse.json({
      response,
      intent,
      data: queryResult.data,
      type: queryResult.type,
    });
  } catch (error) {
    console.error("Error processing chatbot query:", error);
    return NextResponse.json(
      { error: "Failed to process query", response: "I'm sorry, I encountered an error. Please try rephrasing your question." },
      { status: 500 }
    );
  }
}
