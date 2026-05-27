import { chatCompletion } from "../services/openai.js";

export async function calibrateDifficulty({ userMessage, currentLevel }) {
  const prompt = [
    {
      role: "system",
      content:
        "You score learner responses from 1-5 by conceptual understanding only. Output only a number."
    },
    {
      role: "user",
      content: `Current level: ${currentLevel}. Learner response: ${userMessage}`
    }
  ];

  try {
    const out = await chatCompletion(prompt, 0.1);
    const parsed = Number(String(out).trim().match(/\d+/)?.[0] || currentLevel);
    return Math.max(1, Math.min(5, parsed));
  } catch {
    return currentLevel;
  }
}
