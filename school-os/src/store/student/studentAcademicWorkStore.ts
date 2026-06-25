import { create } from "zustand";
import api from "../../api/api";

export type Task = {
  subject: string;
  task: string;
  id: string;
};

type AcademicWorkStore = {
  classworks: Task[];
  homeworks: Task[];
  workDate: string;

  loading: boolean;
  loaded: boolean;

  fetchAcademicWork: (classId: string, force?: boolean) => Promise<void>;

  clearAcademicWork: () => void;
};

export const useStudentAcademicWorkStore = create<AcademicWorkStore>(
  (set, get) => ({
    classworks: [],
    homeworks: [],
    workDate: "",

    loading: false,
    loaded: false,

    fetchAcademicWork: async (classId, force = false) => {
      const { loaded, loading } = get();

      if (!force && loaded) return;
      if (loading) return;

      try {
        set({ loading: true });

        const res = await api.get(`/api/academic-work/today/${classId}`);

        const academicWork = res.data.data;

        if (!academicWork) {
          set({
            classworks: [],
            homeworks: [],
            workDate: "",
            loaded: true,
          });

          return;
        }

        const classworks = academicWork.works
          .filter((item: any) => item.classwork)
          .map((item: any) => ({
            subject: item.subjectId.name,
            task: item.classwork,
            id: item._id,
          }));

        const homeworks = academicWork.works
          .filter((item: any) => item.homework)
          .map((item: any) => ({
            subject: item.subjectId.name,
            task: item.homework,
            id: item._id,
          }));

        set({
          classworks,
          homeworks,
          workDate: academicWork.date,
          loaded: true,
        });
      } catch (error) {
        console.error("Failed to fetch academic work:", error);
      } finally {
        set({ loading: false });
      }
    },

    clearAcademicWork: () =>
      set({
        classworks: [],
        homeworks: [],
        workDate: "",
        loaded: false,
      }),
  }),
);
