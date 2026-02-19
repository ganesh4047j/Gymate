import React from 'react';

interface FeatureSectionProps {
  onOpenScience: () => void;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({ onOpenScience }) => {
  return (
    <section 
      className="relative py-32 flex items-center bg-fixed bg-center bg-cover bg-no-repeat" 
      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDI5d10lyrpjUs_mSbs_u7tzHX1VlLpEWQotjW3ubdalPcrr6Rl-NXzwCnRoJVkQVfaPB_FY-ey_LyYLFgey5o7A2KvLLleeM-0YvlKzB0OzzXKjyRKKeJ0nyzW-fWUjcjS2q3mCP7yN6pbGKxcMLSY-gBez4TtigziBgNU6DgOuUMvpUV22onZGOXE5iVaCJYlO1YaQBxbV3xW44Koc1lVhHworjx2VcyYREROY8okCYEtWxwI1PHslwQsZkSysEF7TFjPHnCAHPta')" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 container mx-auto px-6 text-center">
        <span className="text-primary font-bold uppercase tracking-[0.2em] mb-4 block">No Compromises</span>
        <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-8 uppercase italic">Unlock Your True Potential</h2>
        <button 
          onClick={onOpenScience}
          className="px-8 py-3 bg-transparent border-2 border-primary text-primary font-bold uppercase tracking-wider hover:bg-primary hover:text-black transition-all duration-300"
        >
          Read The Science
        </button>
      </div>
    </section>
  );
};