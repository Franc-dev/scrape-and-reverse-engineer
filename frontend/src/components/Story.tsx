import { ArrowRight, MapPin, Quote } from "lucide-react";

import { about, company, insights, testimonials } from "../content";
import { SectionHeading } from "./Solutions";
import { ButtonLink, Container } from "./ui";

export function About() {
  return (
    <section id="about" className="border-y border-mist bg-white py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="relative" data-reveal>
          <img
            src={about.image}
            alt={about.alt}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[0_40px_80px_-40px_rgba(6,20,46,0.55)] sm:aspect-[5/5] lg:aspect-[4/5]"
          />
          <div className="absolute -bottom-6 left-5 right-5 flex items-center gap-4 rounded-2xl bg-navy p-5 text-white shadow-[0_24px_50px_-20px_rgba(6,20,46,0.7)] sm:left-auto sm:-right-6 sm:w-72">
            <span className="font-display text-4xl font-bold tracking-[-0.03em] tabular">500+</span>
            <span className="text-sm leading-snug text-white/75">
              happy clients across Kenya and East Africa
            </span>
          </div>
        </div>

        <div className="pt-6 lg:pt-0">
          <SectionHeading title={about.title} lead={about.body} />
          <dl className="mt-10 divide-y divide-mist border-y border-mist" data-reveal>
            {about.pillars.map((p) => (
              <div key={p.title} className="grid gap-1 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="font-display font-bold text-ink">{p.title}</dt>
                <dd className="leading-relaxed text-slate-ink">{p.body}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4" data-reveal>
            <ButtonLink href="#contact">Talk to our team</ButtonLink>
            <span className="flex items-center gap-2 text-sm font-medium text-slate-ink">
              <MapPin className="size-4 text-lilac-deep" aria-hidden /> {company.location}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => w[0] === w[0].toUpperCase())
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export function Testimonials() {
  const [featured, ...rest] = testimonials;
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy py-24 text-white sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_100%_0%,rgba(155,138,251,0.18),transparent_70%)]"
      />
      <Container>
        <SectionHeading
          tone="light"
          title="Real results from Business Central projects across East Africa."
        />
        <figure className="mt-14 max-w-5xl" data-reveal>
          <Quote className="size-10 text-lilac" aria-hidden />
          <blockquote className="mt-5 font-display text-2xl leading-snug font-semibold tracking-[-0.02em] sm:text-[2.1rem] sm:leading-[1.25]">
            {featured.quote}
          </blockquote>
          <Person t={featured} />
        </figure>
        <div className="mt-16 grid gap-10 border-t border-white/12 pt-12 md:grid-cols-2 md:gap-14">
          {rest.map((t, i) => (
            <figure key={t.name} data-reveal style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}>
              <blockquote className="text-lg leading-relaxed text-white/85">“{t.quote}”</blockquote>
              <Person t={t} />
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Person({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figcaption className="mt-7 flex items-center gap-4">
      <span className="grid size-12 place-items-center rounded-full bg-lilac font-display font-bold text-ink">
        {initials(t.name)}
      </span>
      <span>
        <span className="block font-semibold">{t.name}</span>
        <span className="block text-sm text-white/65">
          {t.role}, {t.company} · {t.city}
        </span>
      </span>
    </figcaption>
  );
}

const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export function Insights() {
  return (
    <section id="insights" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          title="Practical guides for East African businesses."
          lead="Notes from the field on Business Central, AI automation and software that fits the way Kenyan companies work."
        />
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {insights.map((a, i) => (
            <article
              key={a.title}
              className="group"
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <div className="overflow-hidden rounded-2xl bg-mist">
                <img
                  src={a.image}
                  alt={a.alt}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-slate-ink">
                <span className="font-semibold text-lilac-deep">{a.category}</span>
                <span aria-hidden>·</span>
                <time dateTime={a.date}>{fmt.format(new Date(a.date))}</time>
              </p>
              <h3 className="mt-2 text-xl leading-snug font-bold text-ink">{a.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-ink">{a.excerpt}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="px-3 sm:px-5">
      <div className="relative isolate mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] bg-lilac px-6 py-20 text-ink sm:px-12 sm:py-24">
        <svg
          aria-hidden
          viewBox="0 0 240 394"
          className="absolute -right-10 -bottom-24 -z-10 h-[30rem] w-auto text-white/25 sm:-right-4"
        >
          <path d="M0 0H19A90 90 0 0 1 109 90V393H90A90 90 0 0 1 0 303Z" fill="currentColor" />
          <path d="M133 286A107 107 0 0 1 240 179V286A107 107 0 0 1 133 393Z" fill="currentColor" />
        </svg>
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-3xl text-[2.4rem] leading-[1.04] font-extrabold sm:text-6xl" data-reveal>
            Replace spreadsheets with a world-class ERP.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75" data-reveal>
            Book a free discovery call with our Business Central specialists. We'll assess your current setup and
            outline a clear implementation roadmap.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal>
            <ButtonLink href="#contact" className="group !bg-ink hover:!bg-navy">
              Book a free discovery call
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#solutions" variant="ghost-dark" className="!text-ink !ring-ink/25 hover:!bg-ink/5">
              View our solutions
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
