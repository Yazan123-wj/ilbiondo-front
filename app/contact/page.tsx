import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/shared/PageHero";
import { CONTACT } from "@/lib/contact";

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
      <PageHero title="At your service.">
        <p>
          Whether you are beginning your first IL BIONDO garment, preparing for
          a wedding or simply wish to speak with our team, we would be pleased
          to hear from you.
        </p>
      </PageHero>
      <section className="px-5 pb-24 md:px-10 md:pb-36">
        <ul className="max-w-xl space-y-6">
          {ACTIONS.map((action) => (
            <li key={action.label} className="border-b border-border pb-6">
              {action.href && action.external ? (
                <a
                  href={action.href}
                  className="font-serif text-3xl tracking-tight transition-colors hover:text-accent md:text-4xl"
                >
                  {action.label}
                </a>
              ) : action.href ? (
                <Link
                  href={action.href}
                  className="font-serif text-3xl tracking-tight transition-colors hover:text-accent md:text-4xl"
                >
                  {action.label}
                </Link>
              ) : (
                <span className="font-serif text-3xl tracking-tight text-muted md:text-4xl">
                  {action.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
