# Unified Schema ERD: Atomic & Agentic Evolution

This document defines the relational blueprint for the LunAI ecosystem, evolving the previous strategy to support **Atomic Component Mapping** and **High-Throughput Agentic Operations**.

## 🏗️ Architecture Overview
- **Primary Provider**: Neon (PostgreSQL).
- **Core Principle**: Data-to-Prop Symmetry. Every relational entity should be queryable as a flat JSON object matching an "Atomic Component" prop interface.

---

## 1. Unified Identity & Access (SSO)
Centrally managed users across all LunAI SaaS products.

### Tables
#### `users` (SSO Core)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key. |
| `email` | `text` | Unique email. |
| `is_verified` | `boolean` | Email verification status. |
| `preferences` | `jsonb` | UI settings (theme, atomic density, etc.). |

#### `apps` & `sessions`
- `apps`: Registry of products (Lumz, Lynk, etc.).
- `user_app_access`: Mapping of which user has access to which product + role.

---

## 2. Atomic Content & Localization
Mirrors the file-based Markdown structure but optimized for "dumb" component consumption.

### Tables
#### `contents` (The Entity)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key. |
| `slug` | `text` | Unique URL path. |
| `type` | `enum` | 'blog', 'doc', 'service_card'. |
| `component_id` | `text` | The ID of the React component this data targets. |

#### `content_localizations` (The Props)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key. |
| `content_id` | `uuid` | FK to `contents`. |
| `locale` | `varchar(10)` | 'en', 'zh-CN', etc. |
| `props` | `jsonb` | **The Atomic Payload.** Contains title, body, images, etc. |
| `body_markdown` | `text` | Raw Markdown for "Content as Code" sync. |

---

## 3. Cross-SaaS Operations (Agentic)
Relational models for commercial and agentic workloads.

### Commercial
- `plans`: Pricing tiers per app.
- `subscriptions`: User-to-plan linkage.

### Financial
- `ledger`: Immutable record of all transactions (credits/debits).
- `receipts`: Metadata for external payment provider references.

### Operational (Agentic Logs)
| Table | Description |
| :--- | :--- |
| `agents` | Registry of AI agents (Role, Capabilities, Model). |
| `executions` | Individual agent runs. |
| `steps` | Discrete sub-tasks within an execution. |
| `telemetry` | High-frequency logs (`timestamp`, `level`, `message`, `metadata`). |

---

## 💡 Support for "Dumb" Components

### Strategy: Localized Rows -> Atomic Props
The schema uses a `jsonb` column named `props` in `content_localizations`. This is the key to supporting atomic modularity.

**How it works:**
1. **Frontend Contract:** A `BlogCard` component defines an interface `interface BlogCardProps { title: string; excerpt: string; date: string; }`.
2. **Database Mapping:** The `props` column in the database stores exactly this JSON structure for a specific locale.
3. **The "Dumb" Fetch:** When the UI requests content, the API returns the `props` object directly. The React component receives this object as spread props: `<BlogCard {...content.props} />`.

**Result:** The UI component remains completely decoupled from database structure, localization logic, or API versioning. It only knows its own prop contract.

### Strategy: Markdown Sync
The `body_markdown` field ensures we preserve the "Content as Code" mandate. A Github Action parses the `.md` files and updates both the `body_markdown` (for editing) and the `props` (for delivery) fields in the database.
