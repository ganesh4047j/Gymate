import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  // E-commerce UX: Handle Scroll Locking and Escape Key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
      {/* Immersive Overlay */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-[#0A0A0A] border border-white/10 rounded-sm max-w-2xl w-full max-h-[85vh] shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col z-10 animate-[fade-in-up_0.4s_ease-out]">
        {/* Sticky Header with Elite Branding */}
        <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/5 sticky top-0 bg-[#0A0A0A] z-20">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-[#FFD700]"></div>
            <h3 className="font-display font-black text-xl md:text-2xl text-white uppercase italic tracking-tighter">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="group w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#FFD700] transition-colors"
          >
            <span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-90">
              close
            </span>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-grow overflow-y-auto custom-scrollbar p-8 md:p-10 text-gray-400 text-sm leading-relaxed uppercase tracking-wide font-sans">
          {children}
        </div>

        {/* Action Footer */}
        <div className="p-6 border-t border-white/5 bg-[#111111]/50 flex justify-end items-center gap-6">
          <span className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em]">
            Gymate Performance Inc. // 2026
          </span>
          <button
            onClick={onClose}
            className="bg-[#FFD700] text-black px-10 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-[#FFD700]/5"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
