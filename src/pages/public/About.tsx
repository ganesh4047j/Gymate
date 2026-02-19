import React from "react";

interface AboutProps {
  onNavigate: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  // Styles optimized for both hover (desktop) and tap (mobile)
  const statCardStyle =
    "bg-[#111111] p-6 md:p-8 border border-white/5 hover:border-[#FFD700]/20 transition-all duration-500 group relative overflow-hidden";
  const sectionLabel =
    "text-[#FFD700] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block";

  return (
    <div className="bg-black text-white min-h-screen selection:bg-[#FFD700] selection:text-black">
      {/* 1. HERO SECTION: Responsive Manifesto */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-8 overflow-hidden">
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <span className={sectionLabel}>Our Manifesto</span>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-[120px] leading-[1.1] md:leading-[0.85] uppercase italic tracking-tighter mb-8 md:mb-12 break-words">
            WE ARE THE <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] to-[#B8860B]">
              NEW STANDARD
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base lg:text-lg uppercase tracking-widest leading-loose px-4">
            Gymate was born from a singular, uncompromising belief:{" "}
            <br className="hidden md:block" />
            <span className="text-white font-black italic block mt-2 md:inline">
              "Elite effort deserves elite equipment."
            </span>
          </p>
        </div>

        {/* Responsive Background Decorative Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-[30vw] md:text-[20vw] opacity-[0.03] pointer-events-none select-none italic whitespace-nowrap z-0">
          GYMATE
        </div>
      </section>

      {/* 2. CORE PHILOSOPHY: Engineering & Stats */}
      <section className="py-16 md:py-24 px-6 md:px-8 bg-[#0A0A0A]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image optimized for aspect ratio on all devices */}
          <div className="relative group max-w-xl mx-auto lg:max-w-none">
            <div className="relative z-10 rounded-sm overflow-hidden border border-[#FFD700]/20 aspect-[4/5] sm:aspect-video lg:aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200"
                alt="Athlete Training"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
            {/* Decorative box - hidden on very small screens for cleanliness */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-full h-full border border-[#FFD700]/10 -z-10 group-hover:-bottom-6 group-hover:-right-6 transition-all duration-500"></div>
          </div>

          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <span className={sectionLabel}>Engineering First</span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-black uppercase italic tracking-tighter leading-tight">
              GEAR FORGED IN <br className="hidden sm:block" />
              THE <span className="text-[#FFD700]">IRON PARADISE</span>
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base uppercase tracking-wider max-w-2xl mx-auto lg:mx-0">
              We don't simply source products; we engineer them. Every stitch on
              our <span className="text-white font-bold">Lever Belts</span> and
              every component in our{" "}
              <span className="text-white font-bold">Cable Machines</span> is
              obsessed over by performance engineers. We test our gear in the
              most rigorous conditions to ensure that when you reach your
              breaking point, your equipment is just getting started.
            </p>

            {/* Stats Grid optimized for small screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8">
              <div className={statCardStyle}>
                <h4 className="text-[#FFD700] font-black text-3xl md:text-4xl italic tracking-tighter mb-1">
                  50K+
                </h4>
                <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
                  Athletes Equipped Globally
                </p>
                <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-[#FFD700]/5 -rotate-45 translate-x-6 translate-y--6 md:translate-x-8 md:translate-y--8"></div>
              </div>
              <div className={statCardStyle}>
                <h4 className="text-[#FFD700] font-black text-3xl md:text-4xl italic tracking-tighter mb-1">
                  100%
                </h4>
                <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
                  Performance Lifetime Warranty
                </p>
                <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-[#FFD700]/5 -rotate-45 translate-x-6 translate-y--6 md:translate-x-8 md:translate-y--8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PILLARS: Responsive Card Grid */}
      <section className="py-16 md:py-24 px-6 md:px-8 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className={sectionLabel}>Our Core Pillars</span>
            <h3 className="text-3xl md:text-4xl font-display font-black uppercase italic tracking-tighter">
              THE GYMATE ADVANTAGE
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "bolt",
                title: "Power-Driven",
                desc: "Equipment designed to maximize mechanical advantage and core stability.",
              },
              {
                icon: "precision_manufacturing",
                title: "Elite Materials",
                desc: "Sourcing 13mm premium suede and aerospace-grade cable friction systems.",
              },
              {
                icon: "groups",
                title: "Global Community",
                desc: "A network of elite athletes pushing the boundaries of human performance.",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="p-8 md:p-10 bg-[#0A0A0A] border border-white/5 hover:border-[#FFD700]/20 transition-all text-center group"
              >
                <span className="material-symbols-outlined text-[#FFD700] text-4xl md:text-5xl mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </span>
                <h4 className="text-white font-black uppercase text-sm tracking-widest mb-3 md:mb-4">
                  {pillar.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-tighter">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION: High Conversion Block */}
      <section className="py-20 md:py-32 px-6 md:px-8 text-center bg-gradient-to-b from-[#0A0A0A] to-black">
        <h3 className="text-xl md:text-2xl font-display font-black uppercase tracking-[0.2em] mb-8 italic px-4">
          READY TO JOIN THE 1%?
        </h3>
        <button
          onClick={() => onNavigate("shop")}
          className="w-full sm:w-auto bg-[#FFD700] text-black px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#FFD700]/10"
        >
          Enter The Shop
        </button>
      </section>
    </div>
  );
};
