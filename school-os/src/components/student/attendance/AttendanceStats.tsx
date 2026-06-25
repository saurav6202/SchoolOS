import { CalendarCheck, CalendarX, CalendarClock, Percent } from "lucide-react";
import { useEffect } from "react";
import { useStudentStore } from "../../../store/student/studentStore";

const AttendanceStats = () => {
  const { statsData, loaded, refreshStudent } = useStudentStore();

  useEffect(() => {
    if (!loaded) {
      refreshStudent();
    }
  }, [loaded, refreshStudent]);

  const stats = [
    {
      title: "Attendance %",
      value: `${statsData.percentage}%`,
      icon: Percent,
      iconClass: "bg-primary/10 text-primary",
    },
    {
      title: "Present Days",
      value: statsData.present,
      icon: CalendarCheck,
      iconClass: "bg-success/10 text-success",
    },
    {
      title: "Absent Days",
      value: statsData.absent,
      icon: CalendarX,
      iconClass: "bg-danger/10 text-danger",
    },
    {
      title: "Total",
      value: statsData.total,
      icon: CalendarClock,
      iconClass: "bg-warning/10 text-warning",
    },
  ];

  return (
    <section
      className="
        grid
        gap-5
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              rounded-2xl
              border
              border-border
              bg-surface
              p-5
              shadow-card
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className="
                    text-sm
                    text-textSecondary
                  "
                >
                  {item.title}
                </p>

                <h3
                  className="
                    mt-2
                    text-3xl
                    font-bold
                    text-textPrimary
                  "
                >
                  {item.value}
                </h3>
              </div>

              <div
                className={`
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  ${item.iconClass}
                `}
              >
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default AttendanceStats;
