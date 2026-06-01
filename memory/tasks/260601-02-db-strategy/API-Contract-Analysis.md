# API Layer Contract Definition: DB-Driven Architecture

This document defines the contract for the API layer of the LunAI ecosystem, bridging the `@workspace/api` (Backend) and `@workspace/web` (Frontend) packages using the centralized database strategy.

## 🎯 Architectural Intent
As specified in `memory/tasks/260601-02-db-strategy/description.md`:
> "Unified Identity Layer: Design a schema for a centralized Users table capable of managing cross-app authentication (SSO) where a single registration grants access to any LunAI product."
> "Operational: ... Task/Execution logs for the agentic backend."

The API serves as the orchestration layer for Identity, Localized Content, and Agentic Operations.

---

## 1. Identity & Access (SSO)
Centrally managed authentication supporting cross-app session sharing.

### Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/v1/auth/register` | Create a new unified LunAI account. | No |
| `POST` | `/v1/auth/login` | Authenticate and receive a JWT. | No |
| `POST` | `/v1/auth/sso/token` | Exchange a cross-app token for a service-specific session. | No |
| `GET` | `/v1/users/me` | Retrieve profile and active subscriptions. | Yes |

### Schema: `POST /v1/auth/login`
**Input (JSON):**
```json
{
  "email": "user@example.com",
  "password": "secure_password_string"
}
```
**Output (JSON):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe"
  },
  "token": "jwt_string",
  "expires_in": 3600
}
```

---

## 2. Hybrid Content (Localized Markdown)
Retrieves content from the `contents` and `content_localizations` tables, synced via the "Content as Code" pipeline.

### Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/v1/content` | List content with pagination and type filtering. | No |
| `GET` | `/v1/content/:slug` | Retrieve localized content by slug. | No |
| `GET` | `/v1/content/search` | Full-text search across localized titles and bodies. | No |

### Schema: `GET /v1/content/:slug?locale=en`
**Output (JSON):**
```json
{
  "id": "uuid",
  "slug": "next-gen-ai",
  "type": "blog",
  "locale": "en",
  "title": "The Future of Agentic AI",
  "body": "# Markdown Content Here...",
  "metadata": {
    "author_id": "uuid",
    "tags": ["AI", "Future"],
    "reading_time": 5
  },
  "published_at": "2024-06-01T10:00:00Z"
}
```

---

## 3. Operational & Agentic Logs
Managing subscriptions and tracking AI agent task execution.

### Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/v1/billing/subscription` | Check current plan and limits. | Yes |
| `GET` | `/v1/billing/transactions` | Retrieve payment history. | Yes |
| `POST` | `/v1/tasks` | Create a new task for the agentic backend. | Yes |
| `GET` | `/v1/tasks/:id` | Poll for task status and execution logs. | Yes |
| `GET` | `/v1/agents` | List available agent types and their status. | Yes |

### Schema: `POST /v1/tasks`
**Input (JSON):**
```json
{
  "agent_id": "uuid",
  "action": "summarize_document",
  "payload": {
    "url": "https://example.com/doc.pdf"
  }
}
```
**Output (JSON):**
```json
{
  "task_id": "uuid",
  "status": "queued",
  "estimated_completion": "2024-06-01T10:05:00Z"
}
```

---

## 🛠️ Integration Notes

### `@workspace/api` (Backend)
- **Controller Pattern**: Implement controllers in `Apps/api/src/controllers/` to handle logic.
- **Prisma/Drizzle Integration**: Use a shared ORM layer in `packages/shared/database` to ensure `@workspace/api` and migration scripts use identical models.
- **Middleware**: Implement `authMiddleware` that validates the unified JWT against the `users` table.

### `@workspace/web` (Frontend)
- **API Client**: Update `Apps/web/src/lib/api-client.ts` to use these standardized endpoints.
- **SWR/React Query**: Use hooks to fetch content and poll for task status.
- **Localization Context**: Ensure the `locale` from the frontend router is passed as a query param to content endpoints.
- **Type Alignment**: Update `packages/shared/src/types.ts` to align the `Language` type with the supported database locales (e.g., transitioning from uppercase `EN` to lowercase `en` to match standard BCP 47 codes).

### Unified Identity Sync
As per requirement:
- The `users` table is the source of truth for all products.
- Apps should use a shared `secret_key` for JWT signing or an OIDC-compliant flow for SSO.

### Operational Logging
- High-volume `execution_logs` should be written via an optimized path (e.g., batching) to minimize DB pressure during peak agentic activity.
