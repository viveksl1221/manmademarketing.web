export interface Service {
  number: string;
  slug: string;
  title: string;
  summary: string;
  detail: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    number: "01",
    slug: "strategy-branding",
    title: "Strategy & Branding",
    summary: "Identity and positioning built on clear strategic thinking.",
    detail:
      "We define who a brand is before we decide how it looks — positioning, naming, voice, and visual identity shaped around a clear strategic foundation.",
    deliverables: [
      "Brand positioning & messaging",
      "Visual identity systems",
      "Naming & verbal identity",
      "Brand guidelines",
    ],
  },
  {
    number: "02",
    slug: "website-design-development",
    title: "Website Design & Development",
    summary: "Design and build for brands that need to perform, not just look good.",
    detail:
      "From information architecture to pixel-level design and development, we build websites that communicate clearly and convert deliberately.",
    deliverables: [
      "UX & information architecture",
      "Art-directed web design",
      "Front-end development",
      "CMS & handoff",
    ],
  },
  {
    number: "03",
    slug: "performance-marketing",
    title: "Performance Marketing",
    summary: "Paid acquisition engineered around measurable business outcomes.",
    detail:
      "Paid social, search, and programmatic campaigns built on sharp targeting, disciplined testing, and budgets that chase outcomes, not impressions.",
    deliverables: [
      "Paid social & search",
      "Audience strategy",
      "Creative testing",
      "Budget & bid management",
    ],
  },
  {
    number: "04",
    slug: "seo-organic-growth",
    title: "SEO & Organic Growth",
    summary: "Compounding visibility through technical and content-led SEO.",
    detail:
      "Technical SEO, content strategy, and on-page optimization that build durable organic visibility instead of short-lived ranking spikes.",
    deliverables: [
      "Technical SEO audits",
      "Content & keyword strategy",
      "On-page optimization",
      "Organic performance tracking",
    ],
  },
  {
    number: "05",
    slug: "content-creative",
    title: "Content & Creative",
    summary: "Story and assets produced with craft-level creative execution.",
    detail:
      "Photography, video, copy, and social content produced to a consistent editorial standard — built to carry a brand's voice across every channel.",
    deliverables: [
      "Social & campaign content",
      "Photography & video direction",
      "Copywriting",
      "Content systems & calendars",
    ],
  },
];
