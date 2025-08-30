# Backend — ReadWrite Assessments

Express + TypeScript + PostgreSQL API with JWT authentication.

## Tech Stack
- Node.js, Express
- TypeScript
- PostgreSQL (managed DB)
- JWT auth
- Joi validation

## Endpoints
- POST /api/v1/auth/register — create user, return JWT
- POST /api/v1/auth/login — login, return JWT
- POST /api/v1/quiz/start — get questions (protected)
- POST /api/v1/quiz/submit — submit answers, get results (protected)

## Project Structure
```
backend/
  src/
    app.ts
    server.ts
    routes/
    controllers/
    models/
    middleware/
  tsconfig.json
  package.json
```

## Environment Variables
Set these in your host (do not commit secrets):
- DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
- DB_SSL=true
- JWT_SECRET
- NODE_ENV=production
- Optional: CORS_ORIGIN=https://your-frontend.vercel.app

## Local Development
```
cd backend
npm install
# create .env with your DB + JWT
npm run dev
# Health: http://localhost:50001/api/health
```

## Production
```
npm run build
node dist/server.js
```

## Deploy (Render example)
- Root: backend
- Build: npm ci && npm run build
- Start: node dist/server.js
- Health: /api/health

## Sample curl
```
API=https://YOUR-BACKEND-DOMAIN/api/v1
curl -sS -X POST $API/auth/login -H 'Content-Type: application/json' -d '{"email":"user@example.com","password":"Password123"}'
```
