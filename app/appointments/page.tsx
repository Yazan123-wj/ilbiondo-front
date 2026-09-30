import type { Metadata } from "next";

import { AppointmentsView } from "@/components/appointments/AppointmentsView";

export const metadata: Metadata = {
  title: "Appointments",
  description:
    "Reserve a private appointment at the IL BIONDO atelier in Amman.",
};

export default function AppointmentsPage() {
  return <AppointmentsView />;
}
