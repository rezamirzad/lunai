# PostgreSQL RLS Policy Definition

## Purpose
To enable secure fetching of user role metadata from the `users` table upon authentication, ensuring users can only view their own role.

## RLS Policy SQL

```sql
-- Enable Row Level Security on the users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow authenticated users to select their own row
-- This policy grants SELECT access to `public.users` for authenticated users,
-- but only if the user's ID (`id` column) matches the ID of the currently
-- authenticated user as provided by Supabase's `auth.uid()` function.
CREATE POLICY "users_self_select_policy"
ON public.users FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Optional: If roles need to be managed by specific users (e.g., admins),
-- additional policies would be needed for INSERT/UPDATE/DELETE operations,
-- but for fetching one's own role, SELECT is sufficient.
-- This current policy ensures data isolation for user roles.
```

## Explanation
-   `ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;`: Activates RLS for the `users` table. Without this, no policies will be enforced.
-   `CREATE POLICY "users_self_select_policy" ON public.users FOR SELECT TO authenticated USING (id = auth.uid());`: This policy is named `users_self_select_policy`.
    -   `FOR SELECT`: It applies to `SELECT` operations.
    -   `TO authenticated`: It applies to all users who are logged in (i.e., have an `auth.uid()` available).
    -   `USING (id = auth.uid())`: This is the core of the policy. It filters rows such that a user can only `SELECT` rows where the `id` column of the `users` table matches their `auth.uid()`. This effectively restricts users to seeing only their own record.
