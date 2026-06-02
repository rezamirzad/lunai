"use client";

import React, { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface PostTOCProps {
  items: TOCItem[];
}

export const PostTOC: React.FC<PostTOCProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0% -80% 0%' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden lg:block lg:col-span-4">
      <div className="sticky top-32 self-start flex flex-col gap-8">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6">
            Table of Contents
          </h4>
          <nav className="flex flex-col gap-4">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
                className={`text-sm transition-all duration-300 pl-4 border-l-2 ${
                  activeId === item.id
                    ? 'text-teal-500 font-bold border-teal-500'
                    : 'text-zinc-500 hover:text-zinc-300 border-transparent'
                }`}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};
