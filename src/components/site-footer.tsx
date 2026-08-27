import Link from "next/link";

export const CONTACT_EMAIL = "oliverbryan.jm@gmail.com";

const elsewhere = [
  { href: "https://github.com/oliver-bryan", label: "GitHub" },
  { href: "https://www.linkedin.com/in/oliverbryan-jm", label: "LinkedIn" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--border)]">
      <div className="shell flex flex-wrap items-baseline justify-between gap-[var(--space-m)] py-[var(--space-xl)] text-[length:var(--text-sm)]">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-[var(--space-m)] gap-y-[var(--space-2xs)]">
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            {elsewhere.map(({ href, label }) => (
              <li key={href}>
                {/* External, so it opens in place unless the user chooses
                    otherwise; rel guards the new-tab case either way. */}
                <a href={href} rel="me noopener noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-[var(--muted)]">
          © {new Date().getFullYear()} Oliver Bryan
        </p>
      </div>
    </footer>
  );
}
