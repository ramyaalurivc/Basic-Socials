import { SectionLabel } from "./SectionLabel";

export function Portfolio() {
  return (
    <section id="portfolio" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          label="Work"
          headline={
            <>
              Brands <span className="italic font-medium grad-text">we've</span> built.
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass rounded-[2rem] p-8 md:p-10 text-center hover:border-white/30 transition-all duration-500 hover:-translate-y-1">
            <span className="block font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#AAFF00] drop-shadow-[0_0_15px_rgba(170,255,0,0.2)]">
              25+
            </span>
            <span className="block mt-3 text-white/60 text-xs md:text-sm font-medium uppercase tracking-widest">
              Brands launched
            </span>
          </div>
          <div className="glass rounded-[2rem] p-8 md:p-10 text-center hover:border-white/30 transition-all duration-500 hover:-translate-y-1">
            <span className="block font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#AAFF00] drop-shadow-[0_0_15px_rgba(170,255,0,0.2)]">
              6
            </span>
            <span className="block mt-3 text-white/60 text-xs md:text-sm font-medium uppercase tracking-widest">
              Service lines
            </span>
          </div>
          <div className="glass rounded-[2rem] p-8 md:p-10 text-center hover:border-white/30 transition-all duration-500 hover:-translate-y-1">
            <span className="block font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#AAFF00] drop-shadow-[0_0_15px_rgba(170,255,0,0.2)]">
              1
            </span>
            <span className="block mt-3 text-white/60 text-xs md:text-sm font-medium uppercase tracking-widest">
              Agency that does it all
            </span>
          </div>
        </div>

        <div className="reveal spotlight relative overflow-hidden rounded-[2rem] glass p-10 md:p-16 text-center border border-white/10">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-96 rounded-full bg-gradient-to-br from-[#AAFF00]/20 to-[#0033FF]/20 blur-3xl" />
          </div>
          <div className="relative">
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">
              Case studies coming soon — or just hire us and become the next one.
            </p>
            <div className="mt-8 flex justify-center">
              <a href="#contact" className="btn-green inline-flex items-center gap-2">
                Start a project →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
