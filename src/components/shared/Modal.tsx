import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#1a1a1a] border border-white/10 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-glow flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-[#1a1a1a] z-10">
          <h3 className="font-display font-bold text-xl text-white uppercase italic">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};
