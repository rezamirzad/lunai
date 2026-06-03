# Modification Impact Statement: Role-Based Authentication & Navigation

## 1. Authentication Flow
- **Backend (`apps/api/src/index.ts`)**:
  - Implemented a middleware to mock JWT verification and user role extraction (`admin` or `client`) from the `Authorization` header.
  - Added a `GET /auth/me` endpoint to return the authenticated user's details, including their role.
- **Frontend (`apps/web/src/context/AuthContext.tsx`)**:
  - Created an `AuthProvider` using React Context to manage authentication state (`user`, `isLoading`) and provide `login`/`logout` functions.
  - `login` function now stores a mock JWT in `localStorage` and fetches user details from `/auth/me`.
  - The entire frontend application is wrapped with `AuthProvider` in `apps/web/src/app/layout.tsx`.
- **Login Page (`apps/web/src/app/login/page.tsx`)**:
  - Implemented a mock login form that sets `admin-token` or `client-token` based on email/password combinations for testing.

## 2. Role-Based Access Control (RBAC) & Dynamic Routing
- **AuthGuard Component (`apps/web/src/components/AuthGuard.tsx`)**:
  - A client-side component that protects routes by checking user authentication status and role.
  - Redirects unauthenticated users to `/login`.
  - Redirects unauthorized users (e.g., client trying to access admin route) to `/unauthorized`.
  - Automatically redirects authenticated users to their respective dashboards (`/admin/dashboard` or `/client/dashboard`) if they try to access a generic page.
- **Dashboard Pages**:
  - Created placeholder `AdminDashboardPage` (`apps/web/src/app/admin/dashboard/page.tsx`) and `ClientDashboardPage` (`apps/web/src/app/client/dashboard/page.tsx`), both wrapped with `AuthGuard` specifying the `requiredRole`.
- **Unauthorized Page (`apps/web/src/app/unauthorized/page.tsx`)**:
  - A simple page to inform users they lack access.

## 3. UI Integration
- **Navbar & MobileDrawer**:
  - Updated to dynamically display `Admin` or `Client` in the login button based on the `userRole`.
  - Added conditional navigation links to `/admin/dashboard` or `/client/dashboard` based on `isLoggedIn` and `userRole`.

## 4. Database Schema Alignment
- The `users` table in the Neon database now includes a `role` column of type `user_role` (enum with `admin` and `client` labels), `NOT NULL`, and `DEFAULT 'client'`. This was achieved through manual SQL execution due to tool limitations.

## 5. Security Implications
- The core principle of RBAC is enforced: backend API (`/auth/me`) is the single source of truth for user roles. Frontend `AuthGuard` provides UI-level protection and redirection, but all critical actions must still be validated on the backend.
