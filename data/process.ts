export type ProcessStep = {
  number: string;
  id?: string;
  label: string;
  title: string;
  paragraphs: string[];
  cta?: {
    label: string;
    href: string;
  };
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    label: "The Appointment",
    title: "It starts with a conversation.",
    paragraphs: [
      "Your journey begins with a private appointment at the IL BIONDO atelier.",
      "We discuss your lifestyle, the purpose of the garment and how you want it to feel.",
    ],
    cta: {
      label: "Book an Appointment",
      href: "/appointments",
    },
  },
  {
    number: "02",
    label: "The Measure",
    title: "Built around you.",
    paragraphs: [
      "Measurements are taken with attention not only to size, but to posture, proportion and balance.",
      "Because no two bodies — and no two garments — should be treated the same.",
    ],
  },
  {
    number: "03",
    id: "cloth",
    label: "The Cloth",
    title: "The character of the garment.",
    paragraphs: [
      "Explore our selection of cloth from distinguished mills and fabric houses.",
      "Season, weight, texture, construction and purpose are considered before choosing the cloth that is right for you.",
    ],
  },
  {
    number: "04",
    label: "First Prova",
    title: "The first form.",
    paragraphs: [
      "The first fitting allows us to study how the garment begins to sit on the body.",
      "Balance, length, structure and proportion are reviewed and refined by our tailoring team.",
    ],
  },
  {
    number: "05",
    label: "Second Prova",
    title: "Refining the details.",
    paragraphs: [
      "The garment moves closer to its final form.",
      "Fit and finishing are reconsidered, allowing small adjustments to create greater balance, comfort and precision.",
    ],
  },
  {
    number: "06",
    label: "The Delivery",
    title: "Made yours.",
    paragraphs: [
      "The final garment is presented and fitted one last time.",
      "Every detail is checked.",
      "Only then does it leave the atelier.",
    ],
  },
];
