import { BookOpenCheck, Send } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../../api/api";
import Button from "../../common/Button";
import { showError, showSuccess } from "../../../utils/toast";
import Loader from "../../common/Loader";
import { today } from "../../../utils/formatDate";

type Subject = {
  _id: string;
  name: string;
};

type AcademicWorkRow = {
  subjectId: string;
  subjectName: string;
  classwork: string;
  homework: string;
};

const AcademicWork = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [academicWorkId, setAcademicWorkId] = useState("");

  const [classInfo, setClassInfo] = useState<{
    _id: string;
    name: number;
    section: string;
  } | null>(null);

  const [rows, setRows] = useState<AcademicWorkRow[]>([]);

  const fetchAssignedClass = async () => {
    try {
      const res = await api.get("/api/classes/class-teacher/me");

      const classData = res.data.data;

      setClassInfo({
        _id: classData._id,
        name: classData.name,
        section: classData.section,
      });

      const formattedRows: AcademicWorkRow[] = classData.subjects.map(
        (subject: Subject) => ({
          subjectId: subject._id,
          subjectName: subject.name,
          classwork: "",
          homework: "",
        }),
      );

      setRows(formattedRows);
      await fetchTodayAcademicWork(classData._id, formattedRows);
    } catch (error) {
      showError("Failed to load class data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedClass();
  }, []);

  const fetchTodayAcademicWork = async (
    classId: string,
    currentRows: AcademicWorkRow[],
  ) => {
    try {
      const res = await api.get(`/api/academic-work/today/${classId}`);
      const academicWork = res.data.data;

      if (!academicWork) return;

      setAcademicWorkId(academicWork._id);
      setIsEditMode(true);

      setRows(
        currentRows.map((row) => {
          const work = academicWork.works.find(
            (item: any) => item.subjectId._id === row.subjectId,
          );

          return {
            ...row,
            classwork: work?.classwork || "",
            homework: work?.homework || "",
          };
        }),
      );
    } catch (error: any) {
      showError(error.response.data.message);
    }
  };

  const updateRow = (
    subjectId: string,
    field: "classwork" | "homework",
    value: string,
  ) => {
    setRows((prev) =>
      prev.map((row) =>
        row.subjectId === subjectId
          ? {
              ...row,
              [field]: value,
            }
          : row,
      ),
    );
  };

  const handleSubmit = async () => {
    const works = rows.filter(
      (row) =>
        row.classwork.trim().length > 0 || row.homework.trim().length > 0,
    );

    if (works.length === 0) {
      return showError(
        "Please enter classwork or homework for at least one subject",
      );
    }

    try {
      setSubmitting(true);

      const payload = {
        classId: classInfo?._id,
        date: new Date(),
        works: works.map((item) => ({
          subjectId: item.subjectId,
          classwork: item.classwork.trim(),
          homework: item.homework.trim(),
        })),
      };

      let res;

      if (isEditMode) {
        res = await api.put(`/api/academic-work/${academicWorkId}`, payload);
      } else {
        res = await api.post("/api/academic-work", payload);
      }

      showSuccess(res.data.message || "Academic work submitted successfully");
      setIsEditMode(true);
      if (!academicWorkId) {
        setAcademicWorkId(res.data.data._id);
      }
    } catch (error: any) {
      showError(
        error?.response?.data?.message || "Failed to submit academic work",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const showLoading = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return (
      <section
        className="
          bg-surface
          border border-border
          rounded-2xl
          shadow-card
          p-6   
          flex
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
    overflow-hidden
    rounded-2xl
    border border-border
    bg-surface
    shadow-card
  "
>
  {/* Header */}
  <div
    className="
      flex
      items-center
      gap-3
      border-b border-border
      px-6 py-5
    "
  >
    <div
      className="
        flex
        h-12 w-12
        items-center justify-center
        rounded-xl
        bg-primaryLight
      "
    >
      <BookOpenCheck
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
        Academic Work Submission
      </h2>

      <p
        className="
          text-sm
          text-textSecondary
        "
      >
        Class {classInfo?.name}
        {classInfo?.section} • {today}
      </p>
    </div>
  </div>

  <div className="p-6">
    {/* Table */}
    <div
      className="
        overflow-hidden
        rounded-2xl
        border border-border
      "
    >
      {/* Header */}
      <div
        className="
          grid
          grid-cols-[180px_1fr_1fr]
          border-b border-border
          bg-background
        "
      >
        <div
          className="
            p-4
            font-semibold
            text-textPrimary
            border-r border-border
          "
        >
          Subject
        </div>

        <div
          className="
            p-4
            font-semibold
            text-textPrimary
            border-r border-border
          "
        >
          Classwork
        </div>

        <div
          className="
            p-4
            font-semibold
            text-textPrimary
          "
        >
          Homework
        </div>
      </div>

      {/* Rows */}
      {rows.map((row) => (
        <div
          key={row.subjectId}
          className="
            grid
            grid-cols-[180px_1fr_1fr]
            border-b border-border
            last:border-b-0
          "
        >
          <div
            className="
              p-4
              font-medium
              text-textPrimary
              border-r border-border
            "
          >
            {row.subjectName}
          </div>

          <div
            className="
              p-2
              border-r border-border
            "
          >
            <textarea
              rows={2}
              value={row.classwork}
              onChange={(e) =>
                updateRow(
                  row.subjectId,
                  "classwork",
                  e.target.value
                )
              }
              placeholder={`Today's ${row.subjectName} classwork`}
              className="
                w-full
                resize-none
                rounded-lg
                border border-transparent
                bg-transparent
                px-3 py-2
                outline-none
                transition-all
                focus:border-primary
                focus:bg-background
              "
            />
          </div>

          <div className="p-2">
            <textarea
              rows={2}
              value={row.homework}
              onChange={(e) =>
                updateRow(
                  row.subjectId,
                  "homework",
                  e.target.value
                )
              }
              placeholder={`${row.subjectName} homework`}
              className="
                w-full
                resize-none
                rounded-lg
                border border-transparent
                bg-transparent
                px-3 py-2
                outline-none
                transition-all
                focus:border-primary
                focus:bg-background
              "
            />
          </div>
        </div>
      ))}
    </div>

    {/* Submit */}
    <div
      className="
        mt-6
        flex
        justify-end
      "
    >
      <Button
        handleClick={handleSubmit}
        disabled={submitting}
      >
        <Send size={18} />

        {submitting ? (
          <>
            Saving...
            <Loader />
          </>
        ) : isEditMode ? (
          "Update Academic Work"
        ) : (
          "Submit Academic Work"
        )}
      </Button>
    </div>
  </div>
</section>
  );
};

export default AcademicWork;
