import type { Metadata } from "next";

import { PrimaryLink } from "@/components/shared/PrimaryLink";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="px-5 py-32 md:px-10 md:py-48">
      <p className="nav-label text-muted">404</p>
      <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl">
        This page is not part of the house.
      </h1>
      <p className="mt-8 max-w-md text-base leading-8 text-muted">
        The page you are looking for does not exist, or it has been moved.
      </p>
      <PrimaryLink href="/" className="mt-10">
        Return to IL BIONDO
      </PrimaryLink>
    </section>
  );
}
