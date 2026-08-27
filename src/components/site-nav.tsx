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
    <header className="shell flex h-[var(--nav-h)] items-center justify-between gap-[var(--space-l)]">
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
    </header>
  );
}
