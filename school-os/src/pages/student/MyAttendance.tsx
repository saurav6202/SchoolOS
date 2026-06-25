import AttendanceCalendar from "../../components/student/attendance/AttendanceCalendar";
import AttendanceStats from "../../components/student/attendance/AttendanceStats";

const MyAttendance = () => {
  return (
    <div className="space-y-6">
      <AttendanceStats />
      <AttendanceCalendar />
    </div>
  );
};

export default MyAttendance;
