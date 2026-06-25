import { ClipboardList } from "lucide-react";
import { BookOpen } from "lucide-react";
import { useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useStudentAcademicWorkStore } from "../../../store/student/studentAcademicWorkStore";

const AcademicWrok = () => {
  const { user } = useAuthStore();

  const { classworks, homeworks, fetchAcademicWork } =
    useStudentAcademicWorkStore();

  useEffect(() => {
    if (user?.classId?._id) {
      fetchAcademicWork(user.classId._id);
    }
  }, [user?.classId?._id]);

  return (
    <div
      className="
        grid
        gap-6
        lg:grid-cols-2
      "
    >
      <section
        className="
          overflow-hidden
          bg-surface
          rounded-2xl border border-border
          shadow-card
        "
      >
        {/* HEADER */}
        <div
          className="
            flex
            px-5 py-4
            border-b border-border
            items-center justify-between
          "
        >
          <div
            className="
              flex
              items-center gap-3
            "
          >
            <div
              className="
                flex
                h-10 w-10
                bg-primaryLight
                rounded-xl
                items-center justify-center
              "
            >
              <ClipboardList
                size={18}
                className="
                  text-primary
                "
              />
            </div>

            <div>
              <h2
                className="
                  font-semibold text-textPrimary
                "
              >
                Homework
              </h2>

              <p
                className="
                  text-xs text-textSecondary
                "
              >
                Today's assigned homework
              </p>
            </div>
          </div>

          <span
            className="
              px-3 py-1
              text-xs font-medium text-primary
              bg-primaryLight
              rounded-full
            "
          >
            {homeworks.length} Tasks
          </span>
        </div>

        {/* LIST */}
        <div
          className="
            divide-y divide-border
          "
        >
          {homeworks.map((homework) => (
            <div
              key={homework.id}
              className="
                flex
                p-4
                transition-colors
                items-start gap-4 hover:bg-background
              "
            >
              <div
                className="
                  flex-1
                "
              >
                <div
                  className="
                    flex
                    items-center justify-between
                  "
                >
                  <p
                    className="
                      text-sm font-semibold text-primary
                    "
                  >
                    {homework.subject}
                  </p>
                </div>

                <p
                  className={`
                    mt-1
                    text-sm
                    text-textPrimary
                  `}
                >
                  {homework.task}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="
          overflow-hidden
          bg-surface
          rounded-2xl border border-border
          shadow-card
        "
      >
        {/* HEADER */}
        <div
          className="
          flex
          px-5 py-4
          border-b border-border
          items-center justify-between
        "
        >
          <div
            className="
            flex
            items-center gap-3
          "
          >
            <div
              className="
              flex
              h-10 w-10
              bg-primaryLight
              rounded-xl
              items-center justify-center
            "
            >
              <BookOpen
                size={18}
                className="
                text-primary
              "
              />
            </div>

            <div>
              <h2
                className="
                font-semibold text-textPrimary
              "
              >
                Classwork
              </h2>

              <p
                className="
                text-xs text-textSecondary
              "
              >
                Topics covered in class today
              </p>
            </div>
          </div>

          <span
            className="
            px-3 py-1
            text-xs font-medium text-primary
            bg-primaryLight
            rounded-full
          "
          >
            {classworks.length} Subjects
          </span>
        </div>

        {/* LIST */}
        <div
          className="
          divide-y divide-border
        "
        >
          {classworks.map((item) => (
            <div
              key={item.id}
              className="
              p-4
              transition-colors
              hover:bg-background
            "
            >
              <p
                className="
                text-sm font-semibold text-primary
              "
              >
                {item.subject}
              </p>

              <p
                className="
                mt-1
                text-sm text-textPrimary
              "
              >
                {item.task}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AcademicWrok;
