import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photography",
  description: "Photographs by Oliver Bryan.",
};

export default function PhotographyPage() {
  return (
    <section className="page wide">
      <h1>Photography</h1>

      {/*
        Images go here, one <li> each.

        The grid is orientation-agnostic: `auto-fit` sizes the columns, and
        `items-start` lets each row size to its own content, so a portrait frame
        simply runs taller than a landscape one beside it. Give each <Image> its
        real width and height plus `className="h-auto w-full"` to keep the
        intrinsic aspect ratio and reserve the box before load:

        <li>
          <figure>
            <Image
              src="/images/photography/<file>.jpg"
              width={<real width>}
              height={<real height>}
              alt="<what is in the frame>"
              sizes="(min-width: 1200px) 25rem, (min-width: 640px) 45vw, 100vw"
              className="h-auto w-full"
            />
            <figcaption>Optional caption.</figcaption>
          </figure>
        </li>
      */}
      <ul className="mt-[var(--space-2xl)] grid grid-cols-[repeat(auto-fit,minmax(min(20rem,100%),1fr))] items-start gap-[var(--space-m)]"></ul>
    </section>
  );
}
