import { useState } from "react";
import ChatWindow from "../components/tutor/ChatWindow";
import { useLesson } from "../hooks/useLesson";
import { useLessonStore } from "../store/lessonStore";

export default function Lesson() {
  const [message, setMessage] = useState("");
  const { sendMessage, loading } = useLesson();
  const { activeLesson, chatHistory, masteryScore } = useLessonStore();

  async function onSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message.trim());
    setMessage("");
  }

  if (!activeLesson) {
    return <p className="text-slate-400">Pick a lesson from Dashboard first.</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{activeLesson.title}</h1>
      <p className="text-sm text-slate-400">Mastery: {masteryScore}%</p>
      <ChatWindow messages={chatHistory} />
      <form className="flex gap-2" onSubmit={onSubmit}>
        <input
          className="flex-1 rounded bg-slate-900 p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask the tutor..."
        />
        <button className="rounded bg-emerald-600 px-4 py-2" disabled={loading} type="submit">
          {loading ? "Thinking..." : "Send"}
        </button>
      </form>
    </div>
  );
}
