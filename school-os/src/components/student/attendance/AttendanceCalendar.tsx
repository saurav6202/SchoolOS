import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStudentStore } from "../../../store/student/studentStore";

export default function AttendanceCalendar() {
  const { attendance, holidays, loaded, refreshStudent } = useStudentStore();

  useEffect(() => {
    if (!loaded) {
      refreshStudent();
    }
  }, [loaded, refreshStudent]);

  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getCalendarColumns = () => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const columns: (number | null)[][] = Array.from({ length: 7 }, () => []);

    for (let i = 0; i < firstDay; i++) {
      columns[i].push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      const weekday = new Date(year, month, day).getDay();
      columns[weekday].push(day);
    }

    return columns;
  };

  const calendarColumns = getCalendarColumns();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Attendance Map

  const attendanceMap = new Map<string, "present" | "absent">();

  attendance.forEach((item) => {
    attendanceMap.set(item.date, item.status);
  });

  const formatDate = (day: number) => {
    const d = new Date(year, month, day);

    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  };

  const getStatus = (day: number) => {
    const dateKey = formatDate(day).toString();
    return attendanceMap.get(dateKey);
  };

  // Holiday Map

  const holidayMap = new Map<string, string>();

  holidays.forEach((holiday) => {
    holidayMap.set(holiday.date, holiday.title);
  });

  const getHoliday = (day: number) => {
    const dateKey = formatDate(day);
    return holidayMap.get(dateKey);
  };

  return (
    <section
      className="
        bg-surface
        rounded-2xl border border-border
        shadow-card
      "
    >
      {/* Header */}
      <div
        className="
          flex
          p-6
          border-b border-border
          items-center justify-between
        "
      >
        <button
          onClick={previousMonth}
          className="
            p-2
            rounded-xl border border-border
            transition-colors
            hover:border-primary hover:bg-background
          "
        >
          <ChevronLeft size={28} />
        </button>

        <div
          className="
            text-center
          "
        >
          <h2
            className="
              text-lg font-semibold text-textPrimary
            "
          >
            {monthName} {year}
          </h2>

          <p
            className="
              mt-1
              text-sm text-textSecondary
            "
          >
            Academic Calendar
          </p>
        </div>

        <button
          onClick={nextMonth}
          className="
            p-2
            rounded-xl border border-border
            transition-colors
            hover:border-primary hover:bg-background
          "
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Calendar */}
      <div
        className="
          overflow-x-auto
          p-6
        "
      >
        <div
          className="
            grid grid-cols-7
            gap-6
          "
        >
          {weekDays.map((weekDay, columnIndex) => (
            <div
              key={weekDay}
              className="
                flex flex-col
                items-center gap-4
              "
            >
              <h3
                className="
                  text-sm font-medium text-textSecondary
                "
              >
                {weekDay}
              </h3>

              {calendarColumns[columnIndex].map((day, index) => {
                const status = day ? getStatus(day) : null;
                const holiday = day ? getHoliday(day) : null;

                const fullDate =
                  day &&
                  new Date(year, month, day).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  });

                return (
                  <div
                    key={index}
                    className={`
        flex
        h-14 w-14
        text-sm font-medium
        rounded-xl border
        transition-all
        relative group
        items-center justify-center

        ${
          holiday
            ? "bg-yellow-100 text-yellow-700 border-yellow-300"
            : status === "present"
              ? "bg-green-100 text-green-700 border-green-300"
              : status === "absent"
                ? "bg-red-100 text-red-700 border-red-300"
                : "bg-background border-border text-textPrimary"
        }

        ${!day ? "border-transparent bg-transparent" : ""}
        ${(status || holiday) && "hover:scale-105 hover:border-2"}
      `}
                  >
                    {day}

                    {(status || holiday) && (
                      <>
                        <div
                          className={`
              h-2 w-2
              rounded-full
              absolute bottom-1

              ${
                holiday
                  ? "bg-yellow-500"
                  : status === "present"
                    ? "bg-green-500"
                    : "bg-red-500"
              }
            `}
                        />

                        {/* TOOLTIP */}
                        <div
                          className="
              z-20
              mb-2 px-3 py-2
              whitespace-nowrap
              text-xs text-white
              bg-textPrimary
              rounded-lg
              opacity-0
              pointer-events-none
              transition-all
              shadow-lg
              absolute
              bottom-full
              left-1/2
              -translate-x-1/2
              duration-200
              group-hover:opacity-100
              group-hover:-translate-y-1
            "
                        >
                          <p className="font-medium">{fullDate}</p>

                          {holiday ? (
                            <>
                              <p className="text-yellow-300">Holiday</p>

                              <p>{holiday}</p>
                            </>
                          ) : (
                            <p className="opacity-90 capitalize">{status}</p>
                          )}

                          {/* Arrow */}
                          <div
                            className="
                border-4
                border-transparent
                border-t-textPrimary
                absolute
                top-full
                left-1/2
                -translate-x-1/2
              "
                          />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* LEGEND */}
      <div
        className="
          flex
          p-4
          border-t border-border
          items-center justify-center gap-6
        "
      >
        <div
          className="
            flex
            items-center gap-2
          "
        >
          <div
            className="
              h-3 w-3
              bg-green-500
              rounded-full
            "
          />

          <span
            className="
              text-sm text-textSecondary
            "
          >
            Present
          </span>
        </div>

        <div
          className="
            flex
            items-center gap-2
          "
        >
          <div
            className="
              h-3 w-3
              bg-red-500
              rounded-full
            "
          />

          <span
            className="
              text-sm text-textSecondary
            "
          >
            Absent
          </span>
        </div>
        <div
          className="
    flex
    items-center gap-2
  "
        >
          <div
            className="
      h-3 w-3
      bg-yellow-500
      rounded-full
    "
          />

          <span
            className="
      text-sm text-textSecondary
    "
          >
            Holiday
          </span>
        </div>
      </div>
    </section>
  );
}
