import { EditorialImage } from "@/components/shared/EditorialImage";

type FounderProfileProps = {
  name: string;
  role: string;
  copy: string;
  imageSrc: string;
};

export function FounderProfile({
  name,
  role,
  copy,
  imageSrc,
}: FounderProfileProps) {
  return (
    <article className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end md:gap-12">
      <EditorialImage
        src={imageSrc}
        alt={name}
        label="Founder portrait"
        ratio="portrait"
      />
      <div>
        <h3 className="font-serif text-4xl tracking-tight md:text-5xl">{name}</h3>
        <p className="mt-3 nav-label text-muted">{role}</p>
        <p className="mt-6 max-w-md text-base leading-8 text-muted">{copy}</p>
      </div>
    </article>
  );
}
