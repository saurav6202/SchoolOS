import { create } from "zustand";
import api from "../api/api";

type Teacher = {
  _id: string;
  name: string;
  teacherId: string;
  subjects: Array<string>;
  assignedClass: { className: number; section: string };
  email: string;
};

type Subject = {
  _id: string;
  name: string;
  code: string;
};

type NonAssignedClass = {
  _id: string;
  name: number;
  section: string;
};

type TeachersStore = {
  teachers: Array<Teacher>;
  subjects: Array<Subject>;
  nonAssignedClasses: Array<NonAssignedClass>;

  totalTeachers: number;
  classTeachers: number;
  nonClassTeachers: number;

  loading: boolean;
  loaded: boolean;

  setTeachers: (teachers: Teacher[]) => void;
  setSubjects: (subjects: Subject[]) => void;
  setNonAssignedClasses: (classes: NonAssignedClass[]) => void;

  setStats: (stats: {
    totalTeachers: number;
    classTeachers: number;
    nonClassTeachers: number;
  }) => void;

  setLoading: (loading: boolean) => void;
  setLoaded: (loaded: boolean) => void;

  refreshTeachers: () => Promise<void>;
};

export const useTeachersStore = create<TeachersStore>((set) => ({
  teachers: [],
  subjects: [],
  nonAssignedClasses: [],

  totalTeachers: 0,
  classTeachers: 0,
  nonClassTeachers: 0,

  loading: false,
  loaded: false,

  setTeachers: (teachers) => set({ teachers }),
  setSubjects: (subjects) => set({ subjects }),

  setNonAssignedClasses: (nonAssignedClasses) => set({ nonAssignedClasses }),

  setStats: (stats) => set(stats),

  setLoading: (loading) => set({ loading }),
  setLoaded: (loaded) => set({ loaded }),

  refreshTeachers: async () => {
    try {
      const [teacherStatsRes, teachersRes, classesRes, subjectsRes] =
        await Promise.all([
          api.get("/api/teachers/getstats"),
          api.get("/api/teachers"),
          api.get("/api/classes/non-assigned-classes"),
          api.get("/api/subjects"),
        ]);

      set({
        teachers: teachersRes.data.data,
        subjects: subjectsRes.data.data,
        nonAssignedClasses: classesRes.data.data,
        totalTeachers: teacherStatsRes.data.data.totalTeachers,
        classTeachers: teacherStatsRes.data.data.classTeachers,
        nonClassTeachers: teacherStatsRes.data.data.nonClassTeachers,

        loaded: true,
      });
    } catch (error) {
      console.error("Failed to refresh teachers:", error);
    }
  },
}));
