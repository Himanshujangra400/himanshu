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

## Next Improvements

- Connect contact form to MongoDB
- Add email notifications with Nodemailer
- Add admin dashboard for dynamic portfolio updates