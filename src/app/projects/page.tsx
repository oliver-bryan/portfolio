import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

const description =
  "A mobile relocation platform, a crop-planning dashboard and a hospital asset tracker.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    title: "Projects · Oliver Bryan",
    description,
    url: "/projects",
    // opengraph-image.tsx only covers its own segment, so nested routes have to
    // point at it explicitly or they ship with no card image at all.
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects · Oliver Bryan",
    description,
    images: ["/opengraph-image"],
  },
};

export default function ProjectsPage() {
  return (
    <section className="shell page">
      <h1>Projects</h1>

      <ol className="mt-[var(--space-2xl)]">
        {projects.map((project) => {
          const body = (
            <article className="grid gap-[var(--space-m)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-[var(--space-xl)]">
              <div>
                <h2 className="entry-title">{project.title}</h2>
                <p className="mt-[var(--space-s)] text-[length:var(--text-md)] leading-[var(--leading-snug)] text-[var(--muted)]">
                  {project.tagline}
                </p>
              </div>

              <div>
                {project.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="max-w-[var(--measure)] not-first:mt-[var(--space-m)]"
                  >
                    {paragraph}
                  </p>
                ))}

                <h3 className="mt-[var(--space-l)] text-[length:var(--text-xs)] font-semibold tracking-[var(--tracking-wide)] text-[var(--muted)]">
                  Built with
                </h3>
                <ul className="mt-[var(--space-2xs)] flex flex-wrap gap-x-[var(--space-s)] gap-y-[var(--space-2xs)] text-[length:var(--text-sm)] text-[var(--muted)]">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                {project.href ? (
                  <p className="mt-[var(--space-l)]">
                    <span className="entry-more">
                      Read the full case study{" "}
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </p>
                ) : null}
              </div>
            </article>
          );

          return (
            <li key={project.slug} className="entry">
              {project.href ? (
                <Link href={project.href} className="entry-link">
                  {body}
                </Link>
              ) : (
                body
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
