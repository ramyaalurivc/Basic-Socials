export function Portfolio() {
  return (
    <section id="portfolio" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="reveal reveal-delay-1 flex items-center justify-center">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl glass p-16 md:p-24 text-center border border-white/10">
            {/* ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#AAFF00] opacity-25 blur-3xl"
            />

            <div className="relative">
              <span className="pill mx-auto mb-8 inline-flex items-center gap-2 text-sm md:text-base">
                <span className="h-2.5 w-2.5 rounded-full bg-[#AAFF00] animate-pulse" />
                In the oven
              </span>

              <h3 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white">
                Case studies{" "}
                <span className="italic font-medium grad-text">loading</span>
                <span className="inline-block w-14 text-left">
                  <span className="animate-[dots_1.5s_steps(4,end)_infinite]">...</span>
                </span>
              </h3>

              <p className="mx-auto mt-6 max-w-lg text-lg text-white/60 md:text-xl">
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