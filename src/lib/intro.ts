/**
 * Shared between the server page (which inlines the boot script into the HTML)
 * and the client hero (which runs the intro). No "use client": both sides
 * import plain values from here.
 */
export const INTRO_KEY = "ob-intro";

/**
 * Runs during HTML parsing, before the hero markup exists, so the overlay is
 * already covering the page at first paint — no flash of hero content.
 *
 * The overlay is display:none by default; this script is the only thing that
 * shows it, so with JavaScript disabled the page renders normally. The 4s
 * timeout is a failsafe: if this inline script runs but the app bundle never
 * hydrates, the class comes off and the page is usable. The script is inlined
 * via dangerouslySetInnerHTML on the server page, which means client-side
 * navigations insert it as innerHTML — parsed but never executed — exactly
 * the once-per-document-load semantics the preloader wants.
 */
export const INTRO_BOOT_SCRIPT = `(function(){try{
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
if(sessionStorage.getItem("${INTRO_KEY}"))return;
var d=document.documentElement;
d.classList.add("preloading");
setTimeout(function(){d.classList.remove("preloading")},4000);
}catch(e){}})();`;
