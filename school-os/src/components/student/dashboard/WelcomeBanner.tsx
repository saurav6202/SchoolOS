import { Bell, ClipboardList, CalendarCheck } from "lucide-react";
import { capitalize } from "../../../utils/string";
import { useAuthStore } from "../../../store/authStore";
import { useStudentStore } from "../../../store/student/studentStore";
import { useStudentAcademicWorkStore } from "../../../store/student/studentAcademicWorkStore";

const WelcomeBanner = () => {
  const { statsData } = useStudentStore();
  const { homeworks } = useStudentAcademicWorkStore();
  const today = new Date();
  const { user } = useAuthStore();

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
    <section>
      <h1
        className="
          text-4xl
          font-bold
          text-textPrimary
          font-heading
        "
      >
        {greeting}, {user?.name ? capitalize(user.name.split(" ")[0]) : ""} 👋
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
          mt-6
          flex
          flex-wrap
          gap-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-border
            bg-surface
            px-4
            py-2
          "
        >
          <ClipboardList size={16} className="text-primary" />

          <span className="text-sm font-medium">
            {homeworks.length} Homework
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-border
            bg-surface
            px-4
            py-2
          "
        >
          <Bell size={16} className="text-warning" />

          <span className="text-sm font-medium">1 New Notice</span>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-border
            bg-surface
            px-4
            py-2
          "
        >
          <CalendarCheck size={16} className="text-success" />

          <span className="text-sm font-medium">
            {statsData.percentage}% Attendance
          </span>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
