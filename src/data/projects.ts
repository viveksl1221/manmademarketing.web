export interface CaseImage {
  caption: string;
  ratio: "landscape" | "portrait" | "square";
  /** Path in /public/work. Leave out to show a placeholder. */
  src?: string;
  alt?: string;
}

export interface CaseStage {
  /** Optional figure shown with this chapter. */
  figure?: CaseImage;
  /** Short stage name, e.g. "Discover". */
  title: string;
  /** One-line summary shown beside the chapter number. */
  summary: string;
  /** Editorial body copy, one string per paragraph. */
  body: string[];
}

export interface CaseStudy {
  /** Opening standfirst under the title. */
  standfirst: string;
  /** What the brand needed (the brief). */
  brief: string[];
  /** A single line pulled out of the story. */
  pullQuote: string;
  /** The working process, in order. */
  stages: CaseStage[];
  /** Qualitative takeaways. No invented metrics. */
  outcomes: string[];
  /** What was delivered, shown as the deliverables list. */
  deliverables: string[];
  /** Extra imagery shown after the process. */
  gallery: CaseImage[];
  year: string;
}

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
  study: CaseStudy;
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
    study: {
      year: "Ongoing",
      standfirst:
        "How a café that already made beautiful food learned to look as good online as it tastes in person.",
      brief: [
        "Fika Time bakes fresh every day, and the product does most of the talking. What the brand needed was a feed that said the same thing every time, so that someone scrolling past could recognise a Fika Time post before reading the name.",
        "The task was to build a repeatable social system around clean product photography, one that could keep producing content week after week without drifting off-brand.",
      ],
      pullQuote:
        "The food was never the problem. Consistency was the craft.",
      stages: [
        {
          title: "Discover",
          summary: "Understand the menu, the room and the feed.",
          figure: { caption: "Menu and feed audit", ratio: "landscape" },
          body: [
            "We started by looking at what the café already posted and what was getting attention. The strongest posts were always the simplest: one product, good light, nothing competing with it.",
          ],
        },
        {
          title: "Define",
          summary: "Set the visual rules once.",
          figure: { caption: "Visual rules and colour palette", ratio: "portrait" },
          body: [
            "From that we set a small number of rules: how close the camera sits, how much space surrounds the product, which colours carry the brand and where the message line lives. Few rules, applied every time, is what makes a feed feel designed.",
          ],
        },
        {
          title: "Design",
          summary: "Build the templates and campaign messages.",
          figure: { caption: "Post template system", ratio: "landscape" },
          body: [
            "We designed a reusable post layout and a short bank of campaign lines, with \u201cFreshly Baked Everyday\u201d as the anchor. The same structure flexes across desserts, coffee and seasonal items.",
          ],
        },
        {
          title: "Deliver",
          summary: "Publish on a steady rhythm.",
          figure: { caption: "Content calendar in use", ratio: "portrait" },
          body: [
            "Content ships on a regular schedule rather than in bursts. Because the system is fixed, new products slot in quickly without a fresh design round each time.",
          ],
        },
        {
          title: "Develop",
          summary: "Keep refining as the menu grows.",
          figure: { caption: "Seasonal extensions", ratio: "landscape" },
          body: [
            "As the menu and seasons change, we extend the system instead of replacing it, adding new formats while keeping the look the audience already knows.",
          ],
        },
      ],
      gallery: [
        { caption: "Dessert close-up, hero post", ratio: "portrait" },
        { caption: "Coffee and pastry flat lay", ratio: "square" },
        { caption: "Campaign message variations", ratio: "landscape" },
      ],
      deliverables: [
        "Social content system",
        "Product photography direction",
        "Campaign messaging",
        "Post templates",
      ],
      outcomes: [
        "A recognisable, consistent social presence built around the product.",
        "A template system the café can keep producing from without redesigning each post.",
        "A message line that carries the brand promise in every post.",
      ],
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
    study: {
      year: "Campaign",
      standfirst:
        "A service most people have never thought about, turned into a headline you cannot scroll past.",
      brief: [
        "Sikkini sharpens knives and maintains equipment for professional kitchens. It is a practical, trusted service, but not an obviously glamorous one, and its audience is busy chefs and kitchen managers.",
        "The brief was to give the brand campaign creative with enough contrast and confidence to stand out in a crowded feed, while staying clear about what the service actually does.",
      ],
      pullQuote: "Your kitchen. Sharper every day.",
      stages: [
        {
          title: "Discover",
          summary: "Find the one thing the service promises.",
          figure: { caption: "Service and audience research", ratio: "landscape" },
          body: [
            "We began with what a kitchen actually gets from Sikkini: tools that cut cleanly and equipment that keeps working. Everything else is supporting detail.",
          ],
        },
        {
          title: "Define",
          summary: "Choose a tone that matches the trade.",
          figure: { caption: "Tone of voice and headline directions", ratio: "portrait" },
          body: [
            "Professional kitchens respond to plain, direct language. We set a tone that is short, assured and a little bold, with no filler between the promise and the viewer.",
          ],
        },
        {
          title: "Design",
          summary: "High contrast, one idea per frame.",
          figure: { caption: "Layout explorations", ratio: "landscape" },
          body: [
            "The creative leans on strong contrast and a single dominant headline. The blade is the hero, the line sits beside it, and the layout leaves room to breathe so the message lands at thumb-scroll speed.",
          ],
        },
        {
          title: "Deliver",
          summary: "Roll the idea out across formats.",
          figure: { caption: "Format adaptations", ratio: "portrait" },
          body: [
            "The campaign idea was adapted into the formats the brand needed, keeping the same headline logic and visual weight in each so the work reads as one campaign.",
          ],
        },
        {
          title: "Develop",
          summary: "Grow the idea into a series.",
          figure: { caption: "Series extensions", ratio: "landscape" },
          body: [
            "The headline structure is built to repeat, which gives the brand room to extend the campaign with new lines and services without starting again.",
          ],
        },
      ],
      gallery: [
        { caption: "Blade hero image", ratio: "portrait" },
        { caption: "Headline variations", ratio: "square" },
        { caption: "Campaign across formats", ratio: "landscape" },
      ],
      deliverables: [
        "Campaign concept",
        "Headline and copy",
        "Campaign creative",
        "Format adaptations",
      ],
      outcomes: [
        "A bold campaign look that makes a technical service feel confident and memorable.",
        "A headline structure that can be extended into a longer series.",
        "A clear, direct message that speaks the language of professional kitchens.",
      ],
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
    study: {
      year: "Ongoing",
      standfirst:
        "Giving a longevity clinic a voice that is calm, credible and unmistakably human.",
      brief: [
        "My-Health is a longevity and wellness clinic. Its subject matter is serious, and its audience wants reassurance rather than hype. The content had to feel trustworthy without feeling clinical or cold.",
        "We were asked to shape an editorial social presence that explains preventive care in an approachable way and reflects the clinic\u2019s calm confidence.",
      ],
      pullQuote:
        "Prevention is the most powerful medicine.",
      stages: [
        {
          title: "Discover",
          summary: "Listen to the clinic and its patients.",
          figure: { caption: "Clinic philosophy notes", ratio: "landscape" },
          body: [
            "We started with the clinic\u2019s own philosophy and the questions people ask before they book. The common thread was prevention: catching things early and living well for longer.",
          ],
        },
        {
          title: "Define",
          summary: "Pick the tone and the single big idea.",
          figure: { caption: "Tone and big-idea board", ratio: "portrait" },
          body: [
            "We settled on a quiet, confident register, with short statements and no scare tactics. Prevention became the idea every piece of content returns to.",
          ],
        },
        {
          title: "Design",
          summary: "Editorial layouts with close photography.",
          figure: { caption: "Editorial layout studies", ratio: "landscape" },
          body: [
            "Visually, we paired close, considered photography with generous white space and restrained type, so each post reads like a page from a magazine rather than an advertisement.",
          ],
        },
        {
          title: "Deliver",
          summary: "Publish with care and consistency.",
          figure: { caption: "Published feed", ratio: "portrait" },
          body: [
            "Content goes out in a steady, measured cadence. Each post carries one idea, which keeps the feed easy to read and easy to trust.",
          ],
        },
        {
          title: "Develop",
          summary: "Deepen the story over time.",
          figure: { caption: "New themes", ratio: "landscape" },
          body: [
            "As the clinic\u2019s services grow, the editorial approach stretches with them, adding new themes while keeping the same calm voice.",
          ],
        },
      ],
      gallery: [
        { caption: "Close photography study", ratio: "portrait" },
        { caption: "Typography and white space", ratio: "square" },
        { caption: "Feed overview", ratio: "landscape" },
      ],
      deliverables: [
        "Editorial content direction",
        "Social campaign creative",
        "Tone of voice",
        "Photography art direction",
      ],
      outcomes: [
        "A calm, credible voice that suits a healthcare audience.",
        "An editorial look that separates the clinic from typical medical advertising.",
        "One central idea, prevention, that anchors every piece of content.",
      ],
    },
  },
];
