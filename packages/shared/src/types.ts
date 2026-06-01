export type Language = "FR" | "EN" | "DE" | "LU";

export interface TranslationInterface {
  heroTitle: string;
  heroSub: string;
  cta: string;
  services: string;
  tarifs: string;
  techBadge: string;
  portfolioLabel: string;
  portfolioTitle: string;
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
  about: {
    title: string;
    content: string[];
  };
  blog: {
    title: string;
    posts: {
      title: string;
      date: string;
      desc: string;
    }[];
  };
}
