import { CalendarCheck } from "lucide-react";
import AttendanceCalendar from "../attendance/AttendanceCalendar";
import { useStudentStore } from "../../../store/student/studentStore";

const AttendanceHeatmap = () => {
  const { statsData } = useStudentStore();
  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-surface
        shadow-card
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-border
          px-6
          py-5
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-textPrimary
            "
          >
            Attendance Overview
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-textSecondary
            "
          >
            Track your attendance throughout the year
          </p>
        </div>

        <CalendarCheck size={22} className="text-primary" />
      </div>

      {/* OVERVIEW */}
      <div className="p-6">
        <div
          className="
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-3">
              <h3
                className="
                  text-5xl
                  font-bold
                  text-textPrimary
                "
              >
                {statsData.percentage}%
              </h3>

              <span
                className="
                  rounded-full
                  bg-success/10
                  px-3
                  py-1
                  text-sm
                  font-medium
                  text-success
                "
              >
                Excellent
              </span>
            </div>

            <p
              className="
                mt-2
                text-textSecondary
              "
            >
              Current Month Attendance
            </p>
          </div>

          {/* RIGHT */}
          <div
            className="
              grid
              w-full
              max-w-md
              grid-cols-2
              gap-4
            "
          >
            <div
              className="
                rounded-xl
                bg-background
                p-4
              "
            >
              <p
                className="
                  text-sm
                  text-textSecondary
                "
              >
                Present Days
              </p>

              <h4
                className="
                  mt-2
                  text-2xl
                  font-semibold
                  text-success
                "
              >
                {statsData.present}
              </h4>
            </div>

            <div
              className="
                rounded-xl
                bg-background
                p-4
              "
            >
              <p
                className="
                  text-sm
                  text-textSecondary
                "
              >
                Absent Days
              </p>

              <h4
                className="
                  mt-2
                  text-2xl
                  font-semibold
                  text-error
                "
              >
                {statsData.absent}
              </h4>
            </div>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mt-8">
          <div
            className="
              mb-2
              flex
              justify-between
              text-sm
            "
          >
            <span className="text-textSecondary">Monthly Attendance</span>

            <span
              className="
                font-medium
                text-textPrimary
              "
            >
              {statsData.percentage}%
            </span>
          </div>

          <div
            className="
              h-3
              overflow-hidden
              rounded-full
              bg-background
            "
          >
            <div
              className="
                h-full
                rounded-full
                bg-success
                transition-all
                duration-500
              "
              style={{
                width: `${statsData.percentage}%`,
              }}
            />
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-8 border-t border-border" />

        {/* MONTHLY HEATMAP */}
        <AttendanceCalendar />
      </div>
    </section>
  );
};

export default AttendanceHeatmap;
