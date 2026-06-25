import { Users, GraduationCap, UserPlus } from "lucide-react";
import StatCard from "../../common/StatCard";

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
        grid
        gap-6
        md:grid-cols-3
      "
    >
      {stats.map((stat) => (
        <StatCard stat={stat} />
      ))}
    </section>
  );
};

export default StudentStats;
