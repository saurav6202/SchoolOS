import { create } from "zustand";
import api from "../api/api";

type Subject = {
  _id: string;
  name: string;
  code: string;
};

type Class = {
  _id: string;
  name: string;
  section: string;
  studentCount: number;
  classTeacher: { name: string; _id: string };
  subjects: Subject[];
};


type Teacher = {
  _id: string;
  name: string;
};

type ClassStore = {
  classes: Class[];
  nonClassTeachers: Teacher[];
  totalClasses: number;
  assignedClasses: number;
  unAssignedClasses: number;
  academicSessions: Array<{ _id: string; name: string; isActive: boolean }>;

  loading: boolean;
  loaded: boolean;

  setClasses: (classes: Class[]) => void;
  setNonClassTeachers: (nonClassTeachers: Teacher[]) => void;

  setLoaded: (loaded: boolean) => void;

  refreshClasses: () => Promise<void>;
};

export const useClassStore = create<ClassStore>((set) => ({
  classes: [],
  nonClassTeachers: [],
  totalClasses: 0,
  assignedClasses: 0,
  unAssignedClasses: 0,
  academicSessions: [],

  loading: false,
  loaded: false,

  setClasses: (classes) => set({ classes }),
  setNonClassTeachers: (nonClassTeachers) => set({ nonClassTeachers }),

  setLoaded: (loaded) => set({ loaded }),

  refreshClasses: async () => {
    try {
      const [
        classesRes,
        nonClassTeachersRes,
        classStatsRes,
        academicSessionsRes,
      ] = await Promise.all([
        api.get("/api/classes"),
        api.get("/api/teachers/non-class-teachers"),
        api.get("/api/classes/getstats"),
        api.get("/api/academic-sessions"),
      ]);

      set({
        classes: classesRes.data.data,
        nonClassTeachers: nonClassTeachersRes.data.data,
        totalClasses: classStatsRes.data.data.totalClasses,
        assignedClasses: classStatsRes.data.data.assignedClasses,
        unAssignedClasses: classStatsRes.data.data.unAssignedClasses,
        academicSessions: academicSessionsRes.data.data,

        loaded: true,
      });
    } catch (error) {}
  },
}));
