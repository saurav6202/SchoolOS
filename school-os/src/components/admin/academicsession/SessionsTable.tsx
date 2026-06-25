import {
  CalendarRange,
  CheckCircle2,
  Power,
  Trash2,
} from "lucide-react";
import ActivateSessionDialog from "./ActivateSessionDialog";
import { useState } from "react";
import api from "../../../api/api";
import { formatDate } from "../../../utils/formatDate";
import { showError, showSuccess } from "../../../utils/toast";

interface Session {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const SessionsTable = ({
  sessions,
  onSuccess,
}: {
  sessions: Session[];
  onSuccess: () => Promise<void>;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedSession, setSelectedSession] = useState<{
    _id: string;
    name: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const handleActivateSession = async () => {
    if (!selectedSession) return;

    try {
      setLoading(true);

      const res = await api.patch(
        `/api/academic-sessions/${selectedSession._id}/activate`,
      );

      showSuccess(res.data.message);

      onSuccess();
      // close dialog
      setIsDialogOpen(false);
      setSelectedSession(null);

      // toast.success("Session activated successfully");
    } catch (error) {
      console.log(error);

      // toast.error("Failed to activate session");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = window.confirm("Delete this class?");
      console.log(id);

      if (confirmDelete) {
        const res = await api.delete(`/api/academic-sessions/${id}`);
        showSuccess(res.data.message);
        onSuccess();
      }
    } catch (error: any) {
      showError(error.response.data.message);
    }
  };

  return (
    <>
      <section
        className="
        rounded-2xl
        border
        border-border
        bg-surface
        shadow-card
        overflow-hidden
      "
      >
        {/* HEADER */}
        <div
          className="
          flex
          items-center
          justify-between
          border-b
          border-border
          px-6
          py-4
        "
        >
          <div>
            <h2 className="text-lg font-semibold">Academic Sessions</h2>

            <p className="text-sm text-textSecondary">
              Manage and activate academic years
            </p>
          </div>

          <div
            className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-primary/10
          "
          >
            <CalendarRange size={20} className="text-primary" />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className="
              bg-background
              text-left
            "
            >
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Session</th>

                <th className="px-6 py-4 text-sm font-semibold">Start Date</th>

                <th className="px-6 py-4 text-sm font-semibold">End Date</th>

                <th className="px-6 py-4 text-sm font-semibold">Status</th>

                <th className="px-6 py-4 text-sm font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((session) => (
                <tr
                  key={session._id}
                  className="
                  border-t
                  border-border
                  transition-colors
                  hover:bg-background
                "
                >
                  {/* SESSION NAME */}
                  <td className="px-6 py-4">
                    <div className="font-medium">{session.name}</div>
                  </td>

                  {/* START DATE */}
                  <td className="px-6 py-4 text-textSecondary">
                    {formatDate(session.startDate)}
                  </td>

                  {/* END DATE */}
                  <td className="px-6 py-4 text-textSecondary">
                    {formatDate(session.endDate)}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    {session.isActive ? (
                      <span
                        className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-success/10
                        px-3
                        py-1
                        text-sm
                        font-medium
                        text-success
                      "
                      >
                        <CheckCircle2 size={14} />
                        Active
                      </span>
                    ) : (
                      <span
                        className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-muted
                        px-3
                        py-1
                        text-sm
                        font-medium
                        text-textSecondary
                      "
                      >
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {!session.isActive && (
                        <button
                          className="
                          flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          border-border
                          px-3
                          py-2
                          text-sm
                          font-medium
                          transition-all
                          hover:bg-primary
                          hover:text-white
                        "
                          onClick={() => {
                            setSelectedSession({
                              _id: session._id,
                              name: session.name,
                            });

                            setIsDialogOpen(true);
                          }}
                        >
                          <Power size={15} />
                          Activate
                        </button>
                      )}

                      <button
                        className="
                          rounded-lg
                          border
                          border-error/30
                          p-2
                          text-error
                          transition-all
                          hover:bg-error/10
                      "
                        onClick={() => handleDelete(session._id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div
          className="
          border-t
          border-border
          px-6
          py-4
          text-sm
          text-textSecondary
        "
        >
          Showing {sessions.length} academic sessions
        </div>
      </section>
      <ActivateSessionDialog
        isOpen={isDialogOpen}
        sessionName={selectedSession?.name || ""}
        loading={loading}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleActivateSession}
      />
    </>
  );
};

export default SessionsTable;

// PATCH /api/academic-sessions/:id/activate
