import mongoose from "mongoose";

const simulationSnapshotSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["budget", "credit", "investment"], required: true },
    payload: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

export default mongoose.model("SimulationSnapshot", simulationSnapshotSchema);
