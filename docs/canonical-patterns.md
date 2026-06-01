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

## 4. CSS & Styling
- Use **Tailwind CSS** via the `cn()` utility from `@workspace/shared`.
- Avoid hardcoded colors; use Tailwind's semantic classes where possible.
- Shared components should be scanning by the app's `tailwind.config.js`.
