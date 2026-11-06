export interface Partner {
  name: string;
  /** Small second line, e.g. the programme tier. */
  tag?: string;
  /** Official logo in /public/partners (SVG/PNG). Falls back to text until added. */
  logo?: string;
}

// Only list programmes the agency actually holds. Swap in the official badge
// artwork via `logo` once the files are in /public/partners.
export const partners: Partner[] = [
  { name: "Wix", tag: "Partner" },
  { name: "Shopify", tag: "Partner" },
  { name: "Adobe" },
  { name: "Meta", tag: "Certified" },
  { name: "Google", tag: "Partner" },
];
