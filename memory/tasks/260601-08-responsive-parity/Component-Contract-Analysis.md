# Component Contract Analysis: Responsive Navbar & Drawer

## 1. Navbar Component
**Purpose**: Primary navigation container with responsive layout switching.

### Props Contract
- `currentLang`: Language
- `setLang`: (lang: Language) => void
- `t`: TranslationInterface
- `onViewChange`: (view: string) => void
- `onLogin`: () => void

### Internal State
- `isDrawerOpen`: boolean (Controls the visibility of the `MobileDrawer`)

### Responsive Behavior
- **Desktop (md+)**: Displays horizontal links and language switcher inline. Hamburger icon hidden.
- **Mobile (<md)**: Displays Hamburger icon and Logo. Horizontal links and language switcher hidden.

---

## 2. MobileDrawer Component
**Purpose**: Off-canvas menu for mobile navigation and utility access.

### Props Contract
- `isOpen`: boolean (Controlled by Navbar)
- `onClose`: () => void
- `currentLang`: Language
- `setLang`: (lang: Language) => void
- `t`: TranslationInterface
- `onViewChange`: (view: string) => void

### Interaction Patterns
- Clicking a navigation link calls `onViewChange` and then `onClose`.
- Clicking the overlay calls `onClose`.
- Language selection triggers `setLang` and remains open (or closes based on UX preference).

---

## 3. ResponsiveGrid Component (Conceptual)
**Purpose**: A layout primitive that enforces stacking rules.

### Props Contract
- `columns`: { default: number, md: number, lg: number }
- `gap`: number | string

### Behavior
- Enforces 1-column layout by default (mobile-first).
- Scales to specified columns at breakpoints.
