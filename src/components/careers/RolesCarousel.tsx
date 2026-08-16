import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@tanstack/react-router";
import { roles } from "@/lib/roles";

export function RolesCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    dragFree: false,
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  useEffect(() => {
    if (!embla) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") embla.scrollPrev();
      if (e.key === "ArrowRight") embla.scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [embla]);

  return (
    <div className="relative mt-14">
      <div className="overflow-hidden px-2 py-6 md:px-0" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {roles.map((r, i) => {
            const active = i === selected;
            return (
              <div
                key={r.slug}
                className="min-w-0 shrink-0 grow-0 basis-[82%] px-3 sm:basis-[62%] md:basis-[46%] lg:basis-[38%]"
              >
                <article
                  className={`group flex h-full flex-col items-center rounded-[32px] border bg-white p-8 text-center transition-all duration-500 ease-out ${
                    active
                      ? "scale-100 border-[#0033FF]/25 opacity-100 shadow-[0_30px_70px_-30px_rgba(0,51,255,0.4)]"
                      : "scale-[0.88] border-[#E5E7EB] opacity-45 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.3)]"
                  }`}
                >
                  <div
                    className={`relative flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#AAFF00] transition-all duration-500 md:h-44 md:w-44 ${
                      active ? "ring-[10px] ring-[#0033FF]/12" : "ring-8 ring-[#AAFF00]/15"
                    }`}
                  >
                    <img
                      src={r.img}
                      alt={`${r.title} role at Basic Socials`}
                      loading="lazy"
                      className="h-full w-full object-contain object-center p-1 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-7 font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-[1.7rem]">
                    {r.title}
                  </h3>
                  <p className="mt-3 max-w-xs leading-relaxed text-[#475569]">{r.tagline}</p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    <span className="rounded-full border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-1.5 text-xs font-medium text-[#475569]">
                      {r.employmentType}
                    </span>
                    <span className="rounded-full border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-1.5 text-xs font-medium text-[#475569]">
                      {r.location}
                    </span>
                  </div>

                  <Link
                    to="/careers/$role"
                    params={{ role: r.slug }}
                    tabIndex={active ? 0 : -1}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0033FF] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_-16px_rgba(0,51,255,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-16px_rgba(0,51,255,0.9)]"
                  >
                    Apply
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous role"
        onClick={() => embla?.scrollPrev()}
        className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0F172A] shadow-[0_12px_30px_-16px_rgba(15,23,42,0.5)] transition hover:border-[#0033FF] hover:text-[#0033FF] md:flex lg:-left-4"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next role"
        onClick={() => embla?.scrollNext()}
        className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0F172A] shadow-[0_12px_30px_-16px_rgba(15,23,42,0.5)] transition hover:border-[#0033FF] hover:text-[#0033FF] md:flex lg:-right-4"
      >
        →
      </button>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous role"
          onClick={() => embla?.scrollPrev()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0F172A] md:hidden"
        >
          ←
        </button>
        <div className="flex items-center gap-2">
          {roles.map((r, i) => (
            <button
              key={r.slug}
              type="button"
              aria-label={`Go to ${r.title}`}
              onClick={() => embla?.scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selected ? "w-8 bg-[#0033FF]" : "w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next role"
          onClick={() => embla?.scrollNext()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0F172A] md:hidden"
        >
          →
        </button>
      </div>
    </div>
  );
}