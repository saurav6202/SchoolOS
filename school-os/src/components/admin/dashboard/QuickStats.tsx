import {
  GraduationCap,
  Users,
  UserCog,
  Bell,
} from "lucide-react";

const stats = [
  {
    title: "Students",
    value: "1,250",
    icon: Users,
  },
  {
    title: "Teachers",
    value: "56",
    icon: UserCog,
  },
  {
    title: "Classes",
    value: "32",
    icon: GraduationCap,
  },
  {
    title: "Notices",
    value: "12",
    icon: Bell,
  },
];

const QuickStats = () => {
  return (
    <section
      className="
        grid
        gap-6
        sm:grid-cols-2
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
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary">
                {stat.title}
              </p>

              <h2
                className="
                  mt-2
                  text-3xl
                  font-bold
                  text-textPrimary
                "
              >
                {stat.value}
              </h2>
            </div>

            <div
              className="
                rounded-xl
                bg-primaryLight
                p-3
              "
            >
              <stat.icon
                size={22}
                className="text-primary"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default QuickStats;