import React from "react";
import { fetchPostBySlug, fetchBlogPosts } from "@/app/actions";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PostHeader } from "@/components/PostHeader";
import { PostBody } from "@/components/PostBody";
import { PostTOC } from "@/components/PostTOC";
import { PostNavigation } from "@/components/PostNavigation";
import { PostAuthorCard } from "@/components/PostAuthorCard";
import { ViewTracker } from "@/components/ViewTracker";
import { translations } from "@/lib/translations";

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Get all posts for navigation
  const allPosts = await fetchBlogPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const t = translations["FR"]; // Default to FR for now as in Home

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-teal-500/30">
      <ViewTracker slug={post.slug} />
      <Navbar
        currentLang="FR"
        t={t}
      />

      <main className="pt-16">
        <PostHeader
          title={post.title}
          category={post.category}
          date={post.date}
          readingTime={post.readingTime}
          author={{ name: post.author }}
        />

        <div className="max-w-screen-xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <PostBody content={post.content} />
            
            <div className="mt-16 pt-8 border-t border-white/10 flex items-center gap-6">
              <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">
                <span>Save</span>
              </button>
            </div>

            <PostAuthorCard author={{ name: post.author }} />
            
            <PostNavigation 
              prev={prevPost ? { slug: prevPost.slug, title: prevPost.title } : undefined}
              next={nextPost ? { slug: nextPost.slug, title: nextPost.title } : undefined}
            />
          </div>

          <PostTOC items={post.toc} />
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}
