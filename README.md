# Service Marketplace - Server (Express)

Minimal demo API for a services marketplace. Uses in-memory data for now.

## Scripts
- `npm start` → starts the API on `PORT` (Render will set this automatically). Locally defaults to `5000`.

## Endpoints
- `GET /api/health` → health check
- `GET /api/categories` → sample categories
- `GET /api/providers?category=boya-badana` → sample providers (optional category filter)
- `POST /api/jobs` → create a demo job (no DB yet)

## Deploy on Render (Web Service)
- Build Command: `npm install`
- Start Command: `npm start`
- Runtime: Node 18+
