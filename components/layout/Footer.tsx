import type { ReactNode } from "react";
import Link from "next/link";

import { BrandMark } from "@/components/shared/BrandMark";
import { NAV_GROUPS } from "@/data/navigation";
import { CONTACT } from "@/lib/contact";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="currentColor"
      aria-hidden
    >
      <path d="M14.2 21v-7.2h2.4l.36-2.8h-2.76V9.2c0-.8.22-1.36 1.38-1.36H17V5.32C16.66 5.28 15.7 5.2 14.6 5.2c-2.3 0-3.86 1.4-3.86 4v1.8H8.4v2.8h2.34V21h3.46Z" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "Instagram",
    href: CONTACT.instagramUrl,
    icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: CONTACT.facebookUrl,
    icon: FacebookIcon,
  },
] as const;

const HOUSE_LINKS = [
  { label: "Our Story", href: "/our-story" },
  { label: "Services", href: "/services" },
  { label: "IL Biondo Club", href: "/club" },
  { label: "Appointments", href: "/appointments" },
] as const;

const JOURNEY_LINKS =
  NAV_GROUPS.find((group) => group.id === "the-journey")?.items ?? [];

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="nav-label text-accent">{title}</p>
      {children}
    </div>
  );
}

function FooterLinks({
  items,
}: {
  items: readonly { label: string; href: string }[];
}) {
  return (
    <ul className="mt-5 flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="text-[13px] leading-6 text-foreground/80 transition-colors hover:text-accent"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="overflow-x-clip border-t border-foreground/10 bg-background px-5 pt-14 pb-8 md:px-10 md:pt-16 md:pb-10">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-0">
        <div>
          <Link href="/" className="block w-[8.5rem] text-accent md:w-36">
            <BrandMark />
          </Link>
          <form action="/contact" method="get" className="mt-8 max-w-xs">
            <label
              htmlFor="footer-email"
              className="block text-[10px] tracking-[0.2em] text-accent uppercase"
            >
              Stay in touch with the atelier
            </label>
            <div className="mt-3 flex items-center border-b border-foreground/35">
              <input
                id="footer-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Email address"
                className="w-full bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                className="shrink-0 px-1 py-2 text-lg leading-none text-accent transition-opacity hover:opacity-50"
                aria-label="Continue"
              >
                →
              </button>
            </div>
          </form>
        </div>

        <FooterCol title="The House">
          <FooterLinks items={HOUSE_LINKS} />
        </FooterCol>

        <FooterCol title="The Journey">
          <FooterLinks items={JOURNEY_LINKS} />
        </FooterCol>

        <FooterCol title="The Atelier">
          <p className="mt-5 font-sans text-[13px] leading-7 text-muted">
            {CONTACT.atelierName}
            <br />
            {CONTACT.addressLine1}
            <br />
            {CONTACT.addressLine2}
          </p>
          <FooterLinks
            items={[
              { label: "Visit the atelier", href: "/visit" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          <ul className="mt-6 flex items-center gap-1">
            {SOCIALS.filter((item) => item.href).map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="inline-flex h-10 w-10 items-center justify-center text-foreground/80 transition-colors hover:text-accent"
                  >
                    <Icon />
                  </Link>
                </li>
              );
            })}
          </ul>
        </FooterCol>
      </div>

      <div className="mt-14 flex flex-col gap-3 border-t border-foreground/10 pt-6 text-[10px] tracking-[0.08em] text-muted uppercase sm:flex-row sm:items-center sm:justify-between">
        <p>Amman, Jordan</p>
        <p className="normal-case tracking-[0.04em]">
          Music:{" "}
          <a
            href="https://incompetech.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            Lobby Time — Kevin MacLeod
          </a>
        </p>
        <p>All Rights Reserved</p>
      </div>
    </footer>
  );
}
