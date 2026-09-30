import type { Metadata } from "next";

import { JourneyView } from "@/components/process/JourneyView";

export const metadata: Metadata = {
  title: "The Process",
  description:
    "A garment does not begin with cloth. It begins with understanding the person who will wear it.",
};

export default function ProcessPage() {
  return <JourneyView />;
}
