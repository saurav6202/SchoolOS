import { UserCog, UserStar, User } from "lucide-react";

const TeacherStats = ({
  totalTeachers,
  classTeachers,
  nonClassTeachers,
}: {
  totalTeachers: number;
  classTeachers: number;
  nonClassTeachers: number;
}) => {
  const stats = [
    {
      title: "Total Teachers",
      value: totalTeachers,
      icon: UserCog,
      iconBg: "bg-primaryLight",
      iconColor: "text-primary",
    },
    {
      title: "Class Teachers",
      value: classTeachers,
      icon: UserStar,
      iconBg: "bg-success/10",
      iconColor: "text-success",
    },
    {
      title: "Non-class Teacehrs",
      value: nonClassTeachers,
      icon: User,
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
    },
  ];

  return (
    <section
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="
            rounded-2xl
            w-full
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
              <stat.icon size={26} className={stat.iconColor} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TeacherStats;
