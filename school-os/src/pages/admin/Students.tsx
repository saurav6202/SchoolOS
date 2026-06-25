import StudentSearchCard from "../../components/admin/students/StudentSearchCard";
import StudentStats from "../../components/admin/students/StudentStats";
import AddStudentForm from "../../components/admin/students/AddStudentForm";
import UploadStudentsCard from "../../components/admin/students/UploadStudentsCard";
import api from "../../api/api";
import { useEffect, useState } from "react";

const Students = () => {
  const [totalStudents, setTotalStudents] = useState();
  const [totalClasses, setTotalClasses] = useState();
  // const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await api.get("/api/students/getstats");
      setTotalClasses(res.data.totalClasses);
      setTotalStudents(res.data.totalStudents);
    } catch (error) {
      console.log("Error in fetching stats", error);
    } finally {
      // setLoading(false);
    }
  };

  
  const refreshStudents = async () => {
    await Promise.all([
      fetchStats()
    ])
  }

  useEffect(() => {
    refreshStudents();
  }, []);

  return (
    <div className="space-y-6">
      <StudentStats
        totalClasses={totalClasses!}
        totalStudents={totalStudents!}
      />
      <StudentSearchCard />
      <AddStudentForm onSuccess={refreshStudents}/>
      <UploadStudentsCard onSuccess={refreshStudents}/>
    </div>
  );
};

export default Students;
