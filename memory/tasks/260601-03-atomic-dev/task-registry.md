# [260601-03-atomic-dev] Database Orchestration & Atomic Integration

## Specification Summary
**Original Requirements**: "Architect a unified, database-driven data layer for the LunAI ecosystem that supports atomic modularity, cross-app identity, and 'Content as Code' workflows."
**Technical Stack**: PostgreSQL (Provider TBD: Neon vs Supabase vs PlanetScale), JSONB/Relational flexibility.
**Target Timeline**: Phase 1: Architecture & Evaluation

## Development Tasks

### Provider Selection & Benchmarking
### [x] Task 1: Comparative Analysis Matrix
**Description**: Perform a rigorous analysis of PostgreSQL providers (Supabase, Neon, PlanetScale) mapping them against scalability, cost, and developer experience.
**Acceptance Criteria**:
- Scorecard created with criteria: JSONB support, global latency, ease of migration, and cost.
- Analysis includes benchmarking of "global latency for agentic backends."
- **Quote**: "Perform a rigorous analysis of PostgreSQL providers (Supabase, Neon, PlanetScale). Evaluate based on JSONB/Relational flexibility, global latency for agentic backends, and ease of migration from file-based Markdown."
**Reference**: Section "Database Provider Selection" of specification.

### Unified Identity & SSO Schema
### [x] Task 2: Centralized User Schema Design
**Description**: Design a schema for a centralized Users table supporting cross-app SSO, decoupled from SaaS business logic.
**Acceptance Criteria**:
- Users table includes fields for multi-tenant auth (SSO).
- Schema allows for "seamless expansion into future LunAI products" without breaking existing structures.
- **Quote**: "Design a schema for a centralized Users table supporting cross-app SSO. Ensure the identity schema is decoupled from specific SaaS business logic, allowing for seamless expansion into future LunAI products."
**Reference**: Section "Unified Identity Layer (SSO)" of specification.

### Hybrid Content Sync Strategy
### [x] Task 3: Content-as-Code Mirroring Schema
**Description**: Develop a relational schema (`contents`, `content_localizations`) that mirrors the existing Markdown structure.
**Acceptance Criteria**:
- Table structure supports nested hierarchies equivalent to the current filesystem.
- `content_localizations` table handles multi-language support.
- **Quote**: "Develop a relational schema (contents, content_localizations) that mirrors your current Markdown structure."
**Reference**: Section "Hybrid Content & Localization Strategy" of specification.

### [x] Task 4: Git-to-DB Synchronization Strategy
**Description**: Define a strategy to keep content synchronized with the repository while allowing for dynamic DB-based querying.
**Acceptance Criteria**:
- Technical plan for a synchronization hook (e.g., GitHub Action or script) to push MD updates to the DB.
- Satisfies "performance requirements" while maintaining "Content as Code" versioning.
- **Quote**: "Define a strategy to keep content synchronized with the repository while allowing for dynamic DB-based querying, satisfying both 'Content as Code' versioning and performance requirements."
**Reference**: Section "Hybrid Content & Localization Strategy" of specification.

### Operational Relational Models
### [x] Task 5: Commercial, Financial & Operational Model Drafting
**Description**: Draft relational models for SaaS-specific plans, financial ledgers, and operational logs.
**Acceptance Criteria**:
- Models include: `Commercial` (plans, pricing, subscriptions), `Financial` (ledgers, receipts), and `Operational` (leads, HR/Agent registries, execution logs).
- High-throughput task execution logs are optimized for write performance.
- **Quote**: "Draft relational models for: Commercial: SaaS-specific plans, pricing, and subscription lifecycle tracking. Financial: Transaction ledgers and receipt storage. Operational: Centralized lead management, HR/Agent registries, and high-throughput task execution logs."
**Reference**: Section "Cross-SaaS Operational Schema" of specification.

### Atomic API Integration
### [x] Task 6: API Contract Generation & Analysis
**Description**: Generate `API-Contract-Analysis.md` for all new DB-driven API endpoints to ensure they maintain atomic component contracts.
**Acceptance Criteria**:
- Documentation created for each new endpoint.
- Analysis confirms that "DB-driven data doesn't break component statelessness."
- **Quote**: "Generate API-Contract-Analysis.md for all new DB-driven API endpoints to maintain your atomic component contracts."
**Reference**: Section "Deliverables" of specification.

### Human Approval Gate Deliverables
### [x] Task 7: ERD Definition & Modification Impact Statement
**Description**: Create a definitive ERD and a Modification Impact Statement for human verification.
**Acceptance Criteria**:
- ERD demonstrates interaction between Users, Financials, Operational, and Content domains.
- Modification Impact Statement clearly outlines changes to the current file-based workflow.
- **Quote**: "A definitive ERD demonstrating how Users, Financials, Operational, and Content domains interact."
**Reference**: Section "Deliverables" and "Approval Gate" of specification.

### [x] Task 8: Migration Path Technical Plan
**Description**: Create a robust, step-by-step technical plan to transition existing Markdown files into the DB without breaking existing Git workflows.
**Acceptance Criteria**:
- Documented migration path approved by ArchitectAgent.
- Includes transition steps from file-based Markdown to DB dynamic querying.
- **Quote**: "A robust, step-by-step technical plan to transition existing Markdown files into the DB without breaking existing Git workflows."
**Reference**: Section "Deliverables" of specification.

## Quality Requirements
- [ ] Database structure must enhance rather than hinder the atomic modularity of the UI.
- [ ] All new DB-driven data must maintain component statelessness.
- [ ] No database provisioning or migrations until [APPROVED] by human gate.
- [ ] Include Playwright screenshot testing for any UI components affected by DB integration.

## Technical Notes
**Development Stack**: PostgreSQL (Neon/Supabase/PlanetScale Evaluation), JSONB, "Content as Code" workflows.
**Special Instructions**: Ensure DB-driven data doesn't break component statelessness.
**Human Approval Gate**: Present Modification Impact Statement and ERD Draft before proceeding.
