import { GraduationCap, UserCheck, UserX } from "lucide-react";

const ClassStats = ({ totalClasses, assignedClasses, unAssignedClasses}: { totalClasses: number;
  assignedClasses: number;
  unAssignedClasses: number;}) => {
  const stats = [
    {
      title: "Total Classes",
      value: totalClasses,
      icon: GraduationCap,
      iconColor: "text-primary",
      iconBg: "bg-primaryLight",
    },
    {
      title: "Assigned Classes",
      value: assignedClasses,
      icon: UserCheck,
      iconColor: "text-success",
      iconBg: "bg-success/10",
    },
    {
      title: "Unassigned Classes",
      value: unAssignedClasses,
      icon: UserX,
      iconColor: "text-error",
      iconBg: "bg-error/10",
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
            border
            border-border
            bg-surface
            p-6
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
                  font-medium
                  text-textSecondary
                "
              >
                {stat.title}
              </p>

              <h2
                className="
                  mt-3
                  text-5xl
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
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                ${stat.iconBg}
              `}
            >
              <stat.icon size={30} className={stat.iconColor} />
            </div>
          </div>

          {/* FOOTER */}
          <div
            className="
              mt-6
              border-t
              border-border
              pt-4
            "
          >
            <p
              className="
                text-sm
                text-textSecondary
              "
            >
              {stat.title === "Total Classes" &&
                "All classes currently created"}

              {stat.title === "Assigned Classes" &&
                "Classes with a class teacher"}

              {stat.title === "Unassigned Classes" && "Need teacher assignment"}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ClassStats;
