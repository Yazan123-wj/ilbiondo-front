import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceView } from "@/components/services/ServiceView";
import { getService, SERVICES } from "@/data/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    return { title: "Service" };
  }

  return {
    title: service.label,
    description: service.paragraphs[0],
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    notFound();
  }

  return <ServiceView service={service} />;
}
