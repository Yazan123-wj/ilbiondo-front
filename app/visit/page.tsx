import type { Metadata } from "next";

import { EditorialCTA } from "@/components/editorial/EditorialCTA";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { EditorialRule } from "@/components/editorial/EditorialRule";
import {
  editorialBodyLight,
  editorialGutter,
} from "@/components/editorial/styles";
import { EditorialImage } from "@/components/shared/EditorialImage";
import { MEDIA } from "@/data/editorial-media";
import { CONTACT } from "@/lib/contact";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Visit the Atelier",
  description:
    "Visit the IL BIONDO atelier in Um Uthainah, Amman — a place to take your time, discover cloth and experience tailoring privately.",
};

export default function VisitPage() {
  return (
    <>
      <EditorialHero
        number="01"
        eyebrow="THE ATELIER"
        lines={["Our home", "in Amman."]}
        imageSide="full"
        image={{
          src: MEDIA.hero,
          alt: "The IL BIONDO atelier in Amman",
          label: "ATELIER IMAGE",
          ratio: "wide",
        }}
        lede={
          <p>
            The IL BIONDO atelier was designed to feel personal rather than
            transactional — a place to take your time, discover cloth and
            experience tailoring privately.
          </p>
        }
      />

      <section
        className={cn(
          editorialGutter,
          "grid gap-12 bg-accent py-20 text-background md:grid-cols-12 md:gap-8 md:py-32",
        )}
      >
        <div className="md:col-span-7">
          <EditorialImage
            src={MEDIA.library}
            alt="The IL BIONDO atelier in Amman"
            label="ATELIER IMAGE"
            ratio="wide"
            className="md:min-h-[560px] md:aspect-auto"
          />
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <p className="text-[11px] tracking-[0.22em] text-background/70 uppercase">
            {CONTACT.atelierName}
          </p>
          <p className="mt-6 font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.15]">
            {CONTACT.addressLine1}
            <br />
            {CONTACT.addressLine2}
          </p>
          <EditorialRule className="my-10" />
          <p className="text-[11px] tracking-[0.22em] text-background/55 uppercase">
            Opening Hours
          </p>
          <dl className={cn(editorialBodyLight, "mt-6 space-y-4")}>
            {CONTACT.hours.map((entry) => (
              <div key={entry.days}>
                <dt className="font-serif text-background">{entry.days}</dt>
                <dd>{entry.time}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12 flex flex-col gap-5">
            {CONTACT.mapsUrl ? (
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] tracking-[0.2em] uppercase text-background/80 transition-opacity hover:opacity-100"
              >
                Get Directions
              </a>
            ) : (
              <span className="text-[11px] tracking-[0.2em] text-background/50 uppercase">
                Get Directions
              </span>
            )}
            <EditorialCTA href="/appointments" tone="fill">Book an Appointment</EditorialCTA>
          </div>
        </div>
      </section>
    </>
  );
}
