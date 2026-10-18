import { useEffect, useState } from "react";

import { api } from "./lib/api";

type Status = { status: string; database: string };

export default function App() {
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<Status>("/status").then(setStatus, (e: Error) => setError(e.message));
  }, []);

  return (
    <main className="min-h-screen grid place-items-center bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="max-w-md px-6 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Your app is ready</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Describe what you want to build and Mitsumi Forge will take it from here.
        </p>
        <p className="mt-6 text-sm">
          {error ? (
            <span className="text-red-600">Backend unreachable: {error}</span>
          ) : status ? (
            <span className="text-emerald-600">Backend {status.status} · database {status.database}</span>
          ) : (
            <span className="text-slate-500">Checking backend…</span>
          )}
        </p>
      </div>
    </main>
  );
}
