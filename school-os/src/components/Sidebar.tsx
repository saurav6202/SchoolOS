import { NavLink } from "react-router-dom";
import type { SidebarSecion } from "../types/sidebar";
import logo from "../assets/logo.png";
import { useAuthStore } from "../store/authStore";
import { capitalize } from "../utils/string";

type SidebarProps = {
  role: string;
  sidebarItems: Array<SidebarSecion>;
};

const Sidebar = ({ sidebarItems, role }: SidebarProps) => {
  const { user } = useAuthStore();
  return (
    <aside className="bg-surface flex flex-col fixed  top-0 left-0 h-screen w-72 border-r border-border">
      <div className="flex border-b gap-3 items-center p-4 py-2 border-border">
        <img src={logo} alt="D.P.S Public school Logo" className="h-14" />

        <div>
          <h2 className="font-bold text-md text-textPrimary">
            DPS Public School
          </h2>
          <p className="text-textSecondary text-sm">{role} Portal</p>
        </div>
      </div>

      <div className="px-4 py-4 overflow-y-scroll scrollbar-hover h-full">
        {sidebarItems?.map((section) => (
          <div key={section.group} className="mb-8">
            <span className="font-semibold text-textSecondary text-xs tracking-wider px-2">
              {section.group}
            </span>

            <div className="space-y-1 mt-3">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-100 ease-in ${isActive ? "bg-primaryLight text-primary font-medium" : "text-textSecondary hover:bg-background hover:text-textPrimary"} `
                    }
                  >
                    <Icon size={20} />
                    <span>{item.title}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border px-4 py-3">
        <div className="bg-background p-3 rounded-lg flex gap-3 items-center">
          <div className="text-lg font-semibold bg-primary rounded-full text-white h-10 w-10 flex items-center justify-center">
            {user?.name.charAt(0)}
          </div>
          <div className="leading-tight">
            <p className="text-textPrimary">{user?.name}</p>
            <span className="text-textSecondary text-sm">
              {capitalize(role)}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
