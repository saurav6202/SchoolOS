import { useEffect, useState } from "react";
import api from "../../api/api";
import CreateSessionCard from "../../components/admin/academicsession/CreateSessionCard";
import SessionsTable from "../../components/admin/academicsession/SessionsTable";
import SessionStats from "../../components/admin/academicsession/SessionStats";
import PageLoader from "../../components/common/PageLoader";

interface Session {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface StatDataType {
  activeSession: {
    isActive: boolean;
    name: string;
    _id: string;
  };
  totalSessions: number;
}

const AcademicSession = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [statData, setStatData] = useState<StatDataType>({
    activeSession: {
      isActive: false,
      name: "0000-00",
      _id: "",
    },
    totalSessions: 0,
  });

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchSessions = async () => {
    const res = await api.get("/api/academic-sessions");
    setSessions(res.data.data);
  };

  const fetchStats = async () => {
    const res = await api.get("/api/academic-sessions/stats");
    setStatData(res.data.data);
    console.log("dataaa: ", res.data.data);
  };

  const refreshSessions = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchSessions(), fetchStats()]);
      setLoaded(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loaded) {
      refreshSessions();
    }
  }, [loaded]);

  if (loading) {
    return <PageLoader />;
  }

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

      <SessionStats statData={statData} />
      <SessionsTable sessions={sessions} onSuccess={refreshSessions} />
      <CreateSessionCard onSuccess={refreshSessions} />
    </div>
  );
};

export default AcademicSession;
