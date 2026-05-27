import express from "express";
import SimulationSnapshot from "../models/SimulationSnapshot.js";
import { getCityPrices } from "../services/priceData.js";

const router = express.Router();

router.get("/prices", async (_req, res) => {
  try {
    const prices = await getCityPrices();
    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: "Failed to load prices", details: err.message });
  }
});

router.post("/snapshot", async (req, res) => {
  try {
    const { userId, type, payload } = req.body;
    if (!userId || !type) {
      return res.status(400).json({ error: "userId and type required" });
    }

    const snapshot = await SimulationSnapshot.create({ userId, type, payload });
    return res.status(201).json(snapshot);
  } catch (err) {
    return res.status(500).json({ error: "Failed to save snapshot", details: err.message });
  }
});

export default router;
