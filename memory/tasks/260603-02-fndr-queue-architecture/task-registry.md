# Task Registry: FNDR Lead Engine – Queue & Rate-Limiting Architecture
**TaskID**: 260603-02-fndr-queue-architecture
**Status**: Completed

---

## Phase 1: Database Migration

### [x] Task 1.1: Update `leads` Table Schema
**Requirement**: "leads table: Stores platform, raw_data, analyzed_json, status, and created_at."
**Acceptance Criteria**:
- [x] Schema updated in `packages/db/src/schema/leads.ts` to include or align fields: `platform`, `raw_data`, `analyzed_json`, `status`, and `created_at`.
- [x] Drizzle migration generated for the schema changes.
**Files**: `packages/db/src/schema/leads.ts`
**Status**: Completed

### [x] Task 1.2: Create `job_queue` Table
**Requirement**: "job_queue table: Stores id, keyword, platform, status (pending | processing | completed | failed), retry_count, and scheduled_at."
**Acceptance Criteria**:
- [x] New `job_queue` table defined in `packages/db/src/schema/leads.ts` or a new schema file.
- [x] Fields match spec: `id` (UUID), `keyword`, `platform`, `status`, `retry_count`, `scheduled_at`.
- [x] Drizzle migration generated.
**Files**: `packages/db/src/schema/leads.ts`
**Status**: Completed

### [x] Task 1.3: Implement RLS Policies for `job_queue`
**Requirement**: "Apply RLS policies to restrict job_queue access to authenticated admins/clients only."
**Acceptance Criteria**:
- [x] SQL migration generated to enable RLS on `job_queue`.
- [x] Policy created to restrict access to authenticated users with admin roles or specific client IDs.
**Files**: `packages/db/src/schema/leads.ts`, `memory/tasks/260603-02-fndr-queue-architecture/migration.sql`
**Status**: Completed

---

## Phase 2: Queue Consumer Logic

### [x] Task 2.1: Implement Worker Process
**Requirement**: "Orchestration: Create a worker process that polls the job_queue table every N seconds."
**Acceptance Criteria**:
- [x] Persistent worker process created in `apps/api/src/services/queue-worker.ts`.
- [x] Worker polls `job_queue` for `pending` or `scheduled` jobs where `scheduled_at <= now()`.
- [x] Worker updates status to `processing` when a job is picked up.
**Files**: `apps/api/src/services/queue-worker.ts`
**Status**: Completed

### [x] Task 2.2: Implement Staggering Strategy
**Requirement**: "Staggering Strategy: Implement a mandatory delay (e.g., 2000ms) between external API calls (Reddit/Serper) to stay within free-tier rate limits."
**Acceptance Criteria**:
- [x] Worker logic includes a mandatory 2000ms delay between processing sequential jobs from the queue.
- [x] Delay is configurable via environment variables.
**Files**: `apps/api/src/services/queue-worker.ts`
**Status**: Completed

### [x] Task 2.3: Error Handling & Exponential Backoff
**Requirement**: "Error Handling: Implement exponential backoff for retries; if a request fails, update retry_count and reschedule it."
**Acceptance Criteria**:
- [x] Failed jobs have their `retry_count` incremented.
- [x] `scheduled_at` is updated using exponential backoff (e.g., 2^retry_count * base_delay).
- [x] Status is set back to `pending` or `failed` if max retries exceeded.
**Files**: `apps/api/src/services/queue-worker.ts`
**Status**: Completed

---

## Phase 3: Caching Layer

### [x] Task 3.1: Implement 24-Hour Cache Check
**Requirement**: "Before adding a search request to the job_queue, check the leads table for existing data associated with that keyword and platform from the last 24 hours. If cache exists, bypass the queue and return existing data immediately."
**Acceptance Criteria**:
- [x] Logic implemented to query `leads` table for matches on `keyword` and `platform` within the last 24 hours.
- [x] If match found, the API returns cached data without creating a new job.
**Files**: `apps/api/src/routes/fndr.ts`
**Status**: Completed

---

## Phase 4: API Integration

### [x] Task 4.1: POST /api/fndr/search Endpoint
**Requirement**: "Expose a POST /api/fndr/search endpoint that adds a request to the job_queue."
**Acceptance Criteria**:
- [x] Endpoint accepts `keyword` and `platform`.
- [x] Endpoint validates input and calls the Caching Layer (Task 3.1).
- [x] If no cache, inserts a new entry into `job_queue` and returns `jobId`.
**Files**: `apps/api/src/routes/fndr.ts`
**Status**: Completed

### [x] Task 4.2: Status Polling/WebSocket Endpoint
**Requirement**: "Provide a WebSocket or polling endpoint (GET /api/fndr/status/:jobId) so the frontend can display real-time progress."
**Acceptance Criteria**:
- [x] Endpoint `GET /api/fndr/status/:jobId` returns the current status of the job and any results if completed.
- [x] (Optional) WebSocket implementation if chosen for real-time updates.
**Files**: `apps/api/src/routes/fndr.ts`
**Status**: Completed

---

## Phase 5: Documentation & Task Registry

### [x] Task 5.1: Modification Impact Statement
**Requirement**: "Modification Impact Statement: Document the API limits being enforced for Reddit (100/min) and Serper (2,500/mo)."
**Acceptance Criteria**:
- [x] Documentation file created at `memory/tasks/260603-02-fndr-queue-architecture/impact.md` detailing how the staggering and worker logic ensures compliance with specified limits.
**Files**: `memory/tasks/260603-02-fndr-queue-architecture/impact.md`
**Status**: Completed

### [x] Task 5.2: Finalize Task Registry
**Requirement**: "Task Registry: Initialize memory/tasks/260603-02-fndr-queue-architecture/task-registry.md."
**Acceptance Criteria**:
- [x] Task registry is complete and reflects all requirements from the spec.
**Files**: `memory/tasks/260603-02-fndr-queue-architecture/task-registry.md`
**Status**: Completed
