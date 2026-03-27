# Professional Portfolio (React + Tailwind + Node.js)

This is a full-stack professional portfolio project for a BCA 2nd year student.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express

## Project Structure

- `frontend/` - Portfolio UI
- `backend/` - Contact API

## Run Locally

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

Create backend env from example before running:

```bash
cd backend
cp .env.example .env
```

## API Endpoint

- `POST /api/contact`

Payload:

```json
{
	"name": "Your Name",
	"email": "you@example.com",
	"message": "Hello"
}
```

## Backend Security (Implemented)

- `helmet` for secure HTTP headers
- CORS allowlist via `ALLOWED_ORIGINS` env variable
- Global rate limit + strict `/api/contact` rate limit
- JSON body size limit to reduce abuse surface
- Contact endpoint validation + honeypot field (`website`) anti-spam check

## Advanced Anti-Spam and Email Delivery

### Cloudflare Turnstile (Recommended)

1. Create a Turnstile site in Cloudflare dashboard.
2. Put keys in env files:

`frontend/.env`

```bash
VITE_API_URL=http://localhost:5000
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key
```

`backend/.env`

```bash
PORT=5000
ALLOWED_ORIGINS=http://localhost:5173
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

### SMTP Email Delivery (Optional)

When SMTP env values are configured, contact submissions are delivered to your inbox.

`backend/.env`

```bash
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@example.com
SMTP_PASS=your_password_or_app_password
CONTACT_TO_EMAIL=your_email@example.com
CONTACT_FROM_EMAIL=your_email@example.com
```

If SMTP is not configured, the server still accepts valid messages and logs them.

## Deployment (Configured)

Deployment workflows are now added:

- Frontend auto deploy to GitHub Pages:
	- `.github/workflows/deploy-frontend-pages.yml`
- Backend auto deploy trigger to Render:
	- `.github/workflows/deploy-backend-render.yml`

### One-time setup required

1. GitHub Pages
- In repository settings, set **Pages source** to **GitHub Actions**.
- Add repository variables:
	- `VITE_API_URL` = your backend public URL (e.g. `https://your-backend.onrender.com`)
	- `VITE_TURNSTILE_SITE_KEY` = your Turnstile site key

2. Render backend
- Create backend service from `backend/` folder.
- Add environment variables from `backend/.env.example`.
- Create Deploy Hook URL in Render and add GitHub repository secret:
	- `RENDER_DEPLOY_HOOK_URL`

After this, every push to `main` will deploy automatically.

## Security and Code Protection Notes

- Frontend code is always visible in browsers after deployment. This is normal for all client-side apps.
- Secrets must never be placed in frontend code. Keep API keys, tokens, and credentials only in backend env files.
- Production build in `frontend/vite.config.js` disables source maps to reduce easy source inspection.
- Contact API base URL is env-driven. Use:

```bash
cd frontend
cp .env.example .env
```

- The repository uses a proprietary `All Rights Reserved` license. Reuse without permission is not allowed.

## Next Improvements

- Connect contact form to MongoDB
- Add email notifications with Nodemailer
- Add admin dashboard for dynamic portfolio updates