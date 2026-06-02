// frontend/src/app/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { translations } from "@/lib/translations";
import { Language } from "@workspace/shared";
import { fetchBlogPosts } from "./actions"; // Import the action
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Lazy load section components for better mobile performance
const Hero = React.lazy(() => import("@/components/Hero"));
const Services = React.lazy(() => import("@/components/Services"));
const Portfolio = React.lazy(() => import("@/components/Portfolio"));
const Pricing = React.lazy(() => import("@/components/Pricing"));
const Contact = React.lazy(() => import("@/components/Contact"));
const About = React.lazy(() => import("@/components/About"));
const Blog = React.lazy(() => import("@/components/Blog"));

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  category?: string;
  coverImage?: string;
  author?: string;
  featured?: boolean;
}

const Loading = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default function Home() {
  const [lang, setLang] = useState<Language>("FR");
  const [activeView, setActiveView] = useState("home"); // Track active view
  const t = translations[lang];
  const [posts, setPosts] = useState<Post[]>([]);

  const handleLogin = () => {
    console.log("Login requested");
    // This is where you would trigger the auth flow (e.g. Supabase Auth, Clerk, etc.)
  };

  useEffect(() => {
    // Fetch posts when the component mounts
    fetchBlogPosts().then(setPosts);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar
        currentLang={lang}
        setLang={setLang}
        t={t}
        onViewChange={setActiveView}
        onLogin={handleLogin}
      />

      <main className="pt-16">
        <Suspense fallback={<Loading />}>
          {activeView === "home" && <Hero t={t} />}
          {activeView === "services" && <Services t={t} />}
          {activeView === "portfolio" && <Portfolio t={t} />}
          {activeView === "pricing" && <Pricing t={t} />}
          {activeView === "contact" && <Contact t={t} />}
          {activeView === "about" && <About t={t} />}
          {activeView === "blog" && <Blog t={t} posts={posts} />}
        </Suspense>
      </main>

      <Footer t={t} />
    </div>
  );
}
