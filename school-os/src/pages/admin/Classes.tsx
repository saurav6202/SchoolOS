import { useEffect } from "react";
import AddClassForm from "../../components/admin/classes/AddClassForm";
import ClassStats from "../../components/admin/classes/ClassStats";
import ClassList from "../../components/admin/classes/ClassList";
import { useClassStore } from "../../store/classStore";
import { useTeachersStore } from "../../store/teachersStore";
import PageLoader from "../../components/common/PageLoader";

const Classes = () => {
  const {
    classes,
    nonClassTeachers,
    totalClasses,
    assignedClasses,
    unAssignedClasses,
    academicSessions,
    loaded,
    loading,
    refreshClasses,
  } = useClassStore();

  const { subjects, refreshTeachers } = useTeachersStore();

  useEffect(() => {
    if (!loaded) {
      refreshClasses();
      refreshTeachers();
    }
  }, [loaded, refreshClasses]);

   if (loading) {
    return <PageLoader />;
  }

  return (
    <div
      className="
        space-y-6
      "
    >
      <ClassStats
        totalClasses={totalClasses}
        assignedClasses={assignedClasses}
        unAssignedClasses={unAssignedClasses}
      />
      <AddClassForm
        onSuccess={refreshClasses}
        nonClassTeachers={nonClassTeachers}
        academicSessions={academicSessions}
        subjects={subjects}
      />
      <ClassList
        classes={classes}
        loading={loading}
        onSuccess={refreshClasses}
        nonClassTeachers={nonClassTeachers}
      />
    </div>
  );
};

export default Classes;
