# Content Migration Path: File-to-DB Strategy

This document outlines the step-by-step approach to moving the LunAI ecosystem's file-based Markdown content into a relational database while preserving the "Content as Code" workflow.

## 🎯 Goal
Synchronize `.md` files in the repository with the `contents` and `content_localizations` tables to enable fast querying, search, and dynamic localization without losing Git-based versioning.

---

## 🏗️ Synchronization Architecture: "The Sync Bridge"

We will implement a **One-Way Sync (Git -> DB)**. The repository remains the **Source of Truth**.

### Pipeline Flow
1. **Developer**: Pushes an `.md` file to the `src/content/` directory.
2. **GitHub Action**: Triggers on push to `main`.
3. **Sync Script**:
   - Scans the content directory.
   - Parses each file (Frontmatter + Markdown Body).
   - Generates a `file_hash` (SHA-256).
   - Calls the **Internal Admin API** (or direct DB connection) to **Upsert** the record.

---

## 🛠️ Step-by-Step Migration Path

### Phase 1: Preparation (Current State)
1. **Audit Content**: Identify all directories containing Markdown (e.g., `Apps/web/src/content/blog/`).
2. **Define Schema**: Deploy the `contents` and `content_localizations` tables (see ERD).

### Phase 2: The Migration Script
Develop a Node.js script (`packages/shared/scripts/sync-content.ts`) that performs the following:
- **Parse**: Use `gray-matter` to extract frontmatter.
- **Transform**: 
  - Map `slug` from the filename or frontmatter.
  - Map `locale` from the directory structure or filename (e.g., `blog/en/post.md`).
- **Upsert**:
  ```sql
  INSERT INTO content_localizations (content_id, locale, title, body, file_hash)
  VALUES ($1, $2, $3, $4, $5)
  ON CONFLICT (content_id, locale) 
  DO UPDATE SET 
    title = EXCLUDED.title,
    body = EXCLUDED.body,
    file_hash = EXCLUDED.file_hash
  WHERE content_localizations.file_hash <> EXCLUDED.file_hash;
  ```

### Phase 3: CI/CD Integration
Create `.github/workflows/db-content-sync.yml`:
```yaml
name: DB Content Sync
on:
  push:
    paths:
      - 'Apps/web/src/content/**'
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Sync Script
        run: npm run content:sync
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Phase 4: Hybrid Access Layer
Update the Application logic (Next.js/Express):
- **Read Path**: Fetch from the Database (SQL) for listing, search, and filtering.
- **Fallback**: If the DB is unreachable, fallback to local file system reading (High Availability).

---

## ⚖️ Trade-offs & Benefits

### Why keep "Content as Code"?
- **Reviewability**: PRs for content changes allow for peer review and linting.
- **Versioning**: Easy rollbacks via `git revert`.
- **Developer Flow**: Developers use familiar editors and Markdown tools.

### Why move to DB?
- **Queryability**: Find all posts in 'en' with tag 'AI' in < 10ms.
- **Localization**: Easily manage 10+ languages without massive file directory nesting.
- **Agentic Access**: AI agents can query the database directly to retrieve context for RAG or execution.

---

## 🔒 Security & Integrity
1. **Write-Only Token**: The GitHub Action uses a restricted DB role that only has `INSERT/UPDATE` permissions on content tables.
2. **Validation**: The sync script fails the build if frontmatter is missing required fields (e.g., `title`, `date`).
3. **Soft Deletes**: Files deleted in Git are marked as `status = 'archived'` in the DB rather than deleted immediately.
