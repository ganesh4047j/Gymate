import React, { useState } from 'react';
import { User } from '../../types';

interface HeaderProps {
  onNavigate: (page: string, params?: any) => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  cartCount: number;
  user: User | null;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenSearch, onOpenProfile, cartCount, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/30 glass-header transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between relative">
        <button 
          className="lg:hidden text-white hover:text-primary transition-colors z-20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          <button onClick={() => handleNav('home')} className="text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors">Home</button>
          <button onClick={() => handleNav('shop')} className="text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors">Shop</button>
          <button onClick={() => handleNav('about')} className="text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors">About</button>
        </nav>

        <button onClick={() => handleNav('home')} className="flex items-center gap-2 group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <span className="material-symbols-outlined text-primary text-3xl group-hover:rotate-12 transition-transform duration-300">fitness_center</span>
          <h1 className="font-display font-black text-2xl tracking-tighter uppercase italic text-white">Gymate</h1>
        </button>

        <div className="flex items-center gap-6 z-20">
          <button onClick={onOpenSearch} className="text-white hover:text-primary transition-colors hidden sm:block">
            <span className="material-symbols-outlined">search</span>
          </button>

          <button onClick={user ? onOpenProfile : () => handleNav('login')} className="text-white hover:text-primary transition-colors hidden sm:block relative group">
            <span className="material-symbols-outlined">person</span>
            {user && <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>}
          </button>
          
          <button onClick={() => handleNav('cart')} className="flex items-center gap-2 text-white hover:text-primary transition-colors group relative">
            <span className="material-symbols-outlined">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black">{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      <div className={`lg:hidden absolute top-20 left-0 right-0 bg-background-dark/95 backdrop-blur-xl border-b border-primary/20 transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col items-center py-6 gap-6">
          <button onClick={() => handleNav('home')} className="text-lg font-bold uppercase tracking-widest text-white hover:text-primary transition-colors">Home</button>
          <button onClick={() => handleNav('shop')} className="text-lg font-bold uppercase tracking-widest text-white hover:text-primary transition-colors">Shop</button>
          <button onClick={() => handleNav('about')} className="text-lg font-bold uppercase tracking-widest text-white hover:text-primary transition-colors">About</button>
          <div className="flex gap-8 mt-2">
            <button onClick={() => { onOpenSearch(); setIsMobileMenuOpen(false); }} className="text-white hover:text-primary transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); user ? onOpenProfile() : handleNav('login'); }} className="text-white hover:text-primary transition-colors">
              <span className="material-symbols-outlined">person</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
