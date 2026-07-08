import { GraduationCap, UserCheck, UserX } from "lucide-react";
import StatCard from "../../ui/StatCard";

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
        grid grid-cols-2
        gap-4
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {stats.map((stat) => (
        <StatCard stat={stat} key={stat.title}/>
      ))}
    </section>
  );
};

export default ClassStats;
