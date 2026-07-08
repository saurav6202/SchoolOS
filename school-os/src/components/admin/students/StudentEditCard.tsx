import { Pencil, Trash2, User, Search } from "lucide-react";
import { useState } from "react";
import Button from "../../ui/Button";

const StudentEditCard = () => {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");

  const [section, setSection] = useState("");

  const [admissionNo, setAdmissionNo] = useState("");

  const student = {
    id: "1",
    name: "Saurav Kumar",
    className: "8",
    section: "A",
    admissionNo: "DPS24001",
  };

  const handleSearch = () => {
    console.log("Searching...");
  };

  const handleEdit = () => {
    console.log("Edit Student");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Delete this student?");

    if (confirmDelete) {
      console.log("Delete Student");
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
      {/* Header */}
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
            bg-warning/10
            rounded-xl
            items-center justify-center
          "
        >
          <Pencil
            size={22}
            className="
              text-warning
            "
          />
        </div>

        <div>
          <h2
            className="
              text-lg font-semibold text-textPrimary
            "
          >
            Edit / Delete Student
          </h2>

          <p
            className="
              text-sm text-textSecondary
            "
          >
            Find and manage student records
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div
        className="
          mt-6 space-y-4
        "
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Student Name"
          className="
            w-full
            px-4 py-3
            rounded-xl border border-border
            outline-none focus:border-primary
          "
        />

        <div
          className="
            grid grid-cols-2
            gap-4
          "
        >
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Class"
            className="
              px-4 py-3
              rounded-xl border border-border
              outline-none focus:border-primary
            "
          />

          <input
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="Section"
            className="
              px-4 py-3
              rounded-xl border border-border
              outline-none focus:border-primary
            "
          />
        </div>

        <input
          type="text"
          value={admissionNo}
          onChange={(e) => setAdmissionNo(e.target.value)}
          placeholder="Admission Number"
          className="
            w-full
            px-4 py-3
            rounded-xl border border-border
            outline-none focus:border-primary
          "
        />

        <Button
          handleClick={handleSearch}
          className="
            w-full
          "
        >
          <Search size={18} />
          Find Student
        </Button>
      </div>

      {/* Result */}
      <div
        className="
          mt-6 p-4
          bg-background
          rounded-xl border border-border
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
              rounded-full
              items-center justify-center
            "
          >
            <User
              size={18}
              className="
                text-primary
              "
            />
          </div>

          <div>
            <h3
              className="
                font-semibold text-textPrimary
              "
            >
              {student.name}
            </h3>

            <p
              className="
                text-sm text-textSecondary
              "
            >
              Class {student.className}
              {student.section}
            </p>
          </div>
        </div>

        <p
          className="
            mt-3
            text-sm text-textSecondary
          "
        >
          Admission No:
          <span
            className="
              ml-2
              font-medium text-textPrimary
            "
          >
            {student.admissionNo}
          </span>
        </p>

        {/* Actions */}
        <div
          className="
            flex
            mt-4
            gap-3
          "
        >
          <Button
            handleClick={handleEdit}
            className="
              flex-1
            "
          >
            <Pencil size={16} />
            Edit
          </Button>

          <button
            onClick={handleDelete}
            className="
              flex flex-1
              px-4 py-3
              font-medium text-white
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
    </section>
  );
};

export default StudentEditCard;
