## ReadWrite Assessments

Full‑stack quiz app: React (Vite + TS) frontend, Express (TS) backend, PostgreSQL, JWT auth, Zustand state, Tailwind UI.

### Structure
- `backend/`: Express + TypeScript + PostgreSQL
- `frontend/`: React + Vite + TypeScript

### Local development
Backend
```
cd backend
npm install
# create backend/.env with your DB + JWT
npm run dev
# health: http://localhost:50001/api/health
```

Frontend
```
cd frontend
npm install
# set VITE_API_BASE_URL in Vercel or a local .env if you prefer
npm run dev
# opens http://localhost:3000
```

### Environment variables
Backend (Render)
- DB_HOST: Postgres host (e.g. hqrjzjathiiivycrggal.supabase.co)
- DB_PORT: 5432
- DB_NAME: postgres (or your DB name)
- DB_USER: postgres (or your DB user)
- DB_PASSWORD: your Postgres password (Supabase Database password)
- DB_SSL: true
- JWT_SECRET: long random string
- NODE_ENV: production
- Optional: CORS_ORIGIN=https://your-frontend.vercel.app

Frontend (Vercel)
- VITE_API_BASE_URL: https://YOUR-BACKEND.onrender.com/api/v1

Note on Supabase password: Use the Database password from Supabase (Project settings → Database → Connection info). The default is not necessarily "postgres".

### Build & deploy
Backend (Render)
- Root: `backend`
- Build: `npm ci && npm run build`
- Start: `node dist/server.js`
- Health check: `/api/health`

Frontend (Vercel)
- Root: `frontend`
- Build: `npm run build`
- Output: `dist`
- `vercel.json` includes SPA rewrite so routes like `/dashboard` work

### API quick reference
- POST `/api/v1/auth/register` { name, email, password }
- POST `/api/v1/auth/login` { email, password }
- POST `/api/v1/quiz/start` { limit? }
- POST `/api/v1/quiz/submit` { answers: string[], timeTaken: number, questions: any[] }

### Sample curl
```
# Base
API=https://YOUR-BACKEND.onrender.com/api/v1

# Register
curl -sS -X POST $API/auth/register -H 'Content-Type: application/json' -d '{"name":"Tee Akpata","email":"tee.akpata@gmail.com","password":"password123"}'

# Login
curl -sS -X POST $API/auth/login -H 'Content-Type: application/json' -d '{"email":"tee.akpata@gmail.com","password":"password123"}'

# Start quiz (set TOKEN from login output)
curl -sS -X POST $API/quiz/start -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"limit":3}'
```
