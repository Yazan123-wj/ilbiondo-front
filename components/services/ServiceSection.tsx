import { EditorialImage } from "@/components/shared/EditorialImage";
import { PrimaryLink } from "@/components/shared/PrimaryLink";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { TextReveal } from "@/components/shared/TextReveal";
import type { ServiceBlock } from "@/data/services";

type ServiceSectionProps = ServiceBlock & {
  index: number;
};

export function ServiceSection({
  id,
  label,
  title,
  paragraphs,
  cta,
  index,
}: ServiceSectionProps) {
  return (
    <section id={id} className="px-5 py-16 md:px-10 md:py-24">
      <TextReveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <EditorialImage
          alt={label}
          label={index % 2 === 0 ? "Tailoring detail" : "Fabric detail"}
          ratio="landscape"
          className={index % 2 === 1 ? "lg:order-2" : undefined}
        />
        <div>
          <SectionLabel number={String(index + 1).padStart(2, "0")}>
            {label}
          </SectionLabel>
          <h2 className="mt-5 font-serif text-4xl tracking-tight md:text-5xl">
            {title}
          </h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-muted">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {cta ? (
            <PrimaryLink href={cta.href} className="mt-8">
              {cta.label}
            </PrimaryLink>
          ) : null}
        </div>
      </TextReveal>
    </section>
  );
}
