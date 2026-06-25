import {
  AlertTriangle,
  CalendarCheck2,
} from "lucide-react";

type Props = {
  isOpen: boolean;
  sessionName: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ActivateSessionDialog = ({
  isOpen,
  sessionName,
  loading = false,
  onClose,
  onConfirm,
}: Props) => {
    if (!isOpen) return null;

  return (
    <div
      className="
      
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        backdrop-blur-sm
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-3xl
          border
          border-border
          bg-surface
          shadow-2xl
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-warning/10
              "
            >
              <AlertTriangle
                size={26}
                className="text-warning"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-textPrimary">
                Activate Academic Session
              </h2>

              <p className="mt-1 text-sm text-textSecondary">
                This action will change the
                active academic session.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="border-y border-border bg-background p-6">
          <div
            className="
              rounded-2xl
              border
              border-primary/20
              bg-primary/5
              p-4
            "
          >
            <div className="flex items-center gap-3">
              <CalendarCheck2
                size={20}
                className="text-primary"
              />

              <div>
                <p className="text-sm text-textSecondary">
                  Selected Session
                </p>

                <h3 className="font-semibold text-textPrimary">
                  {sessionName}
                </h3>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2 text-sm text-textSecondary">
            <p>
              • Any currently active session
              will be automatically deactivated.
            </p>

            <p>
              • New attendance, homework,
              exams and results will be linked
              to this session.
            </p>

            <p>
              • Historical records from previous
              sessions will remain unchanged.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 p-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="
              rounded-xl
              border
              border-border
              px-5
              py-2.5
              font-medium
              transition-all
              hover:bg-background
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              rounded-xl
              bg-primary
              px-5
              py-2.5
              font-medium
              text-white
              transition-all
              hover:bg-primaryDark
              disabled:opacity-70
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Activating..."
              : "Activate Session"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivateSessionDialog;