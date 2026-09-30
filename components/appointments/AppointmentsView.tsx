"use client";

import { TiltedCard } from "@/components/bits/TiltedCard";
import { AppointmentForm } from "@/components/appointments/AppointmentForm";
import { EditorialCTA } from "@/components/editorial/EditorialCTA";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { EditorialRule } from "@/components/editorial/EditorialRule";
import {
  editorialBody,
  editorialDisplay,
  editorialGutter,
} from "@/components/editorial/styles";
import { EditorialImage } from "@/components/shared/EditorialImage";
import { MEDIA } from "@/data/editorial-media";
import { CONTACT } from "@/lib/contact";
import { cn } from "@/lib/utils";

export function AppointmentsView() {
  return (
    <>
      <EditorialHero
        lines={["YOUR TIME.", "YOUR EXPERIENCE."]}
        image={{
          src: MEDIA.armchair,
          alt: "IL BIONDO appointment",
          label: "ATELIER IMAGE",
          ratio: "portrait",
        }}
        lede={
          <>
            <p>Every IL BIONDO journey begins with a conversation.</p>
            <p className="mt-5">
              Reserve a private appointment at our Amman atelier and allow our
              team to guide you through fabrics, proportions, construction and
              the details that will define your garment.
            </p>
          </>
        }
        meta="APPOINTMENTS / IL BIONDO"
      />

      <section
        id="book"
        className={cn(
          editorialGutter,
          "grid items-start gap-16 py-16 md:grid-cols-12 md:gap-10 md:py-28",
        )}
      >
        <div className="md:col-span-6">
          <p className="text-[11px] tracking-[0.22em] text-accent uppercase">
            The Appointment
          </p>
          <h2
            className={cn(
              editorialDisplay,
              "mt-5 text-[clamp(2.4rem,4.5vw,4.2rem)] uppercase",
            )}
          >
            Select your
            <br />
            visit
          </h2>
          <div className="mt-12 max-w-xl">
            <AppointmentForm />
          </div>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <TiltedCard>
            <EditorialImage
              src={MEDIA.gloves}
              alt="Atelier still"
              label="ATELIER STILL"
              ratio="editorial"
              parallax
            />
          </TiltedCard>
        </div>
      </section>

      <section
        className={cn(
          editorialGutter,
          "bg-background pb-20 pt-4 md:pb-32 md:pt-8",
        )}
      >
        <EditorialRule className="mb-12 md:mb-16" />
        <h2
          className={cn(
            editorialDisplay,
            "max-w-5xl text-[clamp(2.2rem,6vw,5.25rem)] uppercase",
          )}
        >
          Your journey begins with a private appointment at the IL BIONDO
          atelier.
        </h2>
        <p className={cn(editorialBody, "mt-8")}>
          {CONTACT.atelierName}
          <br />
          {CONTACT.addressLine1}, {CONTACT.addressLine2}
        </p>
        <EditorialCTA href="/visit" className="mt-10">
          Visit the Atelier
        </EditorialCTA>
      </section>
    </>
  );
}
