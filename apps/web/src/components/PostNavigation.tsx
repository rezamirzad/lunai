import React from 'react';
import Link from 'next/link';

interface PostNavigationProps {
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}

export const PostNavigation: React.FC<PostNavigationProps> = ({ prev, next }) => {
  return (
    <nav className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row gap-8 justify-between">
      {prev ? (
        <Link 
          href={`/blog/${prev.slug}`}
          className="group flex flex-col gap-2 max-w-sm"
        >
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold group-hover:text-teal-500 transition-colors">Previous Post</span>
          <span className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">{prev.title}</span>
        </Link>
      ) : <div />}

      {next ? (
        <Link 
          href={`/blog/${next.slug}`}
          className="group flex flex-col gap-2 max-w-sm md:text-right"
        >
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold group-hover:text-teal-500 transition-colors">Next Post</span>
          <span className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">{next.title}</span>
        </Link>
      ) : <div />}
    </nav>
  );
};
