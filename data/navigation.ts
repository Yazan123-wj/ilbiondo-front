export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  id: string;
  label: string;
  href?: string;
  items: NavLink[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "the-house",
    label: "The House",
    items: [
      { label: "Our Story", href: "/our-story" },
      { label: "The Founders", href: "/our-story#founders" },
      { label: "Our Philosophy", href: "/our-story#philosophy" },
    ],
  },
  {
    id: "tailoring",
    label: "Tailoring",
    items: [
      { label: "Made to Measure", href: "/services#made-to-measure" },
      { label: "Bespoke", href: "/services#bespoke" },
      { label: "The Process", href: "/process" },
      { label: "Fabrics", href: "/process#cloth" },
    ],
  },
  {
    id: "services",
    label: "Services",
    items: [
      { label: "Private Wardrobe", href: "/services#private-wardrobe" },
      { label: "The Groom", href: "/services#the-groom" },
      { label: "Personal Styling", href: "/services#personal-styling" },
    ],
  },
  {
    id: "club",
    label: "IL Biondo Club",
    items: [
      { label: "Membership", href: "/club" },
      { label: "Privileges", href: "/club/privileges" },
      { label: "Member Services", href: "/club/privileges#member-services" },
    ],
  },
  {
    id: "visit",
    label: "Visit",
    items: [
      { label: "Book an Appointment", href: "/appointments" },
      { label: "Location", href: "/visit" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
