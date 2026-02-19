import React from 'react';
import { REVIEWS } from '../../data';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-[#0d0d0d] overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">Wall of Gains</h2>
        <p className="text-text-muted">Join the elite athletes trusting Gymate.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 px-6 overflow-x-auto pb-8 snap-x scrollbar-hide md:justify-center">
        {REVIEWS.map((review) => (
          <div key={review.id} className="min-w-[300px] md:min-w-[400px] bg-surface-dark p-8 rounded-xl border border-white/5 relative snap-center hover:border-primary/20 transition-colors">
            <span className="absolute top-6 right-6 text-6xl text-white/5 font-serif select-none">"</span>
            
            <div className="flex text-primary mb-4">
              {Array.from({ length: 5 }).map((_, i) => {
                 const starValue = i + 1;
                 const isHalf = review.rating + 0.5 === starValue;
                 const isFull = review.rating >= starValue;
                 return (
                   <span key={i} className={`material-symbols-outlined text-[20px] ${!isFull && !isHalf ? 'text-gray-600' : 'fill-current'}`}>
                      {isHalf ? 'star_half' : 'star'}
                   </span>
                 )
              })}
            </div>

            <p className="text-gray-300 italic mb-6 leading-relaxed relative z-10">"{review.text}"</p>

            <div className="flex items-center gap-4">
              <img 
                src={review.avatar} 
                alt={review.author} 
                className="w-12 h-12 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <h4 className="font-bold text-white text-sm">{review.author}</h4>
                <p className="text-xs text-text-muted uppercase tracking-wide">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
