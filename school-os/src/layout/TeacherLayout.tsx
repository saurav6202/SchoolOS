import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { teacherSidebarItems } from "../constants/teacherSidebar";
import { useState } from "react";

const TeacherLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
         <Sidebar
        role="Teacher"
        sidebarItems={teacherSidebarItems}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />
      <div className="ml-72">
              <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
