import type { Metadata } from "next";

import { AppointmentForm } from "@/components/appointments/AppointmentForm";
import { PageHero } from "@/components/shared/PageHero";
import { TextReveal } from "@/components/shared/TextReveal";

export const metadata: Metadata = {
  title: "Appointments",
  description:
    "Reserve a private appointment at the IL BIONDO atelier in Amman.",
};

export default function AppointmentsPage() {
  return (
    <>
      <PageHero title="Your time. Your experience.">
        <p>Every IL BIONDO journey begins with a conversation.</p>
        <p>
          Reserve a private appointment at our Amman atelier and allow our team
          to guide you through fabrics, proportions, construction and the
          details that will define your garment.
        </p>
      </PageHero>
      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl tracking-tight">
              Select your visit
            </h2>
            <div className="mt-10 max-w-md">
              <AppointmentForm />
            </div>
          </div>
          <TextReveal>
            <h2 className="font-serif text-4xl tracking-tight">
              What to expect
            </h2>
            <div className="mt-8 max-w-md space-y-5 text-base leading-8 text-muted">
              <p>
                Your first appointment is an opportunity to understand what you
                need, how you dress and what you expect from the garment.
              </p>
              <p>There is no need to arrive knowing exactly what you want.</p>
              <p>That is part of our service.</p>
            </div>
          </TextReveal>
        </div>
      </section>
    </>
  );
}
