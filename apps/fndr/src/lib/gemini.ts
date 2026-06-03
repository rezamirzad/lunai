import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { type SerializedLead } from './serialize-leads';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const responseSchema: any = {
  description: "Analysis results for a set of sales leads",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      id: {
        type: SchemaType.STRING,
        description: "The unique ID of the lead being analyzed",
      },
      summary: {
        type: SchemaType.STRING,
        description: "A concise summary of the lead's content and relevance",
      },
      painPoints: {
        type: SchemaType.ARRAY,
        items: { type: SchemaType.STRING },
        description: "List of potential pain points identified in the content",
      },
      intent: {
        type: SchemaType.STRING,
        enum: ["high", "medium", "low"],
        format: "enum",
        description: "The estimated purchase or engagement intent",
      },
      sentiment: {
        type: SchemaType.STRING,
        description: "The overall sentiment of the content (e.g., positive, neutral, frustrated)",
      },
      suggestedReply: {
        type: SchemaType.STRING,
        description: "A personalized, non-spammy suggested reply to engage the lead",
      },
      relevanceScore: {
        type: SchemaType.NUMBER,
        description: "A score from 0-100 indicating how relevant this lead is to sales goals",
      },
    },
    required: ["id", "summary", "painPoints", "intent", "sentiment", "suggestedReply", "relevanceScore"],
  },
};

/**
 * Analyzes a batch of leads using Gemini 1.5 Flash.
 * 
 * @param serializedLeads - Array of leads serialized for AI analysis
 * @returns Array of analysis results
 */
export async function analyzeLeadsWithGemini(serializedLeads: SerializedLead[]) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    },
  });

  const systemPrompt = `
    You are an expert Sales Development Representative (SDR) and Lead Analyst.
    Your task is to analyze a batch of potential sales leads harvested from social media (LinkedIn, Reddit, etc.).
    
    For each lead, you must:
    1. Assess its relevance to a B2B SaaS product (General sales relevance).
    2. Identify specific pain points or problems the user is mentioning.
    3. Determine their intent level (high/medium/low) based on how close they are to a buying decision.
    4. Provide a concise summary.
    5. Suggest a personalized, helpful reply that adds value rather than just pitching.
    6. Assign a relevance score from 0 to 100.
    
    Return a structured JSON array matching the provided schema.
  `;

  const userPrompt = `Analyze the following leads:\n${JSON.stringify(serializedLeads, null, 2)}`;

  try {
    const result = await model.generateContent([systemPrompt, userPrompt]);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error analyzing leads with Gemini:', error);
    throw new Error('Failed to analyze leads with Gemini API');
  }
}
