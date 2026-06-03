Task Description: Role-Based Authentication & Navigation Strategy
TaskID: 260602-02-auth-rbac
Objective: Implement role-based access control (RBAC) and dynamic routing logic that redirects users upon authentication to either the AdminPanel or ClientPanel based on their user_role in Supabase.
Instructions:
Database RBAC Schema:
Ensure the users table in Supabase contains a role column ('admin' | 'client').
Create a PostgreSQL RLS (Row Level Security) Policy that allows the application to securely fetch this role metadata upon login.
Authentication Middleware Implementation:
Backend (apps/api): Implement a route guard that verifies the JWT token and returns the user's role.
Frontend (apps/web): Configure the AuthProvider to store the user's role in the context/state.
Dynamic Routing Logic:
Implement an AuthGuard component that wraps your dashboard routes.
Redirect Protocol:
If role === 'admin', redirect to /admin/dashboard.
If role === 'client', redirect to /client/dashboard.
Handle unauthorized access attempts by redirecting to /login with a proper return path.
UI Integration (Apple-Style Parity):
Ensure the AdminPanel and ClientPanel use the new ModularCard components defined in Task 260602-01 to maintain visual consistency with image_5912a0.jpg.
Compliance & Documentation:
Task Registry: Initialize memory/tasks/260602-02-auth-rbac/task-registry.md.
API Contract: Update API-Contract-Analysis.md to define the /auth/me endpoint that returns the user's role.
Modification Impact Statement: Document the security implications of moving role logic to the client-side vs. server-side.
Human Approval Gate:
Pause execution after the Database Schema Update and AuthGuard Pseudocode are prepared. Do not modify the apps/web router until I reply with [APPROVED].
Suggested Agent Allocation:
ArchitectAgent: To design the RLS policies and secure role-fetching mechanism.
ProjectManagerAgent: To coordinate the implementation of the AuthGuard across the monorepo.
DocumentationAgent: To define the security parameters for role-based navigation.
