from collections.abc import AsyncIterator

import pytest

from db import dispose_engine


@pytest.fixture(autouse=True)
async def _dispose_engine() -> AsyncIterator[None]:
    # Each test runs on its own event loop; pooled asyncpg connections can't cross loops.
    yield
    await dispose_engine()
