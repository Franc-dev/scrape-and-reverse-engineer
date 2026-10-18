import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";

export function LogoMark({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 394" className={className} aria-hidden="true">
      <path d="M0 0H19A90 90 0 0 1 109 90V393H90A90 90 0 0 1 0 303Z" fill="currentColor" />
      <path
        d="M133 108A50 50 0 0 1 183 58H190A50 50 0 0 1 240 108V116A50 50 0 0 1 190 166H133Z"
        fill="var(--color-lilac)"
      />
      <path d="M133 286A107 107 0 0 1 240 179V286A107 107 0 0 1 133 393Z" fill="currentColor" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const ink = tone === "light" ? "text-white" : "text-navy";
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${ink}`} aria-label="NebTech Innovations, home">
      <LogoMark className="h-8 w-auto" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] font-bold tracking-[-0.03em]">
          Neb<span className={tone === "light" ? "text-lilac" : "text-lilac-deep"}>Tech</span>
        </span>
        <span className="mt-0.5 text-[0.68rem] font-medium tracking-[0.08em] opacity-70">Innovations</span>
      </span>
    </a>
  );
}

type Variant = "primary" | "lilac" | "ghost-light" | "ghost-dark";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-navy-2 shadow-[0_8px_24px_-10px_rgba(1,42,94,0.6)]",
  lilac: "bg-lilac text-ink hover:bg-lilac-soft shadow-[0_10px_30px_-12px_rgba(155,138,251,0.8)]",
  "ghost-light": "text-white ring-1 ring-inset ring-white/25 hover:bg-white/10 hover:ring-white/40",
  "ghost-dark": "text-navy ring-1 ring-inset ring-navy/20 hover:bg-navy/5 hover:ring-navy/35",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${extra}`;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a {...props} className={buttonClass(variant, className)} />;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Opt the page into scroll reveals once JS runs, so content never hides without it. */
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0 },
    );
    const observe = () =>
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => io.observe(el));
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1600);
        setN(Math.round(to * (1 - Math.pow(2, -10 * p))));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setN(to);
      };
      setN(0);
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} className="tabular">
      {n}
      {suffix}
    </span>
  );
}
