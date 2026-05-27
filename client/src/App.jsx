import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Lesson from "./pages/Lesson.jsx";
import Simulation from "./pages/Simulation.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <nav className="flex gap-4 border-b border-slate-800 p-4">
        <Link to="/">Dashboard</Link>
        <Link to="/lesson">Lesson</Link>
        <Link to="/simulation">Simulation</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <main className="mx-auto max-w-5xl p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}
