"use client";

import { PrivilegeSection } from "@/components/club/PrivilegeSection";
import { EditorialCTA } from "@/components/editorial/EditorialCTA";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { EditorialRule } from "@/components/editorial/EditorialRule";
import {
  editorialDisplay,
  editorialGutter,
} from "@/components/editorial/styles";
import { CLUB_PRIVILEGES } from "@/data/club";
import { MEDIA, PRIVILEGE_IMAGES } from "@/data/editorial-media";
import { cn } from "@/lib/utils";

export function PrivilegesView() {
  return (
    <>
      <EditorialHero
        compact
        lines={["MORE THAN", "MEMBERSHIP."]}
        image={{
          src: MEDIA.library,
          alt: "IL BIONDO Club privileges",
          label: "ATELIER IMAGE",
          ratio: "editorial",
        }}
        lede={<p>A closer relationship with the house.</p>}
        meta="PRIVILEGES / IL BIONDO"
      />

      <div className={editorialGutter}>
        {CLUB_PRIVILEGES.map((privilege, index) => (
          <PrivilegeSection
            key={privilege.title}
            {...privilege}
            index={index}
            imageSrc={PRIVILEGE_IMAGES[index] ?? MEDIA.library}
            reverse={index % 2 === 1}
          />
        ))}
      </div>

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
          The art of belonging.
        </h2>
        <EditorialCTA href="/club#membership" className="mt-10">
          Join IL BIONDO Club
        </EditorialCTA>
      </section>
    </>
  );
}
