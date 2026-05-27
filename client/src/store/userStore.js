import { create } from "zustand";

export const useUserStore = create((set) => ({
  userId: "",
  name: "Guest Learner",
  xp: 0,
  level: 1,
  badges: [],
  setUser: (user) =>
    set({
      userId: user._id || "",
      name: user.name || "Guest Learner",
      xp: user.xp || 0,
      level: user.level || 1,
      badges: user.badges || []
    }),
  addXp: (amount) =>
    set((state) => {
      const xp = state.xp + amount;
      return { xp, level: Math.floor(xp / 100) + 1 };
    })
}));
