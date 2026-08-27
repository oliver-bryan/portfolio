import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { availabilityLabel, site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.headline}`;

/**
 * The site's dark palette, resolved to sRGB.
 *
 * Satori does not parse `oklch()`, so these are converted from the tokens in
 * globals.css rather than referenced. Keep them in step if the palette moves.
 */
const c = {
  bg: "#080a0d", // --bg
  ink: "#f1f4f6", // --ink
  muted: "#9aa0a6", // --muted
  border: "#2b2f33", // --border
  accent: "#f76e52", // --accent
};

type LoadedFont = { name: string; data: Buffer; weight: 400 | 600 };

/**
 * Bricolage Grotesque is loaded from `assets/` when present. Satori cannot read
 * the woff2 that next/font downloads, so the TTF has to be a real file in the
 * repo. When it is missing we fall back to the font next/og bundles rather than
 * failing the build.
 */
async function loadFont(
  file: string,
  weight: 400 | 600,
): Promise<LoadedFont | null> {
  try {
    return {
      name: "Bricolage Grotesque",
      data: await readFile(join(process.cwd(), "assets", file)),
      weight,
    };
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const loaded = (
    await Promise.all([
      loadFont("BricolageGrotesque-SemiBold.ttf", 600),
      loadFont("BricolageGrotesque-Regular.ttf", 400),
    ])
  ).filter((font): font is LoadedFont => font !== null);

  // Spread rather than assigned: Satori parses font stacks with
  // `fontFamily.split(',')`, so an explicit `fontFamily: undefined` throws
  // where an absent key correctly falls back to the bundled default.
  const font = loaded.length ? { fontFamily: "Bricolage Grotesque" } : {};

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: c.bg,
          color: c.ink,
          padding: "72px 80px",
          ...font,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: c.muted,
          }}
        >
          {site.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            maxWidth: 980,
          }}
        >
          {site.headline}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div style={{ display: "flex", height: 1, background: c.border }} />
          {availabilityLabel ? (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  display: "flex",
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  background: c.accent,
                }}
              />
              <div style={{ display: "flex", fontSize: 28, color: c.muted }}>
                {availabilityLabel}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      ...size,
      // Omitted entirely rather than passed empty: next/og treats an empty
      // `fonts` array as a configured font set and fails on it.
      ...(loaded.length
        ? {
            fonts: loaded.map(({ name, data, weight }) => ({
              name,
              data,
              weight,
              style: "normal" as const,
            })),
          }
        : {}),
    },
  );
}
