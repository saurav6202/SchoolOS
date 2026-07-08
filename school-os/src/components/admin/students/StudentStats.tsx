import { Users, GraduationCap, UserPlus } from "lucide-react";
import StatCard from "../../ui/StatCard";

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
      value: "0",
      icon: UserPlus,
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
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
        <StatCard stat={stat} key={stat.title} />
      ))}
    </section>
  );
};

export default StudentStats;
