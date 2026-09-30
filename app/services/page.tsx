import type { Metadata } from "next";

import { ServicesView } from "@/components/services/ServicesView";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From a single garment to a complete wardrobe, IL BIONDO services are designed around the individual.",
};

export default function ServicesPage() {
  return <ServicesView />;
}
