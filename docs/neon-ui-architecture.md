# Neon UI Integration Architecture
## Technical Standards & Foundation (Task 260601-05)

This document defines the architectural standards for integrating the Neon UI library into the LunAI workspace.

---

### 1. Core Architectural Principles

#### 1.1 Decoupling via "Dumb" Wrapping
To prevent vendor lock-in and maintain a clean API for application developers, **no application code (apps/*) should import directly from Neon UI**.
- All Neon components must be wrapped in `@workspace/ui`.
- Wrapper components must be **strictly prop-driven ("Dumb")**.
- Internal Neon logic, state, or complex hooks must be abstracted away or passed through via a clean interface.

#### 1.2 Single Source of Truth for Styles
The "Teal & Black" brand identity is managed via `@workspace/shared/styles/theme.ts`.
- Tailwind tokens are the authoritative source for colors, spacing, and typography.
- Wrapper components use these tokens to override default Neon styles.

---

### 2. Theme Strategy: Teal & Black

The theme is centered around a high-contrast dark mode aesthetic.

| Layer | Token | Value |
| :--- | :--- | :--- |
| **Primary Brand** | `colors.brand.primary` | Teal 500 (#14B8A6) |
| **Base Background** | `colors.background.primary`| Black (#000000) |
| **Component Surface** | `colors.background.secondary`| Dark Gray (#111111) |
| **Primary Text** | `colors.text.primary` | White (#FFFFFF) |
| **Accents** | `colors.brand.accent` | Teal 400 (#2DD4BF) |

---

### 3. Component Wrapping Protocol

When wrapping a Neon UI component in `@workspace/ui`, follow this standard:

#### 3.1 Responsive Harmonization (Mobile-First)
All wrappers must implement the `mobile-first-architecture.md` standards:
- **Default Fluidity**: Components should be fluid by default.
- **Touch Targets**: Interactive elements must maintain a `44px` hit area (use `h-[44px]` or `p-2`).
- **Responsive Props**: Use boolean flags like `mobileFullWidth` for common layout shifts.

#### 3.2 Wrapping Example
```tsx
// @workspace/ui/src/Button.tsx
import { Button as NeonButton } from 'neon-ui-library'; // Hypothetical internal import
import { cn } from '@workspace/shared';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  mobileFullWidth?: boolean;
}

export const Button = ({ variant = 'primary', mobileFullWidth, className, ...props }: ButtonProps) => {
  const baseClasses = "font-black uppercase tracking-brand transition-all min-h-[44px]";
  
  const variantClasses = {
    primary: "bg-brand-primary text-black hover:bg-brand-accent",
    secondary: "bg-black text-white border border-brand-primary",
    outline: "border border-teal-900 text-teal-200 hover:border-brand-primary"
  };

  return (
    <NeonButton
      className={cn(
        baseClasses,
        variantClasses[variant],
        mobileFullWidth && "w-full md:w-auto",
        className
      )}
      {...props}
    />
  );
};
```

---

### 4. Integration Roadmap

1. **Phase 1: Foundation (Current)**
   - Define theme tokens in `@workspace/shared`.
   - Establish architectural standards (this document).

2. **Phase 2: Atomic Refactoring**
   - Refactor `Button`, `Input`, `Card`, `Typography`.
   - Perform [Component-Contract-Analysis.md] for each.

3. **Phase 3: Layout Alignment**
   - Align `Container`, `Grid`, and `Section` with Neon grid systems.
   - Ensure `docs/mobile-first-architecture.md` compliance.
