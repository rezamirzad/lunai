// frontend/src/app/page.tsx
"use client";

import { useState } from "react";
import { translations, Language } from "@/lib/translations";
import { getSortedPostsData } from "@/lib/blog"; // Utility function
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Blog from "@/components/Blog";
import BlogWrapper from "@/components/BlogWrapper";

export default function Home() {
  const [lang, setLang] = useState<Language>("FR");
  const [activeView, setActiveView] = useState("home"); // Track active view
  const t = translations[lang];
  const posts = getSortedPostsData();

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
        {activeView === "blog" && <BlogWrapper t={t} />}{" "}
      </main>

      <Footer t={t} />
    </div>
  );
}
