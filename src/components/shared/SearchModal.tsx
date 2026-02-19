import React, { useState, useEffect, useRef } from "react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      onClose();
      setQuery("");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
      {/* Immersive Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-4xl flex flex-col items-center animate-[fade-in_0.3s_ease-out]">
        {/* Close Button - Positioned consistently above the input */}
        <button
          onClick={onClose}
          className="absolute -top-20 right-0 md:right-4 text-gray-500 hover:text-[#FFD700] transition-colors flex items-center gap-2 group"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-black opacity-0 group-hover:opacity-100 transition-all">
            Close
          </span>
          <span className="material-symbols-outlined text-4xl">close</span>
        </button>

        {/* Clean Search Form */}
        <form onSubmit={handleSubmit} className="w-full relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="WHAT ARE YOU TRAINING FOR?"
            className="w-full bg-transparent border-b border-white/20 text-white text-3xl md:text-6xl font-display font-black py-8 focus:outline-none focus:border-[#FFD700] placeholder-gray-800 transition-all italic uppercase tracking-tighter"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Aligned Bolt Icon */}
          <button
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-700 hover:text-[#FFD700] transition-colors"
          >
            <span className="material-symbols-outlined text-4xl md:text-6xl italic">
              bolt
            </span>
          </button>
        </form>

        {/* Simplified Suggestions Section */}
        <div className="w-full mt-10 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-wrap gap-4">
            {["LEVER BELTS", "CABLE MACHINES", "MASSAGE GUNS"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  onSearch(tag);
                  onClose();
                }}
                className="text-[10px] font-black tracking-[0.2em] text-gray-500 hover:text-[#FFD700] transition-colors"
              >
                # {tag}
              </button>
            ))}
          </div>
          <p className="text-[9px] text-gray-700 uppercase tracking-[0.4em]">
            Hit Enter to explore the elite collection
          </p>
        </div>
      </div>
    </div>
  );
};