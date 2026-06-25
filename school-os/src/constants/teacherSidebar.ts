import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Calendar,
  ClipboardList,
  FileText,
  Bell,
  MessageSquare,
  UserCircle,
  Settings,
  History,
} from "lucide-react";

import type { SidebarSecion } from "../types/sidebar";

export const teacherSidebarItems: Array<SidebarSecion> = [
  {
    group: "MAIN",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/teacher/dashboard",
      },
    ],
  },
  {
    group: "ATTENDANCE",
    items: [
      {
        title: "Mark Attendance",
        icon: CalendarCheck,
        path: "/teacher/mark-attendance",
      },
      {
        title: "Attendance History",
        icon: History,
        path: "/teacher/attendance-history",
      },
    ],
  },

  {
    group: "ACADEMICS",
    items: [
      {
        title: "Academics Work",
        icon: ClipboardList,
        path: "/teacher/academics-work",
      },
      {
        title: "Exams & Marks",
        icon: FileText,
        path: "/teacher/exams",
      },
    ],
  },

  {
    group: "MY CLASSES",
    items: [
      {
        title: "Students",
        icon: Users,
        path: "/teacher/students",
      },
      {
        title: "Timetable",
        icon: Calendar,
        path: "/teacher/timetable",
      },
    ],
  },

  {
    group: "COMMUNICATION",
    items: [
      {
        title: "Notices",
        icon: Bell,
        path: "/teacher/notices",
      },
      {
        title: "Messages",
        icon: MessageSquare,
        path: "/teacher/messages",
      },
    ],
  },

  {
    group: "ACCOUNT",
    items: [
      {
        title: "Profile",
        icon: UserCircle,
        path: "/teacher/profile",
      },
      {
        title: "Settings",
        icon: Settings,
        path: "/teacher/settings",
      },
    ],
  },
];
