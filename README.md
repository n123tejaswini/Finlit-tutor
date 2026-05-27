# FinLit Tutor (React + Express + MongoDB + OpenAI)

## 1) Create project env files

Copy `.env.example` into:

- `server/.env`
- `client/.env`

Use these values:

```env
MONGO_URI=mongodb://127.0.0.1:27017/finlit_tutor
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o
PORT=5000
VITE_API_BASE=http://localhost:5000
```

## 2) Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

## 3) Run backend

```bash
cd server
npm run dev
```

Server starts at `http://localhost:5000`.

## 4) Run frontend

In a second terminal:

```bash
cd client
npm run dev
```

Frontend starts at `http://localhost:5173`.

## 5) API endpoints

- `GET /api/health`
- `GET /api/lessons`
- `POST /api/users`
- `GET /api/users/:userId/profile`
- `POST /api/users/:userId/xp`
- `POST /api/tutor/message`
- `GET /api/simulation/prices`
- `POST /api/simulation/snapshot`

## 6) Optional next upgrades

- Add JWT auth and persistent sessions.
- Add Alpha Vantage service and investment simulation charts.
- Add streak logic + badge unlocking rules.
