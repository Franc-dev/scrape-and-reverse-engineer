import { ArrowRight } from "lucide-react";

import { hero, stats } from "../content";
import { ButtonLink, Container, CountUp } from "./ui";

const HUB = { x: 260, y: 230 };

const nodes = [
  { label: "M-Pesa", x: 92, y: 74 },
  { label: "Shopify", x: 428, y: 74 },
  { label: "CRM", x: 478, y: 250 },
  { label: "Power BI", x: 400, y: 404 },
  { label: "AI assistant", x: 116, y: 404 },
  { label: "Excel / Sage", x: 52, y: 238 },
];

function curve(x: number, y: number) {
  const mx = (x + HUB.x) / 2;
  return `M${HUB.x} ${HUB.y} C ${mx} ${HUB.y}, ${mx} ${y}, ${x} ${y}`;
}

function IntegrationDiagram() {
  return (
    <svg
      viewBox="0 0 530 470"
      className="h-auto w-full max-w-[560px] overflow-visible"
      role="img"
      aria-label="Business Central at the centre, connected to M-Pesa, Shopify, CRM, Power BI, an AI assistant and legacy Excel or Sage data"
    >
      <defs>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9b8afb" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#9b8afb" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={HUB.x} cy={HUB.y} r="190" fill="url(#hub-glow)" />
      <circle cx={HUB.x} cy={HUB.y} r="150" fill="none" stroke="white" strokeOpacity="0.07" />
      <circle cx={HUB.x} cy={HUB.y} r="96" fill="none" stroke="white" strokeOpacity="0.09" strokeDasharray="2 6" />

      {nodes.map((n, i) => (
        <g key={n.label}>
          <path d={curve(n.x, n.y)} fill="none" stroke="white" strokeOpacity="0.16" strokeWidth="1.5" />
          <path
            d={curve(n.x, n.y)}
            fill="none"
            stroke="#c9c0ff"
            strokeWidth="3"
            strokeLinecap="round"
            className="flow-line"
            style={{ animationDelay: `${i * 0.45}s` }}
          />
        </g>
      ))}

      <circle cx={HUB.x} cy={HUB.y} r="54" fill="#9b8afb" className="pulse-ring" />
      <rect x={HUB.x - 92} y={HUB.y - 46} width="184" height="92" rx="22" fill="#9b8afb" />
      <text
        x={HUB.x}
        y={HUB.y - 6}
        textAnchor="middle"
        fill="#06142e"
        style={{ font: "700 17px var(--font-display)", letterSpacing: "-0.02em" }}
      >
        Business Central
      </text>
      <text x={HUB.x} y={HUB.y + 18} textAnchor="middle" fill="#06142e" fillOpacity="0.7" style={{ font: "500 12.5px var(--font-sans)" }}>
        one source of truth
      </text>

      {nodes.map((n) => {
        const w = Math.max(84, n.label.length * 8.2 + 38);
        return (
          <g key={n.label}>
            <rect
              x={n.x - w / 2}
              y={n.y - 19}
              width={w}
              height="38"
              rx="19"
              fill="#0a2550"
              stroke="white"
              strokeOpacity="0.18"
            />
            <circle cx={n.x - w / 2 + 16} cy={n.y} r="3.5" fill="#7ee0b5" />
            <text x={n.x + 7} y={n.y + 4.5} textAnchor="middle" fill="white" style={{ font: "600 13px var(--font-sans)" }}>
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Hero() {
  const tags = [...hero.tags, ...hero.tags];
  return (
    <section id="top" className="on-dark relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={hero.image}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="hero-bg size-full object-cover object-[60%_80%]"
        />
        {/* Dense navy behind the copy only; the meeting stays visible on the right. */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/75 to-navy/85 lg:bg-gradient-to-r lg:from-navy/95 lg:from-20% lg:via-navy/60 lg:via-50% lg:to-navy/20" />
        <div className="absolute inset-y-0 left-0 hidden w-3/5 bg-[radial-gradient(70%_60%_at_25%_50%,rgba(6,20,46,0.45),transparent_75%)] lg:block" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_90%_10%,rgba(155,138,251,0.22),transparent_60%)] mix-blend-screen" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />
      </div>
      <Container className="grid items-center gap-12 pt-16 pb-14 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-24 lg:pb-20">
        <div>
          <h1 className="text-legible text-[2.75rem] leading-[1.02] font-extrabold sm:text-6xl lg:text-[4.6rem]">
            {hero.title}
          </h1>
          <p className="text-legible mt-6 max-w-[36rem] text-lg leading-relaxed text-white/85">{hero.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contact" variant="lilac" className="group">
              Book a free consultation
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#solutions" variant="ghost-light">
              Discover solutions
            </ButtonLink>
          </div>
          <p className="mt-8 inline-flex items-center gap-2.5 rounded-2xl bg-white/10 sm:rounded-full px-4 py-2 text-sm font-medium text-white/90 ring-1 ring-white/20 backdrop-blur-md">
            <span className="size-2 rounded-full bg-[#7ee0b5] shadow-[0_0_0_3px_rgba(126,224,181,0.2)]" aria-hidden />
            {hero.proof}
          </p>
        </div>
        {/* Below sm the diagram's labels shrink past legibility; the marquee carries the message there. */}
        <div className="hidden justify-center sm:flex lg:justify-end">
          <div className="w-full max-w-[600px] rounded-[28px] bg-navy/30 p-5 shadow-[0_30px_60px_-30px_rgba(6,20,46,0.8)] ring-1 ring-white/15 backdrop-blur-[5px] backdrop-saturate-150 lg:p-6">
            <IntegrationDiagram />
          </div>
        </div>
      </Container>

      <div className="border-t border-white/12 bg-ink/35 backdrop-blur-md">
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse py-5 pr-4 sm:py-7 ${i % 2 === 1 ? "pl-5 sm:pl-8" : ""} ${
                i > 0 ? "lg:border-l lg:border-white/12 lg:pl-8" : ""
              } ${i % 2 === 1 ? "border-l border-white/12" : ""} ${i >= 2 ? "border-t border-white/12 lg:border-t-0" : ""}`}
            >
              <dt className="mt-1 text-sm text-white/65">{s.label}</dt>
              <dd className="font-display text-4xl font-bold tracking-[-0.03em] text-white sm:text-[2.6rem]">
                <CountUp to={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
      </div>

      <div className="marquee relative overflow-hidden border-t border-white/10 bg-ink/40 py-4">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {tags.map((t, i) => (
            <span key={i} className="flex items-center gap-10 text-[0.95rem] font-medium text-white/70" aria-hidden={i >= hero.tags.length}>
              {t}
              <span className="size-1.5 rounded-full bg-lilac/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
