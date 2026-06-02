Task Description: Apple-Style Design & Modular UI Refactor
TaskID: 260602-01-apple-style-ui
Objective: Refactor your blog and landing components to adopt the high-fidelity, grid-based, modular aesthetic seen in image_5912a0.jpg, ensuring a premium, minimal, and typography-first visual experience.
Instructions:
Visual Language Modernization:
Typography: Transition to a clean, high-contrast typography scale. Titles should be bold and prominent with refined spacing (negative space is key).
Color Palette: Standardize on a "Deep Black/Dark Mode" base with bright, high-impact accents for call-to-action elements (e.g., Apple-style "blue" links/buttons).
Component Modularity: Adopt the card-based layout seen in image_5912a0.jpg, where information is contained in distinct, softly-rounded dark gray modules.
Blog & Landing Page Architecture:
Hero Section: Rebuild your landing page hero to feature a high-impact, central graphical element followed by a bold title and date, mirroring the structure in image_5912a0.jpg.
Action-Centric Modules: Refactor your content blocks into "Action Cards." Each card must feature:
A clear, high-quality icon representing the content type.
A concise, bold headline.
A clear, descriptive sub-text.
Actionable links (e.g., "Add to calendar", "Watch video").
Call-to-Action (CTA) Standardization: Ensure all CTAs follow the Apple design pattern (blue text with a chevron >) for consistency and familiarity.
Atomic Component Refactoring:
Update @workspace/ui to include a ModularCard component that supports both "Hero" (full-width) and "Grid" (half-width) variations.
Ensure all iconography is consistent, modern, and aligned with the "state of the union" aesthetic seen in image_5912a0.jpg.
Compliance & Documentation:
Task Registry: Initialize memory/tasks/260602-01-apple-style-ui/task-registry.md.
Design Tokens: Update packages/shared/styles/design-tokens.ts to include the specific spacing, border-radius, and typography scales required for this aesthetic.
Component Contract Analysis: Generate [Component-Contract-Analysis.md] for the new ModularCard and HeroHeader components.
Human Approval Gate:
Pause execution after the Visual Audit and Component Contract Analysis are ready. Do not begin mass refactoring until I reply with [APPROVED].
Suggested Agent Allocation:
ArchitectAgent: To design the modular grid layout and ensure the "card-based" interaction works seamlessly on both desktop and mobile.
DocumentationAgent: To update docs/canonical-patterns.md with the new Apple-inspired design standards.
ProjectManagerAgent: To oversee the phased rollout of these new components, starting with the Blog main view.
