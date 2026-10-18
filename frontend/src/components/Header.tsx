import { Clock, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { company, nav } from "../content";
import { ButtonLink, Container, Logo } from "./ui";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="hidden bg-ink text-[0.8rem] text-white/70 md:block">
        <Container className="flex h-9 items-center justify-end gap-7">
          <a href={company.phoneHref} className="flex items-center gap-1.5 transition hover:text-white">
            <Phone className="size-3.5" aria-hidden /> {company.phone}
          </a>
          <a href={`mailto:${company.email}`} className="flex items-center gap-1.5 transition hover:text-white">
            <Mail className="size-3.5" aria-hidden /> {company.email}
          </a>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden /> {company.hours}
          </span>
        </Container>
      </div>

      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled
            ? "bg-white/85 shadow-[0_6px_30px_-18px_rgba(6,20,46,0.35)] backdrop-blur-xl"
            : "bg-white"
        }`}
      >
        <Container className="flex h-[4.5rem] items-center justify-between gap-6">
          <Logo />
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-full px-4 py-2 text-[0.93rem] font-medium text-slate-ink transition hover:bg-mist/70 hover:text-navy"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <ButtonLink href="#contact" className="hidden !px-5 !py-2.5 sm:inline-flex">
              Get a quote
            </ButtonLink>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full text-navy transition hover:bg-mist lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(true)}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </Container>
      </header>

      <div
        id="mobile-nav"
        className={`on-dark fixed inset-0 z-50 bg-ink/97 text-white transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <Container className="flex h-[4.5rem] items-center justify-between">
          <Logo tone="light" />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full transition hover:bg-white/10"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X className="size-6" />
          </button>
        </Container>
        <Container>
          <ul className="mt-8 flex flex-col">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={`border-b border-white/10 transition duration-700 ease-[var(--ease-out-expo)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-3xl font-semibold tracking-[-0.02em]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink href="#contact" variant="lilac" className="mt-10 w-full" onClick={() => setOpen(false)}>
            Book a free consultation
          </ButtonLink>
          <div className="mt-8 space-y-2 text-white/70">
            <a href={company.phoneHref} className="block">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="block">
              {company.email}
            </a>
          </div>
        </Container>
      </div>
    </>
  );
}
