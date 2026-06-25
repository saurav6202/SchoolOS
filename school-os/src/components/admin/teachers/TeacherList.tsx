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
        rounded-2xl
        border
        border-border
        bg-surface
        shadow-card
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-border
          p-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-textPrimary
            "
          >
            Teachers
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-textSecondary
            "
          >
            Manage all teachers
          </p>
        </div>

        <div className="relative w-full lg:w-80">
          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-textSecondary
            "
          />

          <input
            type="text"
            placeholder="Search teacher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-border
              py-3
              pl-10
              pr-4
              outline-none
              focus:border-primary
            "
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className="
                border-b
                border-border
                bg-background
              "
            >
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Teacher
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Employee ID
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Subjects
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Class
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Email
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
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
                      border-b
                      border-border
                      hover:bg-background
                    "
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            bg-primaryLight
                          "
                      >
                        {teacher.assignedClass.className ? (
                          <UserStar size={18} className="text-primary" />
                        ) : (
                          <User size={18} className="text-primary" />
                        )}
                      </div>

                      <span className="font-medium">{teacher.name}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">{teacher.teacherId}</td>

                  <td className="px-6 py-4">{teacher.subjects.join(", ")}</td>

                  <td className="px-6 py-4">
                    {teacher.assignedClass.className ? (
                      <span
                        className="
                          rounded-full
                          bg-success/10
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-success
                        "
                      >
                        {teacher.assignedClass.className}
                        {teacher.assignedClass.section}
                      </span>
                    ) : (
                      <p className="text-sm text-textSecondary"></p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      {teacher.email}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(teacher._id)}
                        className="
                            rounded-lg
                            border
                            border-border
                            p-2
                            hover:border-primary
                          "
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(teacher._id)}
                        className="
                            rounded-lg
                            border
                            border-error/30
                            p-2
                            text-error
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
                    px-6
                    py-16
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
                      text-sm
                      text-textSecondary
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
