Task Description: MVP FNDR Lead Finder Engine
TaskID: 260603-01-fndr-mvp
Objective: Develop the FNDR micro-SaaS as an integrated module within the LunAI monorepo, enabling keyword-based lead discovery across LinkedIn and Reddit, with AI-driven analysis via Gemini.
Instructions:
Architecture & Scaffolding (/apps/fndr):
Initialize the FNDR app using the LunAI monorepo standard (Next.js + Drizzle + Supabase).
Atomic UI: Import and use components from @workspace/ui (buttons, cards, inputs) to ensure visual parity.
Dashboard Integration: Add a "FNDR" navigation item to the central Admin Dashboard Navbar.
Lead Discovery Engine (Backend):
Implement an API endpoint in apps/api (or a serverless function in apps/fndr) that accepts keywords.
Integrate web-scraping/API services for LinkedIn and Reddit to return post/message metadata.
Store raw results in your database under a new leads table.
AI Analysis Workflow (Gemini Integration):
Data Serialization: Transform retrieved leads into a structured JSON payload.
Analysis Action: Implement a "Analyze with Gemini" button in the FNDR dashboard.
API Pipeline: Send the payload to the Gemini API and process the returned JSON response.
Presentation Layer:
Display the analyzed data in a DataTable component from @workspace/ui.
Ensure the table is responsive and uses the "Apple-style" aesthetics defined in Task 260602-01 (modular cards, high-contrast text).
Compliance & Documentation:
Authentication: Use the shared Neon/Supabase identity layer defined in your Unified Identity Layer (Task 260601-02).
Task Registry: Initialize memory/tasks/260603-01-fndr-mvp/task-registry.md.
Component Contract Analysis: Define the interface for the LeadTable and KeywordInput components.
Human Approval Gate:
Pause execution after the Database Schema (leads table) and API Route Structure are ready. Do not begin implementing the UI components until I reply with [APPROVED].
Suggested Agent Allocation:
ArchitectAgent: To design the schema for the leads table and ensure it respects your unified identity layer.
ProjectManagerAgent: To oversee the integration of the "FNDR" link into the main dashboard and ensure atomic component reuse.
DocumentationAgent: To record the Gemini analysis contract in API-Contract-Analysis.md.
