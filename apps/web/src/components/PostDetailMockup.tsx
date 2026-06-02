"use client";

import React from 'react';

// Mockup of the Post Detail Page to demonstrate Layout & Typography
export default function PostDetailMockup() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-teal-500/30">
      {/* Post Header Section */}
      <header className="pt-20 pb-12 border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-teal-500/10 text-teal-500 text-xs font-bold uppercase tracking-widest rounded-full border border-teal-500/20">
                Product
              </span>
              <span className="text-zinc-500 text-sm uppercase tracking-widest">
                July 1, 2026
              </span>
              <span className="text-zinc-500 text-sm">•</span>
              <span className="text-zinc-500 text-sm uppercase tracking-widest">
                8 min read
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl">
              The LunAI LUMZ Service Matrix
            </h1>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-teal-500 to-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-widest">Reza MIRZAD</p>
                <p className="text-xs text-zinc-500 uppercase tracking-widest">Founder & Lead Architect</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-screen-xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Post Body (8 Columns) */}
        <div className="lg:col-span-8">
          <article className="prose prose-invert prose-zinc max-w-none">
            <p className="text-xl text-zinc-400 leading-relaxed mb-8 italic border-l-4 border-teal-500 pl-6">
              A detailed breakdown of our agentic frameworks and service tiers.
            </p>
            
            <h2 id="introduction" className="text-3xl font-bold mb-6 text-white tracking-tight">Introduction</h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              In the rapidly evolving landscape of autonomous systems, clarity is currency. 
              The LUMZ Service Matrix represents the culmination of three years of R&D into 
              multi-agent orchestration and spatial compute integration.
            </p>

            <div className="my-10 p-6 bg-zinc-900/50 rounded-xl border border-white/5 font-mono text-sm overflow-hidden">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                <span className="text-zinc-500">matrix-config.yaml</span>
                <span className="text-teal-500">YAML</span>
              </div>
              <pre className="text-zinc-300">
                <code>{`services:
  orchestrator:
    tier: platinum
    capabilities:
      - autonomous-planning
      - multi-agent-sync
      - context-compression`}</code>
              </pre>
            </div>

            <h2 id="core-framework" className="text-3xl font-bold mb-6 text-white tracking-tight">Core Framework</h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              At the heart of LUMZ lies the Agentic Core—a stateless processing engine 
              designed for high-concurrency event loops.
            </p>
          </article>
          
          {/* Share/Save Buttons */}
          <div className="mt-16 pt-8 border-t border-white/10 flex items-center gap-6">
            <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">
              <span>Share</span>
            </button>
            <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Sidebar / TOC (4 Columns) */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-32 self-start flex flex-col gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6">Table of Contents</h4>
              <nav className="flex flex-col gap-4">
                <a href="#introduction" className="text-sm text-teal-500 font-bold border-l-2 border-teal-500 pl-4">Introduction</a>
                <a href="#core-framework" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors pl-4 border-l-2 border-transparent">Core Framework</a>
                <a href="#service-tiers" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors pl-4 border-l-2 border-transparent">Service Tiers</a>
              </nav>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
