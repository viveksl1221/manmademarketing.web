export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "We study the business, the category, and the customer before touching a single deliverable.",
  },
  {
    number: "02",
    title: "Define",
    description: "Strategy, positioning, and success metrics are agreed before any creative work begins.",
  },
  {
    number: "03",
    title: "Create",
    description: "Strategy becomes brand identity, websites, campaigns, and content with craft-level execution.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Work ships deliberately, with every channel and asset coordinated around a single moment.",
  },
  {
    number: "05",
    title: "Optimize",
    description: "Performance is tracked against the metrics we set, and the work keeps improving after launch.",
  },
];
