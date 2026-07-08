import { UserCog, UserStar, User } from "lucide-react";
import StatCard from "../../ui/StatCard";

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

export default TeacherStats;
