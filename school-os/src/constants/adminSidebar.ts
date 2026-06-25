import {
  LayoutDashboard,
  Users,
  UserCog,
  Bell,
  Settings,
  GraduationCap,
  Notebook,
} from "lucide-react";

import type { SidebarSecion } from "../types/sidebar";

export const adminSidebarItems: Array<SidebarSecion> = [
  {
    group: "OVERVIEW",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
      },
    ],
  },

  {
    group: "USER MANAGEMENT",
    items: [
      {
        title: "Students",
        icon: Users,
        path: "/admin/students",
      },
      {
        title: "Teachers",
        icon: UserCog,
        path: "/admin/teachers",
      },
    ],
  },

  {
    group: "CLASSES & SUBJECTS",
    items: [
          {
        title: "Classes",
        icon: GraduationCap,
        path: "/admin/classes",
      },
      {
        title: "Subjects",
        icon: Notebook,
        path: "/admin/subjects",
      },
      {
        title: "Academic Session",
        icon: Notebook,
        path: "/admin/academic-session",
      },
      {
        title: "Settings",
        icon: Notebook,
        path: "/admin/settings",
      }
    ],
  },
  {
    group: "COMMUNICATION",
    items: [
      {
        title: "Notices",
        icon: Bell,
        path: "/admin/notices",
      },
    ],
  },

  {
    group: "SYSTEM",
    items: [
      {
        title: "Settings",
        icon: Settings,
        path: "/admin/settings",
      },
    ],
  },
];