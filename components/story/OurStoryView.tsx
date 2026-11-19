"use client";

import { SplitText } from "@/components/bits/SplitText";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { EditorialLabel } from "@/components/editorial/EditorialLabel";
import {
  band,
  editorialBody,
  editorialBodyLight,
  editorialDisplay,
  editorialGutter,
} from "@/components/editorial/styles";
import { EditorialImage } from "@/components/shared/EditorialImage";
import { MEDIA } from "@/data/editorial-media";
import { cn } from "@/lib/utils";

const STORY_BEATS = [
  {
    label: "The beginning",
    image: MEDIA.library,
    alt: "The first conversations",
    copy: [
      "Before there was an atelier, there were appointments in homes and offices — meeting clients personally, understanding their lives and creating garments around them.",
    ],
  },
  {
    label: "The house",
    image: MEDIA.chess,
    alt: "A personal relationship with the house",
    copy: [
      "That personal relationship became the foundation of IL BIONDO.",
    ],
  },
  {
    label: "Amman",
    image: MEDIA.elevator,
    alt: "The IL BIONDO atelier in Amman",
    copy: [
      "Today, our atelier in Amman continues the same philosophy: personal service, considered design and tailoring created around the individual.",
    ],
  },
  {
    label: "The individual",
    image: MEDIA.oxfords,
    alt: "Tailoring around the individual",
    copy: [
      "The best tailoring starts by knowing the person who will wear it.",
    ],
  },
  {
    label: "Made for one",
    image: MEDIA.gloves,
    alt: "A garment made for one",
    copy: [
      "IL BIONDO is the atelier where a garment is cut, fitted and finished around one person. Cloth, proportion and detail are chosen with you — then made by hand until the suit is yours.",
    ],
  },
] as const;

function StoryBeat({
  label,
  image,
  alt,
  copy,
  reverse,
  accent,
}: {
  label: string;
  image: string;
  alt: string;
  copy: readonly string[];
  reverse?: boolean;
  accent?: boolean;
}) {
  return (
    <article className="grid items-center gap-8 py-12 md:grid-cols-12 md:gap-10 md:py-16">
      <div
        className={cn(
          "md:col-span-6",
          reverse && "md:col-start-7 md:row-start-1",
        )}
      >
        <EditorialImage
          src={image}
          alt={alt}
          label="ATELIER STILL"
          ratio="editorial"
          parallax
        />
      </div>
      <div
        className={cn(
          "md:col-span-5",
          reverse ? "md:col-start-1 md:row-start-1" : "md:col-start-8",
        )}
      >
        <p
          className={cn(
            "text-[11px] tracking-[0.22em] uppercase",
            accent ? "text-background/70" : "text-accent",
          )}
        >
          {label}
        </p>
        <div
          className={cn(
            accent ? editorialBodyLight : editorialBody,
            "mt-5 space-y-5",
          )}
        >
          {copy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
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
        lines={["Built around", "the individual."]}
        image={{
          src: MEDIA.hero,
          alt: "IL BIONDO house",
          label: "ATELIER IMAGE",
          ratio: "portrait",
        }}
      />

      {STORY_BEATS.map((beat, index) => {
        const accent =
          beat.label === "The house" || beat.label === "Made for one";
        return (
          <section
            key={beat.label}
            className={cn(
              editorialGutter,
              accent ? "bg-accent text-background" : band(index),
              "py-8 md:py-4",
            )}
          >
            <StoryBeat {...beat} reverse={index % 2 === 1} accent={accent} />
          </section>
        );
      })}

      <section
        id="founders"
        className={cn(
          editorialGutter,
          band(STORY_BEATS.length),
          "scroll-mt-24 overflow-x-clip pb-16 pt-10 md:scroll-mt-28 md:pb-24 md:pt-16",
        )}
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <EditorialLabel number="02">THE FOUNDER</EditorialLabel>
          <SplitText
            text="The founder"
            tag="h2"
            className={cn(
              editorialDisplay,
              "text-[clamp(2.2rem,5vw,4.4rem)]",
            )}
            delay={80}
          />
        </div>

        <div className="mt-12 md:mt-16">
          <article className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <EditorialImage
                src={MEDIA.armchair}
                alt="Ali Alashqar"
                label="ATELIER STILL"
                ratio="portrait"
                parallax
              />
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <SplitText
                text="Ali Alashqar"
                tag="h3"
                className={cn(
                  editorialDisplay,
                  "block text-[clamp(2.1rem,4.2vw,3.6rem)]",
                )}
                delay={60}
              />
              <p className="mt-4 text-[11px] tracking-[0.22em] text-muted uppercase">
                Founder
              </p>
              <p className={cn(editorialBody, "mt-5")}>
                Ali's approach is rooted in personal service and an understanding
                of how tailoring should complement the individual rather than
                define him.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section
        id="philosophy"
        className={cn(
          editorialGutter,
          band(STORY_BEATS.length + 1),
          "scroll-mt-24 py-16 md:scroll-mt-28 md:py-28",
        )}
      >
        <EditorialLabel number="03">OUR PHILOSOPHY</EditorialLabel>

        <div className="mt-8 space-y-2 md:mt-10 md:space-y-3">
          {["Personal.", "Precise.", "Timeless."].map((word) => (
            <SplitText
              key={word}
              text={word}
              tag="h2"
              className={cn(
                editorialDisplay,
                "block text-[clamp(2.6rem,8vw,6rem)]",
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
          <div
            className={cn(
            editorialBody,
            "space-y-4 md:col-span-5 md:col-start-8",
            )}
          >
            <p>Understanding proportion.</p>
            <p>Understanding cloth.</p>
            <p>Understanding construction.</p>
            <p>And, above all, understanding the person.</p>
            <p>The result should never feel imposed.</p>
          </div>
        </div>

        <SplitText
          text="It should simply feel yours."
          tag="p"
          className={cn(
            editorialDisplay,
            "mt-16 block text-[clamp(2rem,5vw,4.4rem)] md:mt-24",
          )}
          delay={70}
        />
      </section>
    </>
  );
}
