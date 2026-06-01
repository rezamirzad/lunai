# Component Contract Analysis

This document details the exact props and contracts required for the atomic components extracted into `@workspace/ui`.

## 1. Button
**Location**: `packages/ui/src/Button.tsx`
**Pattern**: Atomic Primitive

### Props:
- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost'` (Default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (Default: `'md'`)
- `className`: Standard React className for overrides.
- `...props`: Standard `React.ButtonHTMLAttributes<HTMLButtonElement>`.

### Contract:
- Must be stateless.
- Must support ref forwarding.
- Should use `buttonVariants` for styling to allow reuse by other elements (like `<a>`).

---

## 2. Section
**Location**: `packages/ui/src/Section.tsx`
**Pattern**: Layout Wrapper

### Props:
- `containerSize`: `'sm' | 'md' | 'lg' | 'xl' | 'full'` (Default: `'md'`)
- `children`: React children.
- `className`: Section-level styling (e.g., background color).

### Contract:
- Provides standard padding (`py-24 px-6`).
- Manages horizontal centering and max-width of its children.

---

## 3. Typography
**Location**: `packages/ui/src/Typography.tsx`
**Pattern**: Atomic Primitive

### Props:
- `as`: `'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'label'` (Default: `'p'`)
- `variant`: `'hero' | 'title' | 'subtitle' | 'body' | 'badge' | 'label'` (Default: `'body'`)

### Contract:
- Encapsulates all branding typography (sizes, weights, tracking, colors).
- Ensures massive typography (hero) is consistent across the application.

---

## 5. UserAuth
**Location**: `packages/ui/src/UserAuth.tsx`
**Pattern**: Atomic Molecule

### Props:
- `label`: String for the button text (e.g., "Log in").
- `onClick`: Callback for interaction.
- `isLoggedIn`: Boolean to toggle between Login button and User profile.
- `userName`: Optional string for the logged-in user's name.

### Contract:
- Stateless molecule combining `Button` and profile layout.
- Decoupled from Auth providers (Supabase/Neon).
- Handles both unauthenticated (Button) and authenticated (Profile) states.
