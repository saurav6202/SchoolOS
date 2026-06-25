import { GraduationCap, UserCheck, UserX } from "lucide-react";
import StatCard from "../../common/StatCard";

const ClassStats = ({
  totalClasses,
  assignedClasses,
  unAssignedClasses,
}: {
  totalClasses: number;
  assignedClasses: number;
  unAssignedClasses: number;
}) => {
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
        <StatCard stat={stat} />
      ))}
    </section>
  );
};

export default ClassStats;
