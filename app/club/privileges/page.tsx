import type { Metadata } from "next";

import { PrivilegeSection } from "@/components/club/PrivilegeSection";
import { PageHero } from "@/components/shared/PageHero";
import { CLUB_PRIVILEGES } from "@/data/club";

export const metadata: Metadata = {
  title: "Club Privileges",
  description:
    "A closer relationship with the house, reserved for IL BIONDO Club members.",
};

export default function ClubPrivilegesPage() {
  return (
    <>
      <PageHero title="More than membership.">
        <p>A closer relationship with the house.</p>
      </PageHero>
      {CLUB_PRIVILEGES.map((privilege, index) => (
        <PrivilegeSection key={privilege.title} index={index} {...privilege} />
      ))}
    </>
  );
}
