import {
  Bell,
  Megaphone,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";

const stats = [
  {
    title: "Total Notices",
    value: 42,
    icon: Bell,
    iconColor: "text-primary",
    iconBg: "bg-primaryLight",
  },
  {
    title: "Active Notices",
    value: 12,
    icon: Megaphone,
    iconColor: "text-success",
    iconBg: "bg-success/10",
  },
  {
    title: "High Priority",
    value: 4,
    icon: AlertTriangle,
    iconColor: "text-error",
    iconBg: "bg-error/10",
  },
  {
    title: "Published Today",
    value: 3,
    icon: CalendarDays,
    iconColor: "text-warning",
    iconBg: "bg-warning/10",
  },
];

const NoticeStats = () => {
  return (
    <section
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="
            rounded-2xl
            border
            border-border
            bg-surface
            p-5
            shadow-card
            transition-all
            duration-300
            hover:shadow-lg
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
                {stat.title}
              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-bold
                  text-textPrimary
                "
              >
                {stat.value}
              </h2>
            </div>

            <div
              className={`
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                ${stat.iconBg}
              `}
            >
              <stat.icon
                size={26}
                className={stat.iconColor}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default NoticeStats;