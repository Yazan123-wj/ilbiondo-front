import { EditorialImage } from "@/components/shared/EditorialImage";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { TextReveal } from "@/components/shared/TextReveal";
import type { ClubPrivilege } from "@/data/club";

type PrivilegeSectionProps = ClubPrivilege & {
  index: number;
};

export function PrivilegeSection({
  id,
  title,
  paragraphs,
  index,
}: PrivilegeSectionProps) {
  return (
    <section id={id} className="px-5 py-16 md:px-10 md:py-24">
      <TextReveal className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <EditorialImage
          alt={title}
          label="Atelier image"
          ratio="landscape"
          className={index % 2 === 1 ? "md:order-2" : undefined}
        />
        <div className={index % 2 === 1 ? "md:order-1" : undefined}>
          <SectionLabel number={String(index + 1).padStart(2, "0")}>
            {title}
          </SectionLabel>
          <h2 className="mt-5 font-serif text-3xl tracking-tight md:text-5xl">
            {title}
          </h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-muted">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </TextReveal>
    </section>
  );
}
