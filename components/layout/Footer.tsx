import Link from "next/link";

import { BrandMark } from "@/components/shared/BrandMark";
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
  { label: "Contact", href: "/contact" },
  { label: "Visit", href: "/visit" },
] as const;

const LEGAL = [
  { label: "The Journey", href: "/process" },
  { label: "Our Story", href: "/our-story" },
  { label: "Services", href: "/services" },
  { label: "Appointments", href: "/appointments" },
] as const;

export function Footer() {
  return (
    <footer className="overflow-x-clip bg-background px-5 pt-6 pb-6 md:px-8 md:pt-8 md:pb-7">
      <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <form
          action="/contact"
          method="get"
          className="w-full max-w-sm"
        >
          <label
            htmlFor="footer-email"
            className="block text-[10px] tracking-[0.2em] text-accent uppercase"
          >
            Stay in touch with the atelier
          </label>
          <div className="mt-4 flex items-center border-b border-foreground/35">
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

        <div className="flex flex-col items-start gap-5 md:items-end">
          <ul className="flex items-center gap-3">
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
          <ul className="flex flex-col items-start gap-2 md:items-end">
            {HOUSE_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-[11px] tracking-[0.04em] text-foreground/80 transition-colors hover:text-accent"
                >
                  {item.label}
                  <span className="ml-1.5 text-[10px]" aria-hidden>
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        href="/"
        className="mt-10 block w-[min(48vw,16rem)] text-accent md:mt-12 md:w-[14rem]"
      >
        <BrandMark />
      </Link>

      <div className="mt-4 flex flex-col gap-4 text-[10px] tracking-[0.04em] text-muted sm:flex-row sm:items-center sm:justify-between md:mt-2">
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {LEGAL.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="transition-colors hover:text-accent"
              >
                {item.label}
                <span className="ml-1 text-[8px]" aria-hidden>
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="sm:text-right">All Rights Reserved</p>
      </div>
    </footer>
  );
}
