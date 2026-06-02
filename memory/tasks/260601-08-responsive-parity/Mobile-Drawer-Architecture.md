# Mobile Drawer Architecture

## Overview
The `MobileDrawer` is a responsive-native component that provides full functional parity for mobile users. It replaces the horizontal navigation when viewport width is below the `md` breakpoint.

## Technical Structure

### 1. State Management
- **Visibility**: Managed via a boolean `isOpen` state in the parent `Navbar`.
- **Transitions**: CSS-based transitions (e.g., `translate-x` or `opacity`) for smooth entry/exit.

### 2. Layout Components
- **Overlay**: Dimmed background to focus user on the drawer.
- **Drawer Body**: Vertically scrolling container.
  - **Header**: Close button and Logo.
  - **Nav Links**: Vertical list of primary actions.
  - **Utility Section**: Language switcher and User actions.

### 3. Component Contract (MobileDrawer)
- `isOpen`: boolean
- `onClose`: () => void
- `currentLang`: Language
- `setLang`: (lang: Language) => void
- `t`: TranslationInterface
- `onViewChange`: (view: string) => void

## Responsive-Native Implementation
Instead of:
```tsx
{isMobile && <MobileDrawer />}
```
We prefer:
```tsx
<div className="md:hidden">
  <MobileDrawer isOpen={isOpen} ... />
</div>
```
This ensures the DOM is predictable and CSS handles the visibility, preventing hydration mismatches and layout shifts.
