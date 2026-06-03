# Modification Impact Statement: FNDR Lead Engine – Queue & Rate-Limiting Architecture

## Overview
This document outlines the impact of the queue and rate-limiting architecture implemented for the FNDR Lead Engine, specifically addressing compliance with external API limits.

## API Limits Enforced
The architecture is designed to strictly adhere to the following free-tier limits:
- **Reddit API**: 100 requests per minute.
- **Serper API**: 2,500 requests per month.

## Compliance Strategy

### 1. Staggering & Worker Polling
The `queue-worker` service implements a persistent polling mechanism that retrieves jobs from the `job_queue` table. To stay within the Reddit and Serper limits, a mandatory staggering delay (e.g., 2000ms) is enforced between sequential API calls. This ensures that even under high load, the system does not burst above the allowed rate.

### 2. Intelligent Caching
Before any search request is added to the queue, the system performs a 24-hour cache check against the `leads` table. If a keyword has been searched on the same platform within the last 24 hours, the cached results are returned immediately. This significantly reduces redundant API calls and preserves the monthly quota for Serper.

### 3. Error Handling & Exponential Backoff
In the event of an API failure or rate-limit trigger (429), the worker implements an exponential backoff strategy. Failed jobs are rescheduled with increasing delays (`2^retry_count * base_delay`), preventing aggressive retry loops that could further jeopardize API standing.

## Architecture Components
- **Database Schema**: `leads` and `job_queue` tables in `packages/db/src/schema/leads.ts`.
- **Worker Service**: `apps/api/src/services/queue-worker.ts` handles polling and staggering.
- **API Routes**: `apps/api/src/routes/fndr.ts` implements caching checks and job submission.
