import { Search, Pencil, Trash2, BookOpen } from "lucide-react";
import { useState } from "react";

type Subject = {
  _id: string;
  name: string;
  code: string;
  category: "core" | "optional";
};

const SubjectsTable = ({
  subjects,
  loading,
}: {
  subjects: Array<Subject>;
  loading: boolean;
}) => {
  const [search, setSearch] = useState("");

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(search.toLowerCase()) ||
      subject.code.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEdit = (id: string) => {
    console.log("Edit:", id);

    /**
     * Open Edit Modal
     */
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Delete this subject?");

    if (!confirmDelete) return;

    console.log("Delete:", id);

    /**
     * await api.delete(`/subjects/${id}`)
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
            Subjects
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-textSecondary
            "
          >
            Manage all school subjects
          </p>
        </div>

        {/* SEARCH */}
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
            placeholder="Search subject..."
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
              transition-all
              focus:border-primary
            "
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center my-5 text-textSecondary">Loading...</p>
      ) : (
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
                  Subject
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Code
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Category
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject) => (
                  <tr
                    key={subject._id}
                    className="
                    border-b
                    border-border
                    transition-all
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
                          <BookOpen size={18} className="text-primary" />
                        </div>

                        <span className="font-medium text-textPrimary">
                          {subject.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-textSecondary">
                      {subject.code}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium

                        ${
                          subject.category === "core"
                            ? "bg-success/10 text-success"
                            : "bg-warning/10 text-warning"
                        }
                      `}
                      >
                        {subject.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(subject._id)}
                          className="
                          rounded-lg
                          border
                          border-border
                          p-2
                          transition-all
                          hover:border-primary
                        "
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(subject._id)}
                          className="
                          rounded-lg
                          border
                          border-error/30
                          p-2
                          text-error
                          transition-all
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
                    colSpan={5}
                    className="
                    px-6
                    py-16
                    text-center
                  "
                  >
                    <BookOpen
                      size={40}
                      className="
                      mx-auto
                      text-textSecondary
                    "
                    />

                    <h3
                      className="
                      mt-4
                      font-semibold
                      text-textPrimary
                    "
                    >
                      No Subjects Found
                    </h3>

                    <p
                      className="
                      mt-2
                      text-sm
                      text-textSecondary
                    "
                    >
                      Try a different search term.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default SubjectsTable;
