# Global Learning & Standards: Project LunAI

## 1. Monorepo Canonical Pattern (ESTABLISHED 2026-05-31)
The project is standardized on a **Turborepo + pnpm** architecture to ensure scalable builds, centralized configuration, and high-performance dependency management.

### Workspace Hierarchy
- **`apps/*`**: Consumer-facing applications (Next.js 15+, React 19).
- **`packages/*`**: Shared internal libraries and configurations.
  - `ui`: Shared Shadcn UI component library (Source-transpiled).
  - `shared`: Shared utilities, types, and cross-cutting logic.
  - `eslint-config`: Centralized linting rules.
  - `typescript-config`: Base TS configurations.

### UI Component Standards (NEXUS Compliance)
- **Modularity**: Components in `packages/ui` must be 100% stateless and purely functional.
- **Parametrization**: Zero hardcoding. All content and visual states (e.g., toggles) must be injected via props.
- **Injection**: Use the Shadcn UI pattern to inject components from consuming apps into the shared `ui` package using path aliases.
- **Transpilation**: Avoid pre-compiling shared packages; use `transpilePackages` in `next.config.js`.

### Tooling Standards
- **Next.js**: Version 15+ (App Router).
- **React**: Version 19+.
- **Tailwind CSS**: Version 4.0+.
- **Package Manager**: pnpm.

## 2. Decision Log
- **2026-05-31**: Transitioned from `npm` workspaces to `pnpm` and `Turborepo` for better `workspace:` protocol support and build caching.
- **2026-05-31**: Adopted "Flat UI" structure in `packages/ui/src/components` to align with canonical Shadcn UI and Next.js 15 patterns.
