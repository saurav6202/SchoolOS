import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { adminSidebarItems } from "../constants/adminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar sidebarItems={adminSidebarItems} role="Admin"/>
      <div className="ml-72">
        <Navbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
