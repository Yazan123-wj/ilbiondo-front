"use client";

import { BlurText } from "@/components/bits/BlurText";
import { SplitText } from "@/components/bits/SplitText";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { EditorialLabel } from "@/components/editorial/EditorialLabel";
import { EditorialRule } from "@/components/editorial/EditorialRule";
import {
  editorialBody,
  editorialDisplay,
  editorialGutter,
} from "@/components/editorial/styles";
import { EditorialImage } from "@/components/shared/EditorialImage";
import { MEDIA } from "@/data/editorial-media";
import { cn } from "@/lib/utils";

function FounderSpread({
  number,
  first,
  last,
  role,
  copy,
  imageSrc,
  reverse,
}: {
  number: string;
  first: string;
  last: string;
  role: string;
  copy: string;
  imageSrc: string;
  reverse?: boolean;
}) {
  return (
    <article className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
      <div
        className={cn("md:col-span-5", reverse && "md:col-start-8 md:row-start-1")}
      >
        <EditorialImage
          src={imageSrc}
          alt={`Atelier still for ${first} ${last}`}
          label="ATELIER STILL"
          ratio="portrait"
          parallax
        />
      </div>

      <div
        className={cn(
          "md:col-span-6",
          reverse ? "md:col-start-1 md:row-start-1" : "md:col-start-7",
        )}
      >
        <p className="font-serif text-[clamp(2.4rem,5vw,4rem)] leading-none tracking-[-0.06em] text-accent/20">
          {number}
        </p>
        <SplitText
          text={`${first} ${last}`}
          tag="h3"
          className={cn(
            editorialDisplay,
            "mt-4 block text-[clamp(2.1rem,4.2vw,3.6rem)] uppercase",
          )}
          delay={60}
        />
        <p className="mt-4 text-[11px] tracking-[0.22em] text-muted uppercase">
          {role}
        </p>
        <p className={cn(editorialBody, "mt-5")}>{copy}</p>
      </div>
    </article>
  );
}

export function OurStoryView() {
  return (
    <>
      <EditorialHero
        number="01"
        eyebrow="THE HOUSE"
        lines={["BUILT AROUND", "THE", "INDIVIDUAL."]}
        image={{
          src: MEDIA.hero,
          alt: "IL BIONDO house",
          label: "ATELIER IMAGE",
          ratio: "editorial",
        }}
        lede={
          <>
            <p>IL BIONDO began with a simple belief:</p>
            <p className="mt-5">
              The best tailoring starts by knowing the person who will wear it.
            </p>
          </>
        }
        meta="THE HOUSE / IL BIONDO"
      />

      <section className={cn(editorialGutter, "py-16 md:py-24")}>
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <EditorialRule className="mb-8 w-16 bg-accent md:mb-10" />
            <BlurText
              text="THE BEST TAILORING STARTS BY KNOWING THE PERSON WHO WILL WEAR IT."
              tag="p"
              className={cn(
                editorialDisplay,
                "text-[clamp(1.7rem,3.4vw,2.85rem)] leading-[1.08] text-foreground",
              )}
              delay={55}
            />
            <div className={cn(editorialBody, "mt-8 space-y-5 md:mt-10")}>
              <p>
                Before there was an atelier, there were appointments in homes
                and offices — meeting clients personally, understanding their
                lives and creating garments around them.
              </p>
              <p>That personal relationship became the foundation of IL BIONDO.</p>
              <p>
                Today, our atelier in Amman continues the same philosophy:
                personal service, considered design and tailoring created around
                the individual.
              </p>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <EditorialImage
              src={MEDIA.library}
              alt="The IL BIONDO atelier"
              label="ATELIER IMAGE"
              ratio="editorial"
              parallax
            />
          </div>
        </div>
      </section>

      <section
        id="founders"
        className={cn(
          editorialGutter,
          "scroll-mt-24 overflow-x-clip pb-16 pt-6 md:scroll-mt-28 md:pb-24 md:pt-8",
        )}
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <EditorialLabel number="02">THE FOUNDERS</EditorialLabel>
          <SplitText
            text="THE FOUNDERS"
            tag="h2"
            className={cn(
              editorialDisplay,
              "text-[clamp(2.4rem,6vw,5.25rem)] uppercase",
            )}
            delay={80}
          />
        </div>

        <div className="mt-12 space-y-16 md:mt-16 md:space-y-24">
          <FounderSpread
            number="01"
            first="AMMAR"
            last="MEHYAR"
            role="Co-Founder"
            imageSrc={MEDIA.gloves}
            copy="Ammar brings together the client experience, fabric selection and the details that shape the IL BIONDO wardrobe."
          />
          <FounderSpread
            number="02"
            first="ALI"
            last="ALASHQAR"
            role="Co-Founder"
            imageSrc={MEDIA.armchair}
            copy="Ali's approach is rooted in personal service and an understanding of how tailoring should complement the individual rather than define him."
            reverse
          />
        </div>
      </section>

      <section
        id="philosophy"
        className={cn(editorialGutter, "scroll-mt-24 py-16 md:scroll-mt-28 md:py-28")}
      >
        <EditorialLabel number="03">OUR PHILOSOPHY</EditorialLabel>

        <div className="mt-8 space-y-2 md:mt-10 md:space-y-3">
          {["PERSONAL.", "PRECISE.", "TIMELESS."].map((word) => (
            <SplitText
              key={word}
              text={word}
              tag="h2"
              className={cn(
                editorialDisplay,
                "block text-[clamp(3rem,10vw,7.5rem)] uppercase",
              )}
              delay={70}
              threshold={0.12}
              from={{ opacity: 0, yPercent: 80 }}
            />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-3 gap-2 md:mt-14 md:gap-4">
          <EditorialImage
            src={MEDIA.chess}
            alt="Considered living"
            label="ATELIER STILL"
            ratio="portrait"
          />
          <EditorialImage
            src={MEDIA.bag}
            alt="The IL BIONDO wardrobe"
            label="ATELIER STILL"
            ratio="portrait"
            className="mt-8 md:mt-16"
          />
          <EditorialImage
            src={MEDIA.casino}
            alt="Private evenings"
            label="ATELIER STILL"
            ratio="portrait"
          />
        </div>

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12">
          <p
            className={cn(
              editorialDisplay,
              "text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.1] md:col-span-5",
            )}
          >
            We believe luxury is found in understanding.
          </p>
          <div className={cn(editorialBody, "space-y-4 md:col-span-5 md:col-start-8")}>
            <p>Understanding proportion.</p>
            <p>Understanding cloth.</p>
            <p>Understanding construction.</p>
            <p>And, above all, understanding the person.</p>
            <p>The result should never feel imposed.</p>
          </div>
        </div>

        <SplitText
          text="IT SHOULD SIMPLY FEEL YOURS."
          tag="p"
          className={cn(
            editorialDisplay,
            "mt-16 block text-[clamp(2.4rem,7vw,6rem)] uppercase md:mt-24",
          )}
          delay={70}
        />
      </section>
    </>
  );
}
