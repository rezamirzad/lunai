# Unified Schema ERD: LunAI Ecosystem

This document defines the centralized relational schema for the LunAI ecosystem, optimized for cross-app SSO, multilingual content, and operational efficiency.

## 🏛️ Architecture Overview
- **Primary Provider**: PostgreSQL (Supabase).
- **Design Pattern**: Domain-Driven Design (DDD) with shared kernels for Identity and Commercial layers.
- **Hybrid Storage**: Relational columns for high-query fields; `JSONB` for extensible metadata and versioning.

---

## 1. Unified Identity Layer (SSO)
Designed to support a single registration across all LunAI products (Lumz, Lynk, etc.).

### Tables
#### `users`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key. |
| `email` | `text` | Unique email. |
| `password_hash` | `text` | Argon2/Bcrypt hash. |
| `full_name` | `text` | User display name. |
| `avatar_url` | `text` | Profile image path. |
| `created_at` | `timestamptz` | Account creation. |
| `updated_at` | `timestamptz` | Last profile update. |
| `last_login` | `timestamptz` | For engagement tracking. |

#### `roles` & `permissions`
Standard RBAC for cross-app access control.
- `roles`: `id`, `name` (e.g., 'admin', 'user', 'agent').
- `permissions`: `id`, `name` (e.g., 'web:read', 'api:execute').
- `role_permissions`: Join table.
- `user_roles`: Join table between `users` and `roles`.

---

## 2. Hybrid Content Strategy
Supports multilingual translations and Markdown-based blog data.

### Tables
#### `contents`
High-level content entity.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key. |
| `slug` | `text` | Unique URL identifier. |
| `type` | `text` | 'blog', 'documentation', 'page'. |
| `status` | `text` | 'draft', 'published', 'archived'. |
| `metadata` | `jsonb` | Extensible (e.g., categories, author_id). |

#### `content_localizations`
The actual localized content.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key. |
| `content_id` | `uuid` | FK to `contents`. |
| `locale` | `varchar(10)` | 'en', 'zh-CN', 'ja', etc. |
| `title` | `text` | Localized title. |
| `body` | `text` | The Markdown content. |
| `file_hash` | `text` | Hash of the source MD file for sync validation. |
| `published_at` | `timestamptz` | Date visible to users. |

### ⚖️ Trade-off: JSONB vs Structured Columns
- **JSONB for Metadata**: We use `JSONB` for fields that vary by content type (e.g., "reading_time" for blogs vs "complexity_level" for docs).
- **Structured Columns for Localization**: Locale and Title are structured to allow fast filtering and indexing. `body` remains `text` for Markdown storage.

---

## 3. Cross-SaaS Operational Tables

### Commercial Domain
| Table | Description |
| :--- | :--- |
| `saas_products` | List of products (Lumz, Lynk, Agency). |
| `plans` | Tiers (Free, Pro, Enterprise) linked to `saas_products`. |
| `subscriptions` | Links `users` to `plans` with status and period. |

### Financial Domain
| Table | Description |
| :--- | :--- |
| `transactions` | Ledger for payments, status, and provider IDs. |
| `ledger_entries` | Detailed accounting of credits/debits per user. |

### Operational Domain
| Table | Description |
| :--- | :--- |
| `leads` | Inbound marketing leads with source and status. |
| `agents` | Registry of AI agents, their types, and status. |
| `tasks` | Queue of work assigned to agents. |
| `execution_logs` | High-volume logs for agent actions (`input`, `output`, `latency`). |

---

## 🚀 Low-Latency Support for Agentic Workloads
To ensure agents can access data with minimal delay:
1. **Unlogged Tables for Logs**: For `execution_logs` that don't require ACID durability but need high write throughput.
2. **Regional Read Replicas**: Deploying replicas in regions where agentic backend clusters reside.
3. **Partitioning**: Partitioning `execution_logs` by `created_at` (monthly) to keep indexes small and queries fast.
