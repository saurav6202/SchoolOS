import { CalendarDays, CalendarCheck, Clock3 } from "lucide-react";
import StatCard from "../../common/StatCard";

const SessionStats = ({
  statData,
}: {
  statData: { activeSession: null | string; totalSessions: number };
}) => {
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
      value:  statData?.activeSession ? statData.activeSession : "!",
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
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <StatCard stat={stat}/>
      ))}
    </div>
  );
};

export default SessionStats;
