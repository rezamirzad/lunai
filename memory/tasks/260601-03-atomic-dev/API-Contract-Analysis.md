# API Contract Analysis: Atomic Prop Delivery

This document defines the interface between the LunAI Data Layer (Neon) and the stateless React components in the frontend, optimized for **Atomic Development**.

## 🎯 Design Philosophy
> **Requirement Quote (260601-03):** "Ensure input/output schemas are optimized for stateless React components."

The API's primary role is to serve **Pre-Shaped Props**. Instead of the frontend fetching raw data and transforming it, the API performs the mapping so the component can be instantiated directly.

---

## 1. Content Delivery (Atomic)
Retrieves pre-localized data matching a component's prop interface.

### `GET /v1/content/:slug?locale=en`
**Output (JSON):**
```json
{
  "id": "uuid",
  "component_id": "BlogCard",
  "props": {
    "title": "Optimizing Agentic Workflows",
    "excerpt": "A deep dive into sub-task orchestration...",
    "coverImage": "https://cdn.lunai.com/blog/001.jpg",
    "date": "2024-06-01"
  },
  "content": "# Markdown body for full page renders..."
}
```
**Atomic Impact:** The `props` object is passed directly to the React component: `<BlogCard {...data.props} />`.

---

## 2. SSO & User Preferences (Cross-App)
Stateless identity management.

### `GET /v1/users/me`
**Output (JSON):**
```json
{
  "id": "uuid",
  "profile": {
    "name": "Jane Architect",
    "avatar": "..."
  },
  "settings": {
    "theme": "dark",
    "sidebarCollapsed": true
  },
  "access": {
    "lumz": "pro",
    "lynk": "free"
  }
}
```

---

## 3. Agentic Telemetry (High-Volume)
Optimized for rapid ingestion and stateless status updates.

### `POST /v1/telemetry` (Internal Agent API)
**Input (JSON):**
```json
{
  "execution_id": "uuid",
  "step": "plan_generation",
  "status": "success",
  "data": {
    "tokens": 450,
    "latency": "1.2s"
  }
}
```

### `GET /v1/executions/:id/status`
**Output (JSON):**
```json
{
  "id": "uuid",
  "status": "in_progress",
  "progress_percentage": 65,
  "latest_log": "Generated 4/6 sub-tasks."
}
```

---

## 🛠️ Implementation Guidance

### Data Transfer Objects (DTOs)
All API responses must strictly follow the DTOs defined in `packages/shared/src/dto`. These DTOs serve as the single source of truth for both the NestJS (API) and Next.js (Web) layers.

### Middleware: Prop-Shaping Layer
The API layer should implement a "Prop-Shaper" interceptor. This layer:
1. Detects the `component_id` from the content record.
2. Applies any dynamic logic (e.g., calculating "time to read" or formatting dates).
3. Packages the result into the `props` object before sending to the client.

### Edge Optimization
Endpoints serving `props` for the landing page and blog should include `Cache-Control` headers optimized for Vercel's Edge Network to ensure sub-100ms delivery.
