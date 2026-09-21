export type ServiceBlock = {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
  cta?: {
    label: string;
    href: string;
  };
};

export const SERVICES: ServiceBlock[] = [
  {
    id: "made-to-measure",
    label: "Made to Measure",
    title: "Made around you.",
    paragraphs: [
      "A personalised approach to tailoring combining established patterns with your individual measurements, fabric selection and preferred details.",
      "Choose from our collection of fine fabrics and work with our team to define the cut, proportions and finishing of your garment.",
    ],
    cta: {
      label: "Book Made to Measure",
      href: "/appointments",
    },
  },
  {
    id: "bespoke",
    label: "Bespoke",
    title: "Created from the beginning.",
    paragraphs: [
      "Our most personal expression of tailoring.",
      "A bespoke garment is developed specifically for you through individual measurements, fittings and adjustments, allowing the garment to evolve around your proportions, posture and preferences.",
      "The process is deliberate.",
      "The result is entirely personal.",
    ],
    cta: {
      label: "Book a Bespoke Consultation",
      href: "/appointments",
    },
  },
  {
    id: "club-tailoring",
    label: "Club Tailoring",
    title: "Care for your wardrobe.",
    paragraphs: [
      "Exclusively for IL BIONDO Club members.",
      "Our tailoring team can alter and refine selected garments from your existing wardrobe, helping improve proportion, fit and balance.",
    ],
    cta: {
      label: "Member Sign In",
      href: "/club",
    },
  },
  {
    id: "private-wardrobe",
    label: "Private Wardrobe",
    title: "A wardrobe with purpose.",
    paragraphs: [
      "A well-built wardrobe is not about having more.",
      "It is about having what works.",
      "Our Private Wardrobe service helps organise and refine your dressing room — reviewing existing pieces, identifying what is missing and creating a wardrobe that works naturally across business, travel, formal occasions and everyday life.",
    ],
  },
  {
    id: "the-groom",
    label: "The Groom",
    title: "For the day that matters.",
    paragraphs: [
      "From the first fitting to the final moments before the ceremony.",
      "IL BIONDO offers a dedicated groom service covering the complete wedding wardrobe, fittings, finishing details and personal dressing assistance on the wedding day.",
      "So when the moment arrives, everything is exactly where it should be.",
    ],
    cta: {
      label: "Book a Groom Consultation",
      href: "/appointments",
    },
  },
  {
    id: "personal-styling",
    label: "Personal Styling & Shopping",
    title: "Beyond IL BIONDO.",
    paragraphs: [
      "Exclusively for IL BIONDO Club members.",
      "Our approach to personal style does not end at our atelier.",
      "When a wardrobe requires pieces outside the IL BIONDO collection, our team can assist members in selecting and sourcing garments, footwear and accessories from other houses.",
      "Every choice is considered as part of one wardrobe.",
    ],
    cta: {
      label: "Discover IL BIONDO Club",
      href: "/club",
    },
  },
];
