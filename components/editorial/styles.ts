export const editorialGutter = "px-5 md:px-8 lg:px-12";

export function band(index: number) {
  return index % 2 === 0 ? "bg-surface" : "bg-background";
}

export const editorialDisplay =
  "font-serif font-normal tracking-[-0.035em] leading-[0.9]";

export const editorialBody =
  "max-w-[34rem] font-sans text-base leading-8 text-muted md:text-lg md:leading-9";

export const editorialBodyLight =
  "max-w-[34rem] font-sans text-base leading-8 text-background/90 md:text-lg md:leading-9";
