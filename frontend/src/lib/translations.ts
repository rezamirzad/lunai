export type Language = "FR" | "EN" | "DE" | "LU";

export interface TranslationInterface {
  heroTitle: string;
  heroSub: string;
  cta: string;
  services: string;
  tarifs: string;
  techBadge: string;
  portfolioLabel: string; // Key for Navbar
  portfolioTitle: string; // Key for Section Title
  projects: {
    title: string;
    desc: string;
    link: string;
  }[];
  serviceList: {
    title: string;
    desc: string;
  }[];
  pricing: {
    name: string;
    price: string;
    ideal: string;
    features: string[];
  }[];
  maintenance: {
    title: string;
    price: string;
    features: string[];
  };
  recommendedBadge: string;
  contact: {
    title: string;
    name: string;
    email: string;
    message: string;
    send: string;
    success: string;
  };
}

export const translations: Record<Language, TranslationInterface> = {
  FR: {
    heroTitle: "LUMZ",
    heroSub: "Votre partenaire digital de proximité au Luxembourg.",
    cta: "Démarrer un projet",
    services: "Services",
    tarifs: "Tarifs",
    techBadge: "ARTISANAT NUMÉRIQUE • LUXEMBOURG 2026",
    portfolioLabel: "Portfolio",
    portfolioTitle: "Nos Réalisations",
    projects: [
      {
        title: "Aura Inc",
        desc: "Site vitrine élégant et minimaliste.",
        link: "https://aura-inc.vercel.app/",
      },
      {
        title: "Alex Trace",
        desc: "Portfolio interactif haute performance.",
        link: "https://alex-trace.vercel.app/",
      },
      {
        title: "Lumens Labs",
        desc: "Dashboard analytique complexe et intuitif.",
        link: "https://lumens-labs-dashboard.vercel.app/",
      },
    ],
    recommendedBadge: "Recommandé",
    serviceList: [
      {
        title: "Performance Next-Gen",
        desc: "Nous développons des sites avec les dernières technologies pour garantir des temps de chargement instantanés. Un site rapide améliore radicalement votre SEO et réduit le taux d'abandon de vos clients.",
      },
      {
        title: "Écosystème Multilingue Natif",
        desc: "Le marché luxembourgeois exige de la flexibilité. Nous intégrons nativement le Français, l'Anglais, l'Allemand et le Luxembourgeois pour que votre entreprise parle la langue de tous vos clients sans compromis.",
      },
      {
        title: "Design Mobile-First & UX",
        desc: "Plus de 80% des recherches locales se font sur smartphone. Nos interfaces sont conçues pour être fluides, intuitives et élégantes, offrant une expérience utilisateur premium sur tous les écrans.",
      },
      {
        title: "Optimisation SEO & Visibilité",
        desc: "Avoir un beau site est inutile s'il est invisible. Nous optimisons la structure technique de votre site pour que Google vous place naturellement en tête des recherches locales au Grand-Duché.",
      },
      {
        title: "Propriété Totale & Indépendance",
        desc: "Contrairement aux agences classiques, vous restez propriétaire à 100% de votre code et de votre domaine. Pas de frais cachés, pas d'abonnement captif, une transparence totale.",
      },
      {
        title: "Maintenance & Évolution Continue",
        desc: "Le web évolue vite. Notre pack sérénité assure que votre site reste sécurisé, à jour et performant, avec des modifications illimitées pour accompagner la croissance de votre activité.",
      },
    ],
    pricing: [
      {
        name: "Start",
        price: "450€",
        ideal: "Artisans & Indépendants. Idéal pour un lancement rapide.",
        features: [
          "Livré en 7 jours",
          "Site One-Page ultra-rapide",
          "Optimisation SEO Local",
        ],
      },
      {
        name: "Business",
        price: "1250€",
        ideal: "Le standard pour les PME luxembourgeoises.",
        features: [
          "Multi-pages (jusqu'à 5)",
          "Multilingue (FR/EN/DE/LU)",
          "Formulaire de contact avancé",
        ],
      },
      {
        name: "Custom",
        price: "Sur devis",
        ideal: "Projets spécifiques et outils métiers.",
        features: [
          "E-commerce & Paiements",
          "Système de réservation",
          "Base de données sur mesure",
        ],
      },
    ],
    maintenance: {
      title: "Pack Sérénité & Évolution",
      price: "29€ / mois",
      features: [
        "Mises à jour sécurité",
        "Sauvegardes quotidiennes",
        "Modifications illimitées (Textes/Photos)",
      ],
    },
    contact: {
      title: "Contact",
      name: "Nom complet",
      email: "Adresse e-mail",
      message: "Parlez-nous de votre besoin...",
      send: "Envoyer la demande",
      success: "Votre message a été transmis avec succès !",
    },
  },
  EN: {
    heroTitle: "LUMZ",
    heroSub: "Your local digital partner in Luxembourg.",
    cta: "Start a project",
    services: "Services",
    tarifs: "Pricing",
    techBadge: "DIGITAL CRAFTSMANSHIP • LUXEMBOURG 2026",
    portfolioLabel: "Portfolio",
    portfolioTitle: "Our Work",
    projects: [
      {
        title: "Aura Inc",
        desc: "Elegant and minimalist showcase site.",
        link: "https://aura-inc.vercel.app/",
      },
      {
        title: "Alex Trace",
        desc: "High-performance interactive portfolio.",
        link: "https://alex-trace.vercel.app/",
      },
      {
        title: "Lumens Labs",
        desc: "Complex and intuitive analytical dashboard.",
        link: "https://lumens-labs-dashboard.vercel.app/",
      },
    ],
    recommendedBadge: "Recommended",
    serviceList: [
      {
        title: "Next-Gen Performance",
        desc: "We build websites with the latest technologies to guarantee instant loading times. A fast site radically improves your SEO and reduces your bounce rate.",
      },
      {
        title: "Native Multilingual Ecosystem",
        desc: "The Luxembourg market requires flexibility. We natively integrate French, English, German, and Luxembourgish so your business speaks to all your customers without compromise.",
      },
      {
        title: "Mobile-First Design & UX",
        desc: "Over 80% of local searches are done on smartphones. Our interfaces are designed to be fluid, intuitive, and elegant, offering a premium user experience on all screens.",
      },
      {
        title: "SEO Optimization & Visibility",
        desc: "A beautiful site is useless if it's invisible. We optimize the technical structure of your site so that Google naturally places you at the top of local searches in the Grand Duchy.",
      },
      {
        title: "Total Ownership & Independence",
        desc: "Unlike traditional agencies, you remain 100% owner of your code and domain. No hidden fees, no captive subscriptions, total transparency.",
      },
      {
        title: "Continuous Maintenance & Evolution",
        desc: "The web evolves fast. Our serenity pack ensures your site stays secure, up-to-date, and high-performing, with unlimited changes to support your business growth.",
      },
    ],
    pricing: [
      {
        name: "Start",
        price: "450€",
        ideal: "Craftsmen & Freelancers. Ideal for a quick launch.",
        features: [
          "Delivered in 7 days",
          "Ultra-fast One-Page site",
          "Local SEO Optimization",
        ],
      },
      {
        name: "Business",
        price: "1250€",
        ideal: "The standard for Luxembourgish SMEs.",
        features: [
          "Multi-page (up to 5)",
          "Multilingual (FR/EN/DE/LU)",
          "Advanced contact form",
        ],
      },
      {
        name: "Custom",
        price: "On Quote",
        ideal: "Specific projects and business tools.",
        features: [
          "E-commerce & Payments",
          "Booking system",
          "Custom database",
        ],
      },
    ],
    maintenance: {
      title: "Serenity & Evolution Pack",
      price: "29€ / month",
      features: [
        "Security updates",
        "Daily backups",
        "Unlimited edits (Text/Photos)",
      ],
    },
    contact: {
      title: "Contact",
      name: "Full Name",
      email: "Email Address",
      message: "Tell us about your needs...",
      send: "Send Request",
      success: "Your message has been sent successfully!",
    },
  },
  DE: {
    heroTitle: "LUMZ",
    heroSub: "Ihr lokaler Digitalpartner in Luxemburg.",
    cta: "Projekt starten",
    services: "Leistungen",
    tarifs: "Preise",
    techBadge: "DIGITALES HANDWERK • LUXEMBURG 2026",
    portfolioLabel: "Portfolio",
    portfolioTitle: "Unsere Projekte",
    projects: [
      {
        title: "Aura Inc",
        desc: "Elegante und minimalistische Showcase-Website.",
        link: "https://aura-inc.vercel.app/",
      },
      {
        title: "Alex Trace",
        desc: "Interaktives Hochleistungs-Portfolio.",
        link: "https://alex-trace.vercel.app/",
      },
      {
        title: "Lumens Labs",
        desc: "Komplexes und intuitives Analyse-Dashboard.",
        link: "https://lumens-labs-dashboard.vercel.app/",
      },
    ],
    recommendedBadge: "Empfohlen",
    serviceList: [
      {
        title: "Next-Gen Performance",
        desc: "Wir entwickeln Websites mit den neuesten Technologien, um sofortige Ladezeiten zu garantieren. Eine schnelle Website verbessert Ihr SEO radikal und senkt die Absprungrate Ihrer Kunden.",
      },
      {
        title: "Natives mehrsprachiges Ökosystem",
        desc: "Der luxemburgische Markt erfordert Flexibilität. Wir integrieren Französisch, Englisch, Deutsch und Luxemburgisch nativ, damit Ihr Unternehmen kompromisslos in der Sprache all Ihrer Kunden spricht.",
      },
      {
        title: "Mobile-First Design & UX",
        desc: "Über 80% der lokalen Suchanfragen erfolgen über Smartphones. Unsere Interfaces sind flüssig, intuitiv und elegant gestaltet und bieten auf allen Bildschirmen ein erstklassiges Nutzererlebnis.",
      },
      {
        title: "SEO-Optimierung & Sichtbarkeit",
        desc: "Eine schöne Website ist nutzlos, wenn sie unsichtbar ist. Wir optimieren die technische Struktur Ihrer Website, damit Google Sie im Großherzogtum natürlich an die Spitze der lokalen Suchergebnisse setzt.",
      },
      {
        title: "Volles Eigentum & Unabhängigkeit",
        desc: "Im Gegensatz zu klassischen Agenturen bleiben Sie zu 100% Eigentümer Ihres Codes und Ihrer Domain. Keine versteckten Kosten, keine Bindungsabonnements, totale Transparenz.",
      },
      {
        title: "Kontinuierliche Wartung & Entwicklung",
        desc: "Das Web entwickelt sich schnell. Unser Sorglos-Paket stellt sicher, dass Ihre Website sicher, aktuell und leistungsstark bleibt, mit unbegrenzten Änderungen zur Unterstützung Ihres Geschäftswachums.",
      },
    ],
    pricing: [
      {
        name: "Start",
        price: "450€",
        ideal: "Handwerker & Freiberufler. Ideal für einen schnellen Start.",
        features: [
          "Geliefert in 7 Tagen",
          "Ultraschnelle One-Page-Website",
          "Lokale SEO-Optimierung",
        ],
      },
      {
        name: "Business",
        price: "1250€",
        ideal: "Der Standard für luxemburgische KMU.",
        features: [
          "Mehrseitig (bis zu 5)",
          "Mehrsprachig (FR/EN/DE/LU)",
          "Erweitertes Kontaktformular",
        ],
      },
      {
        name: "Custom",
        price: "Auf Anfrage",
        ideal: "Spezifische Projekte und Business-Tools.",
        features: [
          "E-Commerce & Zahlungen",
          "Buchungssystem",
          "Individuelle Datenbank",
        ],
      },
    ],
    maintenance: {
      title: "Sorglos- & Wartungspaket",
      price: "29€ / Monat",
      features: [
        "Sicherheits-Updates",
        "Tägliche Backups",
        "Unbegrenzte Änderungen (Text/Bild)",
      ],
    },
    contact: {
      title: "Kontakt",
      name: "Vollständiger Name",
      email: "E-Mail-Adresse",
      message: "Erzählen Sie uns von Ihrem Anliegen...",
      send: "Anfrage senden",
      success: "Ihre Nachricht wurde erfolgreich gesendet!",
    },
  },
  LU: {
    heroTitle: "LUMZ",
    heroSub: "Ären digitale Partner hei zu Lëtzebuerg.",
    cta: "E Projet starten",
    services: "Servicer",
    tarifs: "Präisser",
    techBadge: "DIGITAL HANDWIERK • LËTZEBUERG 2026",
    portfolioLabel: "Portfolio",
    portfolioTitle: "Eis Projeten",
    projects: [
      {
        title: "Aura Inc",
        desc: "Elegant a minimalistesch Websäit.",
        link: "https://aura-inc.vercel.app/",
      },
      {
        title: "Alex Trace",
        desc: "Interaktive Portfolio mat héijer Performance.",
        link: "https://alex-trace.vercel.app/",
      },
      {
        title: "Lumens Labs",
        desc: "Komplext an intuitivt Dashboard fir Analysen.",
        link: "https://lumens-labs-dashboard.vercel.app/",
      },
    ],
    recommendedBadge: "Recommandéiert",
    serviceList: [
      {
        title: "Next-Gen Performance",
        desc: "Mir entwéckelen Websäite mat de modernsten Technologien fir instant Ladezäiten ze garantéieren. Eng séier Säit verbessert Äre SEO radikal a reduzéiert d'Zuel vun de Clienten, déi d'Säit ze fréi verloossen.",
      },
      {
        title: "Native méisproochegen Ökosystem",
        desc: "De lëtzebuerger Maart erfuerdert Flexibilitéit. Mir integréieren nativ Franséisch, Englesch, Däitsch a Lëtzebuergesch, sou datt Äre Betrib d'Sprooch vun all Äre Cliente schwätzt.",
      },
      {
        title: "Mobile-First Design & UX",
        desc: "Iwwer 80% vun de lokale Sichanfroe ginn iwwer de Smartphone gemaach. Eis Interfaces si flësseg, intuitiv an elegant, a bidden eng Premium Benotzererfarung op all Bildschierm.",
      },
      {
        title: "SEO Optimisatioun & Visibilitéit",
        desc: "Eng schéi Websäit ass näischt ouni Visibilitéit. Mir optimiséieren déi technesch Struktur vun Ärer Säit, sou datt Google Iech am Grand-Duché natierlech un d'Spëtët vun de lokale Sichresultater setzt.",
      },
      {
        title: "Voll Proprietéit & Onofhängegkeet",
        desc: "Am Géigesaz zu klasseschen Agenture bleift Dir zu 100% Proprietär vun Ärem Code an Ärem Domain. Keng verstoppte Käschten, keng Bindungs-Abonnementer, total Transparenz.",
      },
      {
        title: "Kontinuéierlech Maintenance & Entwécklung",
        desc: "D'Web entwéckelt sech séier. Eise 'Sérénité'-Pak garantéiert, datt Är Säit sécher, aktuell a performant bleift, mat onlimitéierten Ännerunge fir de Wuesstem vun Ärer Aktivitéit z'ënnerstëtzen.",
      },
    ],
    pricing: [
      {
        name: "Start",
        price: "450€",
        ideal: "Handwierker & Freelancer. Ideal fir séier unzefänken.",
        features: [
          "Geliwwert a 7 Deeg",
          "Ultraschnell One-Page Websäit",
          "Lokale SEO Setup",
        ],
      },
      {
        name: "Business",
        price: "1250€",
        ideal: "De Standard fir lëtzebuerger Betriber (PME).",
        features: [
          "Méisäiteg (bis zu 5 Säiten)",
          "Méisproocheg (FR/EN/DE/LU)",
          "Erweiderten Kontaktformular",
        ],
      },
      {
        name: "Custom",
        price: "Op Devis",
        ideal: "Spezifesch Projeten an Business Tools.",
        features: [
          "E-Commerce & Bezuelungen",
          "Booking System",
          "Datebank op Mooss",
        ],
      },
    ],
    maintenance: {
      title: "Sérénité & Evolutioun Pack",
      price: "29€ / Mount",
      features: [
        "Sécherheets-Updates",
        "Deeglech Backups",
        "Onlimitéiert Ännerungen (Text/Foto)",
      ],
    },
    contact: {
      title: "Kontakt",
      name: "Ganze Numm",
      email: "E-Mail Adress",
      message: "Erzielt eis vun Ärem Projet...",
      send: "Ufro schécken",
      success: "Äre Message gouf erfollegräich geschéckt!",
    },
  },
};
