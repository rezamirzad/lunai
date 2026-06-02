import React from 'react';
import { BlogCategoryFilter } from './BlogCategoryFilter';

interface PostHeaderProps {
  title: string;
  category: string;
  date: string;
  readingTime: number;
  author: {
    name: string;
    avatarUrl?: string;
  };
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  category,
  date,
  readingTime,
  author,
}) => {
  return (
    <header className="pt-20 pb-12 border-b border-white/10">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <BlogCategoryFilter category={category} />
            <span className="text-zinc-500 text-sm uppercase tracking-widest">
              {date}
            </span>
            <span className="text-zinc-500 text-sm">•</span>
            <span className="text-zinc-500 text-sm uppercase tracking-widest">
              {readingTime} min read
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white">
            {title}
          </h1>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
              {author.avatarUrl ? (
                <img src={author.avatarUrl} alt={author.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-teal-500 to-blue-600" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-widest">{author.name}</p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest">Lunaris Team</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
