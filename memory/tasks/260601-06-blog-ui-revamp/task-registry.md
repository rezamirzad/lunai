# Blog UI Modernization & Grid Refactoring Task Registry (Task 260601-06)

## Specification Summary
**Original Requirements**:
- "Refactor the current Blog component to match the professional, grid-based, multi-layout design displayed in image_d430f9.jpg."
- "Implement a sidebar navigation (left-aligned) for category filtering (AI, Product, Engineering, Changelog, etc.)."
- "Create a dynamic grid layout that switches between: Feature Grid (Top): Two large side-by-side featured post cards with hero images; Vertical Stream (Bottom): Alternating layouts of text-only posts and right-aligned image cards."
- "Decompose the Blog component into: BlogSidebar, BlogHeroCard, BlogStreamItem, and BlogCategoryFilter."
- "Match the dark-mode aesthetic (black background, high-contrast white text, muted secondary text for metadata)."
- "Ensure the component supports the Database Strategy (Task 260601-02) by integrating with the contents and content_localizations tables."

**Technical Stack**:
- **Frontend**: React (TypeScript) - refactoring existing `Blog.tsx`.
- **Architecture**: Stateless, props-driven component decomposition.
- **Data**: Integration with `contents` and `content_localizations` tables.
- **Aesthetic**: Dark-mode, high-contrast typography, color-coded category tags.

## Development Tasks

### Phase 1: Architecture & Technical Documentation
#### [x] Task 1.1: Component Contract Analysis
**Description**: Generate `Component-Contract-Analysis.md` for each new UI element (`BlogSidebar`, `BlogHeroCard`, `BlogStreamItem`, `BlogCategoryFilter`).
**Acceptance Criteria**:
- Mapping of images and content snippets clearly defined for each component.
- Prop types and interfaces for stateless data handling documented.
**Reference**: "Quality Gate: Generate [Component-Contract-Analysis.md] for each new UI element..."

#### [x] Task 1.2: Modification Impact Statement
**Description**: Document how the new grid-based layout impacts mobile responsiveness, referencing Task 260601-04.
**Acceptance Criteria**:
- `Modification-Impact-Statement.md` exists in the task folder.
- Clear explanation of sidebar behavior on mobile and grid collapse strategy.
**Reference**: "Modification Impact Statement: Document how this grid-based layout impacts mobile responsiveness..."

#### [x] Task 1.3: Visual Mockup Preparation
**Description**: Define specific design tokens for the dark-mode aesthetic and category tag colors based on `image_d430f9.jpg`.
**Acceptance Criteria**:
- Design parameters documented (Black background, white text contrast).
- Color codes for categories (e.g., Green for Engineering, Blue for Product).
**Reference**: "Match the dark-mode aesthetic... Implement the 'category tag' styling..."

#### [x] Task 1.4: Human Approval Gate
**Description**: PAUSE execution for stakeholder review of architectural docs and visual specs.
**Acceptance Criteria**:
- Visual Mockup and Impact Statement completed.
- Wait for user response `[APPROVED]` before touching `Blog.tsx`.
**Reference**: "Pause execution after the Visual Mockup and Modification Impact Statement are ready."

### Phase 2: Grid & Shell Implementation
#### [x] Task 2.1: BlogLayout Shell & Grid System
**Description**: Create the `BlogLayout` parent component and implement the base CSS grid/flex system.
**Acceptance Criteria**:
- Grid handles two featured cards side-by-side at top.
- Grid handles alternating vertical stream layout below.
**Reference**: "Create a dynamic grid layout that switches between: Feature Grid (Top)... Vertical Stream (Bottom)..."

#### [ ] Task 2.2: Primary Header Implementation
**Description**: Implement the primary header with search bar and social/RSS icons.
**Acceptance Criteria**:
- Functional search bar present.
- Visual style matches `image_d430f9.jpg`.
**Reference**: "Implement a primary header section with a search bar and social/RSS icons."

#### [x] Task 2.3: Left-Aligned Sidebar implementation
**Description**: Implement the `BlogSidebar` for category filtering.
**Acceptance Criteria**:
- Sidebar is left-aligned.
- Navigation supports AI, Product, Engineering, Changelog categories.
**Reference**: "Implement a sidebar navigation (left-aligned) for category filtering..."

### Phase 3: Component Implementation (Stateless)
#### [x] Task 3.1: BlogHeroCard Component
**Description**: Create stateless `BlogHeroCard` for featured posts.
**Acceptance Criteria**:
- Displays large hero images and large headings.
- Metadata (Category + Date) visible.
**Reference**: "Feature Grid (Top): Two large side-by-side featured post cards with hero images."

#### [x] Task 3.2: BlogStreamItem Component
**Description**: Create stateless `BlogStreamItem` for the feed.
**Acceptance Criteria**:
- Supports alternating text-only and right-aligned image layouts.
- Muted secondary text used for metadata.
**Reference**: "Vertical Stream (Bottom): Alternating layouts of text-only posts and right-aligned image cards."

#### [x] Task 3.3: BlogCategoryFilter (Tag) Implementation
**Description**: Implement the visual tag styling for categories.
**Acceptance Criteria**:
- Categories color-coded (Green for Engineering, Blue for Product).
**Reference**: "Implement the 'category tag' styling (e.g., green for Engineering, blue for Product)."

### Phase 4: Data Integration & Logic
#### [x] Task 4.1: Database Strategy Integration
**Description**: Connect components to `contents` and `content_localizations` tables.
**Acceptance Criteria**:
- Category filtering updates UI via parent `BlogLayout` state.
- Data mapped according to Task 260601-02.
**Reference**: "Ensure the component supports the Database Strategy (Task 260601-02)..."

#### [x] Task 4.2: Dynamic Search Logic
**Description**: Implement search term filtering in the main blog stream.
**Acceptance Criteria**:
- UI filters posts dynamically based on search bar input.
**Reference**: "...dynamic filtering by category and search terms."

## Quality Requirements
- [ ] All components receive data via props (stateless).
- [ ] High-contrast accessibility standards met for dark mode.
- [ ] Typography scale: Large hero headings vs distinct metadata lines.
- [ ] Playwright screenshot verification: `./qa-playwright-capture.sh http://localhost:8000 public/qa-screenshots`.

## Technical Notes
- **Suggested Allocation**: 
  - Architect: Grid & Sidebar logic.
  - Documentation: Visual specs & Prop contracts.
  - PM: Orchestrate database-driven grid layout refactoring.
