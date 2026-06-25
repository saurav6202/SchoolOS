import { BookOpen, ClipboardCheck, Users } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { capitalize } from "../../../utils/string";

const WelcomeBanner = () => {
  const user = useAuthStore((state) => state.user);
  if (!user) return;

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
          {greeting}, {user ? capitalize(user.name.split(" ")[0]) : ""} Sir 👋
        </h1>

        <p
          className="
            mt-2
            text-textSecondary
          "
        >
          {formattedDate}
        </p>

        <div
          className="
            mt-3
            inline-flex
            rounded-full
            bg-primaryLight
            px-3
            py-1
            text-sm
            font-medium
            text-primary
          "
        >
          Class Teacher •{" "}
          {user
            ? `${user.assignedClass.name}${user.assignedClass.section}`
            : ""}
        </div>
      </div>

      {/* Quick Actions */}
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
          <BookOpen size={20} className="text-primary" />

          <h3
            className="
              mt-3
              font-semibold
              text-textPrimary
            "
          >
            Homework
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-textSecondary
            "
          >
            Pending Submission
          </p>
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
          <ClipboardCheck size={20} className="text-warning" />

          <h3
            className="
              mt-3
              font-semibold
              text-textPrimary
            "
          >
            Classwork
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-textSecondary
            "
          >
            Pending Submission
          </p>
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
          <Users size={20} className="text-success" />

          <h3
            className="
              mt-3
              font-semibold
              text-textPrimary
            "
          >
            Attendance
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-textSecondary
            "
          >
            Not Marked Today
          </p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
