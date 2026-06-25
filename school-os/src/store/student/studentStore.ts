import { create } from "zustand";
import api from "../../api/api";
import { showError } from "../../utils/toast";

type Attendance = {
  date: string;
  status: "present" | "absent";
};

type Stat = {
  absent: number;
  present: number;
  percentage: number;
  total: number;
};

type Holiday = {
  date: string;
  title: string;
};

type StudentStore = {
  attendance: Array<Attendance>;
  holidays: Array<Holiday>;
  statsData: Stat;

  loading: boolean;
  loaded: boolean;

  setAttendance: (attendance: Attendance[]) => void;
  setHolidays: (holidays: Holiday[]) => void;
  setStatsData: (stats: Stat) => void;

  setLoading: (loading: boolean) => void;
  setLoaded: (loaded: boolean) => void;

  refreshStudent: () => Promise<void>;
};

export const useStudentStore = create<StudentStore>((set) => ({
  attendance: [],
  holidays: [],
  statsData: {
    absent: 0,
    present: 0,
    percentage: 0,
    total: 0,
  },

  loading: false,
  loaded: false,

  setAttendance: (attendance) => set({ attendance }),
  setHolidays: (holidays) => set({ holidays }),

  setStatsData: (statsData) => set({ statsData }),

  setLoading: (loading) => set({ loading }),
  setLoaded: (loaded) => set({ loaded }),

  refreshStudent: async () => {
    try {
      const [attendanceRes] = await Promise.all([
        api.get("/api/students/attendance/dashboard"),
      ]);
      const data = attendanceRes.data.data;
      set({
        attendance: data.attendance,
        holidays: data.holidays,
        statsData: data.stats,
        loaded: true,
      });
    } catch (error: any) {
      showError(error.response.data.message);
      console.error("Failed to refresh students:", error);
    }
  },
}));
