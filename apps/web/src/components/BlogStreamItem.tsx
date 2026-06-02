import React from 'react';
import Link from 'next/link';
import { BlogCategoryFilter } from './BlogCategoryFilter';

export interface BlogStreamItemProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    category: string;
    date: string;
    author?: string;
  };
  layout: 'text-only' | 'right-image';
  className?: string;
}

export const BlogStreamItem: React.FC<BlogStreamItemProps> = ({
  post,
  layout,
  className = '',
}) => {
  const isRightImage = layout === 'right-image' && post.coverImage;

  return (
    <Link href={`/blog/${post.id}`}>
      <article 
        className={`group cursor-pointer flex flex-col-reverse md:flex-row gap-6 md:gap-8 items-start ${className}`}
      >
        {/* Content Section */}
        <div className={`flex flex-col gap-3 ${isRightImage ? 'md:w-2/3' : 'w-full'}`}>
          <div className="flex items-center gap-3">
            <BlogCategoryFilter category={post.category} />
            <span className="text-xs uppercase tracking-widest text-zinc-400">
              {post.date}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-white tracking-tight transition-colors group-hover:text-teal-500">
            {post.title}
          </h3>
          
          <p className="text-zinc-400 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          {post.author && (
            <div className="text-xs uppercase tracking-widest text-zinc-500 mt-1">
              By {post.author}
            </div>
          )}
        </div>

        {/* Image Section */}
        {isRightImage && (
          <div className="w-full md:w-1/3 aspect-[16/9] md:aspect-square lg:aspect-[4/3] overflow-hidden rounded-xl bg-[#111111] mb-4 md:mb-0">
            <img
              src={post.coverImage}
              alt={post.title}
              loading="lazy"
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
      </article>
    </Link>
  );
};
