# Role-Based Authentication & Navigation (Task 260602-02) - Development Tasks

## Specification Summary
**Original Requirements**: "Implement role-based access control (RBAC) and dynamic routing logic that redirects users upon authentication to either the AdminPanel or ClientPanel based on their user_role in Supabase."

## Development Tasks

### Phase 2: Technical Architecture & Design
#### [x] Task 2.1: Database RBAC Schema Design
**Description**: Define changes to the `users` table in Supabase to include a `role` column (`admin` | `client`).
**Acceptance Criteria**:
- SQL migration for `users` table `role` column.

#### [x] Task 2.1.1: PostgreSQL RLS Policy
**Description**: Design the PostgreSQL RLS Policy that allows the application to securely fetch this role metadata upon login.
**Acceptance Criteria**:
- SQL for RLS Policy.

#### [x] Task 2.2: API Contract Update for `/auth/me`
**Description**: Update `API-Contract-Analysis.md` to define the `/auth/me` endpoint that returns the user's role.
**Acceptance Criteria**:
- Endpoint definition with request/response schema.

#### [x] Task 2.3: AuthGuard Pseudocode & Strategy
**Description**: Develop pseudocode for the `AuthGuard` component, outlining its logic for role-based redirection and unauthorized access handling.
**Acceptance Criteria**:
- Pseudocode for `AuthGuard` (redirects, return paths).

#### [x] Task 2.4: Security Implications Analysis
**Description**: Document the security implications of moving role logic to the client-side vs. server-side within the `Modification Impact Statement`.
**Acceptance Criteria**:
- Analysis integrated into impact statement.

### Phase 3: Development & QA Loop

#### [x] Task 3.1: Backend - JWT Verification & Role Return
**Description**: Implement the backend route guard (`apps/api`) that verifies the JWT token and returns the user's role.
**Acceptance Criteria**:
- `/auth/me` endpoint returns correct user role.
- Invalid tokens are rejected.

#### [x] Task 3.2: Frontend - AuthProvider & Role Context
**Description**: Configure the `AuthProvider` to store the user's role in the context/state, making it accessible throughout the frontend.
**Acceptance Criteria**:
- User role is available in React Context.

#### [x] Task 3.3: Implement AuthGuard Component
**Description**: Develop the `AuthGuard` component that wraps dashboard routes, implementing role-based redirection logic.
**Acceptance Criteria**:
- Admin users redirect to `/admin/dashboard`.
- Client users redirect to `/client/dashboard`.
- Unauthorized users redirect to `/login`.

#### [x] Task 3.4: Implement Dynamic Routing & Redirect Protocol
**Description**: Implement dynamic routing logic based on user roles and authentication status.
**Acceptance Criteria**:
- Correct redirection to admin/client dashboards or login.

#### [x] Task 3.5: UI Integration with ModularCard components
**Description**: Ensure the `AdminPanel` and `ClientPanel` use the `ModularCard` components (from Task 260602-01).
**Acceptance Criteria**:
- Panels maintain visual consistency with `image_5912a0.jpg`.

#### [x] Task 3.6: Backend - Implement `POST /login` endpoint
**Description**: Implement the backend endpoint to handle user authentication, including password verification and token generation.
**Acceptance Criteria**:
- Valid credentials return a token and user data.
- Invalid credentials return an error.

#### [x] Task 3.7: Frontend - Integrate Login API
**Description**: Update `AuthContext` and `LoginPage` to use the new `POST /login` backend endpoint.
**Acceptance Criteria**:
- Users can log in with their created credentials.


### Phase 4: Final Integration & Compliance

#### [x] Task 4.1: Modification Impact Statement
**Description**: Document the security implications and changes made to routing and authentication.
**Acceptance Criteria**:
- Comprehensive impact statement generated.

## 🛑 HUMAN APPROVAL GATE
> Pause execution after the Database Schema Update and AuthGuard Pseudocode are prepared (End of Phase 2). Do not modify the `apps/web` router until I reply with [APPROVED].

## Quality Requirements
- [ ] Secure fetching of user roles from Supabase.
- [ ] Robust JWT verification in the backend.
- [ ] Seamless dynamic redirection based on user role.
- [ ] Consistent UI for Admin/Client panels using ModularCard.
