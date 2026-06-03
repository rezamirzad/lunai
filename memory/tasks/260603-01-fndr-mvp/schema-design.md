# Database Schema Design: FNDR Leads

This document defines the Drizzle-compatible schema for the FNDR Lead Finder Engine.

## Schema Location
Target File: `packages/db/src/schema/leads.ts`

## Tables

### 1. `leads`
Stores discovered leads from various platforms.

```typescript
import { pgTable, text, timestamp, uuid, jsonb, integer } from 'drizzle-orm/pg-core';

export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(), // Foreign key to Supabase auth.users
  platform: text('platform').notNull(), // 'linkedin' | 'reddit'
  sourceUrl: text('source_url').notNull(),
  rawContent: text('raw_content'),
  
  // Structured data specific to the post/listing
  metadata: jsonb('metadata').$type<{
    postDate?: string;
    engagement?: {
      likes?: number;
      comments?: number;
      shares?: number;
    };
    tags?: string[];
    [key: string]: any;
  }>(),
  
  // Information about the user who posted the content
  authorMetadata: jsonb('author_metadata').$type<{
    name?: string;
    handle?: string;
    avatar?: string;
    bio?: string;
    profileLink?: string;
    [key: string]: any;
  }>(),
  
  keywordId: uuid('keyword_id'), // Optional FK to keywords table
  
  // Workflow state
  status: text('status').default('new').notNull(), // 'new', 'analyzed', 'archived', 'ignored'
  relevanceScore: integer('relevance_score'), // AI-generated score 0-100
  
  // Structured results from Gemini analysis
  aiAnalysis: jsonb('ai_analysis').$type<{
    summary?: string;
    painPoints?: string[];
    intent?: 'high' | 'medium' | 'low';
    sentiment?: string;
    suggestedReply?: string;
    actionItems?: string[];
  }>(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

### 2. `keywords`
Tracks search terms used for discovery.

```typescript
export const keywords = pgTable('keywords', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  term: text('term').notNull(),
  lastRun: timestamp('last_run'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

## Relationships
- **leads.user_id** -> **auth.users.id** (Implicit via Supabase)
- **leads.keyword_id** -> **keywords.id** (One-to-many)

## Indices
- Index on `user_id` for performance.
- Index on `platform` for filtering.
- Index on `status` for dashboard views.
