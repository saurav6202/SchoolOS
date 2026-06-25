import { Bell, Search, ChevronDown } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { user } = useAuthStore();
  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-[72px]
        items-center
        justify-between
        border-b
        border-border
        bg-surface/90
        px-6
        backdrop-blur-md
      "
    >
      {/* SEARCH */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-textSecondary
          "
        />

        <input
          type="text"
          placeholder="Search homework, notices..."
          className="
            h-11
            w-full
            rounded-xl
            border
            border-border
            bg-background
            pl-11
            pr-4
            text-sm
            outline-none
            transition
            focus:border-primary
          "
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* NOTIFICATION */}
        <button
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-border
            bg-surface
            hover:bg-background
          "
        >
          <Bell size={20} />

          <span
            className="
              absolute
              right-2
              top-2
              h-2
              w-2
              rounded-full
              bg-error
            "
          />
        </button>

        {/* PROFILE */}
        <button
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-border
            px-3
            py-2
            hover:bg-background
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-primary
              font-semibold
              text-white
            "
          >
            {user?.name.charAt(0)}
          </div>

          <div className="text-left">
            <p
              className="
                text-sm
                font-medium
                text-textPrimary
              "
            >
              {user?.name}
            </p>

            <p
              className="
                text-xs
                text-textSecondary
              "
            >
              {user?.userId}
            </p>
          </div>

          <ChevronDown size={16} className="text-textSecondary" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
