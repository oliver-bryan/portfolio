import Link from "next/link";

export const CONTACT_EMAIL = "oliverbryan.jm@gmail.com";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--border)]">
      <div className="mx-auto flex w-full max-w-[calc(52rem+var(--gutter)*2)] flex-wrap items-baseline justify-between gap-[var(--space-m)] px-[var(--gutter)] py-[var(--space-xl)] text-[length:var(--text-sm)]">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-[var(--space-m)] gap-y-[var(--space-2xs)]">
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/photography">Photography</Link>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
          </ul>
        </nav>
        <p className="text-[var(--muted)]">
          © {new Date().getFullYear()} Oliver Bryan
        </p>
      </div>
    </footer>
  );
}
