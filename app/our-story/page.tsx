import type { Metadata } from "next";

import { OurStoryView } from "@/components/story/OurStoryView";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "IL BIONDO began with a simple belief: the best tailoring starts by knowing the person who will wear it.",
};

export default function OurStoryPage() {
  return <OurStoryView />;
}
