# Component Contract Analysis: Post Detail Components

## 1. PostHeader Component
**Purpose**: Displays the high-fidelity title and metadata section of the blog post.

### Props Contract
- `title`: string (The H1 title)
- `category`: string (Primary category tag)
- `date`: string (Formatted date)
- `readingTime`: number (Estimated minutes to read)
- `author`: { name: string, avatarUrl: string } (Author information)

### Structural Requirements
- **Typography**: Large serif/sans-serif heading (from image_d4307f.jpg).
- **Metadata Bar**: Horizontal layout under title, high-contrast text, subtle dividers.
- **Background**: Dark background (deep grey/black).

### Interaction Patterns
- Category tag links back to filtered blog stream.
- Author name may link to author profile (optional for now).

---

## 2. Table of Contents (TOC) Component
**Purpose**: Provides navigation for long-form content with scroll tracking.

### Props Contract
- `items`: Array<{ id: string, text: string, level: number }> (Extracted from Markdown headings)
- `activeId`: string (ID of the currently visible section)

### Structural Requirements
- **Positioning**: Sticky on the right-hand side (Desktop only).
- **Mobile Behavior**: Collapsible or hidden (default to hidden/top-only in reading mode).
- **Styling**: Minimalist text list, subtle indicators for active section.

### Interaction Patterns
- Smooth scroll to section on click.
- Automatic active section tracking via `IntersectionObserver`.

---

## 3. PostBody Component
**Purpose**: Renders the markdown content with specialized styling for code blocks.

### Props Contract
- `content`: string (Markdown source)

### Requirements
- **Code Blocks**: Subtle line numbers, language labels, custom syntax highlighting (high-contrast).
- **Max-Width**: Restricted to ~70ch for optimal reading experience.
- **Typography**: Clean, readable sans-serif/serif for body text.
