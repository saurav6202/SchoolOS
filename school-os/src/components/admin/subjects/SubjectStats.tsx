import { BookOpen, GraduationCap, Layers3 } from "lucide-react";
import StatCard from "../../ui/StatCard";

const SubjectStats = ({
  totalSubjects,
  coreSubjects,
  optionalSubjects,
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

export default SubjectStats;
