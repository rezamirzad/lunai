import { Language, TranslationInterface } from "@/lib/translations";

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  t: TranslationInterface;
}

export default function Navbar({ currentLang, setLang, t }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold tracking-tighter">{t.heroTitle}</div>

        {/* Links & Lang Switcher */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Removed 'hidden' to ensure visibility on mobile, adjusted gap for smaller screens */}
          <div className="flex items-center gap-3 md:gap-6 text-[10px] md:text-sm font-medium text-gray-400">
            <a href="#services" className="hover:text-white transition-colors">
              {t.services}
            </a>
            <a href="#portfolio" className="hover:text-white transition-colors">
              {t.portfolioLabel}
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              {t.tarifs}
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              {t.contact.title}
            </a>
          </div>

          <div className="flex bg-white/5 rounded-lg p-1 border border-white/10 shrink-0">
            {(["FR", "EN", "DE", "LU"] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-1.5 md:px-2 py-1 text-[10px] md:text-xs rounded transition-all ${
                  currentLang === l
                    ? "bg-white text-black"
                    : "hover:bg-white/10"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
