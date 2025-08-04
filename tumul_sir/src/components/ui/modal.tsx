import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full mx-4 shadow-2xl border border-orange/30 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-orange">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

type RouteModalProps = {
  children: React.ReactNode;
  title: string;
};

export const RouteModal = ({ children, title }: RouteModalProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const handleClose = () => {
    navigate(-1);
  };

  if (!background) {
    // If there's no background (direct navigation), render full page
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h1 className="text-2xl font-bold text-orange mb-6">{title}</h1>
          <div className="prose max-w-none">{children}</div>
          <div className="mt-6">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-orange text-white rounded-md hover:bg-orange/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If there's a background (modal navigation), render as modal
  return (
    <Modal isOpen={true} onClose={handleClose} title={title}>
      {children}
    </Modal>
  );
};
