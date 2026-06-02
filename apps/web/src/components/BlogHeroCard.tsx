import React from 'react';
import Link from 'next/link';
import { BlogCategoryFilter } from './BlogCategoryFilter';

export interface BlogHeroCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    category: string;
    date: string;
    author?: string;
  };
  featured?: boolean;
  className?: string;
}

export const BlogHeroCard: React.FC<BlogHeroCardProps> = ({
  post,
  featured = false,
  className = '',
}) => {
  return (
    <Link href={`/blog/${post.id}`}>
      <article className={`flex flex-col gap-4 group cursor-pointer ${className}`}>
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-[#111111]">
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <BlogCategoryFilter category={post.category} />
            <span className="text-xs uppercase tracking-widest text-zinc-400">
              {post.date}
            </span>
          </div>
          
          <h2 
            className={`font-black tracking-tight text-white transition-colors group-hover:text-teal-500 ${
              featured ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'
            }`}
          >
            {post.title}
          </h2>
          
          <p className="text-zinc-400 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
          
          {post.author && (
            <div className="text-xs uppercase tracking-widest text-zinc-500 mt-2">
              By {post.author}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};
