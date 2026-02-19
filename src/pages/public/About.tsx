import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
         <h2 className="font-display font-black text-5xl text-white uppercase italic mb-4">Our Mission</h2>
         <p className="text-text-muted max-w-2xl mx-auto text-lg">
           Gymate was born from a simple belief: <span className="text-primary">Elite effort deserves elite equipment.</span>
         </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-glow group">
           <img src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=800" alt="Gym Factory" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        </div>
        <div className="space-y-6">
           <h3 className="text-3xl font-bold text-white uppercase">Engineered for Performance</h3>
           <p className="text-gray-400 leading-relaxed">
             We don't simply source products; we engineer them. Every stitch, every material, and every contour is obsessed over by athletes, for athletes. We test our gear in the most rigorous conditions imaginable to ensure that when you're at your breaking point, your gear isn't.
           </p>
           <div className="grid grid-cols-2 gap-4 pt-4">
             <div className="bg-surface-dark p-4 rounded border border-white/5">
                <h4 className="text-primary font-bold text-2xl">50k+</h4>
                <p className="text-xs text-gray-400 uppercase">Athletes Equipped</p>
             </div>
             <div className="bg-surface-dark p-4 rounded border border-white/5">
                <h4 className="text-primary font-bold text-2xl">100%</h4>
                <p className="text-xs text-gray-400 uppercase">Performance Guarantee</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
