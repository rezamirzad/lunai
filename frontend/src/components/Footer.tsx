import React from "react";
import { TranslationInterface } from "@/lib/translations";

const Footer = ({ t }: { t: TranslationInterface }) => {
  return (
    <footer className="py-20 flex flex-col items-center gap-12 border-t border-gray-900 bg-black">
      {/* Section Logo & Slogan */}
      <div className="text-center">
        <div className="text-white text-xl font-black tracking-tighter mb-2">
          <span className="text-blue-500">LUMZ</span>
        </div>
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">
          Luxembourg Digital Craft
        </p>
      </div>

      {/* Navigation Rapide */}
      <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
        <a href="#services" className="hover:text-blue-500 transition-colors">
          {t.services}
        </a>
        <a href="#tarifs" className="hover:text-blue-500 transition-colors">
          {t.tarifs}
        </a>
        <a href="#contact" className="hover:text-blue-500 transition-colors">
          Contact
        </a>
      </div>

      {/* Tech Stack & Copyright */}
      <div className="flex flex-col items-center gap-6">
        {/* <div className="flex justify-center gap-6 items-center">
          <div className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">
            Next.js 14
          </div>
          <div className="w-px h-2 bg-zinc-800" />
          <div className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">
            Tailwind CSS
          </div>
          <div className="w-px h-2 bg-zinc-800" />
          <div className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">
            TypeScript
          </div>
        </div> */}

        <div className="text-[9px] text-zinc-600 uppercase tracking-[0.2em] font-medium">
          © {new Date().getFullYear()}{" "}
          <span className="text-zinc-500">LUMZ</span> — Part of{" "}
          <span className="text-zinc-400 font-bold text-blue-500/80">
            LunAI
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
