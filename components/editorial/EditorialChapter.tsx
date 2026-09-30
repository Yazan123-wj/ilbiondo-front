"use client";

import { EditorialCTA } from "@/components/editorial/EditorialCTA";
import { EditorialReveal } from "@/components/editorial/EditorialReveal";
import { EditorialRule } from "@/components/editorial/EditorialRule";
import {
  editorialBody,
  editorialDisplay,
  editorialGutter,
} from "@/components/editorial/styles";
import { CurtainLine } from "@/components/home/CurtainLine";
import { EditorialImage } from "@/components/shared/EditorialImage";
import { cn } from "@/lib/utils";

type EditorialChapterProps = {
  id?: string;
  number: string;
  kicker?: string;
  title: string;
  paragraphs: string[];
  cta?: { label: string; href: string };
  imageLabel: string;
  imageSrc?: string;
  reverse?: boolean;
};

export function EditorialChapter({
  id,
  number,
  kicker,
  title,
  paragraphs,
  cta,
  imageLabel,
  imageSrc,
  reverse = false,
}: EditorialChapterProps) {
  return (
    <article id={id} className={cn(editorialGutter, "py-16 md:py-24")}>
      <EditorialRule className="mb-16 md:mb-24" />
      <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
        <div
          className={cn(
            "md:col-span-6",
            reverse && "md:col-start-7 md:row-start-1",
          )}
        >
          <EditorialImage
            src={imageSrc}
            alt={kicker ?? title}
            label={imageLabel}
            ratio="landscape"
            className="md:min-h-[44vh] md:aspect-auto"
          />
        </div>

        <EditorialReveal
          className={cn(
            "md:col-span-5",
            reverse ? "md:col-start-1 md:row-start-1" : "md:col-start-8",
          )}
        >
          <p className="font-serif text-[clamp(4.5rem,10vw,8rem)] leading-none tracking-[-0.05em] text-accent/20">
            {number}
          </p>
          {kicker ? (
            <p className="mt-4 text-[11px] tracking-[0.22em] text-accent uppercase">
              {kicker}
            </p>
          ) : null}
          <h2
            className={cn(
              editorialDisplay,
              "mt-4 text-[clamp(2.5rem,4.8vw,4.75rem)]",
            )}
          >
            <CurtainLine>
              <span className="block">{title}</span>
            </CurtainLine>
          </h2>
          <div className={cn(editorialBody, "mt-6 space-y-5")}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {cta ? (
            <EditorialCTA href={cta.href} className="mt-8">
              {cta.label}
            </EditorialCTA>
          ) : null}
        </EditorialReveal>
      </div>
    </article>
  );
}
