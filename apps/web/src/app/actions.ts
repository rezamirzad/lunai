// frontend/src/app/actions.ts
"use server"; // This directive is crucial

import { getSortedPostsData } from "@/lib/blog";

export async function fetchBlogPosts() {
  return getSortedPostsData();
}
