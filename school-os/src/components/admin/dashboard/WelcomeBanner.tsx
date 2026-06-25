import { Users, UserCog, Bell } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { capitalize } from "../../../utils/string";

const WelcomeBanner = () => {
  const { user } = useAuthStore();
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hour = today.getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <section
      className="
        rounded-2xl
        border
        border-border
        bg-surface
        p-6
        shadow-card
      "
    >
      {/* Top */}
      <div>
        <h1
          className="
            font-heading
            text-3xl
            font-bold
            text-textPrimary
          "
        >
          {greeting}, {capitalize(`${user?.name}`)} 👋
        </h1>

        <p
          className="
            mt-2
            text-textSecondary
          "
        >
          {formattedDate}
        </p>
      </div>

      {/* Overview */}
      <div
        className="
          mt-6
          grid
          gap-4
          md:grid-cols-3
        "
      >
        <div
          className="
            rounded-xl
            border
            border-border
            bg-background
            p-4
          "
        >
          <Users size={22} className="text-primary" />

          <h3
            className="
              mt-3
              text-2xl
              font-bold
              text-textPrimary
            "
          >
            1,250
          </h3>

          <p className="text-textSecondary">Total Students</p>
        </div>

        <div
          className="
            rounded-xl
            border
            border-border
            bg-background
            p-4
          "
        >
          <UserCog size={22} className="text-success" />

          <h3
            className="
              mt-3
              text-2xl
              font-bold
              text-textPrimary
            "
          >
            56
          </h3>

          <p className="text-textSecondary">Total Teachers</p>
        </div>

        <div
          className="
            rounded-xl
            border
            border-border
            bg-background
            p-4
          "
        >
          <Bell size={22} className="text-warning" />

          <h3
            className="
              mt-3
              text-2xl
              font-bold
              text-textPrimary
            "
          >
            12
          </h3>

          <p className="text-textSecondary">Active Notices</p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
