import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { CalendarCheckIcon, Search } from "lucide-react";
import Loader from "../../ui/Loader";
import { formatDate, formatDateTime } from "../../../utils/formatDate";
import { useAttendanceStore } from "../../../store/teacher/attendanceStore";
import { useTeacherStore } from "../../../store/teacher/teacherStore";

const AttendanceHistory = () => {
  const { classInfo, refreshTeacher, loaded, loading } = useTeacherStore();
  const { fetchAttendanceHistory, attendanceHistory } = useAttendanceStore();

  useEffect(() => {
    if (!loaded && !loading) {
      refreshTeacher();
    }
  }, [loaded, loading, refreshTeacher]);

  useEffect(() => {
    if (!classInfo.id) return;
    fetchAttendanceHistory(classInfo.id);
  }, [classInfo.id]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredAttendance = attendanceHistory.filter((item) =>
    formatDate(item.date).includes(searchQuery),
  );

  const totalDays = attendanceHistory.length;

  const averageAttendance =
    attendanceHistory.length > 0
      ? Math.round(
          attendanceHistory.reduce((acc, item) => {
            const present = item.records.filter(
              (record) => record.isPresent,
            ).length;

            return acc + (present / item.records.length) * 100;
          }, 0) / attendanceHistory.length,
        )
      : 0;

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
        space-y-6
      "
    >
      <div
        className="
          p-6 space-y-4
          bg-surface
          rounded-2xl border border-border
          shadow-card
        "
      >
        <div
          className="
            flex
            items-center justify-between
          "
        >
          <div>
            <h1
              className="
                text-2xl font-bold
              "
            >
              Attendance History
            </h1>

            <p
              className="
                text-textSecondary
              "
            >
              View and manage attendance records
            </p>
          </div>
        </div>

        <div
          className="
            grid
            gap-4
            md:grid-cols-2
          "
        >
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
              Average Attendance
            </p>

            <h2
              className="
                mt-2
                text-4xl font-bold text-success
              "
            >
              {averageAttendance}%
            </h2>
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
              Total Attendance Days
            </p>

            <h2
              className="
                mt-2
                text-4xl font-bold text-primary
              "
            >
              {totalDays}
            </h2>
          </div>
        </div>
      </div>

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
            placeholder="Search attendance records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

        <div
          className="
            space-y-4
          "
        >
          {filteredAttendance.map((item) => {
            const presentCount = item.records.filter(
              (record) => record.isPresent,
            ).length;

            const absentCount = item.records.length - presentCount;

            const attendanceRate = Math.round(
              (presentCount / item.records.length) * 100,
            );

            return (
              <div
                key={item._id}
                className="
                  p-5
                  bg-surface
                  rounded-2xl border border-border
                  transition-all
                  hover:border-primary/30 hover:shadow-card
                "
              >
                <div
                  className="
                    flex flex-col
                    gap-4
                    lg:flex-row lg:items-center lg:justify-between
                  "
                >
                  <div>
                    <h3
                      className="
                        text-lg font-semibold text-textPrimary
                      "
                    >
                      {formatDate(item.date)}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm text-textSecondary
                      "
                    >
                      Last Updated • {formatDateTime(item.updatedAt)}
                    </p>
                  </div>

                  <Link to={`/teacher/attendance-history/${item._id}`}>
                    <Button>View Details</Button>
                  </Link>
                </div>

                <div
                  className="
                    flex flex-wrap
                    mt-5
                    gap-3
                  "
                >
                  <div
                    className="
                      px-4 py-2
                      text-success font-medium
                      bg-success/10
                      rounded-lg
                    "
                  >
                    Present: {presentCount}
                  </div>

                  <div
                    className="
                      px-4 py-2
                      text-error font-medium
                      bg-error/10
                      rounded-lg
                    "
                  >
                    Absent: {absentCount}
                  </div>

                  <div
                    className="
                      px-4 py-2
                      text-primary font-medium
                      bg-primaryLight
                      rounded-lg
                    "
                  >
                    Attendance: {attendanceRate}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredAttendance.length === 0 && (
        <div
          className="
            p-12
            text-center
            bg-surface
            rounded-2xl border-2 border-dashed border-border
            shadow-card
          "
        >
          <CalendarCheckIcon
            size={48}
            className="
              mx-auto
              text-textSecondary
            "
          />

          <h3
            className="
              mt-4
              text-lg font-semibold
            "
          >
            No Attendance Records Found
          </h3>

          <p
            className="
              mt-2
              text-textSecondary
            "
          >
            Attendance history will appear here once attendance has been
            submitted.
          </p>
        </div>
      )}
    </section>
  );
};

export default AttendanceHistory;
