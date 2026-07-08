import { useEffect } from "react";
import AddTeacherForm from "../../components/admin/teachers/AddTeacherForm";
import TeacherList from "../../components/admin/teachers/TeacherList";
import TeacherStats from "../../components/admin/teachers/TeacherStats";
import { useTeachersStore } from "../../store/teachersStore";
import UploadTeachersCard from "../../components/admin/teachers/UploadTeachersCard";
import PageLoader from "../../components/ui/PageLoader";

const Teachers = () => {
  const {
    nonAssignedClasses,
    subjects,
    teachers,

    totalTeachers,
    classTeachers,
    nonClassTeachers,

    loaded,
    loading,

    refreshTeachers,
  } = useTeachersStore();

  useEffect(() => {
    if (!loaded) {
      refreshTeachers();
    }
  }, [loaded, refreshTeachers]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div
      className="
        space-y-6
      "
    >
      <TeacherStats
        totalTeachers={totalTeachers}
        classTeachers={classTeachers}
        nonClassTeachers={nonClassTeachers}
      />
      <TeacherList teachers={teachers} />
      <AddTeacherForm
        nonAssignedClasses={nonAssignedClasses}
        subjects={subjects}
        onSuccess={refreshTeachers}
      />
      <UploadTeachersCard onSuccess={refreshTeachers} />
    </div>
  );
};

export default Teachers;
