import { useState } from "react";
import { useLessonStore } from "../store/lessonStore";
import { useUserStore } from "../store/userStore";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export function useLesson() {
  const { activeLesson, setChatHistory, setMastery } = useLessonStore();
  const { userId } = useUserStore();
  const [loading, setLoading] = useState(false);

  async function sendMessage(message) {
    if (!activeLesson || !userId) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/tutor/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          lessonId: activeLesson.id,
          lessonTitle: activeLesson.title,
          message
        })
      });
      const data = await res.json();
      setChatHistory(data.chatHistory || []);
      setMastery(data.masteryScore || 0);
    } finally {
      setLoading(false);
    }
  }

  return { sendMessage, loading };
}
