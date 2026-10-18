import { ArrowRight, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { company, footerServices, nav } from "../content";
import { subscribe } from "../lib/api";
import { Container, Logo } from "./ui";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setState("error");
      setMsg("Enter a valid email address.");
      return;
    }
    setState("sending");
    try {
      await subscribe({ email: email.trim() });
      setState("done");
      setMsg("You're subscribed. Expect practical BC and AI tips, no spam.");
      setEmail("");
    } catch {
      setState("error");
      setMsg("Couldn't subscribe right now. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="newsletter" className="font-display font-bold text-white">
        Stay updated
      </label>
      <p className="mt-2 text-sm text-white/65">New guides on Business Central and AI automation.</p>
      <div className="mt-4 flex rounded-full bg-white/8 p-1 ring-1 ring-white/15 focus-within:ring-lilac">
        <input
          id="newsletter"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="you@company.co.ke"
          aria-invalid={state === "error"}
          aria-describedby="newsletter-msg"
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/45 focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          aria-label="Subscribe"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-lilac text-ink transition hover:bg-lilac-soft disabled:opacity-60"
        >
          {state === "sending" ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
        </button>
      </div>
      <p
        id="newsletter-msg"
        role="status"
        className={`mt-2 min-h-5 text-sm ${state === "error" ? "text-red-300" : "text-emerald-300"}`}
      >
        {state === "done" || state === "error" ? msg : ""}
      </p>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="on-dark bg-ink pt-20 pb-24 text-white/70 sm:pb-10">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.3fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs leading-relaxed">
              Business Central, AI automation and integration partner for businesses across Kenya and East Africa.
            </p>
            <div className="mt-6 space-y-1.5 text-sm">
              <a href={company.phoneHref} className="block hover:text-white">
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="block hover:text-white">
                {company.email}
              </a>
              <p>{company.location}</p>
            </div>
          </div>
          <FooterList title="Company" items={nav.map((n) => ({ label: n.label, href: n.href }))} />
          <FooterList title="Services" items={footerServices.map((s) => ({ label: s, href: "#services" }))} />
          <Newsletter />
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NebTech Innovations. All rights reserved.</p>
          <p>Nairobi · Nakuru</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-display font-bold text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            <a href={i.href} className="transition hover:text-white">
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
