# Post Detail Refinement (Task 260601-07) - Development Tasks

## Specification Summary
**Original Requirements**: "Architect and implement the 'Post Detail' page to match the reading experience in image_d4307f.jpg, ensuring a distraction-free, high-fidelity environment."
**Technical Stack**: Next.js App Router, @workspace/api, Markdown parsing, Tailwind CSS/Vanilla CSS.

## Development Tasks

### Phase 2: Technical Architecture
#### [x] Task 2.1: Component Contract Analysis
**Description**: Generate `Component-Contract-Analysis.md` for the new PostHeader and TOC components. Define props, state, and interaction patterns.
**Acceptance Criteria**: 
- Document exists in task folder.
- Covers PostHeader and TOC requirements.

#### [x] Task 2.2: API Contract Definition
**Description**: Define API contracts for fetching a single post by slug from the database (contents/content_localizations).
**Acceptance Criteria**: 
- API endpoint/action signature defined.
- Handles localization and view counts.

#### [x] Task 2.3: Layout Architecture Design
**Description**: Design the grid system (Content + Sidebar) and ensure responsiveness of the TOC.
**Acceptance Criteria**:
- Design plan for max-width container and sticky positioning.

### Phase 3: Development & QA Loop

#### [x] Task 3.1: PostPage Parent Component & Data Fetching
**Description**: Implement the dynamic route page and data fetching from `@workspace/api`.
**Acceptance Criteria**:
- Page fetches post by slug.
- Handles 404/Loading states.

#### [x] Task 3.2: Layout Architecture Implementation
**Description**: Implement "Reading Mode" with a Max-Width Container for body content and the Metadata Bar.
**Acceptance Criteria**:
- Line length is optimized for readability.
- Metadata bar shows category, date, reading time, and author.

#### [x] Task 3.3: PostHeader Component
**Description**: Implement the PostHeader with large typography and metadata.
**Acceptance Criteria**:
- Matches image_d4307f.jpg high-contrast aesthetic.

#### [x] Task 3.4: PostBody Component (Markdown & Code Blocks)
**Description**: Implement PostBody with Markdown support and prominent code block styling.
**Acceptance Criteria**:
- Markdown renders correctly.
- Code blocks have subtle line numbers and language labels.

#### [x] Task 3.5: PostAuthorCard & Navigation
**Description**: Implement PostAuthorCard and PostNavigation (Next/Previous links).
**Acceptance Criteria**:
- Author card displays name/avatar.
- Navigation links correctly route to adjacent posts.

#### [x] Task 3.6: Sticky Table of Contents (TOC)
**Description**: Implement a Sticky TOC on the right-hand side that highlights the current section as the user scrolls.
**Acceptance Criteria**:
- TOC is sticky.
- Highlight follows scroll position.

#### [x] Task 3.7: Interactive UI Elements (Share/Save)
**Description**: Add "Share" and "Save" interactive buttons integrated with the SSO identity layer.
**Acceptance Criteria**:
- Buttons are present and functional (mocked or integrated).

#### [x] Task 3.8: View Counting Logic
**Description**: Implement asynchronous view count updates when a post is fully loaded.
**Acceptance Criteria**:
- `view_count` increments in DB on load.

### Phase 4: Final Integration & Compliance

#### [x] Task 4.1: Modification Impact Statement
**Description**: Document the routing transition from the listing page (Task 260601-06) to the detail page.
**Acceptance Criteria**:
- Impact statement generated and saved.

## 🛑 HUMAN APPROVAL GATE
> Pause execution after Phase 2 (Functional Mockup and Component Contracts are prepared). Do not implement the Next.js App Router dynamic routes until I reply with [APPROVED].

## Quality Requirements
- [ ] High-contrast aesthetic: Dark background, large serif/sans-serif typography.
- [ ] Prominent Code Block styling.
- [ ] Mobile responsive design.
- [ ] SSO integration for Share/Save.
