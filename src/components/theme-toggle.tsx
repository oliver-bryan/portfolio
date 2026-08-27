"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const noopSubscribe = () => () => {};

/** False during the server pass and first render, true once hydrated. */
function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The resolved theme is only known on the client, so render a stable
  // placeholder on the server pass to keep hydration quiet.
  const hydrated = useHydrated();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      aria-pressed={hydrated ? isDark : undefined}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full border border-[var(--border)] px-[var(--space-s)] py-[var(--space-2xs)] text-[length:var(--text-xs)] text-[var(--muted)] transition-colors hover:border-[var(--muted)] hover:text-[var(--ink)]"
    >
      {/* Width is reserved by the widest label so the nav does not reflow
          when the resolved theme arrives on hydration. */}
      <span className="grid">
        <span className="invisible col-start-1 row-start-1" aria-hidden="true">
          Light
        </span>
        <span className="col-start-1 row-start-1">
          {hydrated ? (isDark ? "Light" : "Dark") : ""}
        </span>
      </span>
    </button>
  );
}
