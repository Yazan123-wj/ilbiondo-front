import type { Metadata } from "next";

import { ClubView } from "@/components/club/ClubView";

export const metadata: Metadata = {
  title: {
    absolute: "IL BIONDO Club",
  },
  description:
    "IL BIONDO Club is a private circle created for clients who see tailoring as part of the way they live.",
};

export default function ClubPage() {
  return <ClubView />;
}
