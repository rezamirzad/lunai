// frontend/src/app/actions.ts
"use server"; // This directive is crucial

import { getSortedPostsData, getPostData } from "@/lib/blog";

export async function fetchBlogPosts() {
  return getSortedPostsData();
}

export async function fetchPostBySlug(slug: string) {
  return getPostData(slug);
}

export async function incrementPostViews(slug: string) {
  // Logic to update view_count in Neon database
  // This will be implemented in Phase 3.8
  console.log(`Incrementing views for: ${slug}`);
}
