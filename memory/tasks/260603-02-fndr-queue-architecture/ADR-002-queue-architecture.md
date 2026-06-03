# ADR-002: FNDR Queue & Rate-Limiting Architecture

## Context
The FNDR tool needs to scrape multiple platforms (LinkedIn, Reddit, etc.) for leads based on user-defined keywords. These platforms have strict rate limits and anti-bot measures. We need a robust queuing system to handle scraping requests while respecting these limits and providing retry capabilities.

## Decision
We will implement a custom PostgreSQL-based queue in `job_queue` table, processed by a worker process in `apps/api`.

### 1. Worker Polling Strategy
- **Environment**: The worker process will live in `apps/api`.
- **Interval**: 30 seconds.
- **Concurrency**: Use `FOR UPDATE SKIP LOCKED` to allow multiple worker instances to operate safely.
- **Query**:
  ```sql
  UPDATE job_queue
  SET status = 'processing', updated_at = NOW()
  WHERE id IN (
      SELECT id FROM job_queue
      WHERE status = 'pending' AND scheduled_at <= NOW()
      ORDER BY scheduled_at ASC
      LIMIT 5
      FOR UPDATE SKIP LOCKED
  )
  RETURNING *;
  ```

### 2. Staggering and Backoff Logic
- **Initial Staggering**: When multiple keywords are added simultaneously, the system will offset `scheduled_at` by 2-5 minutes per job to avoid request bursts.
- **Retry Logic**: Max 3 retries per job.
- **Exponential Backoff**:
  - 1st Failure: +5 minutes.
  - 2nd Failure: +30 minutes.
  - 3rd Failure: +4 hours.
  - Final Failure: Mark as `failed` and stop retrying.

### 3. Caching Layer Mechanism
- **Goal**: Minimize redundant scraping and AI analysis costs.
- **Mechanism**: Before execution, the worker checks for recent successful leads (within the last 6 hours) for the same keyword and platform.
- **Implementation**: The `leads` table serves as the source of truth. If recent leads exist, the job may be marked as completed or adjusted to only fetch newer content.

### 4. Multi-Tenancy
- Every job in `job_queue` is tied to a `user_id`.
- Row-Level Security (RLS) ensures users can only view and manage their own scraping jobs.

## Consequences
- **Pros**:
  - Leverages existing PostgreSQL infrastructure (no new dependencies).
  - Reliable and observable state management.
  - Native multi-tenancy support.
- **Cons**:
  - Database polling overhead (mitigated by indexing and reasonable intervals).
  - Scalability limited by DB locking performance (not an issue for current load).
