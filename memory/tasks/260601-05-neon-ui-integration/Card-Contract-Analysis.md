# Card Component Contract Analysis

## Overview
The `Card` component is a "Dumb" wrapper that enforces the "Teal & Black" brand identity and mobile-first responsiveness. It is strictly prop-driven and stateless, serving as a primary container for grouping related content and actions.

## Design Tokens (Teal & Black)
- **Background**: `bg-background-secondary` (#111111) as the component surface.
- **Border**: `border-border-primary` (Teal 900) by default, shifting to `hover:border-brand-primary` (Teal 500).
- **Hover Surface**: `hover:bg-background-tertiary` (#1A1A1A) for interactive cards.
- **Transition**: `transition-all duration-300` for smooth state changes.

## Responsive Standards (Mobile-First)
- **Fluidity**: Supports `mobileFullWidth` for full-width layout on small screens, reverting to `w-auto` on medium screens and up.
- **Statelessness**: Entirely prop-driven; no internal window listeners or media query state.
- **Layout Compatibility**: Follows `docs/mobile-first-architecture.md` for flexible grid integration.

## Prop Definitions

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | The amount of internal padding. |
| `bordered` | `boolean` | `true` | When true, renders the branded border and hover state. |
| `hoverable` | `boolean` | `false` | When true, enables background shift and cursor pointer on hover. |
| `mobileFullWidth` | `boolean` | `false` | If true, the card takes full width on mobile devices. |
| `className` | `string` | `undefined` | Custom Tailwind classes for style overrides. |
| `...props` | `React.HTMLAttributes<HTMLDivElement>` | - | All other native div attributes. |

## Implementation Notes
- Uses `React.forwardRef` to allow parent components to access the underlying DOM element.
- Leverages `cn()` utility for deterministic class merging.
- Strictly adheres to `docs/neon-ui-architecture.md` and `docs/mobile-first-architecture.md`.
