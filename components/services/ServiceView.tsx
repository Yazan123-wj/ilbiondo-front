import { PrivilegeSection } from "@/components/club/PrivilegeSection";
import { EditorialCTA } from "@/components/editorial/EditorialCTA";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { EditorialRule } from "@/components/editorial/EditorialRule";
import {
  band,
  editorialBody,
  editorialBodyLight,
  editorialDisplay,
  editorialGutter,
} from "@/components/editorial/styles";
import { EditorialImage } from "@/components/shared/EditorialImage";
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
] as const;

const COPY_IMAGES = [
  MEDIA.gloves,
  MEDIA.gloves,
  MEDIA.bag,
  MEDIA.chess,
  MEDIA.library,
] as const;

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
  const [lede, ...rest] = service.paragraphs;
  const subs = service.subServices ?? [];
  const hasJourney = steps.length > 0;
  const copyBand = 0;
  const journeyBand = subs.length ? 1 : 0;

  return (
    <>
      <EditorialHero
        compact
        lines={service.lines}
        image={{
          src: heroImage,
          alt: service.label,
          label: "ATELIER IMAGE",
          ratio: "editorial",
        }}
        lede={lede ? <p>{lede}</p> : undefined}
      />

      {subs.length ? (
        <section
          className={cn(editorialGutter, band(copyBand), "py-16 md:py-24")}
        >
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            {subs.map((sub) => (
              <div key={sub.id} id={sub.id} className="scroll-mt-28">
                <p className="text-[11px] tracking-[0.22em] text-accent uppercase">
                  {sub.label}
                </p>
                <h2
                  className={cn(
                    editorialDisplay,
                    "mt-4 text-[clamp(1.8rem,3vw,2.6rem)]",
                  )}
                >
                  {sub.title}
                </h2>
                <div className={cn(editorialBody, "mt-5 space-y-5")}>
                  {sub.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : rest.length ? (
        <section
          className={cn(
            editorialGutter,
            band(copyBand),
            "py-16 md:py-28",
          )}
        >
          <article className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-6">
              <EditorialImage
                src={COPY_IMAGES[index] ?? MEDIA.gloves}
                alt={service.label}
                label="ATELIER STILL"
                ratio="editorial"
                parallax
              />
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <p className="text-[11px] tracking-[0.22em] text-accent uppercase">
                {service.label}
              </p>
              {rest.length > 1 ? (
                <div className={cn(editorialBody, "mt-6 space-y-5")}>
                  {rest.slice(0, -1).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
              <p
                className={cn(
                  editorialDisplay,
                  rest.length > 1 ? "mt-8" : "mt-6",
                  "text-[clamp(1.7rem,3.2vw,2.55rem)] leading-[1.12]",
                )}
              >
                {rest[rest.length - 1]}
              </p>
              <EditorialCTA href={bookHref} className="mt-10">
                {bookLabel}
              </EditorialCTA>
            </div>
          </article>
        </section>
      ) : null}

      {hasJourney ? (
        <>
          <section
            className={cn(
              editorialGutter,
              band(journeyBand),
              "pt-16 pb-8 md:pt-20 md:pb-10",
            )}
          >
            <p className="text-[11px] tracking-[0.22em] text-accent uppercase">
              The Experience
            </p>
            <h2
              className={cn(
                editorialDisplay,
                "mt-5 text-[clamp(2.2rem,5vw,4.4rem)] uppercase",
              )}
            >
              From the first conversation to the final fitting.
            </h2>
            <nav aria-label="The Experience" className="mt-10 md:mt-12">
              <ol className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
                {steps.map((step) => (
                  <li key={step.id}>
                    <a
                      href={`#${step.id}`}
                      className="group flex flex-col gap-2 border-t border-border pt-4 transition-colors hover:border-accent"
                    >
                      <span className="font-serif text-sm tracking-[0.12em] text-accent">
                        {step.number}
                      </span>
                      <span className="font-serif text-[1.05rem] leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent md:text-lg">
                        {step.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </section>

          {steps.map((step, stepIndex) => (
            <section
              key={step.id}
              className={cn(
                editorialGutter,
                band(journeyBand + 1 + stepIndex),
              )}
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
        </>
      ) : null}

      <section
        className={cn(
          editorialGutter,
          "bg-accent pb-20 pt-20 text-background md:pb-32 md:pt-28",
        )}
      >
        <EditorialRule tone="cream" className="mb-12 md:mb-16" />
        <h2
          className={cn(
            editorialDisplay,
            "max-w-5xl text-[clamp(2.2rem,6vw,5.25rem)] uppercase",
          )}
        >
          Make an appointment.
        </h2>
        <p className={cn(editorialBodyLight, "mt-8")}>
          Every IL BIONDO journey begins with a conversation.
        </p>
        <EditorialCTA href={bookHref} tone="fill" className="mt-10">
          {bookLabel}
        </EditorialCTA>
      </section>
    </>
  );
}
