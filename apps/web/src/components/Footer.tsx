import React from "react";
import { TranslationInterface } from "@workspace/shared";

const Footer = ({ t }: { t: TranslationInterface }) => {
  return (
    <footer className="py-24 flex flex-col items-center gap-16 border-t border-white/5 bg-black">
      {/* Section Logo & Slogan */}
      <div className="text-center">
        <div className="text-white text-2xl font-black tracking-tighter mb-4">
          <span className="text-teal-500">LunAI</span>
        </div>
        <p className="text-xs text-zinc-500 uppercase tracking-[0.3em] font-bold">
          Luxembourg Digital Craft
        </p>
      </div>

      {/* Navigation Rapide */}
      <nav className="flex flex-wrap justify-center gap-8 md:gap-12">
        {[
          { href: "#services", label: t.services },
          { href: "#contact", label: t.contact.title },
          { href: "#blog", label: t.blog.title },
          { href: "#about", label: t.about.title },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-teal-500 transition-colors min-h-[44px] flex items-center justify-center"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Copyright */}
      <div className="flex flex-col items-center gap-6">
        <div className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold">
          © {new Date().getFullYear()}{" "}
          <span className="text-zinc-500">LunAI</span> — Part of{" "}
          <span className="text-zinc-400 font-black text-teal-500/80">
            LUNARIS
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
