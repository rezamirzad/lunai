# Modification Impact Statement: Blog Grid Refactoring
**Task ID**: 260601-06-blog-ui-revamp
**Reference Task**: 260601-04 (Mobile Responsiveness)
**Architect**: ArchitectUX

## 1. Executive Summary
The transition from a single-column markdown list to a multi-layout grid system significantly alters the DOM structure and responsive behavior of the Blog section. This statement outlines the strategy for maintaining high fidelity across all breakpoints defined in `docs/mobile-first-architecture.md`.

---

## 2. Structural Changes

### 2.1 Sidebar Behavior
- **Desktop (>=1024px)**: Fixed left-aligned sidebar (`width: 250px`).
- **Tablet (768px - 1023px)**: Sidebar collapses into a horizontal category scroll bar below the main header.
- **Mobile (<768px)**: Sidebar becomes a "Filter" button that triggers a bottom-sheet or full-screen drawer for category selection.

### 2.2 Grid Collapse Strategy
- **Feature Grid (Top)**:
  - **Desktop**: 2-column grid (`1fr 1fr`).
  - **Mobile/Tablet**: 1-column stack. Hero heading size reduces by 20%.
- **Vertical Stream (Bottom)**:
  - **Desktop**: `right-image` layout shows image at 30% width.
  - **Mobile**: All `right-image` layouts convert to `image-top` vertical stacks to ensure readability and image prominence.

---

## 3. Performance & Asset Impact
- **Image Density**: The new `BlogHeroCard` uses high-resolution cover images. We will implement `loading="lazy"` and use responsive `sizes` attributes to prevent LCP degradation on mobile.
- **Typography**: Shift from standard `prose` to a more structured typography scale. Metadata (Category + Date) will use `text-xs` on mobile and `text-sm` on desktop.

---

## 4. Accessibility (WCAG 2.1)
- **Contrast**: Ensuring the "muted secondary text" (`#666666`) meets the 4.5:1 ratio against the black background for small text. We may need to bump this to `#A1A1AA`.
- **Touch Targets**: All category filters in the sidebar and tags will have a minimum hit area of `44px` even if the visual tag is smaller.

---

## 5. Risk Mitigation
- **Legacy Content**: Posts without a `cover_image` will fall back to a "Teal Gradient" abstract background to maintain grid visual consistency.
- **Draft Status**: Ensure the migration from file-based to database-driven doesn't accidentally expose `draft: true` posts.
