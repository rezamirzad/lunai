// frontend/src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { translations, Language } from "@/lib/translations";
import { fetchBlogPosts } from "./actions"; // Import the action
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Blog from "@/components/Blog";

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

export default function Home() {
  const [lang, setLang] = useState<Language>("FR");
  const [activeView, setActiveView] = useState("home"); // Track active view
  const t = translations[lang];
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts when the component mounts
    fetchBlogPosts().then(setPosts);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Pass onViewChange to Navbar to allow component switching */}
      <Navbar
        currentLang={lang}
        setLang={setLang}
        t={t}
        onViewChange={setActiveView}
      />

      <main className="pt-16">
        {activeView === "home" && <Hero t={t} />}
        {activeView === "services" && <Services t={t} />}
        {activeView === "portfolio" && <Portfolio t={t} />}
        {activeView === "pricing" && <Pricing t={t} />}
        {activeView === "contact" && <Contact t={t} />}
        {activeView === "about" && <About t={t} />}
        {activeView === "blog" && <Blog t={t} posts={posts} />}{" "}
      </main>

      <Footer t={t} />
    </div>
  );
}
