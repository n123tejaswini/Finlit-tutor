# FinLit Tutor 🎓💰

An AI-powered financial literacy learning app built for Indian learners. It combines interactive lessons, a Socratic AI tutor, city-based budget simulations, and a gamification system — all in one full-stack web application.

---

## What It Does

### 📚 Lesson Dashboard
The home screen shows a curated curriculum of financial literacy lessons (e.g. budgeting, investing, savings). Each lesson is loaded from a structured JSON curriculum file and displayed as clickable cards. Users can pick any lesson to start learning.

### 🤖 AI Tutor (Chat)
At the heart of the app is a Socratic AI tutor powered by GPT-4o. Instead of just giving answers, it asks guiding questions to help users think through financial concepts themselves. The tutor:
- Adapts its **difficulty level** (1–5) based on how the user responds
- Uses **INR-based examples** and everyday Indian contexts
- Maintains **chat history** so the conversation stays coherent
- Keeps responses concise and encouraging

### 📊 Budget Simulation
A city-wise budget simulator that shows real-world living costs across Indian cities (e.g. Bengaluru, Mumbai, Delhi). Users can select a city and see prices for rent, groceries, internet, and more — helping them understand how to plan finances in different cost-of-living environments.

### 🏆 Gamification (XP System)
Users earn XP (experience points) as they progress through lessons and interact with the tutor. An XP bar on the dashboard tracks their progress, making learning feel rewarding and encouraging continued engagement.

### 👤 User Profile
A profile page that tracks the user's name, XP, and lesson progress, persisted in MongoDB.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB (via Mongoose) |
| AI | OpenAI GPT-4o API |
| State Management | Zustand |
| Routing | React Router v6 |

---

## Project Structure

```
finlit-tutor/
├── client/                  # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx      # Lesson list + XP bar
│   │   │   ├── Lesson.jsx         # Active lesson + chat UI
│   │   │   ├── Simulation.jsx     # City budget simulator
│   │   │   └── Profile.jsx        # User profile & progress
│   │   ├── components/
│   │   │   ├── tutor/
│   │   │   │   └── ChatWindow.jsx # AI chat interface
│   │   │   └── gamification/
│   │   │       └── XPBar.jsx      # XP progress bar
│   │   ├── hooks/
│   │   │   ├── useLesson.js       # Lesson fetching logic
│   │   │   └── useSimulation.js   # Simulation data logic
│   │   └── store/
│   │       ├── lessonStore.js     # Zustand store for lessons
│   │       └── userStore.js       # Zustand store for user
│   └── index.html
│
├── server/                  # Express backend
│   ├── agents/
│   │   ├── tutorAgent.js          # Orchestrates AI tutor logic
│   │   ├── promptTemplates.js     # Builds system prompts for GPT
│   │   └── difficultyCalibrator.js # Adjusts lesson difficulty
│   ├── routes/
│   │   ├── lessons.js             # GET /api/lessons
│   │   ├── tutor.js               # POST /api/tutor/message
│   │   ├── simulation.js          # GET /api/simulation/prices
│   │   └── users.js               # User CRUD + XP updates
│   ├── models/
│   │   ├── User.js                # MongoDB user schema
│   │   ├── LessonProgress.js      # Tracks lesson completion
│   │   └── SimulationSnapshot.js  # Saves simulation sessions
│   ├── services/
│   │   ├── openai.js              # OpenAI API wrapper
│   │   └── priceData.js           # Loads city price data
│   └── index.js                   # Express app entry point
│
├── data/
│   ├── lessonCurriculum.json      # All lesson content
│   └── cityPrices.json            # City-wise cost of living data
│
├── .env.example             # Environment variable template
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)
- An OpenAI API key

### 1. Clone the repository
```bash
git clone https://github.com/n123tejaswini/Finlit-tutor.git
cd Finlit-tutor
```

### 2. Set up environment variables

Create a `.env` file in the `server/` folder:
```env
MONGO_URI=mongodb://127.0.0.1:27017/finlit_tutor
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o
PORT=5000
```

Create a `.env` file in the `client/` folder:
```env
VITE_API_BASE=http://localhost:5000
```

### 3. Install dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 4. Run the backend
```bash
cd server
npm run dev
# API runs at http://localhost:5000
```

### 5. Run the frontend
```bash
cd client
npm run dev
# App runs at http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/lessons` | Fetch all lessons |
| POST | `/api/users` | Create a new user |
| GET | `/api/users/:userId/profile` | Get user profile |
| POST | `/api/users/:userId/xp` | Award XP to user |
| POST | `/api/tutor/message` | Send message to AI tutor |
| GET | `/api/simulation/prices` | Get city price data |
| POST | `/api/simulation/snapshot` | Save a simulation session |

---

## Planned Improvements

- [ ] JWT authentication and persistent login sessions
- [ ] Investment simulation charts with Alpha Vantage data
- [ ] Streak tracking and badge/achievement system
- [ ] More cities and expanded price categories
- [ ] Mobile-responsive UI improvements

---

## License

MIT
