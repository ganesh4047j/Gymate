import React from 'react';

export const Marquee: React.FC = () => {
  const text = "⚡ Flash Sale: 20% Off All Lifting Gear • Free Shipping on Orders Over $150 • New Arrivals: The Zenith V2 is here •";
  const repeats = 4;

  return (
    <div className="w-full bg-primary text-black py-2 overflow-hidden whitespace-nowrap border-y border-yellow-600">
      <div className="inline-flex gap-8 items-center animate-marquee font-bold uppercase text-xs tracking-widest">
        {Array.from({ length: repeats }).map((_, i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
    </div>
  );
};
