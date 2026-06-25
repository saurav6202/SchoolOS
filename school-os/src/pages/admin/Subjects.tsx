import SubjectStats from "../../components/admin/subjects/SubjectStats";
import CreateSubjectCard from "../../components/admin/subjects/CreateSubjectCard";
import SubjectsTable from "../../components/admin/subjects/SubjectsTable";
import { useEffect, useState } from "react";
import api from "../../api/api";

type Subject = {
  _id: string;
  name: string;
  code: string;
  category: "core" | "optional";
};

const Subjects = () => {
  const [totalSubjects, setTotalSubjects] = useState();
  const [coreSubjects, setcoreSubjects] = useState();
  const [optionalSubjects, setoptionalSubjects] = useState();
  const [subjects, setSubjects] = useState<Array<Subject>>([]);
  const [stateLoading, setStateLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);

  const fetchSubjectStats = async () => {
    try {
      const res = await api.get("/api/subjects/getstats");
      const { totalSubjects, coreSubjects, optionalSubjects } = res.data.data;
      setTotalSubjects(totalSubjects);
      setcoreSubjects(coreSubjects);
      setoptionalSubjects(optionalSubjects);
    } catch (error) {
    } finally {
      setStateLoading(false);
    }
  };

  const fetchSubjects =  async () => {
    try {
      const res = await api.get("/api/subjects");
      setSubjects(res.data.data);
    } catch (error) {
    } finally {
      setTableLoading(false);
    }
  };

  const refreshSubjects = async () => {
    await Promise.all([
        fetchSubjectStats(),
        fetchSubjects(),
    ])
  }

  useEffect(() => {
   refreshSubjects();
  }, []);

  return (
    <div className="space-y-6">
      <SubjectStats
        totalSubjects={totalSubjects!}
        coreSubjects={coreSubjects!}
        optionalSubjects={optionalSubjects!}
        loading={stateLoading}
      />

      <CreateSubjectCard onSuccess={refreshSubjects}/>
      <SubjectsTable subjects={subjects} loading={tableLoading}/>
    </div>
  );
};

export default Subjects;
