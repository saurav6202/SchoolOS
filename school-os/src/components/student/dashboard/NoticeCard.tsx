import { Bell, X } from "lucide-react";

const NoticeCard = () => {
  const notice = {
    title: "Important Notice",
    content:
      "School will remain closed tomorrow due to maintenance work. All classes will resume normally the following day.",
    postedAt: "2 hours ago",
  };

  return (
    <section
      className="
        rounded-2xl
        border
        border-border
        bg-surface
        shadow-card
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-border
          px-5
          py-4
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-primaryLight
            "
          >
            <Bell
              size={18}
              className="text-primary"
            />
          </div>

          <div>
            <h2
              className="
                font-semibold
                text-textPrimary
              "
            >
              {notice.title}
            </h2>

            <p
              className="
                text-xs
                text-textSecondary
              "
            >
              Posted {notice.postedAt}
            </p>
          </div>
        </div>

        <button
          className="
            rounded-lg
            p-2
            text-textSecondary
            transition-colors
            hover:bg-background
          "
        >
          <X size={18} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <p
          className="
            leading-relaxed
            text-textPrimary
          "
        >
          {notice.content}
        </p>

        <button
          className="
            mt-4
            text-sm
            font-medium
            text-primary
            hover:underline
          "
        >
          Read More
        </button>
      </div>
    </section>
  );
};

export default NoticeCard;