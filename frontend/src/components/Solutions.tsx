import { ArrowUpRight, Check } from "lucide-react";

import { solutions } from "../content";
import { Container } from "./ui";

export function SectionHeading({
  title,
  lead,
  tone = "dark",
  className = "",
}: {
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`} data-reveal>
      <h2
        className={`text-[2.2rem] leading-[1.06] font-bold sm:text-5xl ${tone === "light" ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-5 text-lg leading-relaxed ${tone === "light" ? "text-white/70" : "text-slate-ink"}`}>
          {lead}
        </p>
      )}
    </div>
  );
}

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          title="Three core solutions, one team behind all of them."
          lead="Most of our clients start with one and grow into the others. Because the same people build your ERP, your integrations and your apps, nothing gets lost in the hand-off."
        />

        <div className="mt-16 flex flex-col gap-20 sm:mt-20 sm:gap-24">
          {solutions.map((s, i) => (
            <article
              key={s.id}
              id={`solution-${s.id}`}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div
                data-reveal
                className={`relative overflow-hidden rounded-2xl bg-mist shadow-[0_30px_60px_-30px_rgba(6,20,46,0.45)] ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <img
                  src={s.image}
                  alt={s.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] hover:scale-[1.03]"
                />
                <span className="absolute bottom-4 left-4 z-10 rounded-full bg-white/90 px-3.5 py-1.5 text-sm font-semibold text-navy shadow-sm backdrop-blur">
                  {s.tagline}
                </span>
              </div>

              <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
                <h3 className="text-[1.75rem] leading-tight font-bold text-ink sm:text-[2.1rem]">{s.title}</h3>
                <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-slate-ink">{s.body}</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[0.97rem] text-ink">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lilac/25 text-lilac-deep">
                        <Check className="size-3.5" strokeWidth={3} aria-hidden />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="group mt-9 inline-flex items-center gap-1.5 font-semibold text-navy underline decoration-lilac decoration-2 underline-offset-[6px] transition hover:text-lilac-deep"
                >
                  {s.cta}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
