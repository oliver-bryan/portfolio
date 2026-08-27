import Image from "next/image";
import Link from "next/link";
import { featuredProject, otherProjects } from "@/lib/projects";
import { availability, site } from "@/lib/site";

/** The match-quality screen: the one shot that shows what PackPals actually does. */
const FEATURED_SHOT = {
  src: "/images/packpals/available-matches.png",
  width: 3041,
  height: 3248,
  alt: "PackPals ranked match list, each host showing a match quality bar as a percentage, beside a listing detail screen.",
};

export default function HomePage() {
  return (
    <>
      <section className="hero shell">
        <div>
          <h1 className="hero-name">{site.name}</h1>

          <p className="mt-[var(--space-m)] max-w-[26ch] text-[length:var(--text-xl)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] font-semibold text-balance">
            {site.headline}
          </p>

          <p className="mt-[var(--space-s)] max-w-[54ch] text-[length:var(--text-base)] leading-[var(--leading-snug)] text-[var(--muted)]">
            {site.standfirst}
          </p>
        </div>

        <div className="flex flex-col gap-[var(--space-s)]">
          <div className="flex flex-wrap items-center gap-x-[var(--space-l)] gap-y-[var(--space-xs)] text-[length:var(--text-sm)]">
            {availability ? (
              <p className="flex items-center gap-[var(--space-xs)]">
                <span
                  aria-hidden="true"
                  className="size-[0.5rem] shrink-0 rounded-full bg-[var(--accent)]"
                />
                <span>
                  Available for an internship,{" "}
                  <time dateTime={availability.start.iso}>
                    {availability.start.label}
                  </time>{" "}
                  to{" "}
                  <time dateTime={availability.end.iso}>
                    {availability.end.label}
                  </time>
                </span>
              </p>
            ) : null}

            {/* Secondary to the availability line: same row, muted, no accent.
                Opens the PDF in a new tab rather than downloading it. */}
            <a
              href={site.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              View CV <span aria-hidden="true">(PDF)</span>
            </a>
          </div>

          <hr className="rule" />
        </div>
      </section>

      <section className="shell page" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="sr-only">
          Featured work
        </h2>

        <article className="grid items-center gap-[var(--space-xl)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          {/* Image first in the source on wide screens via order, but after the
              heading on narrow ones, so the section still reads title-first. */}
          <div className="lg:order-2">
            <Image
              src={FEATURED_SHOT.src}
              width={FEATURED_SHOT.width}
              height={FEATURED_SHOT.height}
              alt={FEATURED_SHOT.alt}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="h-auto w-full rounded-[6px] border border-[var(--border)] bg-[var(--surface)]"
            />
          </div>

          <div className="lg:order-1">
            <h3 className="entry-title">{featuredProject.title}</h3>
            <p className="mt-[var(--space-s)] text-[length:var(--text-md)] leading-[var(--leading-snug)] text-[var(--muted)]">
              {featuredProject.tagline}
            </p>

            <p className="mt-[var(--space-m)] max-w-[var(--measure)]">
              {featuredProject.body[0]}
            </p>

            <h4 className="mt-[var(--space-l)] text-[length:var(--text-xs)] font-semibold tracking-[var(--tracking-wide)] text-[var(--muted)]">
              Built with
            </h4>
            <ul className="mt-[var(--space-2xs)] flex flex-wrap gap-x-[var(--space-s)] gap-y-[var(--space-2xs)] text-[length:var(--text-sm)] text-[var(--muted)]">
              {featuredProject.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>

            <p className="mt-[var(--space-l)]">
              <Link
                href={featuredProject.href ?? "/projects"}
                className="entry-more"
              >
                Read the full case study{" "}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </p>
          </div>
        </article>

        <h2 className="mt-[var(--space-2xl)] text-[length:var(--text-xs)] font-semibold tracking-[var(--tracking-wide)] text-[var(--muted)]">
          Also
        </h2>

        <ul className="mt-[var(--space-s)]">
          {otherProjects.map((project) => (
            <li
              key={project.slug}
              className="flex flex-wrap items-baseline justify-between gap-x-[var(--space-l)] gap-y-[var(--space-2xs)] border-t border-[var(--border)] py-[var(--space-m)] last:border-b"
            >
              <div>
                <h3 className="text-[length:var(--text-lg)] leading-[var(--leading-snug)] font-semibold tracking-[var(--tracking-tight)]">
                  {project.title}
                </h3>
                <p className="mt-[var(--space-3xs)] text-[length:var(--text-sm)] text-[var(--muted)]">
                  {project.tagline}
                </p>
              </div>
              <ul className="flex flex-wrap gap-x-[var(--space-s)] text-[length:var(--text-sm)] text-[var(--muted)]">
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className="mt-[var(--space-l)]">
          <Link href="/projects" className="entry-more">
            All projects <span aria-hidden="true">&rarr;</span>
          </Link>
        </p>
      </section>
    </>
  );
}
