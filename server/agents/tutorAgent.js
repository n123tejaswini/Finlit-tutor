import { buildTutorSystemPrompt } from "./promptTemplates.js";
import { chatCompletion } from "../services/openai.js";
import { calibrateDifficulty } from "./difficultyCalibrator.js";

export async function runTutorAgent({
  lessonTitle,
  userMessage,
  chatHistory = [],
  difficultyLevel = 1
}) {
  const nextDifficulty = await calibrateDifficulty({
    userMessage,
    currentLevel: difficultyLevel
  });

  const messages = [
    {
      role: "system",
      content: buildTutorSystemPrompt({ lessonTitle, difficultyLevel: nextDifficulty })
    },
    ...chatHistory.map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: userMessage }
  ];

  const reply = await chatCompletion(messages, 0.7);
  return { reply, nextDifficulty };
}
