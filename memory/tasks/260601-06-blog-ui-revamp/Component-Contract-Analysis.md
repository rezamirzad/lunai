# Component Contract Analysis: Blog Modernization
**Task ID**: 260601-06-blog-ui-revamp
**Architect**: ArchitectUX

## 1. Overview
This document defines the prop contracts and data mapping for the new stateless blog components. All components are designed to be "dumb" and receive their data from the `BlogLayout` parent.

---

## 2. Component Specifications

### 2.1 BlogSidebar
**Purpose**: Left-aligned navigation for category filtering and search.
**Contract**:
```typescript
interface BlogSidebarProps {
  categories: {
    id: string;
    label: string;
    count?: number;
    color: string;
  }[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  className?: string;
}
```
**Mapping**:
- `categories`: Derived from the `contents` table unique category values.
- `searchTerm`: Controlled input passed back to parent state.

### 2.2 BlogHeroCard
**Purpose**: High-impact featured post card for the top grid.
**Contract**:
```typescript
interface BlogHeroCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    category: string;
    date: string;
    author?: string;
  };
  featured?: boolean; // If true, applies larger heading styles
  className?: string;
}
```
**Mapping**:
- `coverImage`: Mapped from `contents.metadata.cover_image` or a placeholder.
- `excerpt`: Mapped from `content_localizations.summary` (max 150 chars).

### 2.3 BlogStreamItem
**Purpose**: Standard post entry in the vertical stream.
**Contract**:
```typescript
interface BlogStreamItemProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    category: string;
    date: string;
  };
  layout: 'text-only' | 'right-image';
  className?: string;
}
```
**Mapping**:
- `layout`: Parent determines layout based on index (even/odd) or presence of image.
- `excerpt`: Mapped from `content_localizations.summary` (max 200 chars).

### 2.4 BlogCategoryFilter (Tag)
**Purpose**: Reusable tag component for categories.
**Contract**:
```typescript
interface BlogCategoryFilterProps {
  category: string;
  color?: string; // Hex or CSS variable
  active?: boolean;
  onClick?: () => void;
}
```
**Mapping**:
- `color`: Determined by a lookup table in `blog-revamp-architecture.md`.

---

## 3. Data Integration (Statelessness)
- **Parent State**: `BlogLayout` handles `selectedCategory`, `searchTerm`, and `currentPage`.
- **Fetching**: Data is fetched in `BlogLayout` (or a server component wrapper) and passed down as plain objects.
- **Filtering**: Filtering logic resides in the parent to ensure sub-components remain pure.
