import type { Metadata } from "next";

import { ServiceSection } from "@/components/services/ServiceSection";
import { PageHero } from "@/components/shared/PageHero";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From a single garment to a complete wardrobe, IL BIONDO services are designed around the individual.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="At your service">
        <p>
          From a single garment to a complete wardrobe, our services are
          designed around the individual.
        </p>
      </PageHero>
      {SERVICES.map((service, index) => (
        <ServiceSection key={service.id} index={index} {...service} />
      ))}
    </>
  );
}
