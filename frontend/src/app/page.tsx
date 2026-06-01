// frontend/src/app/page.tsx

"use client";

import { useState } from "react";
import { translations, Language } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio"; // Added import
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [lang, setLang] = useState<Language>("FR");
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar currentLang={lang} setLang={setLang} t={t} />

      <main>
        <Hero t={t} />
        <Services t={t} />
        {/* New Portfolio Section */}
        <Portfolio t={t} />
        <Pricing t={t} />
        <Contact t={t} />
      </main>

      <Footer t={t} />
    </div>
  );
}
