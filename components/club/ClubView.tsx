"use client";

import Link from "next/link";

import { CountUp } from "@/components/bits/CountUp";
import { SplitText } from "@/components/bits/SplitText";
import { ExperienceSection } from "@/components/club/ExperienceSection";
import { MembershipSection } from "@/components/club/MembershipSection";
import { EditorialCTA } from "@/components/editorial/EditorialCTA";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { EditorialRule } from "@/components/editorial/EditorialRule";
import {
  editorialDisplay,
  editorialGutter,
} from "@/components/editorial/styles";
import { EditorialImage } from "@/components/shared/EditorialImage";
import { CLUB_PRIVILEGES } from "@/data/club";
import { MEDIA, PRIVILEGE_IMAGES } from "@/data/editorial-media";
import { cn } from "@/lib/utils";

export function ClubView() {
  return (
    <>
      <EditorialHero
        lines={["THE ART", "OF BELONGING."]}
        image={{
          src: MEDIA.casino,
          alt: "IL BIONDO Club",
          label: "ATELIER IMAGE",
          ratio: "portrait",
        }}
        lede={
          <>
            <p>
              IL BIONDO Club is our private circle — created for clients who see
              tailoring not simply as clothing, but as part of the way they
              live.
            </p>
            <p className="mt-5">
              Membership brings you closer to the atelier, with early access,
              private services and experiences reserved for our members.
            </p>
            <EditorialCTA href="#membership" className="mt-10">
              Join IL BIONDO Club
            </EditorialCTA>
          </>
        }
      />

      <section className={cn(editorialGutter, "py-16 md:py-28")}>
        <div>
          <p className="text-[11px] tracking-[0.22em] text-accent uppercase">
            The Privileges
          </p>
          <SplitText
            text="MORE THAN MEMBERSHIP."
            tag="h2"
            className={cn(
              editorialDisplay,
              "mt-6 block text-[clamp(2.2rem,5vw,4.4rem)] uppercase md:mt-8",
            )}
            delay={70}
          />
        </div>

        <ol className="mt-12 divide-y divide-accent/10 border-y border-accent/10 md:mt-16">
          {CLUB_PRIVILEGES.map((privilege, index) => (
            <li key={privilege.title}>
              <Link
                href={
                  privilege.id
                    ? `/club/privileges#${privilege.id}`
                    : "/club/privileges"
                }
                className="group grid gap-4 py-8 md:grid-cols-12 md:items-end md:gap-8 md:py-10"
              >
                <CountUp
                  to={index + 1}
                  className="font-serif text-2xl tracking-tight text-accent md:col-span-1 md:text-3xl"
                />
                <h3
                  className={cn(
                    editorialDisplay,
                    "text-[clamp(1.7rem,3vw,2.4rem)] uppercase transition-colors duration-300 group-hover:text-accent md:col-span-4",
                  )}
                >
                  {privilege.title}
                </h3>
                <p className="max-w-xl text-base leading-8 text-muted md:col-span-6 md:col-start-7 md:text-lg md:leading-9">
                  {privilege.paragraphs[0]}
                </p>
              </Link>
            </li>
          ))}
        </ol>

        <EditorialCTA href="/club/privileges" className="mt-10">
          Discover the Privileges
        </EditorialCTA>

        <div className="mt-14 grid grid-cols-3 gap-2 md:mt-20 md:gap-4">
          <EditorialImage
            src={PRIVILEGE_IMAGES[0]}
            alt="First to Know"
            label="ATELIER STILL"
            ratio="portrait"
          />
          <EditorialImage
            src={PRIVILEGE_IMAGES[2]}
            alt="Member Tailoring"
            label="ATELIER STILL"
            ratio="portrait"
            className="mt-8 md:mt-16"
          />
          <EditorialImage
            src={PRIVILEGE_IMAGES[3]}
            alt="Private Styling"
            label="ATELIER STILL"
            ratio="portrait"
          />
        </div>
      </section>

      <MembershipSection />

      <ExperienceSection />

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
          Every IL BIONDO journey
          <br />
          begins with a conversation.
        </h2>
        <EditorialCTA href="/appointments" className="mt-10">
          Book an Appointment
        </EditorialCTA>
      </section>
    </>
  );
}
