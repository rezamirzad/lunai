// frontend/src/components/Portfolio.tsx

import { TranslationInterface } from "@/lib/translations";

export default function Portfolio({ t }: { t: TranslationInterface }) {
  return (
    <section id="portfolio" className="py-24 bg-black border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight">
          {t.portfolioTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-all bg-gradient-to-b from-white/5 to-transparent overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {project.desc}
                </p>
                <div className="flex items-center text-xs font-mono text-blue-500 uppercase tracking-[0.2em]">
                  <span>Visiter le site</span>
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
