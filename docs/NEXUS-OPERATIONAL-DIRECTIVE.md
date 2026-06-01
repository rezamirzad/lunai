# NEXUS Operational Directive: LunAI Monorepo Standards

## 1. Architectural Philosophy
The LunAI ecosystem operates on a **Hub-and-Spoke** architecture.
- **Hub (`apps/hub`)**: Central gateway for global orchestration and branding.
- **Spokes**: Vertical modular applications for specific functionality.
- **Data Layer (Neon)**: Unified PostgreSQL infrastructure for identity, content delivery, and agentic telemetry.

## 2. Shared Workspace Standards
- **Path Aliases**: Mandatory use of `@workspace/*` for shared libraries.
- **Logic Extraction**: Any utility or type shared between 2 or more applications must reside in `packages/shared`.
- **UI Components**: Must be stateless and reside in `packages/ui`.

## 3. The Quality Gate
No task is complete until the `/memory/tasks/[TaskID]/` directory is updated with:
1. `task-registry.md`
2. `modification-impact-statement.md` (for infra changes)
3. `component-contract-analysis.md` (for new UI components)

## 4. Development Workflow
1. **Hoisted Tools**: Use root level `turbo` for dev/build orchestration.
2. **Environment**: All apps must support `light/dark/system` themes via design tokens.
3. **Traceability**: Every action must follow the TaskID format: `[YYYYMMDD]-[SEQ]-[TaskSlug]`.
