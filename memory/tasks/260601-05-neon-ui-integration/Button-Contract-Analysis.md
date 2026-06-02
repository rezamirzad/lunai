# Button Component Contract Analysis

## Overview
The `Button` component is a "Dumb" wrapper that enforces the "Teal & Black" brand identity and mobile-first responsiveness. It is strictly prop-driven and stateless, abstracting away the internal Neon UI styling logic.

## Design Tokens (Teal & Black)
- **Primary**: `bg-brand-primary` (Teal 500), `text-black`, `hover:bg-brand-accent` (Teal 400)
- **Secondary**: `bg-black`, `text-white`, `border border-brand-primary` (Teal 500)
- **Outline**: `border border-teal-900`, `text-teal-200`, `hover:border-brand-primary`
- **Ghost**: `text-teal-200`, `hover:text-white`

## Responsive Standards (Mobile-First)
- **Touch Target**: Minimum height/width of `44px`.
- **Fluidity**: Supports `mobileFullWidth` for full-width layout on small screens, reverting to `w-auto` on medium screens and up.
- **Typography**: `font-black`, `uppercase`, `tracking-brand` (0.1em).

## Prop Definitions

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | The visual style of the button. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | The size/padding of the button. |
| `mobileFullWidth` | `boolean` | `false` | If true, button takes full width on mobile devices. |
| `className` | `string` | `undefined` | Custom Tailwind classes for style overrides. |
| `disabled` | `boolean` | `false` | Native button disabled state. |
| `...props` | `React.ButtonHTMLAttributes` | - | All other native button attributes. |

## Implementation Notes
- Uses `React.forwardRef` to allow parent components to access the underlying DOM element.
- Leverages `cn()` utility for deterministic class merging.
- Strictly adheres to `docs/neon-ui-architecture.md` and `docs/mobile-first-architecture.md`.
