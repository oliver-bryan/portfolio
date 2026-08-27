"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { INTRO_KEY } from "@/lib/intro";
import { availability, site } from "@/lib/site";

/**
 * Decided once per page load, at first ask, and stable thereafter.
 *
 * The decision cannot live inside the effect: React double-invokes effects in
 * development, and an effect that writes the sessionStorage flag on its first
 * run convinces its own second run that the intro was already seen — skipping
 * it entirely. Module state gives both runs the same answer; the timeline's
 * onComplete flips it off so client-side returns to the page don't replay.
 */
let introDecision: boolean | null = null;

function shouldRunIntro(): boolean {
  if (introDecision === null) {
    try {
      introDecision =
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        sessionStorage.getItem(INTRO_KEY) === null;
      if (introDecision) {
        sessionStorage.setItem(INTRO_KEY, "1");
      }
    } catch {
      // Storage unavailable: never risk replaying on every load.
      introDecision = false;
    }
  }
  return introDecision;
}

function settleIntro() {
  introDecision = false;
}

export function HomeHero() {
  const scope = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);
  const standfirstRef = useRef<HTMLParagraphElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (ctx) => {
      const root = document.documentElement;

      if (!shouldRunIntro()) {
        root.classList.remove("preloading");
        return;
      }

      // The boot script only runs on document load; on a client-side
      // navigation this is what shows the overlay (still pre-paint, since
      // useGSAP runs in a layout effect).
      root.classList.add("preloading");

      // The font wait below outlives this effect when React double-invokes
      // it in development: without this flag the torn-down first run would
      // still build, stacking a second SplitText on the first and fighting
      // its timeline. Cleanup flips it so only the live run ever builds.
      let cancelled = false;

      const build = () => {
        // Torn down or unmounted before fonts settled: bail; the cleanup
        // that set the flag already freed the page.
        if (cancelled || !overlayRef.current || !nameRef.current) {
          return;
        }

        // ctx.add runs the animation code inside this hook's GSAP context,
        // so everything created after the async font wait is still reverted
        // on unmount. (In @gsap/react 2.x, contextSafe is only available on
        // the hook's return value, not inside this callback.)
        ctx.add(() => {
          // words,chars rather than chars alone so wrapping stays word-bound;
          // mask gives each character its own overflow clip for the rise.
          const split = SplitText.create(nameRef.current, {
            type: "words,chars",
            mask: "chars",
          });
          const followers = [
            headlineRef.current,
            standfirstRef.current,
            bottomRef.current,
          ];

          gsap.set(split.chars, { yPercent: 115 });
          gsap.set(followers, { autoAlpha: 0, y: 20 });

          const counter = { value: 0 };
          const tl = gsap.timeline({
            onComplete: () => {
              root.classList.remove("preloading");
              settleIntro();
            },
          });

          tl.to(counter, {
            value: 100,
            duration: 1.1,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = String(
                  Math.round(counter.value),
                );
              }
            },
          })
            .fromTo(
              lineRef.current,
              { yPercent: 120, autoAlpha: 0 },
              { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
              0.15,
            )
            .to(
              overlayRef.current,
              { yPercent: -100, duration: 0.55, ease: "power4.inOut" },
              1.25,
            )
            .to(
              split.chars,
              { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.028 },
              1.4,
            )
            .to(
              followers,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
                ease: "power3.out",
                stagger: 0.08,
              },
              1.62,
            );
        });
      };

      // SplitText measures glyphs, so wait for the webfont — but never stall
      // the intro on a slow font network: the overlay is already up.
      Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 700)),
      ]).then(build);

      return () => {
        cancelled = true;
        root.classList.remove("preloading");
      };
    },
    { scope },
  );

  return (
    <section ref={scope} className="hero shell">
      <div ref={overlayRef} className="preloader" aria-hidden="true">
        <p ref={lineRef} className="preloader-line">
          {site.headline}
        </p>
        <div ref={countRef} className="preloader-count">
          0
        </div>
      </div>

      <div>
        <h1 ref={nameRef} className="hero-name">
          {site.name}
        </h1>

        <p
          ref={headlineRef}
          className="mt-[var(--space-m)] max-w-[26ch] text-[length:var(--text-xl)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] font-semibold text-balance"
        >
          {site.headline}
        </p>

        <p
          ref={standfirstRef}
          className="mt-[var(--space-s)] max-w-[54ch] text-[length:var(--text-base)] leading-[var(--leading-snug)] text-[var(--muted)]"
        >
          {site.standfirst}
        </p>
      </div>

      <div ref={bottomRef} className="flex flex-col gap-[var(--space-s)]">
        <div className="flex flex-wrap items-center gap-x-[var(--space-l)] gap-y-[var(--space-xs)] text-[length:var(--text-sm)]">
          {availability ? (
            <p className="flex items-center gap-[var(--space-xs)]">
              <span
                aria-hidden="true"
                className="size-[0.5rem] shrink-0 rounded-full bg-[var(--accent)]"
              />
              <span>
                Available for an internship,{" "}
                <time dateTime={availability.start.iso}>
                  {availability.start.label}
                </time>{" "}
                to{" "}
                <time dateTime={availability.end.iso}>
                  {availability.end.label}
                </time>
              </span>
            </p>
          ) : null}

          {/* Secondary to the availability line: same row, muted, no accent.
              Opens the PDF in a new tab rather than downloading it. */}
          <a
            href={site.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
          >
            View CV <span aria-hidden="true">(PDF)</span>
          </a>
        </div>

        <hr className="rule" />
      </div>
    </section>
  );
}
