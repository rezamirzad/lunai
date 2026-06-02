"use client";
import { useState, useMemo } from "react";
import { TranslationInterface } from "@workspace/shared";
import { Grid } from "@workspace/ui";
import { BlogLayout } from "./BlogLayout";
import { BlogHeader } from "./BlogHeader";
import { BlogSidebar } from "./BlogSidebar";
import { BlogHeroCard } from "./BlogHeroCard";
import { BlogStreamItem } from "./BlogStreamItem";

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  category?: string;
  coverImage?: string;
  author?: string;
  featured?: boolean;
}

export default function Blog({
  t,
  posts,
}: {
  t: TranslationInterface;
  posts: Post[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const matchesSearch =
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory
          ? (post.category || "General") === selectedCategory
          : true;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        // First sort by featured status
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // Then sort by date (newest first)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [posts, searchTerm, selectedCategory]);

  const mappedPosts = filteredPosts.map((post) => ({
    id: post.slug,
    title: post.title,
    excerpt: post.description || post.content.substring(0, 150) + "...",
    coverImage:
      post.coverImage ||
      "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=3174&auto=format&fit=crop",
    category: post.category || "General",
    date: post.date,
    author: post.author || "Lunaris Team",
    featured: post.featured,
  }));

  const featuredPosts = mappedPosts.slice(0, 2);
  const streamPosts = mappedPosts.slice(2);

  return (
    <BlogLayout
      header={
        <BlogHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      }
      sidebar={
        <BlogSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      }
    >
      <div className="flex flex-col gap-12">
        {/* Feature Grid (Top) */}
        {featuredPosts.length > 0 && (
          <Grid cols={1} tabletCols={2} gap={8}>
            {featuredPosts.map((post) => (
              <BlogHeroCard key={post.id} post={post} featured={true} />
            ))}
          </Grid>
        )}

        {/* Vertical Stream (Bottom) */}
        {streamPosts.length > 0 && (
          <div className="flex flex-col gap-10 border-t border-white/10 pt-10">
            {streamPosts.map((post, index) => (
              <BlogStreamItem
                key={post.id}
                post={post}
                layout={index % 2 === 0 ? "right-image" : "text-only"}
              />
            ))}
          </div>
        )}

        {mappedPosts.length === 0 && (
          <div className="text-center py-20 text-[#A1A1AA]">
            <p className="text-xl">No posts found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory(null);
              }}
              className="mt-4 text-teal-500 hover:text-teal-400 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </BlogLayout>
  );
}
