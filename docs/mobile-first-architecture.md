# Universal Mobile & Tablet Responsiveness Strategy
## Technical Architecture & UX Foundation

This document defines the standards for "Mobile-First" development across the LunAI workspace.

---

### 1. Canonical Breakpoints
We use a standardized set of breakpoints defined in `packages/shared/styles/breakpoints.ts`. All components must adhere to these values to ensure consistency.

| Breakpoint | Width | Usage |
| :--- | :--- | :--- |
| `MOBILE` | `320px` | Base design for all components. |
| `TABLET` | `768px` | Tablet-specific layout adjustments. |
| `DESKTOP` | `1024px` | Standard desktop layout. |
| `WIDE` | `1280px` | Large monitors. |
| `ULTRA` | `1536px` | Ultra-wide monitors. |

---

### 2. Grid/Flexbox Layout Protocol
To ensure universal responsiveness, developers must use the following patterns:

#### 2.1 Responsive Containers
All page sections must be wrapped in a `Section` component or a container that follows the defined max-width constraints.

#### 2.2 Fluid Grid Systems
Avoid fixed-width columns. Use CSS Grid or Flexbox with percentage-based or fractional unit widths.
- **Mobile**: Single column by default.
- **Tablet**: Switch to 2-column or multi-column if content density allows.
- **Desktop**: Full layout with sidebar/dashboards.

#### 2.3 Responsive Prop Pattern
Components should accept responsive override props to allow parents to control layout behavior without internal state.
- Example: `<Button mobileFullWidth={true} />`
- Example: `<Card tabletHorizontal={true} />`

---

### 3. @workspace/ui Refactoring Architecture

#### 3.1 Atomic Component Refactoring
Every atomic component must be audited for:
- **Touch Targets**: Minimum `44px x 44px` for all interactive areas.
- **Fluidity**: Defaulting to `width: auto` but supporting `fullWidth` or `mobileFullWidth`.
- **Statelessness**: Components should not determine their own layout based on internal window listeners. Use media queries or prop-driven classes.

#### 3.2 Component Anatomy
```tsx
// Example of Mobile-First Component Structure
export interface MyComponentProps {
  // Use boolean flags for common mobile adjustments
  mobileFullWidth?: boolean;
  // Use responsive arrays or objects if needed for complex variants
  variant?: 'primary' | 'secondary';
}

export const MyComponent = ({ mobileFullWidth, ...props }: MyComponentProps) => {
  const baseClasses = '...';
  const responsiveClasses = cn({
    'w-full sm:w-auto': mobileFullWidth,
  });

  return <div className={cn(baseClasses, responsiveClasses)} {...props} />;
};
```

---

### 4. Performance & Touch Optimization

#### 4.1 Touch Target Size
All buttons, links, and form controls must maintain a minimum hit area of `44px`. In mobile views, padding should be increased if the visual size is smaller.

#### 4.2 Asset Loading
- **Lazy Loading**: Use `React.lazy` and `Suspense` for heavy components that are not visible in the initial viewport.
- **Image Optimization**: Use responsive image sets (`srcset`) to serve smaller images to mobile devices.

---

### 5. Validation Strategy

#### 5.1 Automated Testing
Playwright tests will be used to capture screenshots at:
- `iPhone 15 Pro` (393x852)
- `iPad Air` (820x1180)
- `Surface Pro` (912x1368)
- `Standard Desktop` (1440x900)

#### 5.2 Performance Budgets
- **Mobile LCP**: < 2.5s
- **Mobile CLS**: < 0.1
- **Mobile TBT**: < 300ms
