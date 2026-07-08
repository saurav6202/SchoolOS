import {
  AlertTriangle,
  X,
} from "lucide-react";

type ConfirmDialogProps = {
  isOpen: boolean;

  title: string;

  description: string;

  confirmText?: string;

  cancelText?: string;

  loading?: boolean;

  onConfirm: () => void;

  onCancel: () => void;
};

const ConfirmDialog = ({
  isOpen,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
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
        bg-black/40
        backdrop-blur-sm
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          border
          border-border
          bg-surface
          shadow-2xl
        "
      >
        {/* HEADER */}
        <div
          className="
            flex
            items-start
            justify-between
            p-6
          "
        >
          <div className="flex gap-4">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-error/10
              "
            >
              <AlertTriangle
                size={24}
                className="text-error"
              />
            </div>

            <div>
              <h2
                className="
                  text-lg
                  font-semibold
                  text-textPrimary
                "
              >
                {title}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-textSecondary
                "
              >
                {description}
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="
              rounded-lg
              p-2
              transition-all
              hover:bg-background
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* FOOTER */}
        <div
          className="
            flex
            justify-end
            gap-3
            border-t
            border-border
            p-6
          "
        >
          <button
            type="button"
            onClick={onCancel}
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
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
              rounded-xl
              bg-error
              px-5
              py-2.5
              font-medium
              text-white
              transition-all
              hover:opacity-90
              disabled:opacity-60
            "
          >
            {loading
              ? "Processing..."
              : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;


// const [showDeleteDialog, setShowDeleteDialog] =
//   useState(false);

// <ConfirmDialog
//   isOpen={showDeleteDialog}
//   title="Delete Subject"
//   description="This action cannot be undone. The subject will be permanently removed."

//   confirmText="Delete Subject"

//   onCancel={() =>
//     setShowDeleteDialog(false)
//   }

//   onConfirm={async () => {
//     await api.delete(`/subjects/${id}`);

//     setShowDeleteDialog(false);
//   }}
// />;