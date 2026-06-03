import { leads } from '@workspace/db';
import { type InferSelectModel } from 'drizzle-orm';

/**
 * The Lead type as defined in the database schema.
 */
export type Lead = InferSelectModel<typeof leads>;

/**
 * A compact representation of a lead optimized for LLM token usage.
 * Only includes high-signal fields required for analysis.
 */
export interface SerializedLead {
  id: string;
  platform: string;
  content: string | null;
  metadata: Lead['metadata'];
  author: Lead['authorMetadata'];
  url: string;
}

/**
 * Transforms an array of lead database records into a compact JSON payload
 * suitable for an LLM prompt. Strips unnecessary internal fields like
 * userId, createdAt, and status while preserving high-signal content.
 * 
 * @param leads - Array of lead records from the database
 * @returns Serialized leads optimized for AI analysis
 */
export function serializeLeadsForAI(leads: Lead[]): SerializedLead[] {
  return leads.map((lead) => ({
    id: lead.id,
    platform: lead.platform,
    content: lead.rawContent,
    metadata: lead.metadata,
    author: lead.authorMetadata,
    url: lead.sourceUrl,
  }));
}
