# Migration Analysis: Monorepo Transition & Atomic Reorganization

## 1. Target Directory Structure
The repository will transition from a flat/mixed structure to a formal monorepo using **Turborepo** or **npm/yarn/pnpm workspaces**.

```text
lunai/
├── apps/
│   ├── web/                # Moved from legacy /frontend
│   └── api/                # Moved from legacy /backend
├── packages/
│   ├── ui/                 # Shared atomic components (stateless)
│   ├── shared/             # Shared TypeScript interfaces & utility logic (pure)
│   └── config/             # Shared ESLint, Prettier, and Tailwind configurations
├── docs/                   # Centralized documentation (inc. NEXUS-OPERATIONAL-DIRECTIVE.md)
├── memory/
│   └── tasks/              # Project-specific task tracking and ADRs
└── package.json            # Root configuration (hoisted dependencies)
```

### Trade-off Analysis:
- **Pros**: Clear separation of concerns, improved build times (caching), easier dependency management.
- **Cons**: Initial migration overhead, increased complexity in local development setup.

## 2. Path Alias Strategy
To ensure decoupled development and seamless migration, all cross-package imports will use the `@workspace/` prefix.

| Alias | Target | Purpose |
| :--- | :--- | :--- |
| `@workspace/ui/*` | `packages/ui/src/*` | Atomic UI components |
| `@workspace/shared/*` | `packages/shared/src/*` | Types, Constants, Utils |
| `@workspace/web/*` | `apps/web/src/*` | Frontend application logic |
| `@workspace/api/*` | `apps/api/src/*` | Backend application logic |

*Implementation Detail*: Root-level `tsconfig.base.json` will define these paths, with individual `tsconfig.json` files extending it.

## 3. Shared Package Strategy
Shared logic must adhere to the **Functional Core, Imperative Shell** principle.

### `packages/shared`
- **Interfaces**: Canonical TypeScript types used by both API and Web (e.g., `User`, `Project`).
- **Utilities**: Pure functions (e.g., `formatDate`, `validateEmail`) with zero side effects.
- **Statelessness**: No global stores or singleton instances allowed here.

### `packages/ui` (The Atomic Core)
- **Component Anatomy**: Every component in this package must be "dumb".
- **Interaction Pattern**: No `useEffect` fetching or internal `useState` that captures business logic.
- **Theming**: Controlled via CSS variables or shared configuration passed through props/Context.
