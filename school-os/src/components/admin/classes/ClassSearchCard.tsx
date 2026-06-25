import {
  Search,
  GraduationCap,
  User,
  Users,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import Button from "../../common/Button";

const ClassSearchCard = () => {
  const [searchValue, setSearchValue] =
    useState("");

  const classData = {
    className: "8A",
    classTeacher: "Rahul Kumar",
    totalStudents: 42,
  };

  const handleSearch = () => {
    console.log(
      "Searching:",
      searchValue
    );

    /**
     * GET /classes/search?query=8A
     */
  };

  const handleEdit = () => {
    console.log("Edit Class");
  };

  const handleDelete = () => {
    const confirmDelete =
      window.confirm(
        "Delete this class?"
      );

    if (confirmDelete) {
      console.log("Delete Class");
    }
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
            bg-primaryLight
          "
        >
          <Search
            size={22}
            className="text-primary"
          />
        </div>

        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-textPrimary
            "
          >
            Search Class
          </h2>

          <p
            className="
              text-sm
              text-textSecondary
            "
          >
            Find class details quickly
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mt-6 flex gap-3">
        <input
          type="text"
          value={searchValue}
          onChange={(e) =>
            setSearchValue(e.target.value)
          }
          placeholder="Enter class (e.g. 8A)"
          className="
            flex-1
            rounded-xl
            border
            border-border
            px-4
            py-3
            outline-none
            transition-all
            focus:border-primary
          "
        />

        <Button handleClick={handleSearch}>
          <Search size={18} />
          Search
        </Button>
      </div>

      {/* RESULT */}
      <div
        className="
          mt-6
          rounded-2xl
          border
          border-border
          bg-background
          p-5
        "
      >
        {/* CLASS NAME */}
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
            <GraduationCap
              size={22}
              className="text-primary"
            />
          </div>

          <div>
            <h3
              className="
                text-xl
                font-semibold
                text-textPrimary
              "
            >
              Class {classData.className}
            </h3>

            <p
              className="
                text-sm
                text-textSecondary
              "
            >
              Academic Class Information
            </p>
          </div>
        </div>

        {/* DETAILS */}
        <div
          className="
            mt-5
            grid
            gap-4
            md:grid-cols-2
          "
        >
          <div
            className="
              rounded-xl
              bg-surface
              p-4
            "
          >
            <div className="flex items-center gap-2">
              <User
                size={18}
                className="text-primary"
              />

              <span
                className="
                  text-sm
                  text-textSecondary
                "
              >
                Class Teacher
              </span>
            </div>

            <p
              className="
                mt-2
                text-lg
                font-semibold
                text-textPrimary
              "
            >
              {classData.classTeacher}
            </p>
          </div>

          <div
            className="
              rounded-xl
              bg-surface
              p-4
            "
          >
            <div className="flex items-center gap-2">
              <Users
                size={18}
                className="text-primary"
              />

              <span
                className="
                  text-sm
                  text-textSecondary
                "
              >
                Students
              </span>
            </div>

            <p
              className="
                mt-2
                text-lg
                font-semibold
                text-textPrimary
              "
            >
              {classData.totalStudents}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-5 flex gap-3">
          <Button
            className="flex-1"
            handleClick={handleEdit}
          >
            <Pencil size={16} />
            Edit
          </Button>

          <Button
            className="
              flex-1
              bg-error
              hover:bg-error/90
            "
            handleClick={handleDelete}
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClassSearchCard;