## Quiz App (Frontend + Backend)

This project implements a full-stack quiz application per the requirements.

### Tech
- Frontend: React 18 + TypeScript, Vite, React Router v6, Zustand, Tailwind, Axios
- Backend: Express.js (TypeScript), PostgreSQL, JWT, express-validator, bcryptjs

### Running locally
1) Backend
```
cd server
npm install
cp .env.example .env
# create DB and tables
createdb quiz_app
psql -d quiz_app -c 'CREATE EXTENSION IF NOT EXISTS pgcrypto;'
psql -d quiz_app -f sql/init.sql
psql -d quiz_app -f sql/sample_data.sql
npm run dev
```
2) Frontend
```
npm install
npm run dev
```

The frontend runs on http://localhost:3000 and proxies API requests to http://localhost:5001/api.

### Environment variables
- Frontend: `VITE_API_BASE_URL` (optional; defaults to `/api`)
- Backend: see `server/.env.example`
