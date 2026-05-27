import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const curriculumPath = path.resolve(__dirname, "../../data/lessonCurriculum.json");

router.get("/", async (_req, res) => {
  try {
    const raw = await fs.readFile(curriculumPath, "utf-8");
    const lessons = JSON.parse(raw);
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: "Failed to load lessons", details: err.message });
  }
});

export default router;
