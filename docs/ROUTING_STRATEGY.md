# LunAI Routing & Integration Strategy

## Hub-and-Spoke Ecosystem

The LunAI monorepo uses a path-based routing strategy to unify the Hub and its Spokes under a single domain (in production) or coordinated ports (in development).

### 1. The Hub (`apps/web`)
- **Path**: `/`
- **Role**: Primary landing page, gateway, and ecosystem orchestrator.
- **Port**: `localhost:3000`

### 2. The Spokes (`apps/app01` - `apps/app04`)
- **Path**: `/app01`, `/app02`, `/app03`, `/app04`
- **Role**: Independent functional modules.
- **Ports**:
  - `app01`: `localhost:3001`
  - `app02`: `localhost:3002`
  - `app03`: `localhost:3003`
  - `app04`: `localhost:3004`

## Integration Logic

### Monorepo Workspaces
Turborepo manages the apps as separate workspaces. Shared components and tokens are linked via `pnpm` workspaces.

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Shared Navigation Component
A specialized `Navigation` component in `@workspace/ui` handles cross-app routing. 
- In **Development**: It uses absolute URLs with port numbers (e.g., `http://localhost:3001`).
- In **Production**: It uses relative paths (e.g., `/app01`) supported by a reverse proxy or Next.js rewrites in the Hub.

### Reverse Proxy / Gateway
The Hub (`apps/web`) can be configured with `next.config.js` rewrites to proxy requests to the spoke applications in a unified deployment:

```js
// apps/web/next.config.js (conceptual)
module.exports = {
  async rewrites() {
    return [
      {
        source: '/app01/:path*',
        destination: 'http://app01-service:3000/:path*',
      },
      // ... repeat for other apps
    ]
  },
}
```
