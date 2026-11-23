import { EditorialCTA } from "@/components/editorial/EditorialCTA";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { EditorialRule } from "@/components/editorial/EditorialRule";
import {
  editorialBodyLight,
  editorialDisplay,
  editorialGutter,
} from "@/components/editorial/styles";
import { MEDIA, SERVICE_IMAGES } from "@/data/editorial-media";
import { SERVICES } from "@/data/services";
import { cn } from "@/lib/utils";

const OBJECT = [
  "object-center",
  "object-[center_30%]",
  "object-[center_40%]",
  "object-center",
  "object-[center_22%]",
  "object-center",
] as const;

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function ServicesView() {
  return (
    <>
      <EditorialHero
        lines={["At your", "service."]}
        image={{
          src: MEDIA.elevator,
          alt: "IL BIONDO services",
          label: "ATELIER IMAGE",
          ratio: "editorial",
        }}
        lede={
          <p>
            From a single garment to a complete wardrobe, our services are
            designed around the individual.
          </p>
        }
      />

      <section
        id="all-services"
        className={cn(editorialGutter, "bg-background py-10 md:py-14")}
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {SERVICES.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              data-service-id={service.id}
              className="relative h-[78vh] overflow-hidden bg-surface"
            >
              <div className="absolute inset-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SERVICE_IMAGES[index] ?? MEDIA.library}
                  alt={service.label}
                  className={cn("h-full w-full object-cover", OBJECT[index])}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161412]/85 via-[#161412]/20 to-[#161412]/10" />
              </div>
              <p className="absolute top-6 left-6 text-[11px] tracking-[0.32em] text-white/70 uppercase md:top-8 md:left-8">
                {pad(index)}
              </p>
              <div className="absolute inset-x-6 bottom-6 z-10 md:inset-x-8 md:bottom-8">
                <h2 className="font-serif text-3xl leading-none tracking-tight text-white md:text-5xl">
                  {service.label}
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-6 text-white/80 md:text-[15px] md:leading-7">
                  {service.paragraphs[0]}
                </p>
                <EditorialCTA
                  href={`/services/${service.id}`}
                  tone="light"
                  className="mt-6 hover:text-white"
                >
                  Discover
                </EditorialCTA>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="book"
        className={cn(
          editorialGutter,
          "bg-accent pb-20 pt-20 text-background md:pb-32 md:pt-28",
        )}
      >
        <EditorialRule tone="cream" className="mb-12 md:mb-16" />
        <h2
          className={cn(
            editorialDisplay,
            "text-[clamp(2.4rem,6vw,5.25rem)] uppercase",
          )}
        >
          Make an
          <br />
          appointment.
        </h2>
        <div className={cn(editorialBodyLight, "mt-8 space-y-5 md:mt-10")}>
          <p>Every IL BIONDO journey begins with a conversation.</p>
          <p>
            Reserve a private appointment at our Amman atelier and allow our
            team to guide you through fabrics, proportions, construction and
            the details that will define your garment.
          </p>
        </div>
        <EditorialCTA href="/appointments" tone="fill" className="mt-10">
          Book an Appointment
        </EditorialCTA>
      </section>
    </>
  );
}
