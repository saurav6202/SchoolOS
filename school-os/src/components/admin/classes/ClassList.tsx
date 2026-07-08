import {
  Search,
  UserCog,
  Pencil,
  Trash2,
  User,
  GraduationCap,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import api from "../../../api/api";
import EditClassModal from "./EditClassModal";
import { showError, showSuccess } from "../../../utils/toast";
import Loader from "../../ui/Loader";

type Teacher = {
  _id: string;
  name: string;
};

type Class = {
  _id: string;
  name: string;
  section: string;
  studentCount: number;
  classTeacher: { name: string; _id: string };
  subjects: Array<{
    _id: string;
    name: string;
    code: string;
  }>;
};

const ClassList = ({
  classes,
  loading,
  onSuccess,
  nonClassTeachers,
}: {
  classes: Array<Class>;
  loading: boolean;
  onSuccess: () => Promise<void>;
  nonClassTeachers: Teacher[];
}) => {
  const [search, setSearch] = useState("");

  const filteredClasses = useMemo(() => {
    return classes.filter(
      (cls) =>
        cls.name == search ||
        cls.section.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, classes]);

  useEffect(() => {}, [filteredClasses]);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const handleEdit = (classItem: Class) => {
    console.log(classItem);

    setSelectedClass(classItem);
    setIsEditOpen(true);
  };

  const handleDelete = async (classId: string) => {
    // const confirmDelete = window.confirm("Delete this class?");

    // if (confirmDelete) {
    try {
      const res = await api.delete(`/api/classes/${classId}`);
      showSuccess(res.data.message);
      onSuccess();
    } catch (error: any) {
      showError(error.response.data.message);
    }
    // }
  };

  const showLoading = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return (
      <section
        className="
          flex
          p-6
          bg-surface
          border border-border rounded-2xl
          shadow-card
          items-center gap-3
        "
      >
        Loading...
        <Loader borderColor="border-textPrimary" />
      </section>
    );
  };
  if (loading) showLoading();

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
          p-6
          border-b border-border
          gap-4
          lg:flex-row lg:items-center lg:justify-between
        "
      >
        <div>
          <h2
            className="
              text-lg font-semibold text-textPrimary
            "
          >
            Classes
          </h2>

          <p
            className="
              mt-1
              text-sm text-textSecondary
            "
          >
            Manage all classes
          </p>
        </div>

        <div
          className="
            w-full
            relative
            lg:w-80
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
            placeholder="Search classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              py-3 pl-10 pr-4
              rounded-xl border border-border
              outline-none focus:border-primary
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
                Class
              </th>

              <th
                className="
                  px-6 py-4
                  text-left text-sm font-semibold
                "
              >
                Class Teacher
              </th>

              <th
                className="
                  px-6 py-4
                  text-left text-sm font-semibold
                "
              >
                Students
              </th>

              <th
                className="
                  px-6 py-4
                  text-left text-sm font-semibold
                "
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((item) => (
                <tr
                  key={item._id}
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
                        <GraduationCap
                          size={18}
                          className="
                            text-primary
                          "
                        />
                      </div>

                      <span
                        className="
                          font-medium
                        "
                      >
                        {item.name}
                        {item.section}
                      </span>
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
                        items-center gap-2
                      "
                    >
                      <User
                        size={16}
                        className="
                          text-textSecondary
                        "
                      />

                      <span
                        className={`
                          ${
                            item.classTeacher.name
                              ? "text-textPrimary"
                              : "text-error/80 "
                          }
                        `}
                      >
                        {item.classTeacher.name || "Not assigned"}
                      </span>
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
                        items-center gap-2
                      "
                    >
                      <Users
                        size={16}
                        className="
                          text-textSecondary
                        "
                      />

                      <span>{item.studentCount}</span>
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
                        onClick={() => handleEdit(item)}
                        className="
                          p-2
                          rounded-lg border border-border
                          hover:border-primary
                        "
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
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
                    No Class Found
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

      <EditClassModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        classData={selectedClass}
        teachers={nonClassTeachers}
      />
    </section>
  );
};

export default ClassList;
