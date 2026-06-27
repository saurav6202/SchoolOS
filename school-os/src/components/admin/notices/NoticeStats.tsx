import { Bell, Megaphone, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../../api/api";

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
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="
            rounded-2xl
            border
            border-border
            bg-surface
            p-5
            shadow-card
            transition-all
            duration-300
            hover:shadow-lg
          "
        >
          <div className="flex items-start justify-between">
            <div>
              <p
                className="
                  text-sm
                  text-textSecondary
                "
              >
                {stat.title}
              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-bold
                  text-textPrimary
                "
              >
                {stat.value}
              </h2>
            </div>

            <div
              className={`
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                ${stat.iconBg}
              `}
            >
              <stat.icon size={26} className={stat.iconColor} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default NoticeStats;
