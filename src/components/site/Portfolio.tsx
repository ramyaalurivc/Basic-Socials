import { SectionLabel } from "./SectionLabel";

export function Portfolio() {
  return (
    <section id="portfolio" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          label="Our Portfolio"
          headline={<>We let our <span className="italic font-medium grad-text">work</span> speak.</>}
        />

        <div className="reveal reveal-delay-1 mt-12 flex items-center justify-center">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl glass p-12 md:p-16 text-center">
            {/* ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#AAFF00] opacity-20 blur-3xl"
            />

            <div className="relative">
              <span className="pill mx-auto mb-6 inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#AAFF00] animate-pulse" />
                In the oven
              </span>

              <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
                Case studies{" "}
                <span className="italic font-medium grad-text">loading</span>
                <span className="inline-block w-12 text-left">
                  <span className="animate-[dots_1.5s_steps(4,end)_infinite]">...</span>
                </span>
              </h3>

              <p className="mx-auto mt-5 max-w-md text-base text-white/60 md:text-lg">
                We are too busy building brands to brag. Check back soon, or just{" "}
                <a href="#contact" className="text-[#AAFF00] underline underline-offset-4 hover:text-white transition-colors">
                  hire us
                </a>{" "}
                and become the next case study.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}