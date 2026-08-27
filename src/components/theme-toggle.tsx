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

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
      className="size-[1.125rem]"
    >
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-[1.125rem]"
    >
      <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2Z" />
    </svg>
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
      // The icon shows the theme you would switch to, so the label names the
      // action rather than the current state.
      aria-label={
        hydrated
          ? isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Toggle color theme"
      }
      aria-pressed={hydrated ? isDark : undefined}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid size-9 place-items-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--muted)] hover:text-[var(--ink)]"
    >
      {/* The box is sized by the button, so swapping icons cannot reflow the
          nav, and nothing renders until the resolved theme is known. */}
      {hydrated ? isDark ? <SunIcon /> : <MoonIcon /> : null}
    </button>
  );
}
