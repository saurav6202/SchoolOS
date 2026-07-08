import type { LucideIcon } from "lucide-react";

type Stat = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
};

const StatCard = ({ stat }: { stat: Stat }) => {
  return (
    <div
      key={stat.title}
      className="
            rounded-2xl
            border
            border-border
            bg-surface
            p-6
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
                  font-medium
                  text-textSecondary
                "
          >
            {stat.title}
          </p>

          <h2
            className="
                  mt-3
                  text-5xl
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
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                ${stat.iconBg}
              `}
        >
          <stat.icon size={30} className={stat.iconColor} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
