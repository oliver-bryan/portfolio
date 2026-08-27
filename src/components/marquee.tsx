"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Repetitions per half. Each half must be at least as wide as the widest
 * viewport we care about, or the loop shows a gap; six copies of a sentence
 * comfortably covers ultra-wide screens.
 */
const REPS = 6;

/** Pixels per second along the track. */
const SPEED = 100;

export function Marquee({ text }: { text: string }) {
  const scope = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // The tween only exists under no-preference, so reduced motion gets a
      // static strip — and flipping the OS setting mid-session kills or
      // recreates it via matchMedia's revert.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        if (!track) return;

        // xPercent -50 lands exactly on the second identical half, so the
        // loop is seamless regardless of what the font metrics turn out to
        // be; width only decides duration, keeping the speed constant.
        const half = track.scrollWidth / 2;
        tweenRef.current = gsap.to(track, {
          xPercent: -50,
          duration: Math.max(20, half / SPEED),
          ease: "none",
          repeat: -1,
        });

        return () => {
          tweenRef.current?.kill();
          tweenRef.current = null;
        };
      });
    },
    { scope },
  );

  // Ramp rather than hard pause/play, so hover never snaps the strip. Runs
  // only from event handlers, where reading the ref is legitimate; the tween
  // it retargets is context-owned, so unmount cleanup still covers it.
  const rampTo = (timeScale: number) => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    }
  };

  return (
    <div ref={scope} className="marquee">
      {/* One accessible copy; the repeated strip is presentational. */}
      <p className="sr-only">{text}</p>

      <div
        aria-hidden="true"
        onPointerEnter={() => rampTo(0)}
        onPointerLeave={() => rampTo(1)}
      >
        <div ref={trackRef} className="marquee-track">
          {Array.from({ length: REPS * 2 }, (_, i) => (
            <div key={i} className="marquee-seg">
              <span>{text}</span>
              <span className="marquee-dot" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
