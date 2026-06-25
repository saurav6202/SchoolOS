import { create } from "zustand";
import api from "../api/api";

type StudentsStore = {
  totalStudents: number;
  totalClasses: number;

  loading: boolean;
  loaded: boolean;

  setStats: (stats: { totalStudents: number; totalClasses: number }) => void;

  setLoading: (loading: boolean) => void;
  setLoaded: (loaded: boolean) => void;

  refreshStudents: () => Promise<void>;
};

export const useStudentsStore = create<StudentsStore>((set) => ({
  totalStudents: 0,
  totalClasses: 0,

  loading: false,
  loaded: false,

  setStats: (stats) => set(stats),

  setLoading: (loading) => set({ loading }),
  setLoaded: (loaded) => set({ loaded }),

  refreshStudents: async () => {
    try {
      const [studentStatsRes] = await Promise.all([
        api.get("/api/students/getstats"),
      ]);
      
      set({
        totalClasses: studentStatsRes.data.totalClasses,
        totalStudents: studentStatsRes.data.totalStudents,

        loaded: true,
      });
    } catch (error) {
      console.error("Failed to refresh teachers:", error);
    }
  },
}));
