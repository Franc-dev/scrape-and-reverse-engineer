import { BarChart3, Bot, Code2, GraduationCap, Rocket, Workflow, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { process, services, type ServiceCategory } from "../content";
import { SectionHeading } from "./Solutions";
import { Container } from "./ui";

const icons: Record<(typeof services)[number]["icon"], LucideIcon> = {
  rocket: Rocket,
  workflow: Workflow,
  graduation: GraduationCap,
  bot: Bot,
  code: Code2,
  chart: BarChart3,
};

const filters: ("All" | ServiceCategory)[] = ["All", "Business Central", "AI & Automation", "Software"];

export default function Services() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = services.filter((s) => filter === "All" || s.category === filter);

  return (
    <section id="services" className="border-y border-mist bg-white py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            className="lg:max-w-2xl"
            title="Services that cover the whole software lifecycle."
            lead="From the first Business Central configuration to the chatbot answering your customers on WhatsApp."
          />
          <div role="tablist" aria-label="Filter services" className="flex shrink-0 flex-wrap gap-2 lg:flex-nowrap" data-reveal>
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                type="button"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
                  filter === f
                    ? "bg-navy text-white shadow-[0_8px_20px_-10px_rgba(1,42,94,0.7)]"
                    : "bg-paper text-slate-ink hover:bg-mist hover:text-navy"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-14 grid gap-x-14 md:grid-cols-2" role="tabpanel">
          {visible.map((s) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.title} className="group border-t border-mist py-8 transition-colors">
                <div className="flex gap-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-paper text-navy transition duration-500 ease-[var(--ease-out-expo)] group-hover:bg-lilac group-hover:text-ink">
                    <Icon className="size-[22px]" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <p className="text-[0.8rem] font-semibold text-lilac-deep">{s.category}</p>
                    <h3 className="mt-1 text-xl font-bold text-ink">{s.title}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-slate-ink">{s.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          title="How a project runs with us."
          lead="A predictable path from first call to a system your team relies on, with sign-off at every step."
        />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <span aria-hidden className="absolute top-[22px] right-0 left-0 hidden h-px bg-gradient-to-r from-lilac via-navy/30 to-transparent md:block" />
          {process.map((step, i) => (
            <li
              key={step.title}
              className="relative"
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <span className="relative grid size-11 place-items-center rounded-full bg-navy font-display font-bold text-white ring-8 ring-paper tabular">
                {i + 1}
              </span>
              <h3 className="mt-6 text-xl font-bold text-ink">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-ink">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
