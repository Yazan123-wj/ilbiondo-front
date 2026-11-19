import type { Metadata } from "next";

import { ContactView } from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak with the IL BIONDO team in Amman — whether beginning a first garment, preparing for a wedding, or visiting the atelier.",
};

export default function ContactPage() {
  return <ContactView />;
}
