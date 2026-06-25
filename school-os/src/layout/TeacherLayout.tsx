import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { teacherSidebarItems } from "../constants/teacherSidebar";

const TeacherLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar sidebarItems={teacherSidebarItems} role="Teacher"/>
      <div className="ml-72">
        <Navbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
