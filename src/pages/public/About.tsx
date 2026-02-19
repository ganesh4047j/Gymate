import React from "react";

interface AboutProps {
  onNavigate: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const statCardStyle =
    "bg-[#111111] p-8 border border-white/5 hover:border-[#FFD700]/20 transition-all duration-500 group relative overflow-hidden";
  const sectionLabel =
    "text-[#FFD700] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block";

  return (
    <div className="bg-black text-white min-h-screen">
      {/* HERO SECTION: The Identity */}
      <section className="relative pt-40 pb-24 px-8 overflow-hidden">
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <span className={sectionLabel}>Our Manifesto</span>
          <h2 className="font-display font-black text-6xl md:text-8xl lg:text-[120px] leading-[0.85] uppercase italic tracking-tighter mb-12">
            WE ARE THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] to-[#B8860B]">
              NEW STANDARD
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base uppercase tracking-widest leading-loose">
            Gymate was born from a singular, uncompromising belief: <br />
            <span className="text-white font-black italic">
              "Elite effort deserves elite equipment."
            </span>
          </p>
        </div>
        {/* Background Decorative Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-[20vw] opacity-[0.02] pointer-events-none select-none italic">
          GYMATE
        </div>
      </section>

      {/* CORE PHILOSOPHY: Engineering Focus */}
      <section className="py-24 px-8 bg-[#0A0A0A]">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            {/* Image container with elite border effect */}
            <div className="relative z-10 rounded-sm overflow-hidden border border-[#FFD700]/20 aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200"
                alt="Athlete Training"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
            {/* Background gold accent box */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#FFD700]/10 -z-10 group-hover:-bottom-6 group-hover:-right-6 transition-all duration-500"></div>
          </div>

          <div className="space-y-8">
            <span className={sectionLabel}>Engineering First</span>
            <h3 className="text-4xl md:text-5xl font-display font-black uppercase italic tracking-tighter leading-none">
              GEAR FORGED IN <br />
              THE <span className="text-[#FFD700]">IRON PARADISE</span>
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base uppercase tracking-wider">
              We don't simply source products; we engineer them. Every stitch on
              our <span className="text-white font-bold">Lever Belts</span> and
              every component in our{" "}
              <span className="text-white font-bold">Cable Machines</span> is
              obsessed over by performance engineers. We test our gear in the
              most rigorous conditions to ensure that when you reach your
              breaking point, your equipment is just getting started.
            </p>

            {/* Professional Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              <div className={statCardStyle}>
                <h4 className="text-[#FFD700] font-black text-4xl italic tracking-tighter mb-1">
                  50K+
                </h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
                  Athletes Equipped Globally
                </p>
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFD700]/5 -rotate-45 translate-x-8 -translate-y-8"></div>
              </div>
              <div className={statCardStyle}>
                <h4 className="text-[#FFD700] font-black text-4xl italic tracking-tighter mb-1">
                  100%
                </h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
                  Performance Lifetime Warranty
                </p>
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFD700]/5 -rotate-45 translate-x-8 -translate-y-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY GYMATE: Three Pillars */}
      <section className="py-24 px-8 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <span className={sectionLabel}>Our Core Pillars</span>
            <h3 className="text-4xl font-display font-black uppercase italic">
              THE GYMATE ADVANTAGE
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                className="p-10 bg-[#0A0A0A] border border-white/5 hover:border-[#FFD700]/20 transition-all text-center"
              >
                <span className="material-symbols-outlined text-[#FFD700] text-5xl mb-6">
                  {pillar.icon}
                </span>
                <h4 className="text-white font-black uppercase text-sm tracking-widest mb-4">
                  {pillar.title}
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed uppercase tracking-tighter">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-24 px-8 text-center bg-gradient-to-b from-[#0A0A0A] to-black">
        <h3 className="text-2xl font-display font-black uppercase tracking-tighter mb-8 italic">
          READY TO JOIN THE 1%?
        </h3>
        <button
          onClick={() => onNavigate("shop")} // Redirection logic added here
          className="bg-[#FFD700] text-black px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#FFD700]/10"
        >
          Enter The Shop
        </button>
      </section>
    </div>
  );
};
