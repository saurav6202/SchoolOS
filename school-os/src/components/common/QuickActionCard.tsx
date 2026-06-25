import { CheckCircle2, Clock3 } from "lucide-react";

type QuickActionCardProps = {
  title: string;
  icon: React.ReactNode;
  status: "pending" | "submitted";
};

const QuickActionCard = ({
  title,
  icon,
  status,
}: QuickActionCardProps) => {
  const isSubmitted = status === "submitted";

  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-2xl
        border
        p-5
        transition-all
        duration-300
        ${
          isSubmitted
            ? "border-success/20 bg-success/5"
            : "border-error/20 bg-error/5"
        }
      `}
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            ${
              isSubmitted
                ? "bg-success/10 text-success"
                : "bg-error/10 text-error"
            }
          `}
        >
          {icon}
        </div>

        <div
          className={`
            flex
            items-center
            gap-1
            rounded-full
            px-3
            py-1
            text-xs
            font-medium
            ${
              isSubmitted
                ? "bg-success/10 text-success"
                : "bg-error/10 text-error"
            }
          `}
        >
          {isSubmitted ? (
            <>
              <CheckCircle2 size={14} />
              Submitted
            </>
          ) : (
            <>
              <Clock3 size={14} />
              Pending
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mt-5">
        <h3
          className="
            text-lg
            font-semibold
            text-textPrimary
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            text-sm
            text-textSecondary
          "
        >
          {isSubmitted
            ? "Completed for today"
            : "Needs your attention"}
        </p>
      </div>

      {/* Bottom Indicator */}
      <div
        className={`
          absolute
          bottom-0
          left-0
          h-1
          w-full
          ${
            isSubmitted
              ? "bg-success"
              : "bg-error"
          }
        `}
      />
    </div>
  );
};

export default QuickActionCard;