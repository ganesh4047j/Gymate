import React from 'react';
import { Product } from '../../types';

interface CartProps {
  items: Product[];
  onRemove: (id: number) => void;
  onNavigate: (page: string) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onRemove, onNavigate }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="pt-28 pb-12 px-6 max-w-4xl mx-auto min-h-screen">
      <h2 className="font-display font-bold text-3xl text-white uppercase italic mb-8">Your Cart ({items.length})</h2>
      
      {items.length === 0 ? (
        <div className="text-center py-20 bg-surface-dark rounded border border-white/5">
           <span className="material-symbols-outlined text-gray-600 text-6xl mb-4">shopping_cart_off</span>
           <p className="text-gray-400 mb-6">Your cart is empty.</p>
           <button onClick={() => onNavigate('shop')} className="text-primary hover:text-white font-bold uppercase underline">Start Shopping</button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex gap-4 bg-surface-dark p-4 rounded border border-white/5 items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-black" />
                <div className="flex-1">
                  <h3 className="font-bold text-white">{item.name}</h3>
                  <p className="text-primary">${item.price.toFixed(2)}</p>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-gray-500 hover:text-red-500">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-surface-dark p-6 rounded border border-white/5 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                 <span className="text-gray-400">Subtotal</span>
                 <span className="text-white font-bold text-xl">${total.toFixed(2)}</span>
              </div>
              <button onClick={() => onNavigate('checkout')} className="w-full bg-primary text-black font-bold uppercase py-3 rounded hover:bg-white transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
