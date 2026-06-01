# Vercel Deployment Guide

This project has been reorganized into a monorepo. To deploy to Vercel, follow these steps to ensure compatibility with the new structure.

## 1. Vercel Dashboard Settings
When importing the project into Vercel, you must configure the following:

- **Framework Preset**: Next.js
- **Root Directory**: `apps/web`
- **Build Command**: `npm run build` (This will be run within the `apps/web` directory)
- **Install Command**: `npm install` (Vercel will detect the workspace root and install all dependencies)

### Why `apps/web`?
Since the frontend application moved from the root/`frontend` to `apps/web`, Vercel needs to know where the Next.js application lives. Vercel will still have access to the root `packages/` directory for building `@workspace/ui` and `@workspace/shared`.

## 2. Environment Variables
Ensure the following environment variables are set in the Vercel Dashboard:

### Database (PostgreSQL)
As per the new Database Strategy (Task 260601-02), we are transitioning to a relational DB (Supabase/Neon).
- `DATABASE_URL`: Your PostgreSQL connection string.
- `NEXT_PUBLIC_FORMSPREE_KEY`: (Existing) Your Formspree key for the contact form.

## 3. Monorepo Features
- **Shared Packages**: The `next.config.mjs` in `apps/web` is configured with `transpilePackages` to automatically bundle code from `packages/ui` and `packages/shared`.
- **Tailwind CSS**: Tailwind is configured to scan the shared UI package for classes, ensuring that styles from `@workspace/ui` are correctly purged and included in the production build.

## 4. Troubleshooting
If the build fails due to missing dependencies:
1. Ensure the "Root Directory" is exactly `apps/web`.
2. Check that `package-lock.json` at the root is up to date.
3. Verify that all shared packages are listed in `apps/web/package.json` if they are used as dependencies (currently handled via `tsconfig` and `transpilePackages`).
