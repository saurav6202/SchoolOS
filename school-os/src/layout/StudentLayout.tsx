import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { studentSidebarItems } from "../constants/studentSidebar";
import { useState } from "react";

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
       <Sidebar
        role="Student"
        sidebarItems={studentSidebarItems}
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

export default StudentLayout;
