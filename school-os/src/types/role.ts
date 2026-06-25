export const Role = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
} as const;

export type RoleType =
  (typeof Role)[keyof typeof Role];