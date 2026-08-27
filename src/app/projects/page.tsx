import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A mobile relocation platform, a crop-planning dashboard and a hospital asset tracker.",
};

type Project = {
  slug: string;
  title: string;
  tagline: string;
  stack: string[];
  body: string[];
  /** Only PackPals has a case study; the other two live entirely on the card. */
  href?: string;
};

const projects: Project[] = [
  {
    slug: "packpals",
    title: "PackPals",
    tagline: "Crowd-support travel logistics for out-of-state students",
    stack: ["Flutter", "Dart", "Firebase", "Google ML Kit"],
    body: [
      "A mobile platform matching students relocating between states with verified local hosts for transport, short-term accommodation and storage. Rule-based matching filters listings for feasibility before ranking them on location, budget and preference fit, with the resulting score shown to the student as a match quality percentage. Host identity is confirmed through an on-device liveness check and admin review. Tested with eight users across both roles, scoring 86.25 on the System Usability Scale.",
    ],
    href: "/projects/packpals",
  },
  {
    slug: "soil-crop-matching",
    title: "Soil-Crop Matching for Sustainable Agriculture",
    tagline: "An interactive dashboard for data-driven crop planning",
    stack: ["Python", "pandas", "Plotly", "Jupyter"],
    body: [
      "Two agricultural datasets covering 31 crop categories and 11 soil, climate, nutrient and fertilizer attributes, merged into a single queryable source. The hard part was reconciliation: the two schemas disagreed on structure and naming, so standardising them and verifying zero missing or duplicate records came before any analysis was trustworthy.",
      "The result is an interactive dashboard where selecting any of 11 crops updates three Plotly visualisations live, backed by five exploratory charts on soil type, pH, climate, N-P-K requirements and fertilizer usage. Built for a planner who needs an answer about one crop, not a researcher reading a report end to end.",
    ],
  },
  {
    slug: "healthcare-equipment-management",
    title: "Healthcare Equipment Management System",
    tagline: "An MVC enterprise web application for hospital asset tracking",
    stack: ["Java", "Jakarta EE", "JDBC", "Apache Derby", "GlassFish"],
    body: [
      "A server-rendered system for managing medical equipment across three modules: inventory, maintenance scheduling and reservations. Twelve JSP views and twelve servlet controllers sit over four JavaBean models and four DAO components, keeping presentation, business logic and data access cleanly separated rather than letting database calls leak into the view layer.",
      "Staff authenticate through session-based login, with full CRUD and status filtering on every module. The dashboard aggregates totals, status distribution and recent activity so the state of the equipment pool is legible at a glance. Built on the older Jakarta EE stack deliberately, which meant handling the wiring that modern frameworks abstract away.",
    ],
  },
];

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
