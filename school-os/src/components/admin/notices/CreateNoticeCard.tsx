import {
  BellPlus,
  Users,
  UserCog,
  Globe,
  AlertTriangle,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import { useState } from "react";
import { capitalize } from "../../../utils/string";
import api from "../../../api/api";
import { showError, showSuccess } from "../../../utils/toast";
import Loader from "../../common/Loader";

type Audience = "students" | "teachers" | "everyone";

type Priority = "low" | "medium" | "high";

const CreateNoticeCard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [audience, setAudience] = useState<Audience>("everyone");

  const [priority, setPriority] = useState<Priority>("medium");

  const [isPublishing, setIsPublishing] = useState(false);

  const sendNotification = async (payload: {
    title: string;
    body: string;
    url: string;
    type: string;
  }) => {
    const res = await api.post("/api/notifications/send", { payload });
    if (res.data.success) {
      showSuccess("Notification sent 🚀");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsPublishing(true);

      const noticeData = {
        title,
        content,
        audience,
        priority,
      };

      const res = await api.post("/api/notices", noticeData);
      await sendNotification({
        title,
        body: content,
        url: "/",
        type: audience,
      });
      showSuccess(res.data.message);
      setTitle("");
      setContent("");
      setAudience("everyone");
      setPriority("medium");
    } catch (error: any) {
      showError(error.response.data.message);
    } finally {
      setIsPublishing(false);
    }
  };

  const audienceOptions = [
    {
      value: "students",
      label: "Students",
      icon: Users,
    },
    {
      value: "teachers",
      label: "Teachers",
      icon: UserCog,
    },
    {
      value: "everyone",
      label: "Everyone",
      icon: Globe,
    },
  ];

  const priorityOptions = [
    {
      value: "low",
      label: "Low",
      color: "border-success bg-success/10 text-success",
      icon: CheckCircle2,
    },
    {
      value: "medium",
      label: "Medium",
      color: "border-warning bg-warning/10 text-warning",
      icon: Clock3,
    },
    {
      value: "high",
      label: "High Priority",
      color: "border-error bg-error/10 text-error",
      icon: AlertTriangle,
    },
  ];

  return (
    <section
      className="
        rounded-2xl
        border
        border-border
        bg-surface
        p-6
        shadow-card
      "
    >
      {/* HEADER */}
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
          <BellPlus size={22} className="text-primary" />
        </div>

        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-textPrimary
            "
          >
            Create Notice
          </h2>

          <p
            className="
              text-sm
              text-textSecondary
            "
          >
            Publish announcements for students and teachers
          </p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* TITLE */}
        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-textPrimary
            "
          >
            Notice Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notice title"
            className="
              w-full
              rounded-xl
              border
              border-border
              px-4
              py-3
              outline-none
              transition-all
              focus:border-primary
            "
            required
          />
        </div>

        {/* CONTENT */}
        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-textPrimary
            "
          >
            Notice Content
          </label>

          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write notice here..."
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-border
              px-4
              py-3
              outline-none
              transition-all
              focus:border-primary
            "
            required
          />
        </div>
        <div className="flex justify-between items-center">
          {/* AUDIENCE */}
          <div>
            <h3
              className="
              mb-3
              text-sm
              font-medium
              text-textPrimary
            "
            >
              Audience
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {audienceOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAudience(option.value as Audience)}
                  className={`
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    p-4
                    transition-all

                    ${
                      audience === option.value
                        ? "border-primary bg-primaryLight"
                        : "border-border"
                    }
                  `}
                >
                  <option.icon size={20} />

                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* PRIORITY */}
          <div>
            <h3
              className="
              mb-3
              text-sm
              font-medium
              text-textPrimary
            "
            >
              Priority
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPriority(option.value as Priority)}
                  className={`
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    p-3
                    transition-all

                    ${
                      priority === option.value ? option.color : "border-border"
                    }
                  `}
                >
                  <option.icon size={18} />

                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PREVIEW */}
        <div
          className="
            rounded-xl
            border
            border-border
            bg-background
            p-4
          "
        >
          <h3
            className="
              mb-3
              text-sm
              font-medium
              text-textPrimary
            "
          >
            Notice Preview
          </h3>

          <div className="space-y-2">
            <p
              className="
                font-semibold
                text-textPrimary
              "
            >
              {title || "Notice title will appear here"}
            </p>

            <p
              className="
                text-sm
                text-textSecondary
              "
            >
              {content || "Notice content preview..."}
            </p>

            <div className="flex gap-2 pt-2">
              <span
                className="
                  rounded-full
                  bg-primaryLight
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-primary
                "
              >
                {capitalize(audience)}
              </span>

              <span
                className="
                  rounded-full
                  bg-primaryLight
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-primaryDark
                "
              >
                {capitalize(priority)}
              </span>
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isPublishing}
          className="
            w-full
            rounded-xl
            bg-primary
            py-3
            font-medium
            text-white
            transition-all
            hover:bg-primaryDark
            disabled:opacity-50
            flex
            justify-center
          "
        >
          {isPublishing ? (
            <div className="gap-3 flex items-center">
              Publishing... <Loader />
            </div>
          ) : (
            "Publish Notice"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreateNoticeCard;
