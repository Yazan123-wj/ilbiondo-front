import type { Metadata } from "next";

import { MembershipSection } from "@/components/club/MembershipSection";
import { PageHero } from "@/components/shared/PageHero";
import { PrimaryLink } from "@/components/shared/PrimaryLink";

export const metadata: Metadata = {
  title: {
    absolute: "IL BIONDO Club",
  },
  description:
    "IL BIONDO Club is a private circle created for clients who see tailoring as part of the way they live.",
};

export default function ClubPage() {
  return (
    <>
      <PageHero title="The art of belonging">
        <p>
          IL BIONDO Club is our private circle — created for clients who see
          tailoring not simply as clothing, but as part of the way they live.
        </p>
        <p>
          Membership brings you closer to the atelier, with early access,
          private services and experiences reserved for our members.
        </p>
        <PrimaryLink href="#membership" className="mt-10">
          Join IL BIONDO Club
        </PrimaryLink>
      </PageHero>
      <MembershipSection />
    </>
  );
}
