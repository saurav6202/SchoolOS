import { Role } from "./role";

export interface User {
  _id: string;
  name: string;
  userId: string;
  role: (typeof Role)[keyof typeof Role] | null;
  mustChangePassword: boolean;
  [key: string]: any;
}

export interface AuthStore {
  role: string | null;
  id: string | null;
  token: string | null;
  user: User | null;

  login: (
    role: User["role"],
    id: string,
    token: string,
    user: User | null,
  ) => void;
  logout: () => void;
  fetchMe: () => Promise<void>;

  isAuthenticated: boolean;

  updateMustChangePassword: (value: boolean) => void;
}
