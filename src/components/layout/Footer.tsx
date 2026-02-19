import React from 'react';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
  onOpenModal: (type: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenModal }) => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          <div className="lg:w-1/3">
            <div onClick={() => onNavigate('home')} className="flex items-center gap-2 mb-6 group cursor-pointer w-fit">
              <span className="material-symbols-outlined text-primary text-3xl group-hover:rotate-12 transition-transform">fitness_center</span>
              <h2 className="font-display font-black text-2xl tracking-tighter uppercase italic text-white">Gymate</h2>
            </div>
            <p className="text-text-muted mb-6 leading-relaxed">
              Defining the standard for elite fitness equipment. We engineer gear for those who refuse to settle for average.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          <div className="lg:w-2/3 flex flex-col md:flex-row gap-12 justify-between">
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="text-white font-bold uppercase tracking-wider mb-6">Shop</h4>
                <ul className="space-y-4 text-text-muted text-sm cursor-pointer">
                  <li><button onClick={() => onNavigate('shop', { filter: 'new' })} className="hover:text-primary transition-colors">New Arrivals</button></li>
                  <li><button onClick={() => onNavigate('shop', { filter: 'best-sellers' })} className="hover:text-primary transition-colors">Best Sellers</button></li>
                  <li><button onClick={() => onNavigate('shop', { filter: 'accessories' })} className="hover:text-primary transition-colors">Accessories</button></li>
                  <li><button onClick={() => onNavigate('shop', { filter: 'gift-card' })} className="hover:text-primary transition-colors">Gift Cards</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold uppercase tracking-wider mb-6">Support</h4>
                <ul className="space-y-4 text-text-muted text-sm cursor-pointer">
                  <li><button onClick={() => onOpenModal('help')} className="hover:text-primary transition-colors">Help Center</button></li>
                  <li><button onClick={() => onOpenModal('returns')} className="hover:text-primary transition-colors">Returns</button></li>
                  <li><button onClick={() => onOpenModal('warranty')} className="hover:text-primary transition-colors">Warranty</button></li>
                  <li><button onClick={() => onOpenModal('contact')} className="hover:text-primary transition-colors">Contact Us</button></li>
                </ul>
              </div>
            </div>

            <div className="md:w-1/2 bg-surface-dark p-8 rounded-lg border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
              <h4 className="text-primary font-bold uppercase tracking-wider mb-2 relative z-10">Equip Your Gym</h4>
              <p className="text-gray-300 text-sm mb-4 relative z-10">
                Looking to outfit a commercial facility? We offer bulk pricing and custom branding for elite gyms.
              </p>
              <button onClick={() => onOpenModal('contact')} className="flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest relative z-10 group-hover:text-primary transition-colors">
                Contact Sales <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>&copy; 2023 Gymate Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => onOpenModal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => onOpenModal('terms')} className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
