// This is a Server Component (no "use client" here)
import { getSortedPostsData } from "@/lib/blog";
import BlogClient from "./Blog"; // Your current Blog component
import { TranslationInterface } from "@/lib/translations";

export default function BlogWrapper({ t }: { t: TranslationInterface }) {
  const posts = getSortedPostsData(); // fs runs here on the server
  return <BlogClient t={t} posts={posts} />;
}
