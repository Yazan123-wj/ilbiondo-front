import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact/ContactForm";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { editorialGutter } from "@/components/editorial/styles";
import { CONTACT } from "@/lib/contact";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak with the IL BIONDO team in Amman — whether beginning a first garment, preparing for a wedding, or visiting the atelier.",
};

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
];

export default function ContactPage() {
  return (
    <>
      <EditorialHero
        number="01"
        eyebrow="THE HOUSE"
        lines={["AT YOUR", "SERVICE."]}
        lede={
          <p>
            Whether you are beginning your first IL BIONDO garment, preparing
            for a wedding or simply wish to speak with our team, we would be
            pleased to hear from you.
          </p>
        }
        meta="CONTACT / IL BIONDO"
        compact
        align="start"
        aside={<ContactForm />}
      />
      <section className={cn(editorialGutter, "pt-16 pb-24 md:pt-28 md:pb-36")}>
        <ul>
          {ACTIONS.map((action, index) => {
            const number = String(index + 1).padStart(2, "0");
            const inner = (
              <>
                <span className="flex min-w-0 items-baseline gap-6 md:gap-16">
                  <span className="font-serif text-sm tracking-[0.12em] text-muted">
                    {number}
                  </span>
                  <span className="font-serif text-[clamp(1.6rem,3.5vw,2.75rem)] leading-none tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-1">
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
              "group flex items-center justify-between gap-6 border-b border-accent/15 py-7 transition-colors duration-300 hover:border-accent md:py-9";

            if (action.href && action.external) {
              return (
                <li key={action.label}>
                  <a href={action.href} className={rowClass}>
                    {inner}
                  </a>
                </li>
              );
            }

            if (action.href) {
              return (
                <li key={action.label}>
                  <Link href={action.href} className={rowClass}>
                    {inner}
                  </Link>
                </li>
              );
            }

            return (
              <li key={action.label}>
                <div className={cn(rowClass, "pointer-events-none opacity-45")}>
                  {inner}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
