import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-2xl",
}: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

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
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          ${maxWidth}
          w-full
          max-h-[90vh]
          rounded-2xl
          border
          border-border
          bg-surface
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
          duration-200
        `}
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
          <h2
            className="
              text-lg
              font-semibold
              text-textPrimary
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-2
              transition-colors
              hover:bg-background
            "
          >
            <X size={18} className="text-textSecondary" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
