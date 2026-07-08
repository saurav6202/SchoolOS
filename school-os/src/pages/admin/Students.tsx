import StudentSearchCard from "../../components/admin/students/StudentSearchCard";
import StudentStats from "../../components/admin/students/StudentStats";
import AddStudentForm from "../../components/admin/students/AddStudentForm";
import UploadStudentsCard from "../../components/admin/students/UploadStudentsCard";
import { useEffect } from "react";
import { useStudentsStore } from "../../store/students";
import PageLoader from "../../components/ui/PageLoader";

const Students = () => {
  const { totalClasses, totalStudents, refreshStudents, loaded, loading, } =
    useStudentsStore();

  useEffect(() => {
    if (!loaded) {
      refreshStudents();
    }
  }, [loaded]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div
      className="
        space-y-6
      "
    >
      <StudentStats
        totalClasses={totalClasses!}
        totalStudents={totalStudents!}
      />
      <StudentSearchCard />
      <AddStudentForm onSuccess={refreshStudents} />
      <UploadStudentsCard onSuccess={refreshStudents} />
    </div>
  );
};

export default Students;
