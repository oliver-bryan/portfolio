"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/photography", label: "Photography" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--border)]">
      <div className="mx-auto flex w-full max-w-[calc(52rem+var(--gutter)*2)] items-center justify-between gap-[var(--space-l)] px-[var(--gutter)] py-[var(--space-m)]">
        <nav>
          <ul className="flex items-center gap-[var(--space-m)] text-[length:var(--text-sm)]">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className="text-[var(--muted)] no-underline transition-colors hover:text-[var(--ink)] aria-[current=page]:text-[var(--ink)]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
