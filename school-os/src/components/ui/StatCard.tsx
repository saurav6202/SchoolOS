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
      className="
        rounded-2xl
        border border-border
        bg-surface
        shadow-card
        transition-all duration-300
        hover:shadow-lg

        p-4
        sm:p-5
        lg:p-6
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p
            className="
              text-xs
              sm:text-sm
              font-medium
              text-textSecondary
              truncate
            "
          >
            {stat.title}
          </p>

          <h2
            className="
              mt-2
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              leading-none
              text-textPrimary
            "
          >
            {stat.value}
          </h2>
        </div>

        <div
          className={`
            flex
            shrink-0
            items-center
            justify-center
            rounded-2xl

            h-12 w-12
            sm:h-14 sm:w-14
            lg:h-16 lg:w-16

            ${stat.iconBg}
          `}
        >
          <stat.icon
            className={stat.iconColor}
            size={20}
            strokeWidth={2.2}
          />
        </div>
      </div>
    </div>
  );
};

export default StatCard;