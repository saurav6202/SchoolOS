import { BookOpen, GraduationCap, Layers3 } from "lucide-react";

const SubjectStats = ({
  totalSubjects,
  coreSubjects,
  optionalSubjects,
  loading,
}: {
  optionalSubjects: number;
  coreSubjects: number;
  totalSubjects: number;
  loading: boolean;
}) => {

  const stats = [
    {
      title: "Total Subjects",
      value: totalSubjects,
      icon: BookOpen,
      iconBg: "bg-primaryLight",
      iconColor: "text-primary",
    },
    {
      title: "Core Subjects",
      value: coreSubjects,
      icon: GraduationCap,
      iconBg: "bg-success/10",
      iconColor: "text-success",
    },
    {
      title: "Optional Subjects",
      value: optionalSubjects,
      icon: Layers3,
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
                {loading ? <p className="text-xl">Loading...</p> : stat.value}
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

export default SubjectStats;
