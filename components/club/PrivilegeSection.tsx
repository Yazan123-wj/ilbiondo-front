"use client";

import { CountUp } from "@/components/bits/CountUp";
import { SplitText } from "@/components/bits/SplitText";
import { TiltedCard } from "@/components/bits/TiltedCard";
import {
  editorialBody,
  editorialDisplay,
} from "@/components/editorial/styles";
import { EditorialImage } from "@/components/shared/EditorialImage";
import type { ClubPrivilege } from "@/data/club";
import { cn } from "@/lib/utils";

type PrivilegeSectionProps = ClubPrivilege & {
  index: number;
  imageSrc: string;
  reverse?: boolean;
};

export function PrivilegeSection({
  id,
  title,
  paragraphs,
  index,
  imageSrc,
  reverse = false,
}: PrivilegeSectionProps) {
  return (
    <article
      id={id}
      className="scroll-mt-24 py-16 md:scroll-mt-28 md:py-24"
    >
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
        <div
          className={cn(
            "md:col-span-6",
            reverse && "md:col-start-7 md:row-start-1",
          )}
        >
          <TiltedCard>
            <EditorialImage
              src={imageSrc}
              alt={title}
              label="ATELIER IMAGE"
              ratio="editorial"
              parallax
            />
          </TiltedCard>
        </div>

        <div
          className={cn(
            "md:col-span-5",
            reverse ? "md:col-start-1 md:row-start-1" : "md:col-start-8",
          )}
        >
          <CountUp
            to={index + 1}
            className="font-serif text-[clamp(2.4rem,5vw,4rem)] leading-none tracking-[-0.06em] text-accent"
          />
          <SplitText
            text={title}
            tag="h2"
            className={cn(
              editorialDisplay,
              "mt-4 block text-[clamp(2.1rem,4.2vw,3.6rem)] uppercase",
            )}
            delay={60}
          />
          <div className={cn(editorialBody, "mt-6 space-y-5")}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
