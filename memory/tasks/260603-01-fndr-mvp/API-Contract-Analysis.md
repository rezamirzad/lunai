# Gemini Analysis Contract Documentation

This document defines the API contract between the FNDR application and Google Gemini for lead analysis.

## Model Configuration

- **Model:** `gemini-1.5-flash`
- **Response Format:** `application/json`
- **Output Mode:** Constrained via `responseSchema`

## Input JSON Schema (Leads Serialization)

The input to the Gemini model is a JSON-serialized array of leads, optimized for token efficiency.

### TypeScript Interface (`SerializedLead`)

```typescript
export interface SerializedLead {
  id: string;
  platform: string;
  content: string | null;
  metadata: Record<string, any> | null;
  author: Record<string, any> | null;
  url: string;
}
```

### Field Descriptions
- `id`: Unique database identifier for the lead.
- `platform`: Social source (e.g., "LinkedIn", "Reddit").
- `content`: The raw text content of the post or message.
- `metadata`: Platform-specific signal data.
- `author`: Information about the lead's author.
- `url`: Direct source link.

## Output JSON Schema (AI Insights)

Gemini returns a structured JSON array where each item corresponds to an input lead.

### Schema Definition

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | The unique ID matching the input lead. |
| `summary` | `string` | A concise summary of the lead's content and relevance. |
| `painPoints` | `string[]` | List of potential pain points identified in the content. |
| `intent` | `enum` | "high", "medium", or "low" based on buying proximity. |
| `sentiment` | `string` | Overall sentiment (e.g., positive, neutral, frustrated). |
| `suggestedReply` | `string` | A personalized, non-spammy suggested reply. |
| `relevanceScore`| `number` | Score from 0-100 indicating sales relevance. |

## System Prompt

The following system prompt is used to guide the model's behavior:

```text
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
```

## Implementation Reference
- Analysis Logic: `apps/fndr/src/lib/gemini.ts`
- Data Transformation: `apps/fndr/src/lib/serialize-leads.ts`
