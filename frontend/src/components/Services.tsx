import { TranslationInterface } from "@/lib/translations";

export default function Services({ t }: { t: TranslationInterface }) {
  if (!t) return null;

  return (
    <section id="services" className="py-40 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-black mb-20 uppercase tracking-widest border-l-4 border-blue-500 pl-4 text-white">
          {t.services}
        </h2>

        {/* Expanded 3-column grid for 2026 UI style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20 text-zinc-400">
          {t.serviceList.map((s, i) => (
            <div key={i} className="group">
              <h3 className="text-white font-black mb-4 uppercase tracking-tighter text-lg group-hover:text-blue-500 transition-colors">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed tracking-wide group-hover:text-zinc-300 transition-colors">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
