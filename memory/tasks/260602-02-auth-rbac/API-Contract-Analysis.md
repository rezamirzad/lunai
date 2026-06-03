# API Contract: Authentication & Authorization

## 1. Get User Role Endpoint
**Endpoint**: `GET /auth/me`

### Request
- **Headers**:
  - `Authorization`: `Bearer <JWT_TOKEN>` (required)

### Response (200 OK)
```json
{
  "user": {
    "id": "uuid-of-user",
    "email": "user@example.com",
    "role": "admin" | "client"
  }
}
```

### Response (401 Unauthorized)
```json
{
  "message": "Unauthorized"
}
```

## 2. AuthGuard Pseudocode

### Purpose
The `AuthGuard` component will protect routes by redirecting users based on their authentication status and role.

### Logic
```
function AuthGuard({ children, requiredRole }) {
  const { user, loading } = useAuth(); // Assume AuthProvider provides user and loading state
  const router = useRouter();

  if (loading) {
    return <LoadingSpinner />; // Or null, depending on UX
  }

  if (!user) {
    router.push('/login?returnTo=' + window.location.pathname);
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect unauthorized roles, e.g., client trying to access admin
    router.push('/unauthorized'); // Or '/login' with an error message
    return null;
  }

  // User is authenticated and has the correct role
  // Redirect to specific dashboards
  if (user.role === 'admin' && window.location.pathname !== '/admin/dashboard') {
    router.push('/admin/dashboard');
    return null;
  }
  if (user.role === 'client' && window.location.pathname !== '/client/dashboard') {
    router.push('/client/dashboard');
    return null;
  }

  return children; // Render the protected content
}
```

## 3. Security Implications Analysis (Client-side vs. Server-side Role Logic)

### Client-side Role Logic (Less Secure)
- **Pros**: Faster initial UI rendering, less server load for simple checks.
- **Cons**: Easily bypassable by malicious users. Roles stored in client-side state (e.g., local storage, Redux) can be manipulated, potentially granting unauthorized access to UI elements or client-side routes.
- **Mitigation**: NEVER rely solely on client-side role checks for access to sensitive data or actions. Always re-verify roles on the server for every protected API call.

### Server-side Role Logic (More Secure)
- **Pros**: Authoritative source of truth for user roles. Prevents tampering, enforces robust access control. Essential for protecting API endpoints and data.
- **Cons**: Can introduce slight latency if role checks are performed on every request.
- **Implementation**: The backend (`apps/api`) will be the single source of truth for user roles, verified via JWT and returned through a dedicated `/auth/me` endpoint. Frontend will fetch and store this role in context for UI-level routing decisions, but all critical actions will be re-validated on the server.
