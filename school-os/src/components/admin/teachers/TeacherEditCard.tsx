import {
  Search,
  UserCog,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const TeacherEditCard = () => {
  const [employeeId, setEmployeeId] =
    useState("");

  const teacher = {
    name: "Rahul Kumar",
    employeeId: "TCH001",
    subject: "Mathematics",
    assignedClass: "8A",
  };

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
            bg-warning/10
          "
        >
          <UserCog
            size={22}
            className="text-warning"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            Edit / Delete Teacher
          </h2>

          <p className="text-sm text-textSecondary">
            Search and manage teachers
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mt-6 flex gap-3">
        <input
          type="text"
          value={employeeId}
          onChange={(e) =>
            setEmployeeId(e.target.value)
          }
          placeholder="Employee ID"
          className="
            flex-1
            rounded-xl
            border
            border-border
            px-4
            py-3
            outline-none
            focus:border-primary
          "
        />

        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-primary
            px-5
            text-white
          "
        >
          <Search size={18} />
          Search
        </button>
      </div>

      {/* RESULT */}
      <div
        className="
          mt-6
          rounded-xl
          border
          border-border
          bg-background
          p-4
        "
      >
        <h3 className="font-semibold">
          {teacher.name}
        </h3>

        <div className="mt-3 space-y-1 text-sm">
          <p>
            Employee ID:
            <span className="font-medium">
              {" "}
              {teacher.employeeId}
            </span>
          </p>

          <p>
            Subject:
            <span className="font-medium">
              {" "}
              {teacher.subject}
            </span>
          </p>

          <p>
            Assigned Class:
            <span className="font-medium">
              {" "}
              {teacher.assignedClass}
            </span>
          </p>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-primary
              py-3
              text-white
            "
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-error
              py-3
              text-white
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

export default TeacherEditCard;