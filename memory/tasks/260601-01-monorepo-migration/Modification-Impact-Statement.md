# Modification Impact Statement: Architectural Shift

## 1. Breakdown of Moving Parts

### Phase 1: Structural Reorganization
- **Legacy Migration**: Physical relocation of files from root to `apps/web` and `apps/api`.
- **Dependency Hoisting**: Consolidating duplicate versions of `react`, `typescript`, and `eslint` into the root node_modules.
- **Documentation Relocation**: Moving `NEXUS-OPERATIONAL-DIRECTIVE.md` to `docs/` to signal a shift toward centralized governance.

### Phase 2: Atomic Refactoring
- **Component Extraction**: Extracting low-level primitives (Button, Input, Section) from existing monolithic components (`Contact.tsx`, `Hero.tsx`).
- **Logic Decoupling**: Moving data manipulation logic out of component files and into `packages/shared`.

## 2. Shift in State Management: Prop-Driven Design

We are moving away from **Localized Implicit State** toward **Centralized Explicit State (Prop-Drilling)**.

### Before:
Components like `Contact.tsx` handle their own form state, validation, and submission logic internally. This makes them non-reusable and difficult to test in isolation.

### After:
- **`packages/ui/ContactForm`**: A pure UI component that accepts `values`, `errors`, `isSubmitting`, and `onSubmit` as props.
- **`apps/web/ContactPage`**: The "Smart" parent that manages the form state (using Formik/React Hook Form) and passes everything down.

**Pragmatic Trade-off**: This increases the "Boilerplate" in parent components but makes the UI layer extremely stable and visually testable (e.g., via Storybook).

## 3. Projected Gains

### Performance
- **Tree Shaking**: Moving to atomic components allows the bundler to only include the exact primitives used on a page.
- **Build Speed**: Turborepo caching will ensure that if `packages/shared` hasn't changed, its builds and tests are skipped during CI.
- **Payload Reduction**: Shared UI logic prevents duplication of CSS and utility functions across multiple apps.

### Maintainability
- **Standardization**: A single source of truth for UI (Design System) ensures visual consistency across `web`, `admin`, and future apps.
- **Testability**: Stateless components are trivial to unit test with Vitest/Jest as they rely solely on input props.
- **Onboarding**: The new structure mirrors industry-standard monorepo patterns (Vercel/Meta), reducing "ramp-up" time for new developers.
