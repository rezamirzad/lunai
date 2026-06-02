# Canonical Patterns: Atomic & Stateless Design

## 1. Atomic Component Design
Shared components must be **Stateless Primitives**.

### The "Dumb" Rule
- **No Internal State**: Components should not use `useState` for business logic (UI-only state like "isOpen" is okay but discouraged).
- **No Side Effects**: No `useEffect` for data fetching or global event listeners.
- **Pure Rendering**: A component given the same props must render the same UI.

## 2. Prop-Driven State Management
All data and callbacks must be passed from the **Smart Parent**.

### Pattern:
```tsx
// apps/web/src/pages/contact.tsx (Smart Parent)
const [value, setValue] = useState("");
return <Input value={value} onChange={(e) => setValue(e.target.value)} />;

// packages/ui/src/Input.tsx (Dumb Primitive)
export const Input = ({ value, onChange }) => (
  <input value={value} onChange={onChange} className="..." />
);
```

## 3. Path Alias Convention
Always use `@workspace/` aliases for cross-package imports.

- `@workspace/shared/*`: Types and Utilities.
- `@workspace/ui/*`: UI Primitives.

## 4. Database-Driven Atomic Props
Components targeting data from the LunAI data layer must receive flat JSON payloads that match their prop interface.

### The "Prop Contract"
- **Flat Payloads**: The database (Neon) stores a `props` JSONB object in the `content_localizations` table.
- **Direct Mapping**: This object should perfectly mirror the TypeScript interface of the target component.
- **Stateless Injection**: The component is rendered by spreading the fetched props: `<Component {...data.props} />`.

## 5. Mobile-First Component Anatomy
All components must be designed for mobile first, then scaled up.

### Universal Responsiveness Patterns
- **Touch Targets**: All interactive elements must maintain a minimum hit area of **44px x 44px**.
- **Fluid Layouts**: Use the `@workspace/ui` `Grid` and `Container` components to ensure layout fluidity.
- **Responsive-Native**: Use CSS media queries (`md:`, `lg:`) to control visibility and layout state. Avoid `isMobile` JS logic that conditionally removes functional components from the DOM.
- **Complex UI on Mobile**: 
    - **Tables**: Use horizontal scrolling with a "Swipe for more" indicator or card-based list view.
    - **Dashboards**: Stack widgets vertically on mobile; use the `Grid` component's `cols={1}` default.
    - **Navigation**: Use a drawer or "hamburger" menu for primary navigation on mobile screens.

## 6. The "Never-Hide-Functionality" Principle
Functionality must never be sacrificed for screen space.

### Core Rules:
- **Functional Parity**: If a feature (e.g., Language Selection, Search, User Settings) exists on desktop, it **must** be available on mobile.
- **Reorganization over Removal**: Use drawers, accordions, or modal overlays to house complex functional groups on small screens.
- **No Mobile-Only Silos**: Avoid creating "mobile-only" versions of pages. Use responsive-native components that adapt their presentation while maintaining the same underlying state and logic.

## 7. Device Testing Matrix
Automated regression testing via Playwright must include screenshot verification for the following targets:

| Device | Viewport | Target |
| :--- | :--- | :--- |
| **iPhone 15 Pro** | 393 x 852 | Primary Mobile Target |
| **iPad Air** | 820 x 1180 | Tablet Portrait Target |
| **Surface Pro** | 912 x 1368 | Large Tablet / Hybrid |
| **Standard Desktop** | 1440 x 900 | Desktop Target |

## 8. CSS & Styling
- Use **Tailwind CSS** via the `cn()` utility from `@workspace/shared`.
- Avoid hardcoded colors; use Tailwind's semantic classes where possible.
- Shared components should be scanning by the app's `tailwind.config.js`.

## 9. Extending Neon UI Components
When wrapping or extending Neon UI components within `@workspace/ui`, strictly adhere to these standards to maintain ecosystem integrity.

### 9.1 The "Teal & Black" Visual Standard
All extensions must preserve the high-contrast dark aesthetic defined in `docs/neon-ui-architecture.md`.
- **Primary Action**: Always use `brand-primary` (Teal 500) for primary buttons, active states, and highlights.
- **Surface Layering**: Use `background-primary` (Black) for the base and `background-secondary` (Dark Gray) for nested cards or surfaces.
- **Accents**: Use `brand-accent` (Teal 400) for hover states and subtle interactive feedback.

### 9.2 The "Dumb" Wrapping Protocol
To ensure architectural decoupling and portability:
- **Strict Prop Injection**: All styles and behaviors must be controlled via props. Never hardcode application-specific logic inside the wrapper.
- **Class Merging**: Always use the `cn()` utility to allow consumers to pass additional Tailwind classes without breaking the base design.
- **Opaque Internals**: Avoid exposing Neon-specific types or hooks directly to the consumer; map them to clean, workspace-aligned interfaces.

### 9.3 Mobile-First Extension Guidelines
- **Hit Area Persistence**: Ensure any added interactive elements (links, icons, toggles) maintain a minimum **44px** hit area.
- **Fluid Overrides**: Prefer percentage-based widths or flexbox over fixed pixel values in extended layouts.
- **Contextual Props**: Use semantic boolean props (e.g., `isFullWidthOnMobile`) to trigger responsive layout shifts instead of relying on implicit media queries within the component.
