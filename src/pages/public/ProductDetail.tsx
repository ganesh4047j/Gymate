import React, { useState } from "react";
import { Product } from "../../types";

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
  onNavigate,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "specs" | "shipping">(
    "details",
  );
  const { name, description, price, originalPrice, rating, image, badge } =
    product;

  const handleBuyNow = () => {
    onAddToCart(product);
    onNavigate("checkout");
  };

  const sectionLabel =
    "text-[#FFD700] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block";
  const tabBtnStyle = (tab: string) =>
    `pb-4 text-[11px] font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === tab ? "border-[#FFD700] text-white" : "border-transparent text-gray-600 hover:text-gray-400"}`;

  return (
    <div className="bg-black min-h-screen pt-32 pb-20 px-8">
      <div className="max-w-[1440px] mx-auto">
        {/* BREADCRUMB / BACK */}
        <button
          onClick={() => onNavigate("shop")}
          className="group flex items-center gap-3 text-gray-500 hover:text-[#FFD700] mb-12 transition-colors uppercase text-[10px] font-black tracking-widest"
        >
          <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">
            west
          </span>
          Back to Performance Center
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          {/* LEFT: IMAGE SHOWCASE */}
          <div className="lg:col-span-7">
            <div className="relative aspect-square bg-[#0A0A0A] border border-white/5 group overflow-hidden">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {badge && (
                <div className="absolute top-8 left-8 bg-[#FFD700] text-black font-black uppercase text-[10px] px-6 py-2 tracking-[0.2em] shadow-xl">
                  {badge}
                </div>
              )}
              {/* 3D Reflection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD700]/5 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* THUMBNAIL TRACK (Placeholder for Multi-image support) */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`aspect-square bg-[#0A0A0A] border ${i === 1 ? "border-[#FFD700]/40" : "border-white/5"} cursor-pointer hover:border-[#FFD700]/40 transition-all`}
                ></div>
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT DATA */}
          <div className="lg:col-span-5 flex flex-col">
            <span className={sectionLabel}>
              Elite Gear // GM-{product.id}002
            </span>
            <h1 className="font-display font-black text-5xl md:text-7xl text-white uppercase italic leading-[0.85] tracking-tighter mb-6">
              {name}
            </h1>

            <div className="flex items-center gap-6 mb-8 border-b border-white/5 pb-8">
              <div className="flex text-[#FFD700]">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[18px] fill-current"
                  >
                    {rating >= i + 1
                      ? "star"
                      : rating >= i + 0.5
                        ? "star_half"
                        : "star_outline"}
                  </span>
                ))}
              </div>
              <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                128 Verified Reviews
              </span>
            </div>

            <div className="flex items-baseline gap-6 mb-10">
              <span className="font-display font-black text-5xl text-[#FFD700] tracking-tighter">
                ${price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-xl text-gray-700 line-through font-bold">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
              <span className="bg-white/5 text-gray-400 text-[9px] font-black px-3 py-1 uppercase tracking-widest rounded-full">
                Tax Included
              </span>
            </div>

            {/* PURCHASE CONTROLS */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-[#0A0A0A] border border-white/10 p-1 rounded-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 text-gray-500 hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-white font-black text-xs">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 text-gray-500 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  <span className="text-white">In Stock:</span> Ships within 24
                  hours
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onAddToCart(product)}
                  className="flex-1 bg-white text-black font-black uppercase py-5 text-[11px] tracking-[0.2em] hover:bg-[#FFD700] transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined text-lg">
                    shopping_bag
                  </span>
                  Add To Bag
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#FFD700] text-black font-black uppercase py-5 text-[11px] tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,215,0,0.1)]"
                >
                  <span className="material-symbols-outlined text-lg">
                    bolt
                  </span>
                  Buy Now
                </button>
              </div>
            </div>

            {/* TABBED INFORMATION SECTION */}
            <div className="mt-auto border-t border-white/5 pt-8">
              <div className="flex gap-8 mb-6">
                <button
                  onClick={() => setActiveTab("details")}
                  className={tabBtnStyle("details")}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={tabBtnStyle("specs")}
                >
                  Specs
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={tabBtnStyle("shipping")}
                >
                  Delivery
                </button>
              </div>

              <div className="text-gray-500 text-xs uppercase leading-relaxed tracking-wider min-h-[100px]">
                {activeTab === "details" && (
                  <p>
                    {description}. Engineered for maximum kinetic output and
                    structural resilience. Tested in high-intensity environments
                    by the 1% to ensure zero failure at peak load.
                  </p>
                )}
                {activeTab === "specs" && (
                  <ul className="grid grid-cols-2 gap-y-3">
                    <li>
                      <span className="text-white">Material:</span> Aerospace
                      Grade
                    </li>
                    <li>
                      <span className="text-white">Weight:</span> Performance
                      Calibrated
                    </li>
                    <li>
                      <span className="text-white">Origin:</span> Gymate Labs
                    </li>
                    <li>
                      <span className="text-white">Coating:</span> Anti-Friction
                      Matte
                    </li>
                  </ul>
                )}
                {activeTab === "shipping" && (
                  <p>
                    Global deployment in 7-15 business days. Free logistics on
                    orders over $500.00. Securely packed in Gymate Elite
                    reinforced boxes.
                  </p>
                )}
              </div>
            </div>

            {/* TRUST BADGES */}
            <div className="mt-12 grid grid-cols-3 gap-4 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 border-t border-white/5 pt-8">
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined">verified</span>
                <span className="text-[8px] font-black uppercase tracking-widest">
                  Certified
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined">
                  local_shipping
                </span>
                <span className="text-[8px] font-black uppercase tracking-widest">
                  Global Drop
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined">payments</span>
                <span className="text-[8px] font-black uppercase tracking-widest">
                  SSL Secure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};