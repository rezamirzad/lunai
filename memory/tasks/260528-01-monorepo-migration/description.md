Agent Prompt: Execution of Monorepo Reorganization
TaskID: 260528-01-monorepo-migration
Instructions:
Directory Migration:
Create the required directories: apps/, packages/, memory/tasks/, docs/.
the /backend and /frontend are the main company landing site.
Move /frontend/ and /backend/ into /apps/.
add shared components, like navbar, about, contact, etc, that can be used in the main app and the subprojects
Move the NEXUS-OPERATIONAL-DIRECTIVE.md (which you will create in /docs/) to its home.
Constraint: Do not delete original code; verify all imports remain functional (or fix them via path aliases).
Package Consolidation (The "Shared" Gate):
Analyze /apps/frontend/src/lib/utils.ts and any duplicated backend types.
Extract this logic into /packages/shared/utils/ and /packages/shared/types/.
Apply the Quality Gate: For every extracted component, generate a [Component-Contract-Analysis.md] in the task folder.
Dependency Harmonization:
Hoist shared dependencies (e.g., typescript, eslint, prettier) from apps/_/package.json to the root package.json.
Update tsconfig.json in each /apps/ directory to include path aliases pointing to @workspace/shared/_.
Compliance & Documentation:
Task Registry: Initialize /memory/tasks/260528-01-monorepo-migration/task-registry.md.
Canonical Patterns: Draft the initial canonical-patterns.md based on the current implementation.
Modification Impact Statement: Before finalizing the file moves, output the statement detailing the impact of these changes.
Wait for Human Approval:
Pause execution after Migration Analysis and the Modification Impact Statement.
Do not finalize the Git moves or delete legacy paths until I reply with [APPROVED].
