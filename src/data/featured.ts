export interface FeaturedCase {
  client: string;
  category: string;
  href: string;
  /** Artwork in /public/work. Cards without one render as typographic cards. */
  image?: { src: string; alt: string };
  /** Typographic card colour when there is no image. */
  tone?: "red" | "light" | "mist";
  note?: string;
}

// Image cards come from projects.ts. iSON Health, Arabia Health and the clinics
// have no artwork yet, so they render as text cards until images are supplied.
export const featuredCases: FeaturedCase[] = [
  {
    client: "Sikkini",
    category: "Professional Kitchen Services",
    href: "/work#sikkini",
    image: {
      src: "/work/sikkini.jpg",
      alt: "Sikkini campaign creative with the headline 'Your Kitchen. Sharper Every Day.'",
    },
  },
  { client: "iSON Health", category: "Healthcare", href: "/work", tone: "red" },
  {
    client: "My-Health",
    category: "Longevity & Wellness",
    href: "/work#my-health",
    image: {
      src: "/work/my-health.jpg",
      alt: "My-Health wellness campaign featuring the message 'Prevention is the most powerful medicine.'",
    },
  },
  { client: "Arabia Health", category: "Healthcare", href: "/work", tone: "light" },
  {
    client: "Fika Time",
    category: "Restaurant & Café",
    href: "/work#fika-time",
    image: {
      src: "/work/fika-time.jpg",
      alt: "Fika Time café social campaign featuring desserts, coffee, and the 'Freshly Baked Everyday' message",
    },
  },
  {
    client: "Clinics",
    category: "Healthcare",
    href: "/work",
    tone: "mist",
    note: "Yas Dental · Apollo Clinic · Ali Medical Center",
  },
];
