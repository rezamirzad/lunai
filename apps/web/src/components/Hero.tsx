import { TranslationInterface } from "@workspace/shared";
import { Section, Typography, buttonVariants } from "@workspace/ui";
import { cn } from "@workspace/shared";

export default function Hero({ t }: { t: TranslationInterface }) {
  if (!t) return null;

  return (
    <Section 
      containerSize="xl" 
      className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden pt-20 px-0"
    >
      {/* Increased radial glow for a larger ambient feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />

      <div className="relative z-10 text-center">
        {/* Branding Badge with dynamic translation */}
        <div className="inline-block px-6 py-2 mb-10 rounded-full border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm animate-fade-in">
          <Typography variant="badge">
            {t.techBadge}
          </Typography>
        </div>

        {/* Massive Typography for brand authority */}
        <Typography as="h1" variant="hero">
          Lun
          <span className="text-transparent bg-clip-text bg-gradient-to-t from-blue-700 to-blue-400 italic">
            AI
          </span>
        </Typography>

        {/* Expanded subtitle description */}
        <Typography variant="subtitle" className="mx-auto">
          {t.heroSub}
        </Typography>

        {/* Larger, high-contrast CTA */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <a
            href="#contact"
            className={cn(
              buttonVariants.base,
              buttonVariants.variant.primary,
              buttonVariants.size.lg,
              "w-full md:w-auto"
            )}
          >
            {t.cta}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent" />
      </div>
    </Section>
  );
}
