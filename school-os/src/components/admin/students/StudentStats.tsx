import { Users, GraduationCap, UserPlus } from "lucide-react";

const StudentStats = ({
  totalClasses,
  totalStudents,
}: {
  totalClasses: number;
  totalStudents: number;
}) => {
  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      iconBg: "bg-primaryLight",
      iconColor: "text-primary",
    },
    {
      title: "Total Classes",
      value: totalClasses,
      icon: GraduationCap,
      iconBg: "bg-success/10",
      iconColor: "text-success",
    },
    {
      title: "New Admissions",
      value: "4",
      icon: UserPlus,
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
    },
  ];

  return (
    <section
      className="
        grid
        gap-6
        md:grid-cols-3
      "
    >
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="
            group
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
              <stat.icon size={26} className={stat.iconColor} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StudentStats;
