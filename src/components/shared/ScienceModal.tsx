import React, { useEffect, useRef } from "react";

interface ScienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScienceModal: React.FC<ScienceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sectionLabel =
    "text-[#FFD700] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block";
  const techValueStyle =
    "text-white font-mono text-sm font-bold italic tracking-tighter";

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8">
      {/* Immersive Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Floating UI Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div
        ref={modalRef}
        className="relative bg-[#0A0A0A] border border-white/10 rounded-sm max-w-6xl w-full max-h-[90vh] shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col z-10 overflow-hidden animate-[fade-in-up_0.5s_ease-out]"
      >
        {/* HEADER: Lab Identity */}
        <div className="flex justify-between items-center p-6 md:p-10 border-b border-white/5 bg-[#0A0A0A] sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="bg-[#FFD700] p-2 rounded-sm">
              <span className="material-symbols-outlined text-black text-2xl font-bold">
                biotech
              </span>
            </div>
            <div>
              <h3 className="font-display font-black text-2xl md:text-4xl text-white uppercase italic tracking-tighter leading-none">
                GYMATE <span className="text-[#FFD700]">LABS</span>
              </h3>
              <p className="text-[9px] text-gray-500 uppercase tracking-[0.4em] mt-1">
                Technical Research & Development // Ref. 2026-X
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="group flex items-center gap-3 text-gray-500 hover:text-white transition-all"
          >
            <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Close Esc
            </span>
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="overflow-y-auto custom-scrollbar p-6 md:p-16 space-y-24">
          {/* SECTION 1: BIOMECHANICS */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className={sectionLabel}>01. Structural Analysis</span>
              <h4 className="font-display font-black text-4xl text-white uppercase italic tracking-tighter leading-tight">
                ANATOMY-DRIVEN <br /> FORCE VECTORS
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm uppercase tracking-wide">
                Using 3D motion capture and EMG telemetry, we analyze muscle
                recruitment patterns across elite athletes. Our equipment is
                architected to align with natural joint articulation, shifting
                stress from connective tissue to the target muscle group.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white/5 border-l-2 border-[#FFD700]">
                  <p className="text-[9px] text-gray-600 font-black uppercase mb-1">
                    Max Load Stability
                  </p>
                  <span className={techValueStyle}>+42.5% Recruitment</span>
                </div>
                <div className="p-4 bg-white/5 border-l-2 border-[#FFD700]">
                  <p className="text-[9px] text-gray-600 font-black uppercase mb-1">
                    Joint Shear Reduction
                  </p>
                  <span className={techValueStyle}>-18% Stress Ratio</span>
                </div>
              </div>
            </div>

            {/* Visual Blueprint */}
            <div className="relative aspect-video bg-[#111111] border border-white/5 flex items-center justify-center group overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200')] bg-cover bg-center opacity-20 grayscale transition-transform duration-700 group-hover:scale-110"></div>
              <div className="relative z-10 w-full h-full p-8 flex flex-col justify-center">
                <div className="border border-[#FFD700]/30 w-full h-full relative animate-pulse">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FFD700]"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FFD700]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="material-symbols-outlined text-[#FFD700] text-5xl mb-2">
                        monitoring
                      </span>
                      <p className="text-[10px] text-[#FFD700] font-black uppercase tracking-[0.3em]">
                        Mapping Kinetic Flow
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Scanning Line Effect */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FFD700] shadow-[0_0_15px_#FFD700] animate-[scan_4s_linear_infinite] z-20"></div>
            </div>
          </div>

          {/* SECTION 2: MATERIALS SCIENCE */}
          <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <div className="lg:order-2 space-y-6">
              <span className={sectionLabel}>02. Material Composition</span>
              <h4 className="font-display font-black text-4xl text-white uppercase italic tracking-tighter leading-tight">
                TITAN-GRIP <br /> COMPOSITE TECH
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm uppercase tracking-wide">
                Our <span className="text-white">Titan Lever Belts</span>{" "}
                utilize a proprietary 13mm high-density suede composite. It
                provides the rigid intra-abdominal pressure required for 800lb+
                loads while maintaining a "break-in" feel out of the box.
              </p>

              {/* Comparison Table */}
              <div className="bg-[#050505] border border-white/5 rounded-sm overflow-hidden">
                <div className="grid grid-cols-3 p-3 bg-white/5 text-[9px] font-black uppercase tracking-widest text-gray-500">
                  <div>Attribute</div>
                  <div className="text-center">Standard</div>
                  <div className="text-right text-[#FFD700]">Gymate Elite</div>
                </div>
                {[
                  { label: "Tensile Strength", std: "400kg", gym: "1200kg+" },
                  { label: "Friction Coeff.", std: "0.45μ", gym: "0.88μ" },
                  { label: "Memory Retention", std: "65%", gym: "99.2%" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-3 p-4 border-t border-white/5 text-[10px] font-bold uppercase tracking-wider"
                  >
                    <div className="text-gray-400">{row.label}</div>
                    <div className="text-center text-gray-600">{row.std}</div>
                    <div className="text-right text-white italic">
                      {row.gym}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Graph Area */}
            <div className="lg:order-1 aspect-square bg-[#050505] border border-white/5 p-12 flex flex-col justify-between">
              <div className="space-y-8">
                {[
                  {
                    label: "Structural Integrity",
                    val: "100%",
                    color: "#FFD700",
                  },
                  { label: "Load Distribution", val: "98%", color: "#FFD700" },
                  { label: "Wear Resistance", val: "95%", color: "#444" },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-2">
                      <span className="text-gray-500">{bar.label}</span>
                      <span className="text-white">{bar.val}</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/5">
                      <div
                        className="h-full bg-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.5)] transition-all duration-1000"
                        style={{ width: bar.val }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-[9px] text-gray-700 uppercase tracking-[0.5em]">
                  Global Benchmarking Status: OPTIMIZED
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER: Meta Data */}
        <div className="p-6 border-t border-white/5 bg-[#0A0A0A] flex justify-between items-center z-30">
          <span className="text-[9px] text-gray-700 font-mono tracking-widest uppercase">
            Encryption Status: SECURE // Gymate_RD_Division
          </span>
          <div className="flex gap-4 opacity-30 grayscale">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span className="material-symbols-outlined text-sm">
              precision_manufacturing
            </span>
            <span className="material-symbols-outlined text-sm">shield</span>
          </div>
        </div>
      </div>
    </div>
  );
};