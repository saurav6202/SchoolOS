import {
  CalendarCheck,
  CheckSquare,
  Search,
  Send,
  SquareX,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { showError, showSuccess } from "../../../utils/toast";
import api from "../../../api/api";
import Loader from "../../ui/Loader";
import { today } from "../../../utils/formatDate";
import { useTeacherStore } from "../../../store/teacher/teacherStore";
import { useAttendanceStore } from "../../../store/teacher/attendanceStore";

type StudentAttendance = {
  studentId: string;
  name: string;
  rollNumber: number;
  isPresent: boolean;
};

const AttendanceSubmissionCard = () => {
  const {
    students,
    classInfo,
    isHoliday,
    setStudents,
    setHoliday,
    loaded,
    loading,
    refreshTeacher,
  } = useTeacherStore();

  const { todayAttendance, fetchTodayAttendance } = useAttendanceStore();

  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isSubmittend = !!todayAttendance;

  useEffect(() => {
    if (!loaded && !loading) {
      refreshTeacher();
    }
  }, [loaded, loading, refreshTeacher]);

  useEffect(() => {
    if (!classInfo.id) return;
    fetchTodayAttendance(classInfo.id, today);
  }, [classInfo.id]);

  useEffect(() => {
    if (!todayAttendance || students.length === 0) return;

    const updatedStudents = students.map((student) => {
      const record = todayAttendance.records.find(
        (r: any) => r.studentId._id === student.studentId,
      );

      if (!record) return student;

      return {
        ...student,
        isPresent: record.isPresent,
      };
    });

    setStudents(updatedStudents);
  }, [todayAttendance]);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAttendanceChange = (rollNumber: number) => {
    const updatedStudents = students.map((student: StudentAttendance) =>
      student.rollNumber === rollNumber
        ? { ...student, isPresent: !student.isPresent }
        : student,
    );

    setStudents(updatedStudents);
  };

  const markAllPresent = () => {
    setStudents(
      students.map((student: StudentAttendance) => ({
        ...student,
        isPresent: true,
      })),
    );
  };

  const presentCount = useMemo(
    () => students.filter((student) => student.isPresent).length,
    [students],
  );

  const absentCount = students.length - presentCount;

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const payload = {
        classId: classInfo.id,
        date: today,
        records: students.map((student) => ({
          studentId: student.studentId,
          isPresent: student.isPresent,
        })),
      };

      let res;

      if (isSubmittend && todayAttendance?._id) {
        res = await api.put(`/api/attendance/${todayAttendance._id}`, payload);
      } else {
        res = await api.post("/api/attendance", payload);
      }
      showSuccess(res.data.message);

      await fetchTodayAttendance(classInfo.id, today, true);
    } catch (error: any) {
      showError(
        error?.response?.data?.message || "Failed to submit attendance",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkHoliday = async () => {
    try {
      const res = await api.post("/api/holidays/mark", {
        classId: classInfo.id,
        date: today,
      });

      setHoliday(true);
      showSuccess(res.data.message);
    } catch (error: any) {
      showError(error.response.data.message);
    }
  };

  const handleUnMarkHoliday = async () => {
    try {
      const res = await api.post("/api/holidays/unmark", {
        classId: classInfo.id,
        date: today,
      });

      setHoliday(false);
      showSuccess(res.data.message);
    } catch (error: any) {
      showError(error.response.data.message);
    }
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

  if (!students) {
    return (
      <div
        className="
          py-20
          text-center
        "
      >
        Attendance not found.
      </div>
    );
  }
  return (
    <section
      className="
        overflow-hidden
        bg-surface
        rounded-2xl border border-border
        shadow-card
      "
    >
      {/* Header */}
      <div
        className="
          flex
          px-6 py-5
          border-b border-border
          items-center gap-3
        "
      >
        <div
          className="
            flex
            h-12 w-12
            bg-primaryLight
            rounded-xl
            items-center justify-center
          "
        >
          <CalendarCheck
            size={22}
            className="
              text-primary
            "
          />
        </div>

        <div>
          <h2
            className="
              text-lg font-semibold text-textPrimary
            "
          >
            Mark Attendance
          </h2>

          <p
            className="
              text-sm text-textSecondary
            "
          >
            {today}
          </p>
        </div>
      </div>

      <div
        className="
          p-6
        "
      >
        {/* Top Actions */}
        <div
          className="
            flex flex-col
            mb-6
            gap-4
            md:flex-row md:items-center md:justify-between
          "
        >
          <div
            className="
              inline-flex
              w-fit
              px-4 py-2
              text-sm font-medium text-primary
              bg-primaryLight
              rounded-full
            "
          >
            Class: {classInfo.name}
            {classInfo.section}
          </div>
          <div
            className="
              flex
              gap-3
            "
          >
            {!isHoliday && (
              <button
                onClick={handleMarkHoliday}
                className="
                  flex
                  px-4 py-2
                  text-sm font-medium text-warning
                  bg-warning/10
                  rounded-xl border border-warning/20
                  transition-all
                  items-center gap-2 hover:bg-warning/20
                "
              >
                <CalendarCheck size={16} />
                Mark Holiday
              </button>
            )}
            <button
              onClick={markAllPresent}
              className={`
                flex
                px-4 py-2
                text-sm font-medium text-textPrimary
                rounded-xl border border-border
                transition-all
                items-center gap-2 hover:bg-background ${isSubmittend && "bg-background"}
              `}
            >
              <CheckSquare size={16} />
              Mark All Present
            </button>
          </div>
        </div>

        {isHoliday && (
          <div
            className="
              flex
              mb-6 p-4
              text-warning font-medium
              bg-warning/10
              rounded-xl border border-warning/20
              justify-between items-center
            "
          >
            🎉 Today is marked as a Holiday for this class. Attendance
            submission is disabled.
            <button
              onClick={handleUnMarkHoliday}
              className="
                flex
                px-4 py-2
                text-sm font-medium text-error
                bg-error/10
                rounded-xl border border-error/20
                transition-all
                items-center gap-2 hover:bg-error/20
              "
            >
              <SquareX size={16} />
              Unmark Holiday
            </button>
          </div>
        )}

        <div
          className="
            mb-6
            relative
          "
        >
          <Search
            size={18}
            className="
              text-textSecondary
              absolute left-4 top-1/2 -translate-y-1/2
            "
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student..."
            className="
              w-full
              py-3 pl-11 pr-4
              bg-surface
              rounded-xl border border-border
              transition-all
              outline-none focus:border-primary focus:ring-4 focus:ring-primary/10
            "
          />
        </div>

        {/* Attendance Table */}
        <div
          className="
            overflow-hidden
            rounded-2xl border border-border
          "
        >
          {/* Header */}
          <div
            className="
              grid grid-cols-[100px_1fr_120px]
              font-semibold text-textPrimary
              bg-background
              border-b border-border
            "
          >
            <div
              className="
                p-4
              "
            >
              Roll No
            </div>
            <div
              className="
                p-4
              "
            >
              Student Name
            </div>
            <div
              className="
                p-4
                text-center
              "
            >
              Present
            </div>
          </div>

          {/* Students */}
          {filteredStudents.map((student) => (
            <div
              key={student.rollNumber}
              className="
                grid grid-cols-[100px_1fr_120px]
                border-b border-border
                last:border-b-0
              "
            >
              <div
                className="
                  p-4
                  text-textSecondary
                "
              >
                {student.rollNumber}
              </div>

              <div
                className="
                  flex
                  p-4
                  font-medium text-textPrimary
                  items-center gap-3
                "
              >
                {student.name}

                {isHoliday && (
                  <div
                    title="Holiday"
                    className="
                      h-3 w-3
                      bg-warning
                      rounded-full
                    "
                  />
                )}
              </div>
              <div
                className="
                  flex
                  p-4
                  items-center justify-center
                "
              >
                <input
                  type="checkbox"
                  disabled={isHoliday}
                  checked={student.isPresent}
                  onChange={() => handleAttendanceChange(student.rollNumber)}
                  className="
                    h-5 w-5
                    cursor-pointer
                    disabled:cursor-not-allowed disabled:opacity-50
                  "
                />
              </div>
            </div>
          ))}
        </div>
        {filteredStudents.length === 0 && (
          <div
            className="
              p-10
              text-center text-textSecondary
            "
          >
            No students found.
          </div>
        )}

        {/* Stats */}
        <div
          className="
            grid
            mt-6
            gap-4
            md:grid-cols-2
          "
        >
          <div
            className="
              p-4
              bg-success/10
              rounded-xl
            "
          >
            <div
              className="
                flex
                items-center gap-2
              "
            >
              <Users
                size={18}
                className="
                  text-success
                "
              />

              <span
                className="
                  text-sm text-textSecondary
                "
              >
                Present Students
              </span>
            </div>

            <h3
              className="
                mt-2
                text-2xl font-bold text-success
              "
            >
              {presentCount}
            </h3>
          </div>

          <div
            className="
              p-4
              bg-error/10
              rounded-xl
            "
          >
            <div
              className="
                flex
                items-center gap-2
              "
            >
              <Users
                size={18}
                className="
                  text-error
                "
              />

              <span
                className="
                  text-sm text-textSecondary
                "
              >
                Absent Students
              </span>
            </div>

            <h3
              className="
                mt-2
                text-2xl font-bold text-error
              "
            >
              {absentCount}
            </h3>
          </div>
        </div>

        {/* Submit */}
        <div
          className="
            flex
            mt-6
            justify-end
          "
        >
          {!isHoliday && (
            <div
              className="
                flex
                mt-6
                justify-end
              "
            >
              <button
                onClick={handleSubmit}
                className="
                  flex
                  px-6 py-3
                  font-medium text-white
                  bg-primary
                  rounded-xl
                  justify-center items-center gap-2
                "
              >
                <Send size={18} />
                {isSubmittend ? "Update Attendance" : "Submit Attendance"}

                {submitting && <Loader />}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AttendanceSubmissionCard;
