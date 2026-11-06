export interface Project {
  slug: string;
  client: string;
  category: string;
  services: string[];
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

// Real client work from Man Made Marketing's content & social campaigns.
// Scope is intentionally described as delivered (content/creative), not
// implied to cover services the agency has not been verified to perform
// for these specific clients.
export const projects: Project[] = [
  {
    slug: "fika-time",
    client: "Fika Time",
    category: "Restaurant & Café",
    services: ["Content & Creative", "Social Campaigns"],
    description:
      "Ongoing social content for a restaurant and café brand, built around clean product photography and a consistent visual system.",
    image: {
      src: "/work/fika-time.jpg",
      alt: "Fika Time café social campaign featuring desserts, coffee, and the 'Freshly Baked Everyday' message",
    },
  },
  {
    slug: "sikkini",
    client: "Sikkini",
    category: "Professional Kitchen Services",
    services: ["Content & Creative", "Brand Campaigns"],
    description:
      "Bold, high-contrast campaign creative for a professional knife-sharpening and kitchen equipment service.",
    image: {
      src: "/work/sikkini.jpg",
      alt: "Sikkini campaign creative with the headline 'Your Kitchen. Sharper Every Day.'",
    },
  },
  {
    slug: "my-health",
    client: "My-Health",
    category: "Longevity & Wellness",
    services: ["Content & Creative", "Social Campaigns"],
    description:
      "Editorial-style social content for a longevity and wellness clinic, pairing close photography with a calm, confident tone.",
    image: {
      src: "/work/my-health.jpg",
      alt: "My-Health wellness campaign featuring the message 'Prevention is the most powerful medicine.'",
    },
  },
];
