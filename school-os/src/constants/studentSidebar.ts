import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Calendar,
  GraduationCap,
  CalendarCheck,
  FileText,
  Megaphone,
  PartyPopper,
  User,
  Settings,
} from "lucide-react";

import type { SidebarSecion } from "../types/sidebar";

export const studentSidebarItems: Array<SidebarSecion> = [
  {
    group: "MAIN",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/student/dashboard",
      },
    ],
  },

  {
    group: "ATTENDANCE",
    items: [
      {
        title: "My Attendance",
        icon: CalendarCheck,
        path: "/student/attendance",
      },
      {
        title: "Leave Requests",
        icon: FileText,
        path: "/student/leave-requests",
      },
    ],
  },

  {
    group: "ACADEMICS",
    items: [
      {
        title: "Attendance",
        icon: BookOpen,
        path: "/student/subjects",
      },
      {
        title: "Homework",
        icon: ClipboardList,
        path: "/student/homework",
      },
      {
        title: "Timetable",
        icon: Calendar,
        path: "/student/timetable",
      },
      {
        title: "Results",
        icon: GraduationCap,
        path: "/student/results",
      },
    ],
  },

  {
    group: "COMMUNICATION",
    items: [
      {
        title: "Notices",
        icon: Megaphone,
        path: "/student/notices",
      },
      {
        title: "Events",
        icon: PartyPopper,
        path: "/student/events",
      },
    ],
  },

  {
    group: "PROFILE",
    items: [
      {
        title: "My Profile",
        icon: User,
        path: "/student/profile",
      },
      {
        title: "Settings",
        icon: Settings,
        path: "/student/settings",
      },
    ],
  },
];
