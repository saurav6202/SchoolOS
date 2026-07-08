import { CalendarCheck, Save, Users, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../../api/api";
import Button from "../../ui/Button";
import { showError, showSuccess } from "../../../utils/toast";
import Loader from "../../ui/Loader";
import { useTeacherStore } from "../../../store/teacher/teacherStore";
import { useAttendanceStore } from "../../../store/teacher/attendanceStore";

const AttendanceDetails = () => {
  const { refreshTeacher, loaded, loading } = useTeacherStore();
  const { attendanceDetails, fetchAttendanceDetails } = useAttendanceStore();
  const [localAttendance, setLocalAttendance] = useState(attendanceDetails);
  const { attendanceId } = useParams();

  useEffect(() => {
    if (!loaded && !loading) {
      refreshTeacher();
    }
  }, [loaded, loading, refreshTeacher]);

  useEffect(() => {
    if (!attendanceId) return;
    fetchAttendanceDetails(attendanceId);
  }, [attendanceId]);

  const [submitting, setSubmitting] = useState(false);

  const toggleAttendance = (studentId: string) => {
    if (!attendanceDetails) return;

    const updatedAttendance = {
      ...attendanceDetails,
      records: attendanceDetails.records.map((record) =>
        record.studentId._id === studentId
          ? {
              ...record,
              isPresent: !record.isPresent,
            }
          : record,
      ),
    };
    setLocalAttendance(updatedAttendance);
  };

  const handleUpdate = async () => {
    if (!localAttendance) return;

    try {
      setSubmitting(true);
      const payload = {
        records: localAttendance.records.map((record) => ({
          studentId: record.studentId._id,
          isPresent: record.isPresent,
        })),
      };

      const res = await api.put(
        `/api/attendance/${attendanceDetails?._id}`,
        payload,
      );

      showSuccess(res.data.message);
    } catch (error: any) {
      showError(
        error?.response?.data?.message || "Failed to update attendance",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const presentCount = useMemo(() => {
    return (
      attendanceDetails?.records.filter((record) => record.isPresent).length ||
      0
    );
  }, [attendanceDetails]);

  const totalStudents = attendanceDetails?.records.length || 0;

  const absentCount = totalStudents - presentCount;

  const attendanceRate =
    totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

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

  if (!attendanceDetails) {
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
        space-y-6
      "
    >
      {/* Header */}
      <div
        className="
          p-6
          bg-surface
          rounded-2xl border border-border
          shadow-card
        "
      >
        <div
          className="
            flex
            items-center gap-4
          "
        >
          <div
            className="
              flex
              h-14 w-14
              bg-primaryLight
              rounded-xl
              items-center justify-center
            "
          >
            <CalendarCheck
              size={24}
              className="
                text-primary
              "
            />
          </div>

          <div>
            <h1
              className="
                text-2xl font-bold
              "
            >
              Attendance Details
            </h1>

            <p
              className="
                text-textSecondary
              "
            >
              Class {attendanceDetails.classId.name}
              {attendanceDetails.classId.section}
            </p>
          </div>
        </div>

        <div
          className="
            inline-flex
            mt-5 px-4 py-2
            text-sm font-medium text-primary
            bg-primaryLight
            rounded-full
          "
        >
          {attendanceDetails.date}
        </div>
      </div>

      {/* Stats */}
      <div
        className="
          grid
          gap-4
          md:grid-cols-4
        "
      >
        <div
          className="
            p-5
            bg-surface
            rounded-2xl border border-border
          "
        >
          <p
            className="
              text-sm text-textSecondary
            "
          >
            Total Students
          </p>

          <h3
            className="
              mt-2
              text-3xl font-bold
            "
          >
            {totalStudents}
          </h3>
        </div>

        <div
          className="
            p-5
            bg-success/10
            rounded-2xl border border-border
          "
        >
          <p
            className="
              text-sm text-textSecondary
            "
          >
            Present
          </p>

          <h3
            className="
              mt-2
              text-3xl font-bold text-success
            "
          >
            {presentCount}
          </h3>
        </div>

        <div
          className="
            p-5
            bg-error/10
            rounded-2xl border border-border
          "
        >
          <p
            className="
              text-sm text-textSecondary
            "
          >
            Absent
          </p>

          <h3
            className="
              mt-2
              text-3xl font-bold text-error
            "
          >
            {absentCount}
          </h3>
        </div>

        <div
          className="
            p-5
            bg-primaryLight
            rounded-2xl border border-border
          "
        >
          <p
            className="
              text-sm text-textSecondary
            "
          >
            Attendance Rate
          </p>

          <h3
            className="
              mt-2
              text-3xl font-bold text-primary
            "
          >
            {attendanceRate}%
          </h3>
        </div>
      </div>

      {/* Students Table */}
      <div
        className="
          overflow-hidden
          bg-surface
          rounded-2xl border border-border
          shadow-card
        "
      >
        <div
          className="
            flex
            px-6 py-5
            border-b border-border
            items-center gap-3
          "
        >
          <Users
            size={20}
            className="
              text-primary
            "
          />

          <h2
            className="
              font-semibold
            "
          >
            Student Attendance
          </h2>
        </div>

        <div
          className="
            grid grid-cols-[120px_1fr_150px]
            font-semibold
            bg-background
            border-b border-border
          "
        >
          <div
            className="
              p-4
            "
          >
            Roll No.
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

        {attendanceDetails.records.map((record) => (
          <div
            key={record.studentId._id}
            className="
              grid grid-cols-[120px_1fr_150px]
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
              {record.studentId.rollNumber}
            </div>

            <div
              className="
                p-4
                font-medium
              "
            >
              {record.studentId.name}
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
                checked={record.isPresent}
                onChange={() => toggleAttendance(record.studentId._id)}
                className="
                  h-5 w-5
                  cursor-pointer
                "
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div
        className="
          flex flex-wrap
          gap-3
        "
      >
        <div
          className="
            flex
            px-4 py-2
            bg-success/10
            rounded-lg
            items-center gap-2
          "
        >
          <CheckCircle
            size={18}
            className="
              text-success
            "
          />
          Present: {presentCount}
        </div>

        <div
          className="
            flex
            px-4 py-2
            bg-error/10
            rounded-lg
            items-center gap-2
          "
        >
          <XCircle
            size={18}
            className="
              text-error
            "
          />
          Absent: {absentCount}
        </div>
      </div>

      {/* Save */}
      <div
        className="
          flex
          justify-end
        "
      >
        <Button handleClick={handleUpdate}>
          <Save size={18} />
          {submitting ? (
            <>
              Saving... <Loader />
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </div>
    </section>
  );
};

export default AttendanceDetails;
