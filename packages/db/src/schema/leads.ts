import { pgTable, text, timestamp, uuid, jsonb, integer, index } from 'drizzle-orm/pg-core';

export const jobQueue = pgTable('job_queue', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  keyword: text('keyword').notNull(),
  platform: text('platform').notNull(),
  status: text('status').default('pending').notNull(), // 'pending', 'processing', 'completed', 'failed'
  retryCount: integer('retry_count').default(0).notNull(),
  scheduledAt: timestamp('scheduled_at', { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    userIdIdx: index('job_queue_user_id_idx').on(table.userId),
    statusScheduledIdx: index('job_queue_status_scheduled_at_idx').on(table.status, table.scheduledAt),
  };
});

export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(), // Foreign key to Supabase auth.users
  platform: text('platform').notNull(), // 'linkedin' | 'reddit'
  sourceUrl: text('source_url').notNull(),
  rawContent: text('raw_content'),
  jobId: uuid('job_id'), // Link to the job that generated this lead
  
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
}, (table) => {
  return {
    userIdIdx: index('leads_user_id_idx').on(table.userId),
    platformIdx: index('leads_platform_idx').on(table.platform),
    statusIdx: index('leads_status_idx').on(table.status),
    jobIdIdx: index('leads_job_id_idx').on(table.jobId),
  };
});

export const keywords = pgTable('keywords', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  term: text('term').notNull(),
  lastRun: timestamp('last_run'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => {
  return {
    userIdIdx: index('keywords_user_id_idx').on(table.userId),
  };
});
