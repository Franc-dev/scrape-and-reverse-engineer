import { CheckCircle2, Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { contact, company } from "../content";
import { ApiError, sendContact, type ContactIn } from "../lib/api";
import { buttonClass, Container } from "./ui";

type Errors = Partial<Record<keyof ContactIn, string>>;

const empty: ContactIn = { name: "", email: "", phone: "", company: "", service: "", message: "" };

function validate(v: ContactIn): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Enter a valid email address, like you@company.co.ke.";
  if (v.message.trim().length < 10) e.message = "Tell us a little more: at least 10 characters.";
  return e;
}

const fieldClass = (invalid: boolean) =>
  `mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-[0.97rem] text-ink placeholder:text-slate-ink/60 transition duration-200 focus:outline-none focus:ring-4 ${
    invalid
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-mist hover:border-navy/25 focus:border-lilac-deep focus:ring-lilac/25"
  }`;

export default function Contact() {
  const [values, setValues] = useState<ContactIn>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const set = (k: keyof ContactIn) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setState("sending");
    setServerError(null);
    try {
      await sendContact(values);
      setState("sent");
      setValues(empty);
    } catch (err) {
      setState("idle");
      setServerError(
        err instanceof ApiError && err.status === 422
          ? "Some details look off. Check the fields and try again."
          : err instanceof ApiError && err.status === 0
            ? err.message
            : `Something went wrong on our side. Please try again, or email us at ${company.email}.`,
      );
    }
  }

  const err = (k: keyof ContactIn) =>
    errors[k] && (
      <p id={`e-${k}`} className="mt-1.5 text-sm text-red-600">
        {errors[k]}
      </p>
    );

  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <h2 className="text-[2.2rem] leading-[1.06] font-bold text-ink sm:text-5xl" data-reveal>
            {contact.title}
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-ink" data-reveal>
            {contact.lead}
          </p>

          <ul className="mt-10 space-y-6" data-reveal>
            <ContactRow icon={Phone} label="Call or WhatsApp" href={company.phoneHref}>
              {company.phone}
            </ContactRow>
            <ContactRow icon={Mail} label="Email" href={`mailto:${company.email}`}>
              {company.email}
            </ContactRow>
            <ContactRow icon={MapPin} label="Offices">
              {company.location} · serving all of East Africa
            </ContactRow>
            <ContactRow icon={Clock} label="Hours">
              {company.hours}
            </ContactRow>
          </ul>

          <img
            src={contact.image}
            alt="Two colleagues celebrating a win at their desk"
            loading="lazy"
            className="mt-12 hidden aspect-[16/10] w-full rounded-2xl object-cover lg:block"
          />
        </div>

        <div
          className="self-start rounded-[1.5rem] bg-white p-6 shadow-[0_40px_80px_-50px_rgba(6,20,46,0.5)] sm:p-10"
          data-reveal
        >
          {state === "sent" ? (
            <div className="flex min-h-[28rem] flex-col items-start justify-center" role="status">
              <CheckCircle2 className="size-12 text-emerald-600" aria-hidden />
              <h3 className="mt-6 text-3xl font-bold text-ink">Message received.</h3>
              <p className="mt-3 max-w-md text-lg leading-relaxed text-slate-ink">
                Thanks for reaching out. A NebTech specialist will reply within 4 business hours with next steps.
              </p>
              <button type="button" className={buttonClass("ghost-dark", "mt-8")} onClick={() => setState("idle")}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <h3 className="text-2xl font-bold text-ink">Send us a message</h3>
              <p className="mt-1.5 text-slate-ink">We typically respond within 4 business hours.</p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-ink" htmlFor="f-name">
                  Full name
                  <input
                    id="f-name"
                    autoComplete="name"
                    value={values.name}
                    onChange={set("name")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "e-name" : undefined}
                    className={fieldClass(!!errors.name)}
                    placeholder="Jane Wanjiku"
                    maxLength={120}
                  />
                  {err("name")}
                </label>
                <label className="block text-sm font-semibold text-ink" htmlFor="f-email">
                  Work email
                  <input
                    id="f-email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={set("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "e-email" : undefined}
                    className={fieldClass(!!errors.email)}
                    placeholder="jane@company.co.ke"
                    maxLength={254}
                  />
                  {err("email")}
                </label>
                <label className="block text-sm font-semibold text-ink" htmlFor="f-phone">
                  Phone <span className="font-normal text-slate-ink">(optional)</span>
                  <input
                    id="f-phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone ?? ""}
                    onChange={set("phone")}
                    className={fieldClass(false)}
                    placeholder="+254 7XX XXX XXX"
                    maxLength={40}
                  />
                </label>
                <label className="block text-sm font-semibold text-ink" htmlFor="f-company">
                  Company <span className="font-normal text-slate-ink">(optional)</span>
                  <input
                    id="f-company"
                    autoComplete="organization"
                    value={values.company ?? ""}
                    onChange={set("company")}
                    className={fieldClass(false)}
                    placeholder="Savannah Distributors Ltd"
                    maxLength={160}
                  />
                </label>
                <label className="block text-sm font-semibold text-ink sm:col-span-2" htmlFor="f-service">
                  What do you need help with?
                  <select
                    id="f-service"
                    value={values.service ?? ""}
                    onChange={set("service")}
                    className={`${fieldClass(false)} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23012a5e' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`}
                  >
                    <option value="">Choose a service</option>
                    {contact.serviceOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-semibold text-ink sm:col-span-2" htmlFor="f-message">
                  Your challenge
                  <textarea
                    id="f-message"
                    rows={5}
                    value={values.message}
                    onChange={set("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "e-message" : undefined}
                    className={`${fieldClass(!!errors.message)} resize-y`}
                    placeholder="We run Sage and Excel across three branches and want real-time stock and M-Pesa reconciliation…"
                    maxLength={5000}
                  />
                  {err("message")}
                </label>
              </div>

              {serverError && (
                <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                  {serverError}
                </p>
              )}

              <button type="submit" disabled={state === "sending"} className={buttonClass("primary", "mt-7 w-full sm:w-auto")}>
                {state === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
                  </>
                ) : (
                  <>
                    Send message <Send className="size-4" aria-hidden />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  href,
  children,
}: {
  icon: typeof Phone;
  label: string;
  href?: string;
  children: React.ReactNode;
}) {
  const body = <span className="font-semibold text-ink">{children}</span>;
  return (
    <li className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-navy shadow-[0_6px_16px_-8px_rgba(6,20,46,0.35)]">
        <Icon className="size-[18px]" aria-hidden />
      </span>
      <span className="flex flex-col">
        <span className="text-sm text-slate-ink">{label}</span>
        {href ? (
          <a href={href} className="underline-offset-4 hover:underline">
            {body}
          </a>
        ) : (
          body
        )}
      </span>
    </li>
  );
}
