Task Description: Neon UI Integration & Atomic Refactoring
TaskID: 260601-05-neon-ui-integration
Objective: Integrate the Neon UI library into the @workspace/ui package and refactor all atomic components to align with the Neon visual standard.
Instructions:
Library Integration:
Install and configure the Neon UI library (or relevant Tailwind-based component kit) within the monorepo root.
Establish the theme configuration (colors, typography, spacing) within packages/shared/styles/ to ensure the "Teal & Black" brand identity is preserved.
Atomic Component Alignment:
Map legacy atomic primitives (Button, Input, Card, etc.) in @workspace/ui to their Neon counterparts.
"Dumb" Component Wrapping: Ensure all Neon components remain strictly prop-driven. Do not import internal Neon logic directly into application pages; route all requests through the @workspace/ui wrapper components to maintain decoupling.
Make a report of ALL the neon ui atomic components and add ons
Responsive Harmonization:
As part of the refactoring, enforce the mobile-first strategy (Task 260601-04) within every Neon component integration.
Compliance & Documentation:
Task Registry: Initialize memory/tasks/260601-05-neon-ui-integration/task-registry.md.
Component Contract Update: For every component refactored, generate a [Component-Contract-Analysis.md] updating the prop definitions to match the new Neon interface.
Style Guide: Update docs/canonical-patterns.md to include guidelines on how to extend Neon components without breaking the design system.
Modification Impact Statement:
Document the changes required to legacy components and the expected visual consistency improvements.
Human Approval Gate:
Pause execution after the Visual Audit and Modification Impact Statement are generated. Do not finalize the refactoring of the entire codebase until I reply with [APPROVED].
