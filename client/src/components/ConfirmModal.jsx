import React, { useEffect } from "react";
import { FaExclamationTriangle, FaTrash, FaTimes, FaSpinner } from "react-icons/fa";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  type = "danger",
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const isDanger = type === "danger";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition disabled:opacity-50"
          aria-label="Close modal"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 text-center">
          {/* Icon Badge */}
          <div className={`mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-full ${
            isDanger ? "bg-red-100 text-red-500" : "bg-amber-100 text-amber-500"
          }`}>
            {isDanger ? (
              <FaTrash className="w-7 h-7" />
            ) : (
              <FaExclamationTriangle className="w-7 h-7" />
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
            {title}
          </h3>

          {/* Message */}
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition text-sm sm:text-base disabled:opacity-50 cursor-pointer"
            >
              {cancelText}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold shadow-md transition text-sm sm:text-base disabled:opacity-50 cursor-pointer ${
                isDanger
                  ? "bg-red-600 hover:bg-red-700 shadow-red-200"
                  : "bg-amber-600 hover:bg-amber-700 shadow-amber-200"
              }`}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  {isDanger && <FaTrash className="w-4 h-4" />}
                  <span>{confirmText}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
