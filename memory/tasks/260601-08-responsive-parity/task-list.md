# Responsive UI Parity & Component Normalization (Task 260601-08) - Development Tasks

## Specification Summary
**Original Requirements**: "Achieve 100% UI and functional parity between desktop, tablet, and mobile layouts by refactoring @workspace/ui components to be 'responsive-native'."
**Core Principle**: "Never-Hide-Functionality" - ensure all desktop features are available on mobile.
**Technical Stack**: React, Tailwind CSS, @workspace/ui.

## Development Tasks

### Phase 2: Technical Architecture & Audit
#### [x] Task 2.1: Responsive Audit & Component Normalization Plan
**Description**: Audit components hidden on mobile (language selector, secondary nav, search). Plan refactor to use Responsive Containers instead of conditional rendering (`isMobile` logic).
**Acceptance Criteria**: 
- Audit report documented in task folder.
- List of components to refactor identified.

#### [x] Task 2.2: Mobile Drawer Architecture
**Description**: Design a Mobile Drawer / Hamburger Menu pattern that retains all desktop functionalities (Language Switcher, User Profile, SaaS Navigation).
**Acceptance Criteria**: 
- Design spec for Drawer component defined.

#### [x] Task 2.3: Component Contract Analysis
**Description**: Update `API-Contract-Analysis.md` to ensure state transitions (like opening the mobile menu) are handled through atomic prop drills.
**Acceptance Criteria**:
- Contract documentation updated for Navbar and Drawer.

#### [x] Task 2.4: Canonical Patterns Update
**Description**: Update `docs/canonical-patterns.md` with "Mobile-First Component Anatomy" rules, emphasizing the "Never-Hide-Functionality" principle.
**Acceptance Criteria**:
- Documentation updated and committed.

### Phase 3: Development & QA Loop

#### [x] Task 3.1: Refactor Navbar.tsx & Footer.tsx
**Description**: Refactor Navbar and Footer to include the language selector and previously hidden items in a responsive-native way.
**Acceptance Criteria**:
- Navbar/Footer contain all desktop links on all viewports.
- Language selector is functional on mobile.

#### [x] Task 3.2: Implement Mobile Drawer / Hamburger Menu
**Description**: Create the mobile-first navigation drawer that houses all site-wide functional triggers.
**Acceptance Criteria**:
- Drawer opens/closes correctly.
- Drawer contains all required functionalities (Language, User, Nav).

#### [x] Task 3.3: ResponsiveGrid Refactoring
**Description**: Ensure AdminPanel and dashboards use a `ResponsiveGrid` that collapses/stacks columns logically.
**Acceptance Criteria**:
- Grid behaves correctly on tablet and mobile.

#### [x] Task 3.4: Touch Target & Spacing Optimization
**Description**: Enforce 44x44px touch targets. Refactor CSS to use Fluid Typography and Dynamic Grid Spacing.
**Acceptance Criteria**:
- All interactive elements meet touch target standards.
- Typography scales fluidly across viewports.

### Phase 4: Final Integration & Compliance

#### [x] Task 4.1: Modification Impact Statement
**Description**: Detail the refactoring of Navbar.tsx and Footer.tsx to include the language selector and hidden navigation items.
**Acceptance Criteria**:
- Statement saved in task folder.

## 🛑 HUMAN APPROVAL GATE
> Pause execution after Phase 2 (Responsive Audit and Component Contract Analysis are prepared). Do not deploy the refactored @workspace/ui library until I reply with [APPROVED].

## Quality Requirements
- [ ] 100% functional parity across all viewports.
- [ ] No `isMobile` conditional rendering for functional components.
- [ ] Minimum 44x44px touch targets.
- [ ] Mobile-first responsive-native architecture.
