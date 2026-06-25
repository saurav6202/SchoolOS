import WelcomeBanner from "../../components/student/dashboard/WelcomeBanner";
import NoticeCard from "../../components/student/dashboard/NoticeCard";
import AttendanceHeatmap from "../../components/student/dashboard/AttendanceHeatmap";
import AcademicWrok from "../../components/student/academic/AcademicWrok";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <WelcomeBanner />

      {/* Notice */}
      <NoticeCard />

      <AcademicWrok />

      {/* Attendance */}
      <AttendanceHeatmap />
    </div>
  );
};

export default Dashboard;
