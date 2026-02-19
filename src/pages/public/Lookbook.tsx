import React from 'react';

interface LookbookProps {
  onNavigate: (page: string) => void;
}

export const Lookbook: React.FC<LookbookProps> = ({ onNavigate }) => {
  const images = [
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&q=80&w=600",
  ];

  return (
    <div className="pt-24 pb-12 px-6 max-w-[1600px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-display font-black text-5xl text-white uppercase italic">The Collection</h2>
        <p className="text-text-muted mt-2">Visualizing dominance in every frame.</p>
      </div>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((src, idx) => (
          <div key={idx} className="relative group overflow-hidden rounded-lg break-inside-avoid">
             <img src={src} alt={`Lookbook ${idx}`} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
               <button 
                  onClick={() => onNavigate('shop')}
                  className="px-6 py-2 bg-white text-black font-bold uppercase tracking-wider hover:bg-primary transition-colors"
               >
                 Shop This Look
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
