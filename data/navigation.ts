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
      { label: "About Us", href: "/our-story" },
      { label: "The Founder", href: "/our-story#founders" },
      { label: "Our Philosophy", href: "/our-story#philosophy" },
    ],
  },
  {
    id: "tailoring",
    label: "Tailoring",
    items: [{ label: "Su Misura", href: "/services/su-misura" }],
  },
  {
    id: "services",
    label: "Services",
    items: [
      { label: "The Groom", href: "/services/the-groom" },
      { label: "Consulting", href: "/services/consulting" },
      { label: "Wardrobe Management", href: "/services/wardrobe-management" },
      { label: "Garment Refinement", href: "/services/garment-refinement" },
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

export const MENU_PRIMARY: NavLink[] = [
  { label: "About Us", href: "/our-story" },
  { label: "Services", href: "/services" },
  { label: "The Club", href: "/club" },
  { label: "Appointments", href: "/appointments" },
  { label: "Contact Us", href: "/contact" },
];

export const MENU_SECONDARY: NavLink[] = [
  { label: "Visit", href: "/visit" },
  { label: "Privileges", href: "/club/privileges" },
  { label: "The Founder", href: "/our-story#founders" },
];
