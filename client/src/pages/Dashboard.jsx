import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLessonStore } from "../store/lessonStore";
import { useUserStore } from "../store/userStore";
import XPBar from "../components/gamification/XPBar";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function Dashboard() {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();
  const { setActiveLesson } = useLessonStore();
  const { name, xp, userId, setUser } = useUserStore();

  useEffect(() => {
    async function boot() {
      const lessonsRes = await fetch(`${API_BASE}/api/lessons`);
      setLessons(await lessonsRes.json());

      if (!userId) {
        const userRes = await fetch(`${API_BASE}/api/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Tejas", email: `tejas-${Date.now()}@demo.app` })
        });
        setUser(await userRes.json());
      }
    }
    boot();
  }, [setUser, userId]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome, {name}</h1>
      <XPBar xp={xp} />
      <section className="grid gap-3 md:grid-cols-2">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            className="rounded-lg border border-slate-700 p-4 text-left hover:bg-slate-900"
            onClick={() => {
              setActiveLesson(lesson);
              navigate("/lesson");
            }}
          >
            <h2 className="font-semibold">{lesson.title}</h2>
            <p className="text-sm text-slate-400">{lesson.description}</p>
          </button>
        ))}
      </section>
    </div>
  );
}
