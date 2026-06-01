"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Adds support for tables, task lists, etc.
import rehypeRaw from "rehype-raw"; // Adds support for embedded HTML
import rehypeHighlight from "rehype-highlight"; // Adds syntax highlighting
import "highlight.js/styles/github-dark.css"; // Theme for code blocks

export default function Blog({ t, posts }: { t: any; posts: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <section id="blog" className="py-16 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-10">{t?.blog?.title || "Blog"}</h1>

        {currentPosts.map((post) => (
          <article
            key={post.slug}
            className="mb-12 border-b border-white/10 pb-10"
          >
            <span className="text-sm text-gray-500">{post.date}</span>
            <h2 className="text-3xl font-bold mt-1 mb-2">{post.title}</h2>

            {/* The 'prose' class from @tailwindcss/typography handles the styling */}
            <div className="prose prose-invert prose-lg max-w-none mt-6">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        ))}

        <div className="flex gap-4 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-white/10 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-white/10 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
