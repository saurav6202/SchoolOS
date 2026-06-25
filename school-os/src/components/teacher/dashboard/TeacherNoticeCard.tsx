import { Bell, AlertTriangle, ChevronRight } from "lucide-react";

const TeacherNoticeCard = () => {
  const notice = {
    title: "Monthly PTM Meeting",
    content:
      "All class teachers are requested to attend the Parent-Teacher Meeting on 15 June at 10:00 AM in the conference hall.",
    priority: "High",
    postedBy: "Admin",
    postedAt: "2 hours ago",
  };

  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-surface
        shadow-card
      "
    >
      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-border
          px-6
          py-5
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-primaryLight
            "
          >
            <Bell size={22} className="text-primary" />
          </div>

          <div>
            <h2
              className="
                text-lg
                font-semibold
                text-textPrimary
              "
            >
              Notice From Administration
            </h2>

            <p
              className="
                text-sm
                text-textSecondary
              "
            >
              Latest updates and instructions
            </p>
          </div>
        </div>

        <button
          className="
            flex
            items-center
            gap-1
            text-sm
            font-medium
            text-primary
            transition-colors
            hover:text-primaryDark
          "
        >
          View All
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Priority Badge */}
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-error/10
            px-3
            py-1
            text-sm
            font-medium
            text-error
          "
        >
          <AlertTriangle size={14} />
          {notice.priority} Priority
        </div>

        <h3
          className="
            mt-4
            text-xl
            font-semibold
            text-textPrimary
          "
        >
          {notice.title}
        </h3>

        <p
          className="
            mt-3
            leading-relaxed
            text-textSecondary
          "
        >
          {notice.content}
        </p>

        {/* Footer */}
        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            border-t
            border-border
            pt-4
          "
        >
          <div>
            <p
              className="
                text-sm
                text-textSecondary
              "
            >
              Posted by
            </p>

            <p
              className="
                font-medium
                text-textPrimary
              "
            >
              {notice.postedBy}
            </p>
          </div>

          <span
            className="
              text-sm
              text-textSecondary
            "
          >
            {notice.postedAt}
          </span>
        </div>
      </div>
    </section>
  );
};

export default TeacherNoticeCard;
