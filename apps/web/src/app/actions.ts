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

export async function addUser(userData: { email: string; password: string; role: "admin" | "client" }) {
  try {
    const token = "admin-token"; // Assuming an admin is calling this action
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, message: result.message, user: result.user };
    } else {
      return { success: false, message: result.message || "Failed to add user." };
    }
  } catch (error: any) {
    console.error("Error in addUser Server Action:", error);
    return { success: false, message: error.message || "An unexpected error occurred." };
  }
}
