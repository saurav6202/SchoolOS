import React, { lazy, useMemo } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import PortalLogin from "../pages/PortalLogin";
import ProtectedRoute from "../components/ProtectedRoute";
import { Role } from "../types/role";
import { useAuthStore } from "../store/authStore";

import ChangePassword from "../pages/ChangePassword";

const NotFound = lazy(() => import("../pages/NotFound.tsx"));

const Students = lazy(() => import("../pages/admin/Students"));
const Teachers = lazy(() => import("../pages/admin/Teachers"));
const Notices = lazy(() => import("../pages/admin/Notices"));
const Classes = lazy(() => import("../pages/admin/Classes"));
const Subjects = lazy(() => import("../pages/admin/Subjects"));
const AcademicSession = lazy(() => import("../pages/admin/AcademicSession"));
const SchoolSettings = lazy(() => import("../pages/admin/SchoolSettings"));

const Attendance = lazy(() => import("../pages/teacher/Attendance"));
const Academic = lazy(() => import("../pages/teacher/Academic"));

const MyAttendance = lazy(() => import("../pages/student/MyAttendance"));

const AttendanceHistory = lazy(
  () => import("../components/teacher/attendance/AttendanceHistory"),
);

const AttendanceDetails = lazy(
  () => import("../components/teacher/attendance/AttendanceDetails"),
);

const StudentLayout = lazy(() => import("../layout/StudentLayout"));
const TeacherLayout = lazy(() => import("../layout/TeacherLayout"));
const AdminLayout = lazy(() => import("../layout/AdminLayout"));

const StudentDashboard = lazy(() => import("../pages/student/Dashboard"));
const TeacherDashboard = lazy(() => import("../pages/teacher/Dashboard"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));

function GuestRoute({ children }: { children: React.ReactNode }) {
  const role = useAuthStore((state) => state.role);
  if (role) {
    return <RootRedirect />;
  }
  return children;
}

function RootRedirect() {
  const role = useAuthStore((state) => state.role);
  switch (role) {
    case "student":
      return <Navigate to="/student/dashboard" replace />;
    case "teacher":
      return <Navigate to="/teacher/dashboard" replace />;
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;

    default:
      return <Navigate to="/login" replace />;
  }
}

function AppRoutes() {
  const routes = useMemo(
    () => [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/",
        element: <RootRedirect />,
      },
      {
        path: "/student",
        element: (
          <ProtectedRoute allowedRole={Role.STUDENT}>
            <StudentLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <StudentDashboard />,
          },
          {
            path: "attendance",
            element: <MyAttendance />,
          },
        ],
      },
      {
        path: "/teacher",
        element: (
          <ProtectedRoute allowedRole={Role.TEACHER}>
            <TeacherLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <TeacherDashboard />,
          },
          {
            path: "mark-attendance",
            element: <Attendance />,
          },
          {
            path: "attendance-history",
            element: <AttendanceHistory />,
          },
          {
            path: "attendance-history/:attendanceId",
            element: <AttendanceDetails />,
          },
          {
            path: "academics-work",
            element: <Academic />,
          },
        ],
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute allowedRole={"admin"}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "students",
            element: <Students />,
          },
          {
            path: "teachers",
            element: <Teachers />,
          },
          {
            path: "classes",
            element: <Classes />,
          },
          {
            path: "subjects",
            element: <Subjects />,
          },
          {
            path: "notices",
            element: <Notices />,
          },
          {
            path: "academic-session",
            element: <AcademicSession />,
          },
          {
            path: "settings",
            element: <SchoolSettings />,
          },
        ],
      },

      {
        path: "/login",
        element: (
          <GuestRoute>
            <PortalLogin />
          </GuestRoute>
        ),
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
    ],
    [],
  );
  return useRoutes(routes);
}

export default AppRoutes;
