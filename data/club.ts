export type ClubPrivilege = {
  id?: string;
  title: string;
  paragraphs: string[];
};

export const CLUB_PRIVILEGES: ClubPrivilege[] = [
  {
    title: "First to Know",
    paragraphs: [
      "Discover what arrives next, before it is announced.",
      "New cloth from our mills, seasonal collections, special pieces and selected releases are introduced to IL BIONDO Club members first.",
    ],
  },
  {
    title: "Part of the Community",
    paragraphs: [
      "A private circle built around an appreciation for craftsmanship.",
      "Members are invited to selected tailoring evenings, fabric presentations, fitting days and private gatherings at the IL BIONDO atelier.",
    ],
  },
  {
    id: "member-services",
    title: "Member Tailoring Service",
    paragraphs: [
      "The relationship with a garment should continue long after it leaves the atelier.",
      "IL BIONDO Club members have access to our tailoring service for selected garments already in their wardrobe, with alterations and adjustments carried out by our tailoring team.",
    ],
  },
  {
    title: "Private Styling & Shopping",
    paragraphs: [
      "Your wardrobe extends beyond IL BIONDO.",
      "Club members may request personal styling and shopping assistance for selected pieces from other brands — helping create a complete wardrobe rather than individual garments.",
    ],
  },
  {
    title: "Your Wardrobe, Remembered",
    paragraphs: [
      "As our relationship develops, so does our understanding of your wardrobe.",
      "Your preferences, measurements and previous IL BIONDO pieces allow us to make future appointments more personal, efficient and considered.",
    ],
  },
];
