import { MEDIA } from "@/data/editorial-media";
import { cn } from "@/lib/utils";

const STILLS = [
  { src: MEDIA.chess, alt: "IL BIONDO atelier still", className: "min-h-[70vh] md:col-span-7 md:row-span-2 md:min-h-0 md:h-full" },
  { src: MEDIA.armchair, alt: "IL BIONDO atelier still", className: "aspect-[4/5] md:col-span-5" },
  { src: MEDIA.bag, alt: "IL BIONDO atelier still", className: "aspect-[4/5] md:col-span-5" },
  { src: MEDIA.gloves, alt: "IL BIONDO atelier still", className: "aspect-[4/5] md:col-span-4" },
  { src: MEDIA.oxfords, alt: "IL BIONDO atelier still", className: "aspect-[4/5] md:col-span-4" },
  { src: MEDIA.elevator, alt: "IL BIONDO atelier still", className: "aspect-[4/5] md:col-span-4" },
  { src: MEDIA.library, alt: "IL BIONDO atelier still", className: "aspect-[3/2] md:col-span-6" },
  { src: MEDIA.casino, alt: "IL BIONDO atelier still", className: "aspect-[3/2] md:col-span-6" },
] as const;

export function HomeGallery() {
  return (
    <section className="bg-background px-4 py-8 md:px-8 md:py-12">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-12 md:grid-rows-[auto_auto_auto] md:gap-3">
        {STILLS.map((still) => (
          <div
            key={still.src}
            className={cn("relative overflow-hidden bg-surface", still.className)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={still.src}
              alt={still.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
