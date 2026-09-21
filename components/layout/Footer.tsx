import Link from "next/link";

import { CONTACT } from "@/lib/contact";

const SOCIALS = [
  {
    label: "Instagram",
    href: CONTACT.instagramUrl,
    external: true,
  },
  {
    label: "Contact",
    href: "/contact",
    external: false,
  },
  {
    label: "Visit",
    href: "/visit",
    external: false,
  },
] as const;

const LEGAL = [
  { label: "Process", href: "/process" },
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

        <ul className="flex flex-col items-start gap-2 md:items-end">
          {SOCIALS.filter((item) => item.href).map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
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

      <Link
        href="/"
        className="mt-10 block font-serif text-[22vw] leading-[0.72] tracking-[-0.055em] text-accent uppercase md:mt-12 md:text-[18.5vw]"
      >
        IL BIONDO
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
