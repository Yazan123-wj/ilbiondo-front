import Link from "next/link";

import { ContactForm } from "@/components/contact/ContactForm";
import { EditorialLabel } from "@/components/editorial/EditorialLabel";
import {
  editorialBody,
  editorialDisplay,
  editorialGutter,
} from "@/components/editorial/styles";
import { CONTACT } from "@/lib/contact";
import { cn } from "@/lib/utils";

type ContactAction = {
  label: string;
  href: string;
  external?: boolean;
};

const ACTIONS: ContactAction[] = [
  {
    label: "Book an Appointment",
    href: "/appointments",
  },
  {
    label: "WhatsApp",
    href: CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}` : "",
    external: true,
  },
  {
    label: "Call the Atelier",
    href: CONTACT.phone ? `tel:${CONTACT.phone}` : "",
    external: true,
  },
  {
    label: "Email IL BIONDO",
    href: CONTACT.email ? `mailto:${CONTACT.email}` : "",
    external: true,
  },
  {
    label: "Visit Us",
    href: "/visit",
  },
].filter((action) => Boolean(action.href));

export function ContactView() {
  return (
    <>
      <section
        className={cn(
          editorialGutter,
          "bg-background pb-16 pt-28 md:pb-24 md:pt-36",
        )}
      >
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <EditorialLabel number="01">THE HOUSE</EditorialLabel>
            <h1
              className={cn(
                editorialDisplay,
                "mt-6 text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.04] tracking-[-0.03em]",
              )}
            >
              At your
              <br />
              service.
            </h1>
            <p className={cn(editorialBody, "mt-8")}>
              Whether you are beginning your first IL BIONDO garment, preparing
              for a wedding or simply wish to speak with our team, we would be
              pleased to hear from you.
            </p>

            <div className="mt-12 border-t border-border pt-8">
              <p className="text-[11px] tracking-[0.22em] text-accent uppercase">
                {CONTACT.atelierName}
              </p>
              <p className="mt-4 font-serif text-[clamp(1.4rem,2.4vw,1.85rem)] leading-[1.2]">
                {CONTACT.addressLine1}
                <br />
                {CONTACT.addressLine2}
              </p>
              <dl className="mt-8 space-y-3 text-sm leading-7 text-muted">
                {CONTACT.hours.map((entry) => (
                  <div key={entry.days} className="flex flex-col gap-0.5">
                    <dt className="font-serif text-foreground">{entry.days}</dt>
                    <dd>{entry.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <ContactForm />
          </div>
        </div>
      </section>

      <section
        className={cn(
          editorialGutter,
          "bg-accent pb-20 pt-16 text-background md:pb-28 md:pt-20",
        )}
      >
        <p className="text-[11px] tracking-[0.22em] text-background/60 uppercase">
          Contact / IL BIONDO
        </p>
        <ul className="mt-8">
          {ACTIONS.map((action, index) => {
            const number = String(index + 1).padStart(2, "0");
            const inner = (
              <>
                <span className="flex min-w-0 items-baseline gap-6 md:gap-16">
                  <span className="font-serif text-sm tracking-[0.12em] text-background/50">
                    {number}
                  </span>
                  <span className="font-serif text-[clamp(1.7rem,3.5vw,2.9rem)] leading-none tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-1">
                    {action.label}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-lg transition-transform duration-300 group-hover:translate-x-2"
                >
                  →
                </span>
              </>
            );

            const rowClass =
              "group flex items-center justify-between gap-6 border-b border-background/20 py-6 transition-colors duration-300 hover:border-background md:py-8";

            if (action.external) {
              return (
                <li key={action.label}>
                  <a href={action.href} className={rowClass}>
                    {inner}
                  </a>
                </li>
              );
            }

            return (
              <li key={action.label}>
                <Link href={action.href} className={rowClass}>
                  {inner}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
