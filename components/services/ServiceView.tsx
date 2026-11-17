import { PrivilegeSection } from "@/components/club/PrivilegeSection";
import { EditorialCTA } from "@/components/editorial/EditorialCTA";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { EditorialRule } from "@/components/editorial/EditorialRule";
import {
  band,
  editorialBody,
  editorialDisplay,
  editorialGutter,
} from "@/components/editorial/styles";
import { MEDIA, SERVICE_IMAGES } from "@/data/editorial-media";
import { getProcessSteps } from "@/data/process";
import type { ServiceBlock } from "@/data/services";
import { SERVICES } from "@/data/services";
import { cn } from "@/lib/utils";

const JOURNEY_IMAGES = [
  MEDIA.library,
  MEDIA.elevator,
  MEDIA.oxfords,
  MEDIA.gloves,
  MEDIA.bag,
  MEDIA.armchair,
] as const;

function heroLines(label: string) {
  const words = label.replace("&", "and").split(/\s+/);
  if (words.length === 1) {
    return [`${words[0]}.`];
  }
  return [words.slice(0, -1).join(" "), `${words[words.length - 1]}.`];
}

type ServiceViewProps = {
  service: ServiceBlock;
};

export function ServiceView({ service }: ServiceViewProps) {
  const index = SERVICES.findIndex((item) => item.id === service.id);
  const steps = getProcessSteps(service.journey);
  const heroImage = SERVICE_IMAGES[index] ?? MEDIA.library;
  const bookHref = "/appointments";
  const bookLabel = service.cta?.label?.startsWith("Book")
    ? service.cta.label
    : "Book an Appointment";

  return (
    <>
      <EditorialHero
        compact
        lines={heroLines(service.label)}
        image={{
          src: heroImage,
          alt: service.label,
          label: "ATELIER IMAGE",
          ratio: "editorial",
        }}
        lede={
          <div className="space-y-5">
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        }
        meta={`${service.label.toUpperCase()} / IL BIONDO`}
      />

      <section className={cn(editorialGutter, band(0), "pt-16 pb-8 md:pt-20 md:pb-10")}>
        <p className="text-[11px] tracking-[0.22em] text-accent uppercase">
          The Journey
        </p>
        <h2
          className={cn(
            editorialDisplay,
            "mt-5 text-[clamp(2.2rem,5vw,4.4rem)] uppercase",
          )}
        >
          How it unfolds.
        </h2>
      </section>

      {steps.map((step, stepIndex) => (
        <section
          key={step.id}
          className={cn(editorialGutter, band(stepIndex + 1))}
        >
          <PrivilegeSection
            id={step.id}
            title={step.title}
            paragraphs={step.paragraphs}
            index={stepIndex}
            imageSrc={JOURNEY_IMAGES[stepIndex] ?? MEDIA.library}
            reverse={stepIndex % 2 === 1}
          />
        </section>
      ))}

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
          Make an appointment.
        </h2>
        <p className={cn(editorialBody, "mt-8")}>
          Every IL BIONDO journey begins with a conversation.
        </p>
        <EditorialCTA href={bookHref} className="mt-10">
          {bookLabel}
        </EditorialCTA>
      </section>
    </>
  );
}
