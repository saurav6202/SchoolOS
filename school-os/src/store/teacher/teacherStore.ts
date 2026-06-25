import { create } from "zustand";
import api from "../../api/api";
import { useAuthStore } from "../authStore";
import { today } from "../../utils/formatDate";

export type StudentAttendance = {
  studentId: string;
  name: string;
  rollNumber: number;
  isPresent: boolean;
};

type ClassInfo = {
  id: string;
  name: string;
  section: string;
};

type TeacherStore = {
  students: StudentAttendance[];
  classInfo: ClassInfo;

  isHoliday: boolean;

  loading: boolean;
  loaded: boolean;

  setStudents: (students: StudentAttendance[]) => void;
  setClassInfo: (classInfo: ClassInfo) => void;
  setHoliday: (value: boolean) => void;

  refreshTeacher: (force?: boolean) => Promise<void>;
  clearTeacher: () => void;
};

export const useTeacherStore = create<TeacherStore>((set, get) => ({
  students: [],

  classInfo: {
    id: "",
    name: "",
    section: "",
  },

  isHoliday: false,

  loading: false,
  loaded: false,

  setStudents: (students) => set({ students }),

  setClassInfo: (classInfo) => set({ classInfo }),

  setHoliday: (value) => set({ isHoliday: value }),

  clearTeacher: () =>
    set({
      students: [],
      classInfo: {
        id: "",
        name: "",
        section: "",
      },
      isHoliday: false,
      loading: false,
      loaded: false,
    }),

  refreshTeacher: async (force = false) => {
    const { loaded, loading } = get();

    if (!force && loaded) return;
    if (loading) return;

    try {
      set({ loading: true });

      const { user } = useAuthStore.getState();

      const assignedClass = await user?.assignedClass;

      if (!assignedClass) {
        throw new Error("Assigned class not found");
      }

      const [studentsRes, holidayRes] = await Promise.all([
        api.get(`/api/classes/${assignedClass._id}/students`),
        api.get(
          `/api/holidays/today?classId=${assignedClass._id}&date=${today}`,
        ),
      ]);

      const students = studentsRes.data.data.map((student: any) => ({
        studentId: student._id,
        name: student.name,
        rollNumber: student.rollNumber,
        isPresent: false,
      }));

      set({
        students,
        isHoliday: !!holidayRes.data.data,
        classInfo: {
          id: assignedClass._id,
          name: assignedClass.name,
          section: assignedClass.section,
        },
        loaded: true,
      });
    } catch (error) {
      console.error("Failed to refresh teacher data:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
