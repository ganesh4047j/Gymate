import React, { useState } from 'react';
import { Product } from '../../types';

interface CheckoutProps {
  items: Product[];
  onClear: () => void;
  onNavigate: (page: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ items, onClear, onNavigate }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onClear();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="pt-32 pb-12 px-6 max-w-xl mx-auto text-center min-h-[60vh] flex flex-col justify-center">
        <span className="material-symbols-outlined text-primary text-8xl mb-6">check_circle</span>
        <h2 className="font-display font-black text-4xl text-white uppercase italic mb-4">Order Confirmed</h2>
        <p className="text-text-muted mb-8">Your gear is being prepped for shipment. Welcome to the elite.</p>
        <button onClick={() => { setIsSuccess(false); onNavigate('home'); }} className="bg-primary text-black font-bold uppercase py-3 px-8 rounded hover:bg-white transition-colors">
          Return to Base
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-12 px-6 max-w-4xl mx-auto min-h-screen">
      <button onClick={() => onNavigate('cart')} className="flex items-center gap-2 text-text-muted hover:text-white mb-8 transition-colors">
        <span className="material-symbols-outlined">arrow_back</span> Back to Cart
      </button>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display font-bold text-2xl text-white uppercase italic mb-6">Secure Checkout</h2>
          <form onSubmit={handleCheckout} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" placeholder="First Name" className="bg-surface-dark border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none w-full" />
              <input required type="text" placeholder="Last Name" className="bg-surface-dark border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none w-full" />
            </div>
            <input required type="email" placeholder="Email" className="bg-surface-dark border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none w-full" />
            <input required type="text" placeholder="Address" className="bg-surface-dark border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none w-full" />
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" placeholder="City" className="bg-surface-dark border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none w-full" />
              <input required type="text" placeholder="ZIP Code" className="bg-surface-dark border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none w-full" />
            </div>
            
            <h3 className="font-bold text-white mt-6 mb-2">Payment</h3>
            <div className="bg-surface-dark p-4 rounded border border-white/10 mb-4 flex gap-4 items-center">
                <span className="material-symbols-outlined text-gray-400">credit_card</span>
                <input required type="text" placeholder="Card Number" className="bg-transparent border-none focus:ring-0 text-white w-full placeholder-gray-500" />
            </div>
            
            <button disabled={isProcessing} type="submit" className="w-full bg-primary text-black font-bold uppercase py-4 rounded hover:bg-white transition-colors mt-6 disabled:opacity-50">
              {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="bg-surface-dark p-6 rounded-lg border border-white/5 h-fit">
            <h3 className="font-bold text-white mb-4">Order Summary</h3>
            <div className="space-y-4 mb-4">
              {items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-white">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between items-center font-bold text-xl text-primary">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
        </div>
      </div>
    </div>
  );
};
