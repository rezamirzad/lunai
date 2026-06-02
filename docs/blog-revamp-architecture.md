# Blog UI Modernization: Technical Architecture & UX Standards
**Status**: DRAFT (Awaiting Approval)
**Version**: 1.0.0
**Architect**: ArchitectUX

## 1. Vision
Transform the LunAI blog into a premium, grid-driven knowledge hub that balances high-impact featured content with a readable, searchable vertical feed.

## 2. Visual Design Tokens

### 2.1 Color Palette (Dark Mode Base)
| Element | Token | Value |
| :--- | :--- | :--- |
| Background | `--bg-primary` | `#000000` (Black) |
| Surface | `--bg-secondary` | `#111111` (Dark Gray) |
| Text Primary | `--text-primary` | `#FFFFFF` (White) |
| Text Muted | `--text-muted` | `#A1A1AA` (Zinc 400) |
| Accent | `--accent` | `#14B8A6` (Teal 500) |

### 2.2 Category Color Mapping
Categories are color-coded to aid quick visual scanning.
- **Engineering**: `#22C55E` (Green 500)
- **Product**: `#3B82F6` (Blue 500)
- **AI**: `#A855F7` (Purple 500)
- **Changelog**: `#F97316` (Orange 500)
- **General**: `#14B8A6` (Teal 500)

### 2.3 Typography Scale
- **Hero Title**: `text-4xl` (Mobile) / `text-6xl` (Desktop), `font-black`, `tracking-tight`.
- **Stream Title**: `text-2xl`, `font-bold`.
- **Metadata**: `text-xs` / `uppercase`, `tracking-widest`.

## 3. Layout Architecture

### 3.1 The Dynamic Grid
The layout uses a nested CSS Grid system:
1. **Shell**: `grid-cols-[250px_1fr]` (Desktop only).
2. **Top Grid (Feature)**: `grid-cols-1` (Mobile) -> `grid-cols-2` (Desktop).
3. **Bottom Stream (Feed)**: `flex flex-col gap-12`.

### 3.2 Responsive States
- **Mobile (<768px)**: 100% width. Search and Categories are stacked at the top.
- **Tablet (768px - 1023px)**: Categories become a horizontal scroll. Grid stays 1-column for high density.
- **Desktop (>=1024px)**: Full sidebar + multi-column featured grid.

## 4. Component Hierarchy
- `BlogLayout` (Container)
  - `BlogHeader` (Search + Social)
  - `MainContent` (Flex/Grid)
    - `BlogSidebar` (Left)
      - `BlogCategoryFilter` (List)
    - `BlogFeed` (Right)
      - `FeatureGrid`
        - `BlogHeroCard` (Featured x 2)
      - `VerticalStream`
        - `BlogStreamItem` (Post x N)

## 5. Implementation Roadmap
1. **Foundation**: Implement CSS variables and Grid Shell.
2. **Stateless UI**: Build cards and sidebar items based on `Component-Contract-Analysis.md`.
3. **Logic**: Implement filtering and search in `BlogLayout`.
4. **Data**: Connect to Neon Database via `packages/shared`.
