# Canonical Patterns

## Monorepo Structure
- **Apps**: All deployable applications and services reside in `/apps/` (e.g., `/apps/frontend`, `/apps/backend`).
- **Packages**: Shared code, components, and utilities reside in `/packages/` (e.g., `/packages/shared`).

## Shared Code
- **Components**: Shared UI components are extracted to `/packages/shared/components/` so they can be consumed by multiple apps.
- **Utilities**: Shared business logic and helper functions are extracted to `/packages/shared/utils/`.
- **Types**: Shared TypeScript types are maintained in `/packages/shared/types/`.

## Dependency Management
- **Hoisting**: Common `devDependencies` such as `typescript`, `eslint`, and global type definitions (e.g., `@types/node`) are hoisted to the root `package.json` to ensure consistency and speed up installations.
- **Path Aliases**: Applications consume shared packages via TypeScript path aliases (e.g., `@workspace/shared/*`).
