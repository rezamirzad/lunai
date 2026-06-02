"use client";

import React from "react";
import { Search, Rss, Globe, Share2 } from "lucide-react";

interface BlogHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function BlogHeader({ searchTerm, onSearchChange }: BlogHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
      <div className="flex flex-col">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">Blog</h1>
        <p className="text-[#A1A1AA] mt-2">Latest news, insights, and technical writing.</p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-[#A1A1AA]" />
          </div>
          <input 
            type="text" 
            placeholder="Search posts..." 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#111111] border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-[#A1A1AA] focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all min-h-[44px]"
          />
        </div>

        <div className="flex items-center gap-3 text-[#A1A1AA]">
          <button className="p-2 hover:text-white transition-colors bg-[#111111] rounded-full border border-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="RSS Feed">
            <Rss size={18} />
          </button>
          <button className="p-2 hover:text-white transition-colors bg-[#111111] rounded-full border border-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Website">
            <Globe size={18} />
          </button>
          <button className="p-2 hover:text-white transition-colors bg-[#111111] rounded-full border border-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Share">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

