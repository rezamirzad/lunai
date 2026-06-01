Task Description: Universal Mobile & Tablet Responsiveness Strategy
TaskID: 260601-04-mobile-first-strategy
Objective: Architect a "Mobile-First" design system that enforces universal responsiveness for the main landing site (apps/web) and all future project dashboards.
Instructions:
Atomic Responsive Design:
Audit the current @workspace/ui library. Every atomic component (Button, Card, Section, Input) must be refactored to support fluid breakpoints (mobile, tablet, desktop).
Define a global set of Canonical Breakpoints in packages/shared/styles/breakpoints.ts to ensure consistency across all apps.
Layout Engine Standardization:
Establish a Grid/Flexbox Layout Protocol that forces developers to use responsive wrappers by default.
Component-level logic must be stateless, with layouts determined by the parent component’s responsive context (e.g., passing mobileFullWidth={true} as a prop).
Performance Optimization for Touch:
Ensure all interactive elements (buttons, navigation items) meet minimum touch-target size requirements (minimum 44x44px).
Implement Lazy Loading for non-critical assets on mobile to maintain high Lighthouse performance scores.
Compliance & Validation:
Task Registry: Initialize memory/tasks/260601-04-mobile-first-strategy/task-registry.md.
Canonical Patterns: Document "Mobile-First Component Anatomy," detailing how to handle complex desktop tables/dashboards on mobile screens.
Device Testing Matrix: Define a list of test targets (e.g., iPhone 15 Pro, iPad Air, Surface Pro) for automated regression testing.
Modification Impact Statement:
Output a statement detailing the impact on the existing @workspace/ui components and the plan to update the legacy /frontend code (now apps/web).
Human Approval Gate:
Pause execution after the Responsive Audit and Modification Impact Statement are generated. Do not begin mass refactoring until I reply with [APPROVED].
