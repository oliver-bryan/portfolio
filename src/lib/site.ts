/**
 * Single source for the site's identity copy.
 *
 * The homepage hero and the generated Open Graph image both read from here, so
 * the card that gets shared cannot drift away from what the page actually says.
 */
export const site = {
  // www is the primary host: the apex 308-redirects to it, so canonicals and
  // og:image must point at www or they name a URL that immediately redirects.
  url: "https://www.oliverbryan.dev",
  name: "Oliver Bryan",
  /** The hero's main line, and the OG image's headline. */
  headline:
    "I build apps for the moments when someone has to trust a stranger.",
  /** Supporting line, smaller and lighter beneath the headline. */
  standfirst:
    "Final-year IT student at UiTM Shah Alam. Recently built PackPals, a Flutter and Firebase platform for students relocating between states.",
  email: "oliverbryan.jm@gmail.com",
  cv: "/oliver-bryan-cv.pdf",
  /** ~160 characters, so search and social previews do not truncate it. */
  description:
    "I build apps for the moments when someone has to trust a stranger. Final-year IT student at UiTM Shah Alam, recently building PackPals with Flutter and Firebase.",
} as const;

type DatePoint = { iso: string; label: string };

/**
 * Internship availability, taken from the CV. Set to `null` to hide it from
 * both the hero and the Open Graph image.
 */
export const availability: { start: DatePoint; end: DatePoint } | null = {
  start: { iso: "2026-09-07", label: "7 September" },
  end: { iso: "2026-12-11", label: "11 December 2026" },
};

/** Flat string for contexts that cannot render <time>, such as the OG image. */
export const availabilityLabel = availability
  ? `Available for an internship, ${availability.start.label} to ${availability.end.label}`
  : null;
