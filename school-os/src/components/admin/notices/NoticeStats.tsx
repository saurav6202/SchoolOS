import { Bell, Megaphone, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../../api/api";
import StatCard from "../../ui/StatCard";

const NoticeStats = () => {
  const [statData, setStatData] = useState({
    totalNotices: 0,
    highPriorityNotices: 0,
  });
  const fetchNoticeStats = async () => {
    const res = await api.get("/api/notices/getstats");
    setStatData(res.data.data);
  };

  useEffect(() => {
    fetchNoticeStats();
  }, []);

  const stats = [
    {
      title: "Total Notices",
      value: statData.totalNotices,
      icon: Bell,
      iconColor: "text-primary",
      iconBg: "bg-primaryLight",
    },
    {
      title: "Active Notices",
      value: statData.totalNotices,
      icon: Megaphone,
      iconColor: "text-success",
      iconBg: "bg-success/10",
    },
    {
      title: "High Priority",
      value: statData.highPriorityNotices,
      icon: AlertTriangle,
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
        <StatCard stat={stat} key={stat.title} />
      ))}
    </section>
  );
};

export default NoticeStats;
