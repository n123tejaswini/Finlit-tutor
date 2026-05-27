export default function ChatWindow({ messages }) {
  return (
    <div className="space-y-2 rounded-lg border border-slate-800 p-3">
      {messages.length === 0 && (
        <p className="text-slate-400">Start by asking a question about your lesson.</p>
      )}
      {messages.map((m, idx) => (
        <div
          key={`${m.role}-${idx}`}
          className={`rounded p-2 ${
            m.role === "user" ? "bg-blue-900/40 text-blue-100" : "bg-slate-800 text-slate-100"
          }`}
        >
          <strong className="mr-2 uppercase">{m.role}</strong>
          <span>{m.content}</span>
        </div>
      ))}
    </div>
  );
}
