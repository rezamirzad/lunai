Task Description: FNDR Lead Engine – Queue & Rate-Limiting Architecture
TaskID: 260603-02-fndr-queue-architecture
Objective: Implement a durable, database-backed job queue to facilitate stable, rate-limited lead discovery via Reddit and Serper.dev, ensuring full compliance with free-tier API limits.
Instructions:
Database Migration (Supabase/Drizzle):
Implement the following schema additions:
leads table: Stores platform, raw_data, analyzed_json, status, and created_at.
job_queue table: Stores id, keyword, platform, status (pending | processing | completed | failed), retry_count, and scheduled_at.
Apply RLS policies to restrict job_queue access to authenticated admins/clients only.
Queue Consumer Logic (apps/api or Serverless):
Orchestration: Create a worker process that polls the job_queue table every N seconds.
Staggering Strategy: Implement a mandatory delay (e.g., 2000ms) between external API calls (Reddit/Serper) to stay within free-tier rate limits.
Error Handling: Implement exponential backoff for retries; if a request fails, update retry_count and reschedule it.
Caching Layer:
Before adding a search request to the job_queue, check the leads table for existing data associated with that keyword and platform from the last 24 hours.
If cache exists, bypass the queue and return existing data immediately.
Integration with Agentic Flow:
Expose a POST /api/fndr/search endpoint that adds a request to the job_queue.
Provide a WebSocket or polling endpoint (GET /api/fndr/status/:jobId) so the frontend can display real-time progress.
Compliance & Documentation:
Task Registry: Initialize memory/tasks/260603-02-fndr-queue-architecture/task-registry.md.
Modification Impact Statement: Document the API limits being enforced for Reddit (100/min) and Serper (2,500/mo).
Human Approval Gate:
Pause execution after the Database Migration Script is generated. Do not apply schema changes to your production Supabase project until I reply with [APPROVED].
