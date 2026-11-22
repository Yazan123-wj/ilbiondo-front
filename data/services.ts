export type ServiceSub = {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
};

export type ServiceBlock = {
  id: string;
  label: string;
  title: string;
  lines: string[];
  paragraphs: string[];
  subServices?: ServiceSub[];
  journey: readonly string[];
  cta?: {
    label: string;
    href: string;
  };
};

const SU_MISURA_JOURNEY = [
  "consultation",
  "garment-selection",
  "personalization",
  "craftsmanship",
] as const;

export const SERVICES: ServiceBlock[] = [
  {
    id: "su-misura",
    label: "Su Misura",
    title: "Made for You.",
    lines: ["Made for", "you."],
    paragraphs: [
      "At IL BIONDO, every garment begins with precise measurements, an understanding of your body, and a personal selection of fabrics and details. Our Su Misura experience offers two approaches to tailoring.",
    ],
    subServices: [
      {
        id: "made-to-measure",
        label: "Made to Measure",
        title: "Modern Precision",
        paragraphs: [
          "A personalized tailoring experience that combines precise measurements, individual style, and modern construction techniques. Designed to deliver an elegant fit, comfort, and practicality for everyday wear.",
        ],
      },
      {
        id: "bespoke",
        label: "Bespoke",
        title: "The Art of Craftsmanship",
        paragraphs: [
          "A more traditional approach to tailoring, where craftsmanship takes center stage. Featuring handwork, refined construction, and meticulous attention to every detail, creating a garment with exceptional character and a truly personal finish.",
        ],
      },
    ],
    journey: SU_MISURA_JOURNEY,
    cta: {
      label: "Book Su Misura",
      href: "/appointments",
    },
  },
  {
    id: "the-groom",
    label: "The Groom",
    title: "Every Detail, Considered.",
    lines: ["Every detail,", "considered."],
    paragraphs: [
      "A personal dressing experience dedicated to the groom on his most memorable day.",
      "From preparing his wardrobe and personal essentials to coordinating every accessory, IL BIONDO takes care of every detail.",
      "Our team personally attends to the groom, ensuring each look, from the first appearance to the final celebration, is impeccably presented.",
      "So he can simply enjoy the moment, while we take care of the rest.",
    ],
    journey: [],
    cta: {
      label: "Book a Groom Consultation",
      href: "/appointments",
    },
  },
  {
    id: "consulting",
    label: "Consulting",
    title: "Style Beyond Tailoring.",
    lines: ["Style beyond", "tailoring."],
    paragraphs: [
      "A personalized styling experience that extends beyond the IL BIONDO wardrobe.",
      "We carefully curate clothing, footwear, and accessories from international luxury brands, creating a wardrobe that reflects each client's personality, lifestyle, and individual taste.",
      "A considered approach to personal style, where every choice feels distinctly yours.",
    ],
    journey: [],
    cta: {
      label: "Book a Consulting Appointment",
      href: "/appointments",
    },
  },
  {
    id: "wardrobe-management",
    label: "Wardrobe Management",
    title: "An Organized Expression of Your Style.",
    lines: ["An organized", "expression of", "your style."],
    paragraphs: [
      "A personalized approach to organizing and refining your dressing room.",
      "From coordinating outfits and arranging colors to separating formal and casual wardrobes, every detail is thoughtfully considered around your lifestyle and daily routine.",
      "Creating a wardrobe where elegance meets practicality, and every piece has its place.",
    ],
    journey: [],
    cta: {
      label: "Book a Wardrobe Consultation",
      href: "/appointments",
    },
  },
  {
    id: "garment-refinement",
    label: "Garment Refinement",
    title: "The Perfect Fit, Reconsidered.",
    lines: ["The perfect fit,", "reconsidered."],
    paragraphs: [
      "A dedicated alteration service designed to refine the fit and comfort of your existing wardrobe.",
      "From subtle adjustments to more extensive alterations, we carefully reshape and refine garments to complement your proportions and personal style.",
      "Whether an IL BIONDO creation or a piece from your own collection, every garment receives the attention it deserves.",
    ],
    journey: [],
    cta: {
      label: "Book Garment Refinement",
      href: "/appointments",
    },
  },
];

export function getService(id: string) {
  return SERVICES.find((service) => service.id === id);
}
