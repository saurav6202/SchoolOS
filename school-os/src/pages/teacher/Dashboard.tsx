import AttendanceSubmissionCard from "../../components/teacher/attendance/AttendanceSubmissionCard";
import TeacherNoticeCard from "../../components/teacher/dashboard/TeacherNoticeCard";
import WelcomeBanner from "../../components/teacher/dashboard/WelcomeBanner";
import AcademicWork from "../../components/teacher/academic/AcademicWork";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <WelcomeBanner />

      <TeacherNoticeCard />

      <AcademicWork />

      <AttendanceSubmissionCard />
    </div>
  );
};

export default Dashboard;
