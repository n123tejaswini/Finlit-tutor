import express from "express";
import LessonProgress from "../models/LessonProgress.js";
import { runTutorAgent } from "../agents/tutorAgent.js";

const router = express.Router();

router.post("/message", async (req, res) => {
  try {
    const { userId, lessonId, lessonTitle, message } = req.body;
    if (!userId || !lessonId || !lessonTitle || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let progress = await LessonProgress.findOne({ userId, lessonId });
    if (!progress) {
      progress = await LessonProgress.create({ userId, lessonId, chatHistory: [] });
    }

    const { reply, nextDifficulty } = await runTutorAgent({
      lessonTitle,
      userMessage: message,
      chatHistory: progress.chatHistory,
      difficultyLevel: progress.difficultyLevel
    });

    progress.chatHistory.push({ role: "user", content: message });
    progress.chatHistory.push({ role: "assistant", content: reply });
    progress.difficultyLevel = nextDifficulty;
    progress.masteryScore = Math.min(100, progress.masteryScore + 5);
    await progress.save();

    return res.json({
      reply,
      difficultyLevel: progress.difficultyLevel,
      masteryScore: progress.masteryScore,
      chatHistory: progress.chatHistory
    });
  } catch (err) {
    return res.status(500).json({ error: "Tutor route failed", details: err.message });
  }
});

export default router;
