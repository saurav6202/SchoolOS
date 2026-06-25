import { create } from "zustand";
import type { AuthStore, User } from "../types/auth";
import api from "../api/api";

const getInitialState = () => {
  try {
    const stored = localStorage.getItem("userToken");

    if (!stored) {
      return {
        role: null,
        id: null,
        token: null,
      };
    }

    const parsed = JSON.parse(stored);

    return {
      role: parsed.role ?? null,
      id: parsed.id ?? null,
      token: parsed.token ?? null,
    };
  } catch (error) {
    return {
      role: null,
      id: null,
      token: null,
    };
  }
};

const initialState = getInitialState();

export const useAuthStore = create<AuthStore>((set) => ({
  role: initialState.role,
  id: initialState.id,
  token: initialState.token,
  user: null,
  isAuthenticated: !!initialState.token,

  updateMustChangePassword: (value) =>
    set((state) => ({
      user: state.user ? { ...state.user, mustChangePassword: value } : null,
    })),

  login: (role, id: string, token: string, user: User | null) => {
    localStorage.setItem("userToken", JSON.stringify({ role, id, token }));
    set({ role, id, token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("userToken");
    set({
      role: null,
      token: null,
      id: null,
      user: null,
      isAuthenticated: false,
    });
  },

  fetchMe: async () => {
    try {
      // console.log("initialState.token: ", initialState.token);
      const token = useAuthStore.getState().token;

      const res = await api.post("/api/auth/me", { token });
    //   console.log("FetchMe response: ", res);

      const { user, role, userId } = res.data.data;
      const newUser = { ...user, role, userId };
      // console.log("New user: ", newUser);

      set({
        role: newUser.role,
        id: newUser._id,
        user: newUser,
        isAuthenticated: true,
      });
    } catch (error) {
      console.log("Error fetchMe: ", error);
      set({
        user: null,
        role: null,
        id: null,
        token: null,
        isAuthenticated: false,
      });
    }
  },
}));
