import {
  Search,
  UserCog,
  Pencil,
  Trash2,
  Mail,
  UserStar,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";

type Teacher = {
  _id: string;
  name: string;
  teacherId: string;
  subjects: Array<string>;
  assignedClass: { className: number; section: string };
  email: string;
};

const TeacherList = ({ teachers }: { teachers: Array<Teacher> }) => {
  const [search, setSearch] = useState("");
  // console.log("teachers: ", teachers);
  const filteredTeachers = useMemo(() => {
    return teachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(search.toLowerCase()) ||
        teacher.teacherId.toLowerCase().includes(search.toLowerCase()) ||
        teacher.subjects
          .map((s) => s.toLocaleLowerCase())
          .includes(search.toLowerCase()),
    );
  }, [search, teachers]);

  const handleEdit = (id: string) => {
    console.log("Edit Teacher:", id);

    /**
     * Open Edit Modal
     */
  };

  const handleDelete = (id: string) => {
    console.log("Delete Teacher:", id);

    /**
     * Open ConfirmDialog
     */
  };

  return (
    <section
      className="
        bg-surface
        rounded-2xl border border-border
        shadow-card
      "
    >
      {/* HEADER */}
      <div
        className="
          flex flex-col
          p-4
          border-b border-border
          gap-4
          sm:flex-row sm:p-5 sm:items-center sm:justify-between
          lg:p-6
        "
      >
        <div>
          <h2
            className="
              text-lg font-semibold text-textPrimary
            "
          >
            Teachers
          </h2>

          <p
            className="
              mt-1
              text-sm text-textSecondary
            "
          >
            Manage all teachers
          </p>
        </div>

        <div
          className="
            w-full
            relative
            sm:max-w-xs
          "
        >
          <Search
            size={18}
            className="
              text-textSecondary
              absolute left-3 top-1/2 -translate-y-1/2
            "
          />

          <input
            type="text"
            placeholder="Search teacher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              py-3 pl-10 pr-4
              text-sm
              rounded-xl border border-border
              transition-colors
              outline-none focus:border-primary
              sm:text-base
            "
          />
        </div>
      </div>

      {/* TABLE */}
      <div
        className="
          overflow-x-auto
        "
      >
        <table
          className="
            w-full
          "
        >
          <thead>
            <tr
              className="
                bg-background
                border-b border-border
              "
            >
              <th
                className="
                  px-6 py-4
                  text-left text-sm font-semibold
                "
              >
                Teacher
              </th>

              <th
                className="
                  px-6 py-4
                  text-left text-sm font-semibold
                "
              >
                Employee ID
              </th>

              <th
                className="
                  px-6 py-4
                  text-left text-sm font-semibold
                "
              >
                Subjects
              </th>

              <th
                className="
                  px-6 py-4
                  text-left text-sm font-semibold
                "
              >
                Class
              </th>

              <th
                className="
                  px-6 py-4
                  text-left text-sm font-semibold
                "
              >
                Email
              </th>

              <th
                className="
                  px-6 py-4
                  text-center text-sm font-semibold
                "
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <tr
                  key={teacher._id}
                  className="
                    border-b border-border
                    hover:bg-background
                  "
                >
                  <td
                    className="
                      px-6 py-4
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
                          rounded-lg
                          items-center justify-center
                        "
                      >
                        {teacher.assignedClass.className ? (
                          <UserStar
                            size={18}
                            className="
                              text-primary
                            "
                          />
                        ) : (
                          <User
                            size={18}
                            className="
                              text-primary
                            "
                          />
                        )}
                      </div>

                      <span
                        className="
                          font-medium
                        "
                      >
                        {teacher.name}
                      </span>
                    </div>
                  </td>

                  <td
                    className="
                      px-6 py-4
                    "
                  >
                    {teacher.teacherId}
                  </td>

                  <td
                    className="
                      px-6 py-4
                    "
                  >
                    {teacher.subjects.join(", ")}
                  </td>

                  <td
                    className="
                      px-6 py-4
                    "
                  >
                    {teacher.assignedClass.className ? (
                      <span
                        className="
                          px-3 py-1
                          text-xs font-medium text-success
                          bg-success/10
                          rounded-full
                        "
                      >
                        {teacher.assignedClass.className}
                        {teacher.assignedClass.section}
                      </span>
                    ) : (
                      <p
                        className="
                          text-sm text-textSecondary
                        "
                      ></p>
                    )}
                  </td>
                  <td
                    className="
                      px-6 py-4
                    "
                  >
                    <div
                      className="
                        flex
                        items-center gap-2
                      "
                    >
                      <Mail size={14} />
                      {teacher.email}
                    </div>
                  </td>

                  <td
                    className="
                      px-6 py-4
                    "
                  >
                    <div
                      className="
                        flex
                        justify-center gap-2
                      "
                    >
                      <button
                        onClick={() => handleEdit(teacher._id)}
                        className="
                          p-2
                          rounded-lg border border-border
                          hover:border-primary
                        "
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(teacher._id)}
                        className="
                          p-2
                          text-error
                          rounded-lg border border-error/30
                          hover:bg-error/10
                        "
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="
                    px-6 py-16
                    text-center
                  "
                >
                  <UserCog
                    size={42}
                    className="
                      mx-auto
                      text-textSecondary
                    "
                  />

                  <h3
                    className="
                      mt-4
                      font-semibold
                    "
                  >
                    No Teachers Found
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm text-textSecondary
                    "
                  >
                    Try a different search.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TeacherList;
