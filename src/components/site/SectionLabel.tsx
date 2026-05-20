export function SectionLabel({ label, headline }: { label: string; headline: React.ReactNode }) {
  return (
    <div className="mb-12 md:mb-16">
      <span className="pill reveal">{label}</span>
      <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] tracking-[-0.03em] max-w-3xl reveal reveal-delay-1">
        {headline}
      </h2>
    </div>
  );
}