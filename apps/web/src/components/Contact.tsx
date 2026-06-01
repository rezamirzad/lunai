"use client";

import { useState } from "react";
import { TranslationInterface } from "@workspace/shared";
import { Section, Typography, Button, Input, Textarea } from "@workspace/ui";

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
    <Section id="contact" containerSize="sm" className="bg-zinc-950">
      <Typography as="h2" variant="title">
        {t.contact.title}
      </Typography>

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
            <Typography as="label" variant="label">
              {t.contact.name}
            </Typography>
            <Input
              name="name"
              required
              type="text"
            />
          </div>
          <div>
            <Typography as="label" variant="label">
              {t.contact.email}
            </Typography>
            <Input
              name="email"
              required
              type="email"
            />
          </div>
          <div>
            <Typography as="label" variant="label">
              {t.contact.message}
            </Typography>
            <Textarea
              name="message"
              required
              rows={4}
            />
          </div>
          <Button
            disabled={status === "SENDING"}
            type="submit"
            className="w-full"
          >
            {status === "SENDING" ? "..." : t.contact.send}
          </Button>
          {status === "ERROR" && (
            <p className="text-red-500 text-xs text-center font-bold">
              Une erreur est survenue. Veuillez réessayer.
            </p>
          )}
        </form>
      )}
    </Section>
  );
}
