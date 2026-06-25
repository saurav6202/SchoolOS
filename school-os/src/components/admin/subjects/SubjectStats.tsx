import { BookOpen, GraduationCap, Layers3 } from "lucide-react";
import StatCard from "../../common/StatCard";

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
        <StatCard stat={stat}/>
      ))}
    </section>
  );
};

export default SubjectStats;
