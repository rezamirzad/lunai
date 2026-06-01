# Monorepo Reorganization & Atomic Modularization Task List

## Specification Summary
**Original Requirements**: 
- "Reorganize the repository into a high-performance monorepo, prioritizing atomic component design."
- "Every shared UI element... must be refactored into 'dumb' atomic parts—decoupled from internal logic."
- "Initialize: apps/, packages/, memory/tasks/, docs/."
- "Ensure all legacy imports are mapped via path aliases (@workspace/_)."

**Technical Stack**: 
- Monorepo structure (apps/, packages/)
- React/Next.js (implied by frontend components like Navbar, Hero, page.tsx)
- TypeScript (Path aliases, interfaces)
- Hoisted dev-dependencies (ESLint, Prettier)

## Development Tasks

### Directory Migration

### [x] Task 1.1: Initialize Monorepo Structure
**Description**: Create the core directory structure and move documentation.
**Acceptance Criteria**: 
- Directories `apps/`, `packages/`, `memory/tasks/`, and `docs/` exist.
- `NEXUS-OPERATIONAL-DIRECTIVE.md` moved to `docs/`.
- Legacy files moved to `apps/web` and `apps/api`.
**Reference**: Directory Migration section of specification.

### [x] Task 1.2: Migrate Legacy Applications
**Description**: Move legacy `/frontend` and `/backend` into the `apps/` directory.
**Acceptance Criteria**: 
- `/frontend` moved to `apps/web`.
- `/backend` moved to `apps/api`.
**Reference**: Directory Migration section of specification.

### [x] Task 1.3: Configure Path Aliases
**Description**: Setup `tsconfig.json` at the root and in apps to map `@workspace/*`.
**Acceptance Criteria**: 
- tsconfigs define paths for `@workspace/shared` and `@workspace/ui`.
- Legacy imports are mapped to the new structure.
**Reference**: Directory Migration: "Ensure all legacy imports are mapped via path aliases (@workspace/_)."

### Atomic Modularization (The Core Shift)

### [x] Task 2.1: Decompose UI Components into Atomic Parts
**Description**: Refactor Navbar, Hero, Blog, Contact into atomic parts (Button, Input, Card, Section).
**Acceptance Criteria**: 
- Shared components stripped of internal state.
- Components are "dumb" and decoupled from logic.
- New components created in `packages/ui`.
**Reference**: Atomic Modularization: "Decompose all complex components into atomic parts."

### [x] Task 2.2: Implement Prop-Driven Design
**Description**: Pass all state, config, and parameters from parents (page.tsx/AppLayout.tsx).
**Acceptance Criteria**: 
- Components receive `data`, `callbacks`, and `themes` via props.
- No `useState` or internal data fetching in shared atomic components.
**Reference**: Atomic Modularization: "Prop-Driven Design: Strip internal state from shared components."

### [x] Task 2.3: Generate Component Contract Analysis
**Description**: For every extracted component, create a documentation file in the task folder.
**Acceptance Criteria**: 
- `[Component-Contract-Analysis.md]` exists for each new atomic component.
- Documents exact props and contracts required.
**Reference**: Atomic Modularization: "Quality Gate: For every component extracted, generate a [Component-Contract-Analysis.md]..."

### Package Consolidation

### [x] Task 3.1: Initialize Shared Package
**Description**: Create `packages/shared/` and extract utility logic.
**Acceptance Criteria**: 
- `lib/utils.ts` logic moved to `packages/shared/utils`.
- TypeScript interfaces moved to `packages/shared/types`.
- Logic is pure, stateless, and fully typed.
**Reference**: Package Consolidation: "Extract utility logic (lib/utils.ts) and TypeScript interfaces into packages/shared/."

### Dependency Harmonization

### [x] Task 4.1: Hoist Dev-Dependencies
**Description**: Move shared tools to the root `package.json`.
**Acceptance Criteria**: 
- TypeScript, ESLint, and Prettier are in the root `devDependencies`.
- Sub-packages use the hoisted versions.
**Reference**: Dependency Harmonization: "Hoist dev-dependencies... to the root package.json."

### [x] Task 4.2: Standardize Build Configuration
**Description**: Ensure consistent `tsconfig.json` resolution for `@workspace/shared`.
**Acceptance Criteria**: 
- All `apps/` resolve shared packages correctly during build and dev.
**Reference**: Dependency Harmonization: "Standardize tsconfig.json across all apps/..."

### Compliance & Documentation

### [x] Task 5.1: Define Canonical Patterns
**Description**: Create a documentation file for atomic prop-drilling and stateless design.
**Acceptance Criteria**: 
- `docs/canonical-patterns.md` contains strict guidelines.
- Examples of "correct" vs "incorrect" component design included.
**Reference**: Compliance & Documentation: "Canonical Patterns: Define strict guidelines..."

### [x] Task 5.2: Generate Modification Impact Statement
**Description**: Document the breakdown of changes and performance gains.
**Acceptance Criteria**: 
- Document detailing moving parts and state management shift.
- Projected performance gains listed.
**Reference**: Compliance & Documentation: "Modification Impact Statement: Document the breakdown..."

## Quality Requirements
- [x] Atomic components are 100% stateless (except for local UI state if absolutely necessary).
- [x] Path aliases (@workspace/*) are used consistently.
- [x] All shared logic is pure and fully typed.
- [x] Documentation exists for every component contract.

## Technical Notes
**Development Stack**: React, Next.js, Node.js, TypeScript.
**Special Instructions**: Completed migration and atomic reorganization. Functional parity maintained.
**Timeline Expectations**: Task completed successfully.
