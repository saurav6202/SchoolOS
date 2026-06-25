import { create } from "zustand";
import api from "../../api/api";

type AttendanceRecord = {
  studentId: string;
  isPresent: boolean;
};

type AttendanceHistoryType = {
  _id: string;
  date: string;
  records: AttendanceRecord[];
  updatedAt: string;
};

type StudentAttendance = {
  studentId: {
    _id: string;
    name: string;
    rollNumber: number;
    studentId: string;
  };
  isPresent: boolean;
};

type AttendanceDetailsType = {
  _id: string;
  date: string;
  classId: {
    _id: string;
    name: number;
    section: string;
  };
  records: StudentAttendance[];
};

type AttendanceStore = {
  todayAttendance: any | null;
  attendanceHistory: AttendanceHistoryType[];
  attendanceDetails: AttendanceDetailsType | null;

  loadingToday: boolean;
  loadingHistory: boolean;
  loadingDetails: boolean;

  fetchTodayAttendance: (
    classId: string,
    date: string,
    force?: boolean,
  ) => Promise<any>;

  fetchAttendanceHistory: (classId: string, force?: boolean) => Promise<void>;

  fetchAttendanceDetails: (
    attendanceId: string,
    force?: boolean,
  ) => Promise<void>;

  setAttendanceDetails: (attendance: AttendanceDetailsType) => void;

  clearAttendance: () => void;
};

export const useAttendanceStore = create<AttendanceStore>((set, get) => ({
  todayAttendance: null,
  attendanceHistory: [],
  attendanceDetails: null,

  loadingToday: false,
  loadingHistory: false,
  loadingDetails: false,

  fetchTodayAttendance: async (classId, date, force = false) => {
    const { todayAttendance } = get();

    if (
      !force &&
      todayAttendance &&
      todayAttendance.classId === classId &&
      todayAttendance.date === date
    ) {
      return todayAttendance;
    }

    try {
      set({ loadingToday: true });

      const res = await api.get(
        `/api/attendance/date?classId=${classId}&date=${date}`,
      );

      const attendance = res.data.data?.[0] || null;

      set({
        todayAttendance: attendance,
      });

      return attendance;
    } finally {
      set({ loadingToday: false });
    }
  },

  fetchAttendanceHistory: async (classId, force = false) => {
    const { attendanceHistory } = get();

    if (!force && attendanceHistory.length > 0) {
      return;
    }

    try {
      set({ loadingHistory: true });

      const res = await api.get(`/api/attendance/class/${classId}`);

      set({
        attendanceHistory: res.data.data,
      });
    } finally {
      set({ loadingHistory: false });
    }
  },

  fetchAttendanceDetails: async (attendanceId, force = false) => {
    const { attendanceDetails } = get();

    if (!force && attendanceDetails?._id === attendanceId) {
      return;
    }

    try {
      set({ loadingDetails: true });

      const res = await api.get(`/api/attendance/${attendanceId}`);

      set({
        attendanceDetails: res.data.data,
      });
    } finally {
      set({ loadingDetails: false });
    }
  },

  setAttendanceDetails: (attendanceDetails) =>
    set({
      attendanceDetails,
    }),

  clearAttendance: () =>
    set({
      todayAttendance: null,
      attendanceHistory: [],
      attendanceDetails: null,
    }),
}));
