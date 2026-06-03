# ADR-001: FNDR Lead Finder Architecture

## Status
Proposed

## Context
The FNDR Lead Finder Engine requires a robust, scalable technical foundation that integrates with the existing LunAI monorepo while establishing new standards for lead discovery and AI-driven analysis.

## Decision
We will adopt a modern stack focused on developer velocity, type safety, and seamless integration with the Neon database and Supabase identity layer.

### 1. Framework & Stack
- **Next.js 14+ (App Router)**: Used for `apps/fndr`. Next.js provides the best balance of frontend flexibility and backend capability (Route Handlers) required for orchestrating complex discovery and analysis tasks.
- **Drizzle ORM**: Selected as the primary ORM for its type-safety, performance, and SQL-like syntax. It will interface with the Neon PostgreSQL database.
- **Supabase (Identity)**: FNDR will use Supabase Auth to manage user sessions and permissions. This aligns with the "LunAI monorepo standard" and provides a robust OAuth/JWT-based identity layer that can be shared across applications.

### 2. API Location & Strategy
- **Location**: `apps/fndr/src/app/api/*` (Next.js Route Handlers).
- **Rationale**: 
  - **Cohesion**: Lead discovery logic and AI prompts are highly specific to FNDR. Housing them within the app's own API routes ensures high cohesion and simplifies development.
  - **Scaling**: Next.js serverless functions (Route Handlers) allow these specific discovery/analysis tasks to scale independently of the main `apps/api` Express server.
  - **Shared UI Logic**: Facilitates easier server-side rendering and data fetching for the `@workspace/ui` components used in the presentation layer.

### 3. Database Layer
- **Shared Schema**: Database schemas will be defined in `packages/db` (to be created) to ensure that both `apps/fndr` and future applications can share the same lead data and identity types without duplication.
- **Neon Integration**: Leverage Neon's branching capabilities for safe migration testing and serverless-friendly connection pooling.

### 4. Unified Identity Layer Integration
- FNDR will leverage Supabase JWTs for authentication.
- A `user_id` column in the `leads` table will reference the Supabase `auth.users` ID.
- In the transition period, FNDR will provide a bridge or sync mechanism if integration with the legacy `apps/api` auth is required, but the primary target is the Supabase Auth standard.

## Consequences
- **Positive**: High type safety across the stack (Drizzle + TypeScript), faster feature delivery via Next.js Route Handlers, and a clear path toward a unified identity layer.
- **Negative**: Adds a new dependency (Supabase) to the monorepo which may require dual-maintenance of auth logic until the full monorepo migrates.
