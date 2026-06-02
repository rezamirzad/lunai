# Error Learning Log: 260601-08-responsive-parity

- **_task_**: 260601-08-responsive-parity
- **_Problem_**: Next.js Build Error - "You're importing a component that needs useState. It only works in a Client Component but none of its parents are marked with 'use client'..."
- **_Root Cause_**: The `Navbar.tsx` component was refactored to include an `isDrawerOpen` state using `useState`, but the `"use client";` directive was omitted at the top of the file. In Next.js App Router, components are Server Components by default unless explicitly marked.
- **_Resolution_**: Added `"use client";` to the first line of `apps/web/src/components/Navbar.tsx`.
- **_Lesson Learned_**: Always double-check for React hooks usage when refactoring or creating components in Next.js App Router environments. Any component using `useState`, `useEffect`, or other client-side hooks must have the `"use client";` directive, even if it is currently only used within other Client Components.
