import {
  Bell,
  Globe,
  Users,
  UserCog,
  AlertTriangle,
  Clock3,
  CheckCircle2,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import Button from "../../common/Button";

const notices = [
  {
    id: 1,
    title: "Unit Test Schedule Released",
    audience: "everyone",
    priority: "high",
    createdAt: "Today, 09:30 AM",
  },
  {
    id: 2,
    title: "Homework Submission Deadline",
    audience: "students",
    priority: "medium",
    createdAt: "Yesterday",
  },
  {
    id: 3,
    title: "Staff Meeting Tomorrow",
    audience: "teachers",
    priority: "low",
    createdAt: "2 Days Ago",
  },
];

const audienceConfig = {
  students: {
    icon: Users,
    label: "Students",
    className: "bg-primaryLight text-primary",
  },

  teachers: {
    icon: UserCog,
    label: "Teachers",
    className: "bg-warning/10 text-warning",
  },

  everyone: {
    icon: Globe,
    label: "Everyone",
    className: "bg-success/10 text-success",
  },
};

const priorityConfig = {
  low: {
    icon: CheckCircle2,
    label: "Low",
    className: "bg-success/10 text-success",
  },

  medium: {
    icon: Clock3,
    label: "Medium",
    className: "bg-warning/10 text-warning",
  },

  high: {
    icon: AlertTriangle,
    label: "High",
    className: "bg-error/10 text-error",
  },
};

const ActiveNotices = () => {
  const handleEdit = (noticeId: number) => {
    console.log("Edit", noticeId);
  };

  const handleDelete = (noticeId: number) => {
    const confirmDelete = window.confirm("Delete this notice?");

    if (confirmDelete) {
      console.log("Delete", noticeId);
    }
  };

  return (
    <section
      className="
        p-6
        bg-surface
        rounded-2xl border border-border
        shadow-card
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          items-center gap-3
        "
      >
        <div
          className="
            flex
            h-12 w-12
            bg-primaryLight
            rounded-xl
            items-center justify-center
          "
        >
          <Bell
            size={22}
            className="
              text-primary
            "
          />
        </div>

        <div>
          <h2
            className="
              text-lg font-semibold text-textPrimary
            "
          >
            Active Notices
          </h2>

          <p
            className="
              text-sm text-textSecondary
            "
          >
            Currently published notices
          </p>
        </div>
      </div>

      {/* LIST */}
      <div
        className="
          mt-6 space-y-4
        "
      >
        {notices.map((notice) => {
          const audience =
            audienceConfig[notice.audience as keyof typeof audienceConfig];

          const priority =
            priorityConfig[notice.priority as keyof typeof priorityConfig];

          return (
            <div
              key={notice.id}
              className="
                p-4
                bg-background
                rounded-xl border border-border
                transition-all
                hover:border-primary/30
              "
            >
              {/* TOP */}
              <div
                className="
                  flex
                  items-start justify-between gap-4
                "
              >
                <div>
                  <h3
                    className="
                      font-semibold text-textPrimary
                    "
                  >
                    {notice.title}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-sm text-textSecondary
                    "
                  >
                    Published: {notice.createdAt}
                  </p>
                </div>

                <button
                  className="
                    p-2
                    rounded-lg
                    transition-all
                    hover:bg-surface
                  "
                >
                  <Eye
                    size={18}
                    className="
                      text-textSecondary
                    "
                  />
                </button>
              </div>

              {/* BADGES */}
              <div
                className="
                  flex flex-wrap
                  mt-4
                  gap-2
                "
              >
                <div
                  className={`
                    flex
                    px-3 py-1
                    text-xs font-medium
                    rounded-full
                    items-center gap-2 ${audience.className}
                  `}
                >
                  <audience.icon size={14} />
                  {audience.label}
                </div>

                <div
                  className={`
                    flex
                    px-3 py-1
                    text-xs font-medium
                    rounded-full
                    items-center gap-2 ${priority.className}
                  `}
                >
                  <priority.icon size={14} />
                  {priority.label}
                </div>
              </div>

              {/* ACTIONS */}
              <div
                className="
                  flex
                  justify-end
                "
              >
                <div
                  className="
                  flex
                  mt-4
                  gap-3
                "
                >
                  <Button
                    handleClick={() => handleEdit(notice.id)}
                    className="
                    text-black text-sm
                    bg-surface
                    border border-border
                    hover:border-primary
                  "
                  >
                    <Pencil size={16} />
                    Edit
                  </Button>

                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="
                    flex
                    px-6 py-3
                    text-sm font-medium text-white
                    bg-error
                    rounded-xl
                    transition-all
                    items-center justify-center gap-2 hover:opacity-90
                  "
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ActiveNotices;
