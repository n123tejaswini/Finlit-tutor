import express from "express";
import User from "../models/User.js";
import LessonProgress from "../models/LessonProgress.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "User create failed", details: err.message });
  }
});

router.get("/:userId/profile", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const lessons = await LessonProgress.find({ userId: user._id });
    return res.json({ user, lessons });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch profile", details: err.message });
  }
});

router.post("/:userId/xp", async (req, res) => {
  try {
    const { amount = 10 } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.xp += amount;
    user.level = Math.max(1, Math.floor(user.xp / 100) + 1);
    await user.save();
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "Failed to add XP", details: err.message });
  }
});

export default router;
