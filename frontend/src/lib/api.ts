import type { components } from "./api-types";

type Schemas = components["schemas"];
export type ContactIn = Schemas["ContactIn"];
export type NewsletterIn = Schemas["NewsletterIn"];
export type Ack = Schemas["Ack"];

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/** Minimal typed fetch helper. Run `npm run gen:api` to generate api-types.ts from the backend. */
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`/api${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new ApiError(0, "We couldn't reach the server. Check your connection and try again.");
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new ApiError(res.status, `${res.status} ${res.statusText}${detail ? `: ${detail}` : ""}`);
  }
  return (await res.json()) as T;
}

export const sendContact = (body: ContactIn) =>
  api<Ack>("/contact", { method: "POST", body: JSON.stringify(body) });

export const subscribe = (body: NewsletterIn) =>
  api<Ack>("/newsletter", { method: "POST", body: JSON.stringify(body) });
