Agent Prompt: Execution of Monorepo Reorganization & Atomic Modularization
TaskID: 260601-01-monorepo-migration
Task Description:
Reorganize the repository into a high-performance monorepo, prioritizing atomic component design. Every shared UI element (Navbar, Hero, Blog, Contact, etc.) must be refactored into "dumb" atomic parts—decoupled from internal logic—with all state, configuration, and parameters managed exclusively by the calling parent component.

Instructions:
Directory Migration:
Initialize: apps/, packages/, memory/tasks/, docs/.
Move legacy /frontend and /backend into apps/.
Move NEXUS-OPERATIONAL-DIRECTIVE.md to docs/.
Constraint: Ensure all legacy imports are mapped via path aliases (@workspace/\_).

Atomic Modularization (The Core Shift):
Decompose all complex components into atomic parts (e.g., Button, Input, Card, Section).
Prop-Driven Design: Strip internal state from shared components. All parameters (data, callbacks, themes) must be passed down from the calling parent (e.g., page.tsx or AppLayout.tsx).
Quality Gate: For every component extracted, generate a [Component-Contract-Analysis.md] in the task folder detailing the exact props/contracts required.

Package Consolidation (The "Shared" Gate):
Extract utility logic (lib/utils.ts) and TypeScript interfaces into packages/shared/.
Ensure all shared logic is pure, stateless, and fully typed for use across both apps/ and packages/.

Dependency Harmonization:
Hoist dev-dependencies (TypeScript, ESLint, Prettier) to the root package.json.
Standardize tsconfig.json across all apps/ to resolve @workspace/shared/\_.

Compliance & Documentation:
Task Registry: Initialize memory/tasks/260528-01-monorepo-migration/task-registry.md.
Canonical Patterns: Define strict guidelines for atomic prop-drilling and stateless component design.
Modification Impact Statement: Document the breakdown of moving parts, the shift in state management, and the projected performance gains.

Human Approval Gate:
Pause execution after the Migration Analysis and Modification Impact Statement are generated. Do not execute git mv or delete legacy files until I reply with [APPROVED].
