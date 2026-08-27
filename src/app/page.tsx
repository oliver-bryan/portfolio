import Link from "next/link";
import { CONTACT_EMAIL } from "@/components/site-footer";

/**
 * Internship availability, taken from the CV. Set to `null` to hide the
 * element entirely.
 *
 * The CV says "at least 14 weeks ... with flexibility to extend"; the hero
 * carries the window only, since the range already implies the duration.
 */
type DatePoint = { iso: string; label: string };

const AVAILABILITY: { start: DatePoint; end: DatePoint } | null = {
  start: { iso: "2026-09-07", label: "7 September" },
  end: { iso: "2026-12-11", label: "11 December 2026" },
};

export default function HomePage() {
  return (
    <section className="page">
      <div className="max-w-[var(--measure-wide)]">
        {/* Hero copy: replace this heading and the line beneath it with the
            copy you meant to paste. */}
        <h1 className="text-[length:var(--text-5xl)]">Oliver Bryan</h1>

        <p className="mt-[var(--space-m)] max-w-[var(--measure)] text-[length:var(--text-xl)] leading-[var(--leading-snug)] text-[var(--muted)]">
          I build mobile and web applications, from Flutter clients to
          server-rendered Java systems.
        </p>

        {AVAILABILITY ? (
          <p className="mt-[var(--space-l)] grid grid-cols-[auto_1fr] items-baseline gap-x-[var(--space-xs)] text-[length:var(--text-sm)]">
            <span
              aria-hidden="true"
              className="size-[0.5rem] translate-y-[-0.15em] rounded-full bg-[var(--accent)]"
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

        <nav aria-label="Primary" className="mt-[var(--space-xl)]">
          <ul className="flex flex-wrap gap-x-[var(--space-l)] gap-y-[var(--space-xs)] text-[length:var(--text-lg)]">
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/photography">Photography</Link>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
