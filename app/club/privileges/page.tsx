import type { Metadata } from "next";

import { PrivilegesView } from "@/components/club/PrivilegesView";

export const metadata: Metadata = {
  title: "Club Privileges",
  description:
    "A closer relationship with the house, reserved for IL BIONDO Club members.",
};

export default function ClubPrivilegesPage() {
  return <PrivilegesView />;
}
