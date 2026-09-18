# ── Variables ────────────────────────────────────────────
BACKEND_DIR = backend
FRONTEND_DIR = frontend

# ── Backend ──────────────────────────────────────────────
.PHONY: backend
backend:
	cd $(BACKEND_DIR) && uv run uvicorn main:app --reload --port 8000

.PHONY: backend-install
backend-install:
	cd $(BACKEND_DIR) && uv sync

.PHONY: backend-shell
backend-shell:
	cd $(BACKEND_DIR) && uv shell

# ── Frontend ─────────────────────────────────────────────
.PHONY: frontend
frontend:
	cd $(FRONTEND_DIR) && pnpm dev

.PHONY: frontend-install
frontend-install:
	cd $(FRONTEND_DIR) && pnpm install

.PHONY: frontend-build
frontend-build:
	cd $(FRONTEND_DIR) && pnpm build

# ── Both ─────────────────────────────────────────────────
.PHONY: install
install: backend-install frontend-install

.PHONY: dev
dev:
	make -j2 backend frontend

# ── Clean ────────────────────────────────────────────────
.PHONY: clean
clean:
	cd $(BACKEND_DIR) && rm -rf .venv __pycache__
	cd $(FRONTEND_DIR) && rm -rf node_modules .next


# make dev → runs both backend and frontend together
# make backend → runs only backend
# make frontend → runs only frontend
# make install → installs all dependencies for both
# make clean → cleans everything