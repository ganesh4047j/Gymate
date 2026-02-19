import React, { useState, useEffect } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      onClose();
      setQuery('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl animate-fade-in-up">
        <form onSubmit={handleSubmit} className="relative">
          <input 
            autoFocus
            type="text" 
            placeholder="Search yor need..." 
            className="w-full bg-transparent border-b-2 border-primary text-white text-3xl font-display font-bold py-4 focus:outline-none placeholder-gray-600"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors">
            <span className="material-symbols-outlined text-4xl">arrow_forward</span>
          </button>
        </form>
        <div className="mt-8">
           <p className="text-gray-500 text-sm uppercase tracking-widest mb-4">Trending Now</p>
           <div className="flex flex-wrap gap-3">
             {['Lifting Shoes', 'Belts', 'Knee Sleeves', 'Wraps'].map(tag => (
               <button 
                  key={tag}
                  onClick={() => { onSearch(tag); onClose(); }}
                  className="px-4 py-2 border border-white/10 rounded-full text-gray-300 hover:border-primary hover:text-primary transition-colors text-sm"
               >
                 {tag}
               </button>
             ))}
           </div>
        </div>
        <button onClick={onClose} className="absolute -top-12 right-0 text-gray-500 hover:text-white">
           <span className="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>
    </div>
  );
};
