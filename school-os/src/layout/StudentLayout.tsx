import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { studentSidebarItems } from "../constants/studentSidebar";

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar sidebarItems={studentSidebarItems} role="Student"/>
      <div className="ml-72">
        <Navbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
