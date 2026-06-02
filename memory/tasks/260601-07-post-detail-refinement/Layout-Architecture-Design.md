# Layout Architecture Design: Post Detail

## 1. Grid System (The Reading Matrix)
We will use a 12-column grid system with a focused reading column.

### Desktop Layout (1024px+)
- **Main Column**: Spans 8 columns (left/center). Max-width: 720px (optimal for readability).
- **Sidebar (TOC)**: Spans 4 columns (right). Sticky positioning.
- **Margins**: Automatic centering.

### Tablet Layout (768px - 1023px)
- **Main Column**: Spans full width (12 columns) or restricted to center.
- **Sidebar**: Hidden or moved to top (integrated with PostHeader).

### Mobile Layout (<768px)
- Single column flow.
- Padding: 24px horizontal.

## 2. Reading Mode Enhancements
- **Max-Width Container**: Body content restricted to `max-w-prose` (65-75 characters per line).
- **Background**: `bg-black` or `bg-[#09090b]` for high contrast.
- **Typography**:
  - Headings: `font-serif` (or high-weight sans-serif) with tight letter-spacing.
  - Body: `text-zinc-300` for reduced eye strain on dark background.

## 3. Sticky TOC Implementation
- Container: `sticky top-24 self-start`.
- Active highlighting: Uses `IntersectionObserver` to detect which heading is currently "active" in the viewport.

## 4. Navigation Transition
- Smooth transition from the Blog Grid.
- Shared elements (Author, Date) should maintain visual identity.
