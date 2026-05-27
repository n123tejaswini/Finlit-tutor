import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "assistant", "system"], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const lessonProgressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lessonId: { type: String, required: true },
    completed: { type: Boolean, default: false },
    masteryScore: { type: Number, default: 0 },
    difficultyLevel: { type: Number, default: 1 },
    chatHistory: { type: [chatMessageSchema], default: [] }
  },
  { timestamps: true }
);

lessonProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

export default mongoose.model("LessonProgress", lessonProgressSchema);
