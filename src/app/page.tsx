import Link from "next/link";
import { CONTACT_EMAIL } from "@/components/site-footer";

type DatePoint = { iso: string; label: string };

/**
 * Internship availability, taken from the CV. Set to `null` to hide the
 * element entirely.
 */
const AVAILABILITY: { start: DatePoint; end: DatePoint } | null = {
  start: { iso: "2026-09-07", label: "7 September" },
  end: { iso: "2026-12-11", label: "11 December 2026" },
};

const destinations = [
  { href: "/projects", label: "Projects" },
  { href: "/photography", label: "Photography" },
] as const;

export default function HomePage() {
  return (
    <section className="hero shell">
      {/* Top zone: the name, sized to run the width of the viewport. */}
      <div>
        <h1 className="hero-name">Oliver Bryan</h1>

        {/* Placeholder-free but plain: rewrite this line in your own voice. */}
        <p className="mt-[var(--space-m)] max-w-[38ch] text-[length:var(--text-lg)] leading-[var(--leading-snug)] text-[var(--muted)]">
          I build mobile and web applications, from Flutter clients to
          server-rendered Java systems.
        </p>
      </div>

      {/* Bottom zone: the practical detail, kept quiet against the name. */}
      <div className="flex flex-col gap-[var(--space-l)]">
        {AVAILABILITY ? (
          <p className="flex items-center gap-[var(--space-xs)] text-[length:var(--text-sm)]">
            <span
              aria-hidden="true"
              className="size-[0.5rem] shrink-0 rounded-full bg-[var(--accent)]"
            />
            <span>
              Available for an internship,{" "}
              <time dateTime={AVAILABILITY.start.iso}>
                {AVAILABILITY.start.label}
              </time>{" "}
              to{" "}
              <time dateTime={AVAILABILITY.end.iso}>
                {AVAILABILITY.end.label}
              </time>
            </span>
          </p>
        ) : null}

        <hr className="rule" />

        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-baseline gap-x-[var(--space-xl)] gap-y-[var(--space-s)]">
            {destinations.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[length:var(--text-xl)] leading-none font-semibold tracking-[var(--tracking-tight)] no-underline hover:text-[var(--accent-strong)]"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[length:var(--text-xl)] leading-none font-semibold tracking-[var(--tracking-tight)] no-underline hover:text-[var(--accent-strong)]"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
