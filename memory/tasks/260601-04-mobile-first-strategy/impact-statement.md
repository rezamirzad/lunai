# Modification Impact Statement: Mobile-First Strategy

## 1. Audit Report: @workspace/ui Responsiveness Gaps

Following the responsive audit of the `@workspace/ui` library against the `mobile-first-architecture.md` standards, the following gaps have been identified:

### Atomic Components
| Component | Gap | Impact |
| :--- | :--- | :--- |
| **Button** | `sm` and `md` sizes do not meet the 44px touch target requirement (~32px and ~40px respectively). | Poor accessibility and UX on touch devices. |
| **Button** | Lacks native `mobileFullWidth` prop support. Developers currently use manual Tailwind classes (e.g., `w-full md:w-auto`). | Inconsistent implementation and extra boilerplate in applications. |
| **Input** | Hardcoded `w-full` class. | Restrictive for desktop layouts where inputs might not need to be full-width. |
| **Section** | Fixed `py-24` (96px) padding is too large for mobile screens. | Wastes valuable viewport space on small devices. |
| **Card** | **MISSING**. Component is mentioned in the registry but does not exist in the library. | Blocks development of standardized card-based layouts. |

### Application Level (apps/web)
- **Navigation**: The `Navbar` component lacks a mobile-first "hamburger" menu. It currently shrinks font sizes for mobile, leading to poor readability and touch targets.
- **Consistency**: Many components use ad-hoc responsive classes instead of standardized props from the UI library.

---

## 2. Impact on @workspace/ui

The transition to a Mobile-First strategy will require:
1.  **Breaking Changes in Prop Definitions**: Adding responsive props (e.g., `mobileFullWidth`) to all atomic components.
2.  **Style Refactor**: Updating padding and font-size scales to ensure 44px touch targets are met by default or via accessible alternatives.
3.  **New Component Creation**: Implementing the missing `Card` component following the new architecture.
4.  **Layout Protocol Enforcement**: Moving from global CSS resets to component-level responsive logic.

---

## 3. Migration Plan for apps/web

To update legacy code in `apps/web` without causing regression:

### Step 1: Component Refactor (Packages)
- Update `Button`, `Input`, and `Section` in `@workspace/ui`.
- Create `Card` in `@workspace/ui`.

### Step 2: Incremental Replacement
- Replace manual `w-full md:w-auto` patterns in `Hero.tsx` and other pages with `<Button mobileFullWidth />`.
- Refactor `Navbar` to implement a mobile-responsive drawer/menu.

### Step 3: Layout Standardization
- Wrap all page-level content in the updated `Section` component that handles responsive vertical padding.
- Standardize grid layouts using the new `Grid/Flexbox Layout Protocol`.

### Step 4: Verification
- Execute Playwright regression tests across the device testing matrix (iPhone 15 Pro, iPad Air, Surface Pro).
- Audit Lighthouse mobile performance scores.
