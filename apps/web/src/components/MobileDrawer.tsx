"use client";

import React from "react";
import { Language, TranslationInterface } from "@workspace/shared";
import { UserAuth } from "@workspace/ui";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  setLang: (lang: Language) => void;
  t: TranslationInterface;
  onViewChange: (view: string) => void;
  onLogin?: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentLang,
  setLang,
  t,
  onViewChange,
  onLogin,
}) => {
  const handleNavClick = (view: string) => {
    onViewChange(view);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#09090b] border-l border-white/10 z-[70] shadow-2xl transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8 pt-20 gap-10">
          {/* Header (Close Button) */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Navigation
            </p>
            {[
              { id: "services", label: t.services },
              { id: "contact", label: t.contact.title },
              { id: "blog", label: t.blog.title },
              { id: "about", label: t.about.title },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-2xl font-black text-white hover:text-teal-500 transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Utility Section */}
          <div className="mt-auto flex flex-col gap-8 pb-10">
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                Language
              </p>
              <div className="grid grid-cols-4 gap-2 bg-white/5 rounded-xl p-1 border border-white/10">
                {(["EN", "FR", "DE", "LU"] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`h-11 flex items-center justify-center text-xs font-bold rounded-lg transition-all ${
                      currentLang === l
                        ? "bg-white text-black shadow-lg"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                Account
              </p>
              <UserAuth
                label={t.login}
                onClick={() => {
                  onLogin?.();
                  onClose();
                }}
                className="w-full h-14 text-lg justify-center bg-teal-500 text-black hover:bg-teal-400 border-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
