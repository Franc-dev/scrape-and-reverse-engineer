from uuid import uuid4

from httpx import ASGITransport, AsyncClient

from server import app


def client() -> AsyncClient:
    return AsyncClient(transport=ASGITransport(app=app), base_url="http://test")


async def test_contact_valid() -> None:
    async with client() as c:
        response = await c.post(
            "/api/contact",
            json={
                "name": "Amara Test",
                "email": "Amara@Example.com",
                "phone": "",
                "service": "Business Central",
                "message": "We need help moving off spreadsheets.",
            },
        )
    assert response.status_code == 201
    assert response.json() == {"ok": True}


async def test_contact_invalid() -> None:
    async with client() as c:
        response = await c.post(
            "/api/contact", json={"name": "A", "email": "not-an-email", "message": "short"}
        )
    assert response.status_code == 422


async def test_contact_list_requires_token() -> None:
    async with client() as c:
        response = await c.get("/api/contact")
    assert response.status_code == 401


async def test_newsletter_duplicate_is_ok() -> None:
    email = f"{uuid4().hex}@example.com"
    async with client() as c:
        first = await c.post("/api/newsletter", json={"email": email})
        second = await c.post("/api/newsletter", json={"email": email.upper()})
    assert first.status_code == 201
    assert second.status_code == 201
