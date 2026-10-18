import logging
import secrets
from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, FastAPI, Header, HTTPException, Query, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from sqlalchemy import select, text
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.exc import InterfaceError, OperationalError
from sqlalchemy.ext.asyncio import AsyncSession

from db import DatabaseNotConfigured, get_db
from models import ContactMessage, NewsletterSubscriber
from settings import settings

log = logging.getLogger("nebtech.api")

DB = Annotated[AsyncSession, Depends(get_db)]

app = FastAPI(title="NebTech API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=False,  # no cookies are used, and credentials + "*" is invalid
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.exception_handler(DatabaseNotConfigured)
@app.exception_handler(OperationalError)
@app.exception_handler(InterfaceError)
@app.exception_handler(OSError)
@app.exception_handler(TimeoutError)
async def database_unavailable(request: Request, exc: Exception) -> JSONResponse:
    """A database that is missing or unreachable is a 503, not a crash. The cause is logged."""
    log.error(
        "database unavailable on %s %s: %s: %s",
        request.method,
        request.url.path,
        type(exc).__name__,
        exc,
    )
    return JSONResponse(
        {"detail": "The database is temporarily unavailable. Please try again."},
        status_code=503,
    )


api = APIRouter(prefix="/api")


def _blank_to_none(value: str | None) -> str | None:
    if value is None:
        return None
    value = value.strip()
    return value or None


class ContactIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=40)
    company: str | None = Field(default=None, max_length=160)
    service: str | None = Field(default=None, max_length=80)
    message: str = Field(min_length=10, max_length=5000)

    @field_validator("name", "message", mode="before")
    @classmethod
    def _strip(cls, value: object) -> object:
        return value.strip() if isinstance(value, str) else value

    @field_validator("phone", "company", "service", mode="before")
    @classmethod
    def _optional(cls, value: object) -> object:
        return _blank_to_none(value) if isinstance(value, str) else value


class ContactOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    phone: str | None
    company: str | None
    service: str | None
    message: str
    created_at: datetime


class NewsletterIn(BaseModel):
    email: EmailStr


class Ack(BaseModel):
    ok: bool = True


@api.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@api.get("/status")
async def status_check(db: DB) -> dict[str, str]:
    await db.execute(text("SELECT 1"))
    return {"status": "ok", "database": "connected"}


@api.post("/contact", status_code=status.HTTP_201_CREATED)
async def create_contact(payload: ContactIn, db: DB) -> Ack:
    db.add(ContactMessage(**{**payload.model_dump(), "email": payload.email.lower()}))
    await db.commit()
    return Ack()


@api.get("/contact")
async def list_contacts(
    db: DB,
    x_admin_token: Annotated[str | None, Header()] = None,
    limit: Annotated[int, Query(ge=1, le=200)] = 50,
) -> list[ContactOut]:
    if not settings.admin_token or not x_admin_token or not secrets.compare_digest(
        x_admin_token, settings.admin_token
    ):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid admin token")
    rows = await db.scalars(
        select(ContactMessage).order_by(ContactMessage.created_at.desc()).limit(limit)
    )
    return [ContactOut.model_validate(r) for r in rows]


@api.post("/newsletter", status_code=status.HTTP_201_CREATED)
async def subscribe(payload: NewsletterIn, db: DB) -> Ack:
    stmt = insert(NewsletterSubscriber).values(email=payload.email.lower())
    await db.execute(stmt.on_conflict_do_nothing(index_elements=["email"]))
    await db.commit()
    return Ack()


app.include_router(api)
