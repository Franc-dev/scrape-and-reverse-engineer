# App

Generated with Mitsumi Forge (fullstack-py template).

- `backend/` — FastAPI, async SQLAlchemy 2, Alembic, PostgreSQL. Routes under `/api`.
- `frontend/` — Vite, React 19, TypeScript, Tailwind CSS v4.

Inside the Mitsumi Forge sandbox, the backend runs on port 8001 and the frontend runs on port 3000.

## Deploying the backend (Vercel)

The API project's root directory is `backend/` (FastAPI preset). Settings are read from environment variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | Any Postgres URL, including Neon's `postgresql://...?sslmode=require`. It is converted for asyncpg automatically. |
| `ADMIN_TOKEN` | no | Enables `GET /api/contact` (send it as the `X-Admin-Token` header). |
| `CORS_ORIGINS` | no | Comma-separated origins. Not needed while the frontend reaches the API through its `/api` rewrite. |

On Vercel the app creates its two tables on first use. Locally, run `alembic upgrade head`.
`requirements.txt` is runtime-only (this is what Vercel installs); use `pip install -r requirements-dev.txt` for tests and lint.
