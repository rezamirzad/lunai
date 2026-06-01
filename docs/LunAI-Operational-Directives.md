# LunAI Operational Directive: LunAI

## 1. The "Golden Rule" of Documentation

**No task is complete until the `/Users/rezamirzad/Documents/LunAI/LunAI/memory/tasks/[YYYYMMDD]-[SEQ]-[TaskSlug/` directory is updated and synced with the global learning log.**

Every action must follow the **Traceability Principle**:

0. **TaskID Format**: `[YYYYMMDD]-[SEQ]-[TaskSlug]`. (e.g., 260528-01-monorepo-migration)
1. **Task Initiation**: Documented in `/memory/tasks/[TaskID]/active-tasks.md`.
2. **Snapshot Protocol**: Before implementation, `/agency/engineering/engineering-git-workflow-master.md` creates a git tag `pre-[TaskID]-[SubTaskID]`.
   _(Note: Git tags are local to your machine and will not be pushed to GitLab unless you explicitly use `git push --tags`)_
3. **Consistency Audit (NEW)**: `/agency/specialized/specialized-workflow-architect.md` scans codebase for canonical patterns; results saved to `/memory/tasks/[TaskID]/canonical-patterns.md`.
4. **Implementation**: Performed by `/agency/engineering/engineering-senior-developer.md`, adhering strictly to `canonical-patterns.md`.
5. **Automated Test Generation**: `/agency/engineering/engineering-unit-test-builder.md` + `/agency/testing/testing-evidence-collector.md` generates tests and validates.
6. **Documentation Sweep**: `/agency/engineering/engineering-technical-writer.md` aggregates all outputs into `/memory/tasks/[TaskID]/reviews/[SubTaskID]-review.md`.
7. **Error Handling**: Bugs logged in `/memory/tasks/[TaskID]/error-learning-log.md` AND appended to global `/memory/learning.md`.
8. **Verification**: Signed off by `/agency/testing/testing-reality-checker.md`.
9. **Human in the loop**: All phase boundaries and architectural decisions require human `[APPROVED]` signal.
10. **Trace back**: Revert to git tag `pre-[TaskID]-[SubTaskID]`.

---

## 2. Step-by-Step Task Execution Protocol

### Step 0: Consistency and Debt Audit

**Agent**: `/agency/specialized/specialized-workflow-architect.md`

- **Action**: Scan for implementation patterns. If debt is encountered, append `[DEBT-IDENTIFIED]` to `active-tasks.md`.
- **Constraint**: Forbidden from introducing new patterns if canonical ones exist.
- **Documentation**: Create `/memory/tasks/[TaskID]/canonical-patterns.md`.
- **Human Approval**: **Wait for `[APPROVED]`** before dispatching developers.

### Step 1: Task Initialization

**Agent**: `/agency/project-management/project-management-task-steward.md`

- **Action**: Create `/memory/tasks/[TaskID]/task-registry.md`.
- **Snapshot**: Invoke `/agency/engineering/engineering-git-workflow-master.md` to create tag `pre-[TaskID]-init`.

### Step 2: Execution & Implementation

**Agent**: `/agency/engineering/engineering-senior-developer.md`

- **Pre-requisite**: Must ingest `canonical-patterns.md`.
- **Dispatch**: Break task into sub-tasks; dispatch via `/agency/specialized/agents-orchestrator.md`.
- **Constraint**: Any deviation from canonical patterns triggers a `human-in-the-loop` alert.

### Step 3: Deep Review & Validation

**Agent**: `/agency/engineering/engineering-code-reviewer.md` & `/agency/testing/testing-evidence-collector.md`

- **Action**: Static analysis, functional review, and test suite execution.
- **Documentation**: Append tests and results to `/memory/tasks/[TaskID]/reviews/[TaskID]-review.md`.
- **Documentation**: Append suggestions added to `/memory/tasks/[TaskID]/best-practices.md`.
- **Human Approval**: **Wait for `[APPROVED]`**.

### Step 4: Quality & Compliance Audit

**Agent**: `/agency/testing/testing-reality-checker.md`

- **Action**: Final integration scan and performance check.
- **Documentation**: Failures logged in `/memory/tasks/[TaskID]/audit-log.md`.

### Step 5: Error Documentation & Global Learning

**Agent**: `/agency/support/support-analytics-reporter.md`

- **Action**: Log error to task folder AND append to global `/memory/learning.md`.
- **Format**:
  - **_task_**: [TaskID]
  - **_Problem_**: [Description]
  - **_Root Cause_**: [Agent Analysis]
  - **_Resolution_**: [How it was fixed]
  - **_Lesson Learned_**: [How to prevent it in the future]

### Step 6: Final Sign-off & Closure

**Agent**: `/agency/specialized/specialized-chief-of-staff.md`

- **Action**: Final audit; Archive task; Global sign-off.

---

## 3. Monorepo & Modularity Standards

- **Atomic Components**: Agents must decompose applications into the smallest atomic, modular components.
- **Shared Packages**: Logic shared across apps must reside in `@workspace/shared` packages.
- **External Repo Imports**: When instructed to import/refactor a new repository:
  1. Analyze the structure.
  2. Define a plan to refactor into atomic/shared monorepo components.
  3. Submit the plan for `[APPROVED]` status.
- **Modification Impact Statement**: Before modifying/removing an existing feature, agents must submit a report detailing the "Why" and requesting `[APPROVED]` status.

### 3.1. Modularity & Parametrization Quality Gate

- **Atomic Requirement**: No component shall handle more than one domain responsibility. If a component grows beyond a single function/view, it **must** be decomposed.
- **Parametrization Mandate**: Components must be built as pure functions/objects that receive dependencies via props/arguments, not via hardcoded references or global state.
  - **Violation**: Any component utilizing a hardcoded path or environment-specific config internally (outside of injected configuration) is considered a "failed component" and must be refactored.
- **The "Interface Test"**: Before any component is committed to `/packages/`, the developer agent must generate a `[Component-Contract-Analysis.md]` documenting:
  1. **Inputs/Props**: Clearly defined interfaces.
  2. **Side-effects**: Are there any? (They should be zero).
  3. **Dependency Graph**: Does this component rely on parent-level logic? If yes, it is not sufficiently parametrized.
- **Human Approval**: The `engineering-code-reviewer` must explicitly sign off on the `[Component-Contract-Analysis.md]` before moving the component into the shared workspace.
