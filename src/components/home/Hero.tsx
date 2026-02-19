import React from "react";
import mobVideo from "../../../Public/video/bg_video_mobile.mp4";
import lapVideo from "../../../Public/video/bg_video_lap.mp4";

interface HeroProps {
  onNavigate: (page: string) => void;
  onOpenScience: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenScience }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10"></div>

        {/* Dynamic Video Element */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center md:object-[center_20%] transform scale-105"
        >
          {/* Desktop/Laptop View Source */}
          <source
            src={lapVideo}
            type="video/mp4"
            media="(min-width: 768px)"
          />
          {/* Mobile View Source */}
          <source src={mobVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* CONTENT LAYER (Existing elements preserved exactly) */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-6 pt-20">
        <div className="inline-flex items-center gap-2 border border-primary/30 rounded-full px-4 py-1.5 bg-black/40 backdrop-blur-sm mb-2 animate-fade-in-up">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            New Season Drop
          </span>
        </div>

        <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter text-white uppercase italic text-glow animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
          Engineered <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
            For The Elite
          </span>
        </h2>

        <p className="font-body text-gray-300 text-lg md:text-xl max-w-xl font-light leading-relaxed animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
          Premium gear designed for peak performance. Push your limits with
          equipment built to withstand the intensity of champions.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4 mt-6 animate-fade-in-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
          <button
            onClick={() => onNavigate("shop")}
            className="w-full md:w-auto group relative px-8 py-4 bg-primary text-black font-display font-bold text-sm uppercase tracking-wider rounded overflow-hidden shadow-glow hover:shadow-glow-hover transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore Collection
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          </button>

          <button
            onClick={() => onNavigate("lookbook")}
            className="w-full md:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-display font-bold text-sm uppercase tracking-wider rounded hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
          >
            View Lookbook
          </button>
        </div>
      </div>
    </section>
  );
};
