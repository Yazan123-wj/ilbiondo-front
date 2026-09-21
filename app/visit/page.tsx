import type { Metadata } from "next";

import { EditorialImage } from "@/components/shared/EditorialImage";
import { PageHero } from "@/components/shared/PageHero";
import { PrimaryLink } from "@/components/shared/PrimaryLink";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Visit the Atelier",
  description:
    "Visit the IL BIONDO atelier in Um Uthainah, Amman — a place to take your time, discover cloth and experience tailoring privately.",
};

export default function VisitPage() {
  return (
    <>
      <PageHero title="Our home in Amman.">
        <p>
          The IL BIONDO atelier was designed to feel personal rather than
          transactional — a place to take your time, discover cloth and
          experience tailoring privately.
        </p>
      </PageHero>
      <section className="grid gap-12 px-5 pb-20 md:grid-cols-2 md:items-start md:px-10 md:pb-28">
        <EditorialImage
          alt="The IL BIONDO atelier in Amman"
          label="Atelier image"
          ratio="wide"
          className="md:min-h-[520px] md:aspect-auto"
        />
        <div>
          <p className="nav-label text-muted">{CONTACT.atelierName}</p>
          <p className="mt-5 text-base leading-8">
            {CONTACT.addressLine1}
            <br />
            {CONTACT.addressLine2}
          </p>
          <p className="mt-10 nav-label text-muted">Opening Hours</p>
          <dl className="mt-5 space-y-4 text-base leading-8">
            {CONTACT.hours.map((entry) => (
              <div key={entry.days}>
                <dt>{entry.days}</dt>
                <dd className="text-muted">{entry.time}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-col gap-4">
            {CONTACT.mapsUrl ? (
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="nav-label"
              >
                Get Directions
              </a>
            ) : (
              <span className="nav-label text-muted">Get Directions</span>
            )}
            <PrimaryLink href="/appointments">Book an Appointment</PrimaryLink>
          </div>
        </div>
      </section>
    </>
  );
}
