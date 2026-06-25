import {
  CalendarDays,
  CalendarCheck,
  Clock3,
} from "lucide-react";

const SessionStats = () => {
  const stats = [
    {
      title: "Total Sessions",
      value: "4",
      icon: CalendarDays,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "Active Session",
      value: "2026-27",
      icon: CalendarCheck,
      iconBg: "bg-success/10",
      iconColor: "text-success",
    },
    {
      title: "Session Status",
      value: "Active",
      icon: Clock3,
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-textSecondary">
                  {item.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-textPrimary">
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
                  ${item.iconBg}
                `}
              >
                <Icon
                  size={22}
                  className={item.iconColor}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SessionStats;