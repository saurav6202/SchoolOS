import { Bell, Search, ChevronDown, BellOff, Menu } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { capitalize } from "../utils/string";
import { usePushNotifications } from "../hooks/usePushNotifications";
import Loader from "./ui/Loader";

type NavbarProps = {
  onMenuClick: () => void;
};

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { user } = useAuthStore();
  const { permission, enableNotifications, loading } = usePushNotifications();

  return (
    <header
      className="
        z-30 flex
        h-[72px]
        px-4
        bg-surface/90
        border-b border-border
        sticky top-0 items-center backdrop-blur-md justify-end
        sm:px-6
        lg:justify-between
      "
    >
      <button
        onClick={onMenuClick}
        className="
          mr-auto
          lg:hidden
        "
      >
        <Menu size={24} />
      </button>

      {/* SEARCH */}
      <div
        className="
          hidden
          w-full max-w-md
          relative
          lg:block
        "
      >
        <Search
          size={18}
          className="
            text-textSecondary
            absolute left-4 top-1/2 -translate-y-1/2
          "
        />

        <input
          type="text"
          placeholder="Search homework, notices..."
          className="
            h-11 w-full
            pl-11 pr-4
            text-sm
            bg-background
            rounded-xl border border-border
            outline-none transition focus:border-primary
          "
        />
      </div>

      {/* RIGHT */}
      <div
        className="
          flex
          items-center gap-4
        "
      >
        {/* NOTIFICATION */}
        <button
          onClick={permission !== "granted" ? enableNotifications : () => {}}
          className="
            flex
            h-11 w-11
            bg-surface
            rounded-xl border border-border
            group relative items-center justify-center hover:bg-background
          "
        >
          {permission === "granted" ? (
            <Bell size={20} />
          ) : (
            <>
              {loading ? (
                <Loader borderColor="border-primary" />
              ) : (
                <BellOff size={20} />
              )}

              {/* Tooltip */}
              <span
                className="
                  px-3 py-1
                  whitespace-nowrap text-xs text-white
                  bg-black
                  rounded-md
                  opacity-0 transition-opacity pointer-events-none
                  absolute -bottom-10 left-1/2 -translate-x-1/2 duration-200 group-hover:opacity-100
                "
              >
                Enable notifications
              </span>
            </>
          )}

          {/* <span
            className="
              h-2 w-2
              bg-error
              rounded-full
              absolute right-2 top-2
            "
          /> */}
        </button>

        {/* PROFILE */}
        <button
          className="
            flex
            py-2
            rounded-xl border-border
            items-center gap-3 hover:bg-background
            md:px-3 md:border
          "
        >
          <div
            className="
              flex
              h-10 w-10
              font-semibold text-white
              bg-primary
              rounded-full
              items-center justify-center
            "
          >
            {capitalize(`${user?.name.charAt(0)}`)}
          </div>

          <div
            className="
              hidden
              text-left
              sm:block
            "
          >
            <p
              className="
                text-sm font-medium text-textPrimary
              "
            >
              {capitalize(`${user?.name}`)}
            </p>

            <p
              className="
                text-xs text-textSecondary
              "
            >
              {user?.userId}
            </p>
          </div>

          <ChevronDown
            size={16}
            className="
              hidden
              text-textSecondary
              sm:block
            "
          />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
