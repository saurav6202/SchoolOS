import { useEffect, useState } from "react";
import api from "../../api/api";
import CreateSessionCard from "../../components/admin/academicsession/CreateSessionCard";
import SessionsTable from "../../components/admin/academicsession/SessionsTable";
import SessionStats from "../../components/admin/academicsession/SessionStats";

interface Session {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const AcademicSession = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  const fetchSessions = async () => {
    const res = await api.get("/api/academic-sessions");
    console.log("academicsession res: ", res);
    setSessions(res.data.data);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-textPrimary">
          Academic Sessions
        </h1>

        <p className="mt-1 text-textSecondary">
          Manage academic years and control the active session used across the
          school.
        </p>
      </div>

      <SessionStats />
      <SessionsTable sessions={sessions} fetchSessions={fetchSessions} />
      <CreateSessionCard onSuccess={fetchSessions} />
    </div>
  );
};

export default AcademicSession;
