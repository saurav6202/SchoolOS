import { CalendarDays, CalendarCheck, Clock3 } from "lucide-react";
import StatCard from "../../ui/StatCard";

interface StatDataType {
  activeSession: {
    isActive: boolean;
    name: string;
    _id: string;
  };
  totalSessions: number;
}

const SessionStats = ({ statData }: { statData: StatDataType }) => {
  const stats = [
    {
      title: "Total Sessions",
      value: statData.totalSessions,
      icon: CalendarDays,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "Active Session",
      value: statData?.activeSession ? statData.activeSession.name : "!",
      icon: CalendarCheck,
      iconBg: "bg-success/10",
      iconColor: "text-success",
    },
    {
      title: "Session Status",
      value: statData?.activeSession ? "Active" : "!",
      icon: Clock3,
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
    },
  ];

  return (
    <div
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
    </div>
  );
};

export default SessionStats;
