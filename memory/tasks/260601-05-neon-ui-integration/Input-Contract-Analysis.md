# Input & Textarea Component Contract Analysis

## Overview
The `Input` and `Textarea` components have been refactored to align with the Neon UI "Teal & Black" brand identity. The refactoring follows the "Dumb" wrapping strategy, ensuring components are strictly prop-driven and stateless, while enforcing mobile-first responsive standards.

## Component: `Input`

### Visual Specification
- **Background**: `bg-background-primary` (#000000)
- **Border**: `border-border-primary` (#134E4A)
- **Focus State**: `focus:border-brand-primary` (#14B8A6)
- **Text Color**: `text-text-primary` (#FFFFFF)
- **Placeholder**: `text-text-muted` (#666666)
- **Min Height**: `44px` (Touch target compliance)

### Props (Contract)
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mobileFullWidth` | `boolean` | `true` | If true, ensures the input is full-width on mobile and auto-width on desktop. |
| `className` | `string` | `undefined` | Custom CSS classes for further styling. |
| `...props` | `InputHTMLAttributes` | `N/A` | Standard React input attributes. |

---

## Component: `Textarea`

### Visual Specification
- **Background**: `bg-background-primary` (#000000)
- **Border**: `border-border-primary` (#134E4A)
- **Focus State**: `focus:border-brand-primary` (#14B8A6)
- **Text Color**: `text-text-primary` (#FFFFFF)
- **Placeholder**: `text-text-muted` (#666666)
- **Min Height**: `44px` (Touch target compliance)

### Props (Contract)
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mobileFullWidth` | `boolean` | `true` | If true, ensures the textarea is full-width on mobile and auto-width on desktop. |
| `className` | `string` | `undefined` | Custom CSS classes for further styling. |
| `...props` | `TextareaHTMLAttributes` | `N/A` | Standard React textarea attributes. |

## Mobile-First Compliance
- **Touch Target**: Both components enforce a minimum height of `44px`.
- **Fluidity**: Default `mobileFullWidth` is set to `true`, providing a standard mobile-friendly experience while allowing flexibility for desktop layouts.
- **Statelessness**: No internal state is used for styling or layout.

## Design Token Mapping
- `brand-primary`: `#14B8A6`
- `background-primary`: `#000000`
- `border-primary`: `#134E4A`
- `text-primary`: `#FFFFFF`
- `text-muted`: `#666666`
