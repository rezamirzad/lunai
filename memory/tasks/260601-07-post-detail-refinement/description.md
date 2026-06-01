TaskID: 260601-07-post-detail-refinement
Objective: Architect and implement the "Post Detail" page to match the reading experience in image_d4307f.jpg, ensuring a distraction-free, high-fidelity environment.
Instructions:
Layout Architecture (The "Reading Mode"):
Implement a Max-Width Container for body content to ensure optimal line length (readability).
Design a dedicated Metadata Bar under the title: displaying category tags, date, estimated reading time, and author avatar/name.
Implement a Sticky Table of Contents (TOC) on the right-hand side that highlights the current section as the user scrolls.
Atomic Component Decomposition:
Break the post view into: PostHeader, PostBody (with support for Markdown parsing), PostAuthorCard, and PostNavigation (Next/Previous post links).
Statelessness: Ensure the PostPage acts as the sole parent, fetching data from the database (via the @workspace/api) and passing it down to these atomic components.
UI/UX Fidelity (Fidelity to image_d4307f.jpg):
Maintain the high-contrast aesthetic: Dark background, large serif or clean sans-serif typography for headings.
Ensure Code Block Styling is prominent, with subtle line numbers and language labels.
Add "Share" and "Save" interactive buttons integrated with your SSO identity layer (Task 260601-03).
Database & API Integration:
Connect the PostDetail page to the contents and content_localizations tables.
Implement View Counting logic: Update a view_count column in the database asynchronously when a post is fully loaded.
Compliance & Documentation:
Task Registry: Initialize memory/tasks/260601-07-post-detail-refinement/task-registry.md.
Component Contract Analysis: Generate [Component-Contract-Analysis.md] for the new PostHeader and TOC components.
Modification Impact Statement: Document the routing transition from the listing page (Task 260601-06) to the detail page.
Human Approval Gate:
Pause execution after the Functional Mockup and Component Contracts are prepared. Do not implement the Next.js App Router dynamic routes until I reply with [APPROVED].
Suggested Agent Allocation:
ArchitectAgent: To design the grid system (Content + Sidebar) and ensure the responsiveness of the TOC.
DocumentationAgent: To define the API contracts for fetching a single post by slug from the database.
ProjectManagerAgent: To oversee the transition from the grid-based blog stream (Task 260601-06) to this individual view.
