"use client";

// frontend/src/components/Navbar.tsx
import { useState } from "react";
import { Language, TranslationInterface } from "@workspace/shared";
import { UserAuth } from "@workspace/ui";
import { MobileDrawer } from "./MobileDrawer";

interface NavbarProps {
  currentLang: Language;
  setLang?: (lang: Language) => void;
  t: TranslationInterface;
  onViewChange?: (view: string) => void;
  onLogin?: () => void;
  isLoggedIn?: boolean;
  userRole?: "admin" | "client";
}

export default function Navbar({
  currentLang,
  setLang,
  t,
  onViewChange,
  onLogin,
  isLoggedIn = false,
  userRole,
}: NavbarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Helper to handle view switching
  const handleNavClick = (view: string) => {
    if (onViewChange) {
      onViewChange(view);
    } else {
      // Fallback navigation if no handler provided (e.g. from a Server Component page like blog detail)
      window.location.href = view === "home" ? "/" : `/#${view}`;
    }
  };

  const loginLabel = isLoggedIn
    ? userRole === "admin"
      ? "Admin"
      : userRole === "client"
      ? "Client"
      : t.login
    : t.login;

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - click to go home */}
        <button
          onClick={() => handleNavClick("home")}
          className="text-xl font-black tracking-tighter hover:text-teal-500 transition-colors"
        >
          {t.heroTitle}
        </button>

        {/* Desktop Links (md+) */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-1 text-sm font-bold text-zinc-400 uppercase tracking-widest">
            {isLoggedIn && userRole === "admin" && (
              <>
                <button
                  onClick={() => handleNavClick("admin/dashboard")}
                  className="hover:text-white transition-colors h-11 px-4"
                >
                  Admin
                </button>
                <button
                  onClick={() => (window.location.href = "/apps/fndr")}
                  className="hover:text-white transition-colors h-11 px-4 text-teal-500 font-black"
                >
                  FNDR
                </button>
              </>
            )}
            {isLoggedIn && userRole === "client" && (
              <button
                onClick={() => handleNavClick("client/dashboard")}
                className="hover:text-white transition-colors h-11 px-4"
              >
                Client
              </button>
            )}
            <button
              onClick={() => handleNavClick("services")}
              className="hover:text-white transition-colors h-11 px-4"
            >
              {t.services}
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="hover:text-white transition-colors h-11 px-4"
            >
              {t.contact.title}
            </button>
            <button
              onClick={() => handleNavClick("blog")}
              className="hover:text-white transition-colors h-11 px-4"
            >
              {t.blog.title}
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="hover:text-white transition-colors h-11 px-4"
            >
              {t.about.title}
            </button>
          </div>

          <div className="h-6 w-px bg-white/10 mx-2" />

          <div className="flex items-center gap-4">
            {/* Lang Switcher (Desktop) */}
            <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
              {(["EN", "FR", "DE", "LU"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang?.(l)}
                  className={`h-8 w-10 flex items-center justify-center text-[10px] font-bold rounded transition-all ${
                    currentLang === l
                      ? "bg-white text-black"
                      : "text-zinc-500 hover:bg-white/10"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <UserAuth
              label={loginLabel}
              onClick={onLogin}
              className="h-10 px-6 text-xs bg-white text-black hover:bg-zinc-200 border-none rounded-lg"
            />
          </div>
        </div>

        {/* Hamburger Toggle (Mobile < md) */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 text-white"
          aria-label="Open menu"
        >
          <span className="w-6 h-0.5 bg-current rounded-full" />
          <span className="w-6 h-0.5 bg-current rounded-full" />
          <span className="w-6 h-0.5 bg-current rounded-full" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentLang={currentLang}
        setLang={setLang}
        t={t}
        onViewChange={onViewChange}
        onLogin={onLogin}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
      />
    </nav>
  );
}
