import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import lessonRoutes from "./routes/lessons.js";
import tutorRoutes from "./routes/tutor.js";
import simulationRoutes from "./routes/simulation.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, "../data");

app.use(cors());
app.use(express.json());
app.use("/data", express.static(DATA_DIR));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "finlit-tutor-api" });
});

app.use("/api/lessons", lessonRoutes);
app.use("/api/tutor", tutorRoutes);
app.use("/api/simulation", simulationRoutes);
app.use("/api/users", userRoutes);

async function start() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI missing in .env");
    }
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server boot failed:", err.message);
    process.exit(1);
  }
}

start();
