# Modification Impact Statement: Data Layer Migration

This document outlines the architectural shift from a file-based content system to a unified, database-driven infrastructure for the LunAI ecosystem.

## 🔄 The Shift: File-Based to DB-Driven
Currently, content (blog, docs) resides in `.md` files within the `apps/web/content` directory. While this supports "Content as Code," it limits performance for dynamic querying and complicates cross-app data sharing (e.g., sharing users between Lumz and Lynk).

### Key Changes
1. **Persistence:** Data moves from the local filesystem to a **Neon PostgreSQL** cluster.
2. **Access Pattern:** Components transition from direct file imports/parsing to fetching pre-shaped "Atomic Props" via a centralized API.
3. **Identity:** Moving from siloed app-specific authentication to a unified **SSO Identity Layer**.

---

## 🚀 Projected Performance Gains

### 1. Agentic Workloads
- **Log Write Throughput:** Switching to Neon's disaggregated storage enables sub-millisecond write latency for high-frequency agent telemetry.
- **Dynamic Task Discovery:** Agents can now query the `tasks` and `agents` tables with complex filters (e.g., "Find all idle agents with JSON-parsing capability") in `O(log N)` time, compared to expensive directory scans.

### 2. Frontend Rendering
- **Stateless Efficiency:** Components no longer perform heavy Markdown parsing or localization logic at runtime. They receive a flat JSON object (Atomic Props), reducing the JS bundle size and improving Time to Interactive (TTI).
- **Localized Querying:** Database indexes on `locale` and `slug` ensure near-instant retrieval of content, regardless of the size of the blog or documentation library.

---

## 🛡️ Preservation of "Content as Code"

The transition does **not** abandon the benefits of version-controlled content. 

- **Sync Pipeline:** We will implement a GitHub Action that triggers on pushes to the `main` branch. This action parses Markdown files in the repository and upserts their content into the `content_localizations` table.
- **Single Source of Truth:** Markdown files in Git remain the authoritative source for editing. The database serves as the **High-Performance Delivery Layer**.
- **Schema as Code:** Using **Neon's Database Branching**, schema changes are managed via SQL migrations that are reviewed and merged just like application code.

---

## ⚠️ Risks & Mitigations

| Risk | Mitigation Strategy |
| :--- | :--- |
| **Increased API Latency** | Implement aggressive Edge Caching (Vercel Data Cache) for common content queries. |
| **Out-of-sync DB** | Implement a "Strict Sync" check in CI that fails if the DB content doesn't match the repo hash. |
| **Single Point of Failure** | Utilize Neon's multi-region read replicas and automated backups for high availability. |
