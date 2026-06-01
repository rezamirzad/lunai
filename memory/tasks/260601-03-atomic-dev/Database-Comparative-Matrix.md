# Database Comparative Matrix: Atomic Development Mandate

This document evaluates PostgreSQL providers through the lens of **Atomic Development**, focusing on data-to-prop mapping efficiency and high-throughput agentic telemetry.

## 📋 Strategic Context
> **Requirement Quote (260601-03):** "Perform a rigorous analysis of PostgreSQL providers (Supabase, Neon, PlanetScale). Evaluate based on JSONB/Relational flexibility, global latency for agentic backends, and ease of migration from file-based Markdown."

---

## 📊 Comparative Matrix

| Criteria | **Neon** | **Supabase** | **PlanetScale** |
| :--- | :--- | :--- | :--- |
| **Atomic Prop Mapping** | **Superior.** Branching allows for "Atomic Schemas" that perfectly mirror UI component versions. | **High.** PostgREST allows for rapid auto-generated APIs that map directly to JSON objects. | **High.** Strong Prisma integration facilitates type-safe prop mapping. |
| **Agentic Log Latency** | **Ultra-Low.** Disaggregated storage allows for high-throughput sub-millisecond writes for logs. | **Variable.** Performance depends on instance sizing; can experience IOPS bottlenecks. | **Excellent.** Built for massive horizontal scale; handles millions of log entries easily. |
| **JSONB Flexibility** | Native Postgres JSONB. Optimized for evolving "Atomic Metadata" fields. | Native Postgres JSONB. Integrated with Realtime and Auth. | Native MySQL JSON (Postgres mode available). Robust indexing. |
| **Content as Code Sync** | **Best.** DB Branching = Git Branching. Database state is version-controlled via PRs. | **Good.** CLI supports migrations, but data branching is less native than Neon. | **Good.** Data branching exists but optimized more for schema migrations. |
| **Ease of Migration** | High. Native Postgres tools + Branching for safety. | High. Migration scripts via Edge Functions. | Moderate. Requires conversion from Postgres flavor to Vitess/MySQL constraints. |

---

## 🧠 Refined Criteria Analysis

### 1. Ease of mapping DB records to Atomic Props
In an **Atomic Development** workflow, components are "dumb" and expect a specific set of props. 
- **Neon** wins here by enabling **Schema Branching**. We can iterate on the data structure (the "Prop Contract") in a database branch that exactly matches the frontend feature branch.
- **Supabase**'s `jsonb_build_object` capabilities in Postgres views allow us to transform relational rows into "Atomic Props" directly at the database layer, serving a single object to the component.

### 2. Latency for Agentic logs
Agentic workloads generate high-frequency execution logs.
- **Neon**'s serverless architecture is designed to handle bursty writes without manual vertical scaling. This is critical for agents that might execute thousands of sub-tasks in seconds.
- **PlanetScale** offers the highest durability for massive log volumes but introduces more complexity in the initial setup compared to Neon's "Developer-First" approach.

---

## 🏆 Final Recommendation (Atomic Evolution)

| Role | Provider | Rationale |
| :--- | :--- | :--- |
| **Primary Data Layer** | **Neon** | The **Branching** capability is the definitive factor for "Atomic Development," ensuring data schemas evolve in lockstep with UI components. |
| **Identity / Auth** | **Supabase (or Neon Auth)** | Supabase remains strong for SSO, but **Neon Auth** (Better Auth based) is now the preferred recommendation to keep the stack unified within the Neon ecosystem. |
| **Analytics / Global Logs** | **PlanetScale** | Only if log volume exceeds 100M+ entries/month; otherwise, Neon is sufficient. |

**Final Decision:** Use **Neon** as the unified platform. Its disaggregated architecture and branching support satisfy the **"Content as Code"** requirement while providing the lowest barrier to **Atomic Prop Mapping**.
