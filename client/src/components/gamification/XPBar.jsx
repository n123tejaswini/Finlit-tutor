import { motion } from "framer-motion";

export default function XPBar({ xp }) {
  const progress = Math.min(100, xp % 100);
  return (
    <div className="w-full rounded-lg bg-slate-800 p-2">
      <div className="mb-1 text-sm text-slate-300">XP Progress</div>
      <div className="h-3 w-full rounded bg-slate-700">
        <motion.div
          className="h-3 rounded bg-emerald-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
