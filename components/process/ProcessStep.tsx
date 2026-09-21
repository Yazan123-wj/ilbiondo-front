import { EditorialImage } from "@/components/shared/EditorialImage";
import { PrimaryLink } from "@/components/shared/PrimaryLink";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { TextReveal } from "@/components/shared/TextReveal";
import type { ProcessStep } from "@/data/process";

type ProcessStepProps = ProcessStep & {
  index: number;
};

export function ProcessStepBlock({
  number,
  id,
  label,
  title,
  paragraphs,
  cta,
  index,
}: ProcessStepProps) {
  return (
    <article id={id} className="px-5 py-16 md:px-10 md:py-24">
      <TextReveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <EditorialImage
          alt={label}
          label={index === 2 ? "Fabric detail" : "Tailoring detail"}
          ratio="landscape"
          className={index % 2 === 1 ? "lg:order-2" : undefined}
        />
        <div>
          <SectionLabel number={number}>{label}</SectionLabel>
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
    </article>
  );
}
