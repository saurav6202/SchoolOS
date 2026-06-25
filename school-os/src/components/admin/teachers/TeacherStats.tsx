import { UserCog, UserStar, User } from "lucide-react";
import StatCard from "../../common/StatCard";

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
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {stats.map((stat) => (
        <StatCard stat={stat}/>
      ))}
    </section>
  );
};

export default TeacherStats;
