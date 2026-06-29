import { useEffect } from "react";

/** Attaches magnetic + spotlight behaviour to elements by selector. */
export function useMagnetic() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Magnetic CTAs
    const magnets = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const cleanups: Array<() => void> = [];

    magnets.forEach((el) => {
      const strength = Number(el.dataset.magneticStrength ?? "0.35");
      const radius = Number(el.dataset.magneticRadius ?? "120");
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < radius + Math.max(r.width, r.height) / 2) {
          el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
        } else {
          el.style.transform = "";
        }
      };
      const onLeave = () => {
        el.style.transform = "";
      };
      window.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    // Spotlight cards
    const spots = Array.from(document.querySelectorAll<HTMLElement>(".spotlight"));
    spots.forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      el.addEventListener("mousemove", onMove);
      cleanups.push(() => el.removeEventListener("mousemove", onMove));
    });

    return () => cleanups.forEach((c) => c());
  }, []);
}
