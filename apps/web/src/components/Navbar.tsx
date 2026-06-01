// frontend/src/components/Navbar.tsx
import { Language, TranslationInterface } from "@workspace/shared";

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  t: TranslationInterface;
  onViewChange: (view: string) => void;
}

export default function Navbar({
  currentLang,
  setLang,
  t,
  onViewChange,
}: NavbarProps) {
  // Helper to handle view switching
  const handleNavClick = (view: string) => {
    onViewChange(view);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - click to go home */}
        <button
          onClick={() => handleNavClick("home")}
          className="text-xl font-bold tracking-tighter"
        >
          {t.heroTitle}
        </button>

        {/* Links & Lang Switcher */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3 md:gap-6 text-[10px] md:text-sm font-medium text-gray-400">
            {/* Swapped <a> for <button> to trigger view changes */}
            <button
              onClick={() => handleNavClick("services")}
              className="hover:text-white transition-colors"
            >
              {t.services}
            </button>
            <button
              onClick={() => handleNavClick("portfolio")}
              className="hover:text-white transition-colors"
            >
              {t.portfolioLabel}
            </button>
            <button
              onClick={() => handleNavClick("pricing")}
              className="hover:text-white transition-colors"
            >
              {t.tarifs}
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="hover:text-white transition-colors"
            >
              {t.contact.title}
            </button>
            <button
              onClick={() => handleNavClick("blog")}
              className="hover:text-white transition-colors"
            >
              {t.blog.title}
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="hover:text-white transition-colors"
            >
              {t.about.title}
            </button>
          </div>

          <UserAuth 
            label={t.login} 
            onClick={onLogin}
            className="ml-2 md:ml-0"
          />

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
