"use client";

import { useState } from "react";
import { TranslationInterface } from "@/lib/translations";

export default function Contact({ t }: { t: TranslationInterface }) {
  const [status, setStatus] = useState<
    "IDLE" | "SENDING" | "SUCCESS" | "ERROR"
  >("IDLE");

  // Replace 'your-form-id' with the ID you get from Formspree.io
  const formKey = process.env.NEXT_PUBLIC_FORMSPREE_KEY;
  const FORMSPREE_URL = `https://formspree.io/f/${formKey}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      setStatus("ERROR");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-black mb-12 uppercase tracking-widest border-l-4 border-blue-500 pl-4 text-white">
          {t.contact.title}
        </h2>

        {status === "SUCCESS" ? (
          <div className="p-6 bg-blue-500/10 border border-blue-500 text-blue-500 font-bold text-center">
            {t.contact.success}
            <button
              onClick={() => setStatus("IDLE")}
              className="block mx-auto mt-4 text-[10px] underline uppercase"
            >
              Envoyer un autre message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                {t.contact.name}
              </label>
              <input
                name="name"
                required
                type="text"
                className="w-full bg-black border border-gray-800 p-4 text-white focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                {t.contact.email}
              </label>
              <input
                name="email"
                required
                type="email"
                className="w-full bg-black border border-gray-800 p-4 text-white focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                {t.contact.message}
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full bg-black border border-gray-800 p-4 text-white focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <button
              disabled={status === "SENDING"}
              type="submit"
              className="w-full bg-white text-black font-black uppercase text-xs tracking-[0.2em] py-4 hover:bg-blue-500 hover:text-white transition-all disabled:opacity-50"
            >
              {status === "SENDING" ? "..." : t.contact.send}
            </button>
            {status === "ERROR" && (
              <p className="text-red-500 text-xs text-center font-bold">
                Une erreur est survenue. Veuillez réessayer.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
