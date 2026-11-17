import type { Metadata } from "next";

import { OurStoryView } from "@/components/story/OurStoryView";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Today, the IL BIONDO atelier in Amman continues a philosophy of personal service, considered design and tailoring created around the individual.",
};

export default function OurStoryPage() {
  return <OurStoryView />;
}
