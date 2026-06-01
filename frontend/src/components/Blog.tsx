// frontend/src/components/Blog.tsx
"use client";

interface BlogProps {
  t: any;
  posts: any[];
}

export default function Blog({ t, posts }: BlogProps) {
  return (
    <section>
      {posts.map((post) => (
        <div key={post.slug}>{post.title}</div>
      ))}
    </section>
  );
}
