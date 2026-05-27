import { create } from "zustand";

export const useLessonStore = create((set) => ({
  activeLesson: null,
  chatHistory: [],
  masteryScore: 0,
  setActiveLesson: (lesson) => set({ activeLesson: lesson }),
  setChatHistory: (chatHistory) => set({ chatHistory }),
  setMastery: (masteryScore) => set({ masteryScore })
}));
