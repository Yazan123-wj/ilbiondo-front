export type ProcessStep = {
  number: string;
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    id: "consultation",
    label: "Private Consultation",
    title: "Private consultation.",
    paragraphs: [
      "A one-on-one appointment to understand your preferences, lifestyle, and individual style, followed by precise measurements and an assessment of your body's proportions.",
    ],
  },
  {
    number: "02",
    id: "garment-selection",
    label: "Garment Selection",
    title: "Garment selection.",
    paragraphs: [
      "Explore a range of tailored garments, including suits, jackets, coats, trousers, and shirts, designed around your personal needs.",
    ],
  },
  {
    number: "03",
    id: "personalization",
    label: "Personalization",
    title: "Personalization.",
    paragraphs: [
      "Select from our curated collection of luxury fabrics, silhouettes, linings, buttons, and finishing details to create a garment that is distinctly yours.",
    ],
  },
  {
    number: "04",
    id: "craftsmanship",
    label: "Craftsmanship & Delivery",
    title: "Craftsmanship and delivery.",
    paragraphs: [
      "Your garment is individually crafted according to your measurements and selected details, followed by a final fitting to ensure the desired fit and finish.",
    ],
  },
];

export function getProcessSteps(ids: readonly string[]) {
  return ids
    .map((id, index) => {
      const step = PROCESS_STEPS.find((item) => item.id === id);
      if (!step) return null;
      return {
        ...step,
        number: String(index + 1).padStart(2, "0"),
      };
    })
    .filter((step): step is ProcessStep => step !== null);
}
