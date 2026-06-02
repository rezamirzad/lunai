"use client";

import React, { useState } from "react";
import { Filter, X } from "lucide-react";

interface BlogSidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function BlogSidebar({ selectedCategory, onSelectCategory }: BlogSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { name: "Engineering", color: "text-green-500" },
    { name: "Product", color: "text-blue-500" },
    { name: "AI", color: "text-purple-500" },
    { name: "Changelog", color: "text-orange-500" },
    { name: "General", color: "text-teal-500" },
  ];

  return (
    <>
      {/* Mobile Filter Button (<768px) */}
      <div className="md:hidden flex items-center justify-between mb-2">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#111111] px-4 py-2 rounded-full border border-white/10 text-sm font-semibold hover:bg-white/5 transition-colors"
        >
          <Filter size={16} />
          <span>Categories</span>
        </button>
      </div>

      {/* Mobile Bottom Sheet / Drawer (<768px) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-full bg-[#111111] p-6 rounded-t-2xl border-t border-white/10 animate-in slide-in-from-bottom-full duration-200">
            <button className="absolute top-4 right-4 p-2 text-[#A1A1AA] hover:text-white" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold mb-6 text-white">Categories</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <button 
                  onClick={() => { onSelectCategory(null); setIsOpen(false); }}
                  className={`font-semibold hover:text-white transition-colors text-lg flex items-center min-h-[44px] w-full text-left ${selectedCategory === null ? 'text-white' : 'text-[#A1A1AA]'}`}
                >
                  All Posts
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.name}>
                  <button 
                    onClick={() => { onSelectCategory(c.name); setIsOpen(false); }}
                    className={`font-semibold hover:text-white transition-colors text-lg flex items-center min-h-[44px] w-full text-left ${selectedCategory === c.name ? 'text-white' : c.color}`}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tablet Horizontal Scroll (>=768px, <1024px) & Desktop Fixed Vertical (>=1024px) */}
      <aside className="hidden md:flex lg:flex-col lg:w-[250px] overflow-x-auto lg:overflow-visible gap-4 pb-4 lg:pb-0 border-b border-white/10 lg:border-none mb-6 lg:mb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <h3 className="hidden lg:block text-sm font-bold uppercase tracking-widest text-[#A1A1AA] mb-4">Categories</h3>
        <ul className="flex flex-row lg:flex-col gap-6 lg:gap-4 min-w-max lg:min-w-0">
          <li>
             <button 
               onClick={() => onSelectCategory(null)}
               className={`font-semibold whitespace-nowrap hover:text-white transition-colors min-h-[44px] lg:min-h-0 flex items-center lg:block text-sm ${selectedCategory === null ? 'text-white' : 'text-[#A1A1AA]'}`}
             >
               All Posts
             </button>
           </li>
          {categories.map((c) => (
             <li key={c.name}>
               <button 
                 onClick={() => onSelectCategory(c.name)}
                 className={`font-semibold whitespace-nowrap hover:text-white transition-colors min-h-[44px] lg:min-h-0 flex items-center lg:block text-sm ${selectedCategory === c.name ? 'text-white' : c.color}`}
               >
                 {c.name}
               </button>
             </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
