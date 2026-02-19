import React from "react";
import { Product } from "../../types";

interface CartProps {
  items: Product[];
  onRemove: (id: number) => void;
  onNavigate: (page: string) => void;
  // Added for professional E-comm functionality
  onUpdateQuantity?: (id: number, delta: number) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onRemove, onNavigate }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal > 500 ? 0 : 25; // Elite incentive logic
  const total = subtotal + shipping;

  const headerStyle =
    "text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black pb-4 border-b border-white/5";

  return (
    <div className="pt-32 pb-20 px-8 max-w-[1440px] mx-auto min-h-screen">
      {/* Page Header */}
      <div className="mb-12 animate-fade-in-up">
        <h2 className="font-display font-black text-4xl md:text-5xl text-white uppercase italic tracking-tighter">
          Your <span className="text-[#FFD700]">Training</span> Bag
        </h2>
        <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mt-2">
          {items.length} Items ready for deployment
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-[#0A0A0A] border border-white/5 rounded-sm">
          <span className="material-symbols-outlined text-gray-800 text-8xl mb-6">
            shopping_bag
          </span>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold mb-8">
            Your bag is currently empty.
          </p>
          <button
            onClick={() => onNavigate("shop")}
            className="bg-[#FFD700] text-black px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-[#FFD700]/5"
          >
            Explore The Gear
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-16">
          {/* ITEM LIST */}
          <div className="lg:col-span-8 space-y-8">
            <div className="hidden md:grid grid-cols-6 gap-4">
              <div className={`${headerStyle} col-span-3`}>Product Details</div>
              <div className={`${headerStyle} text-center`}>Quantity</div>
              <div className={`${headerStyle} text-center`}>Price</div>
              <div className={`${headerStyle} text-right`}>Action</div>
            </div>

            {items.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="group flex flex-col md:grid md:grid-cols-6 gap-6 items-center bg-[#0A0A0A] p-6 border border-white/5 hover:border-[#FFD700]/20 transition-all duration-500"
              >
                {/* Product Info */}
                <div className="col-span-3 flex gap-6 items-center w-full">
                  <div className="w-24 h-24 bg-[#111111] shrink-0 overflow-hidden border border-white/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div>
                    <p className="text-[9px] text-[#FFD700] font-black uppercase tracking-widest mb-1">
                      Gymate Elite Series
                    </p>
                    <h3 className="font-black text-white uppercase tracking-widest text-sm mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-[10px] uppercase">
                      SKU: GM-2026-0{item.id}
                    </p>
                  </div>
                </div>

                {/* Quantity (Mocked for UI) */}
                <div className="flex items-center justify-center gap-4 bg-black border border-white/10 px-3 py-2 rounded-sm">
                  <button className="text-gray-500 hover:text-[#FFD700] text-lg font-bold">
                    -
                  </button>
                  <span className="text-white font-bold text-xs px-2">1</span>
                  <button className="text-gray-500 hover:text-[#FFD700] text-lg font-bold">
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="text-center">
                  <p className="text-white font-black tracking-tighter text-lg">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Remove Action */}
                <div className="flex justify-end w-full">
                  <button
                    onClick={() => onRemove(item.id)}
                    className="w-10 h-10 flex items-center justify-center border border-white/5 rounded-full text-gray-700 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-all"
                  >
                    <span className="material-symbols-outlined text-xl">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-4">
            <div className="bg-[#0A0A0A] p-8 border border-[#FFD700]/20 sticky top-32 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <h4 className="text-white font-black uppercase text-xs tracking-[0.3em] mb-8 border-b border-white/5 pb-4">
                Order Summary
              </h4>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs uppercase tracking-widest font-bold">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs uppercase tracking-widest font-bold">
                  <span className="text-gray-500">Logistics / Shipping</span>
                  <span
                    className={shipping === 0 ? "text-green-500" : "text-white"}
                  >
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[9px] text-[#FFD700] uppercase tracking-tighter opacity-60">
                    Add ${(500 - subtotal).toFixed(2)} more for free elite
                    shipping
                  </p>
                )}
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-white font-black text-sm uppercase tracking-widest">
                    Total Cost
                  </span>
                  <span className="text-[#FFD700] font-black text-3xl tracking-tighter">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => onNavigate("checkout")}
                  className="w-full bg-[#FFD700] text-black font-black uppercase py-5 text-xs tracking-[0.2em] rounded-sm hover:bg-white transition-all transform active:scale-95 shadow-lg shadow-[#FFD700]/10"
                >
                  Confirm & Checkout
                </button>
                <button
                  onClick={() => onNavigate("shop")}
                  className="w-full bg-transparent text-gray-500 font-bold uppercase py-3 text-[10px] tracking-widest hover:text-white transition-colors"
                >
                  Continue Browsing Gear
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-white/5 flex justify-center gap-6 opacity-30 grayscale">
                <span className="material-symbols-outlined text-white">
                  verified_user
                </span>
                <span className="material-symbols-outlined text-white">
                  local_shipping
                </span>
                <span className="material-symbols-outlined text-white">
                  payments
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
