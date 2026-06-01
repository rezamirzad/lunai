Task Description: Blog UI Modernization & Grid Refactoring
TaskID: 260601-06-blog-ui-revamp
Objective: Refactor the current Blog component to match the professional, grid-based, multi-layout design displayed in image_d430f9.jpg.
Instructions:
Grid System Implementation:
Implement a sidebar navigation (left-aligned) for category filtering (AI, Product, Engineering, Changelog, etc.).
Implement a primary header section with a search bar and social/RSS icons.
Create a dynamic grid layout that switches between:
Feature Grid (Top): Two large side-by-side featured post cards with hero images.
Vertical Stream (Bottom): Alternating layouts of text-only posts and right-aligned image cards.
Component Architecture:
Decompose the Blog component into: BlogSidebar, BlogHeroCard, BlogStreamItem, and BlogCategoryFilter.
Statelessness: Ensure all these components receive their data via props from a BlogLayout parent.
Quality Gate: Generate [Component-Contract-Analysis.md] for each new UI element, specifically defining how images and content snippets are mapped.
UI/UX Fidelity:
Match the dark-mode aesthetic (black background, high-contrast white text, muted secondary text for metadata).
Implement the "category tag" styling (e.g., green for Engineering, blue for Product) as seen in image_d430f9.jpg.
Maintain the typography scale: Large hero headings, concise body snippets, and distinct metadata lines (Category + Date).
Content Integration:
Ensure the component supports the Database Strategy (Task 260601-02) by integrating with the contents and content_localizations tables for dynamic filtering by category and search terms.
Compliance & Documentation:
Task Registry: Initialize memory/tasks/260601-06-blog-ui-revamp/task-registry.md.
Modification Impact Statement: Document how this grid-based layout impacts mobile responsiveness (referencing Task 260601-04).
Human Approval Gate:
Pause execution after the Visual Mockup and Modification Impact Statement are ready. Do not begin refactoring the existing Blog.tsx until I reply with [APPROVED].
Suggested Agent Allocation:
ArchitectAgent: To design the grid layout and sidebar logic to handle category filtering.
DocumentationAgent: To define the visual specs and new prop contracts for the decoupled components.
ProjectManagerAgent: To orchestrate the refactoring of the existing file-based blog component into this new database-driven grid layout.
