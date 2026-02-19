import React from "react";

interface LookbookProps {
  onNavigate: (page: string) => void;
}

export const Lookbook: React.FC<LookbookProps> = ({ onNavigate }) => {
  const lookbookItems = [
    {
      src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
      title: "Core Stability",
      tag: "Titan Lever Belt",
    },
    {
      src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800",
      title: "Precision Recovery",
      tag: "Massage Gun V2",
    },
    {
      src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
      title: "Grip Mastery",
      tag: "Padded Wrist Wraps",
    },
    {
      src: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=800",
      title: "Calisthenics Elite",
      tag: "Apex Pull-Up Tower",
    },
    {
      src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800",
      title: "Mobile Tension",
      tag: "Portable Cable Machine",
    },
    {
      src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800",
      title: "The Standard",
      tag: "Gymate Performance Gear",
    },
  ];

  const sectionLabel =
    "text-[#FFD700] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-4 block";

  return (
    <div className="bg-black min-h-screen pt-24 md:pt-40 pb-20 px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        {/* EDITORIAL HEADER: Responsive Typography */}
        <div className="text-center mb-16 md:mb-24 animate-fade-in">
          <span className={sectionLabel}>Visual Manifest // 2026</span>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white uppercase italic tracking-tighter leading-[0.9] md:leading-[0.85] mb-6 md:mb-8">
            THE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] to-[#B8860B]">
              ELITE
            </span>{" "}
            <br className="hidden sm:block" /> COLLECTION
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] leading-relaxed px-4">
            Visualizing dominance in every frame. See our engineered gear in the
            hands of the 1%.
          </p>
        </div>

        {/* MASONRY GRID: Optimized for Touch & Desktop */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8">
          {lookbookItems.map((item, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden break-inside-avoid border border-white/5 bg-[#111111] cursor-pointer"
            >
              {/* IMAGE: Lazy loaded for performance */}
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full grayscale sm:grayscale group-hover:grayscale-0 transition-all duration-700 md:duration-1000 group-hover:scale-105"
              />

              {/* INTERACTIVE OVERLAY: Mobile Friendly Tap Area */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8">
                <div className="translate-y-4 group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500">
                  <span className="text-[#FFD700] text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] mb-2 block">
                    {item.tag}
                  </span>
                  <h3 className="text-white font-display font-black text-xl md:text-2xl uppercase italic tracking-tighter mb-4 md:mb-6">
                    {item.title}
                  </h3>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate("shop");
                    }}
                    className="flex items-center gap-3 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] group/btn"
                  >
                    <span className="bg-[#FFD700] h-[1px] w-6 md:w-8 group-hover/btn:w-12 transition-all"></span>
                    Shop This Look
                  </button>
                </div>
              </div>

              {/* Decorative Corner: Hidden on very small screens for clarity */}
              <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 border-t border-r border-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity duration-700 m-3 md:m-4"></div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA: Responsive Spacing */}
        <div className="mt-20 md:mt-32 text-center">
          <div className="inline-flex flex-col items-center">
            <p className="text-gray-600 text-[9px] md:text-[10px] uppercase tracking-[0.5em] mb-6 md:mb-8">
              End of Collection
            </p>
            <button
              onClick={() => onNavigate("shop")}
              className="bg-[#FFD700] text-black px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#FFD700]/10"
            >
              Back To Performance Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};