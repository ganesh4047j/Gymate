import React from "react";
import { PRODUCTS } from "../../data";
import { Product } from "../../types";
import { ProductCard } from "../shared/ProductCard";

interface ProductSectionProps {
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string, params?: any) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  onAddToCart,
  onNavigate,
}) => {
  return (
    <section className="py-24 px-6 md:px-8 max-w-[1600px] mx-auto w-full">
      {/* CENTERED HEADER SECTION */}
      <div className="flex flex-col items-center text-center mb-20 gap-8 border-b border-white/5 pb-12 animate-fade-in">
        <div className="space-y-3">
          <h3 className="text-[#FFD700] text-[10px] font-black uppercase tracking-[0.5em] mb-2 block">
            Performance Gear
          </h3>
          <h2 className="font-display font-black text-4xl md:text-7xl text-white uppercase italic tracking-tighter leading-none">
            Best Sellers
          </h2>
        </div>

        <button
          onClick={() => onNavigate("shop")}
          className="group flex flex-col items-center gap-3 transition-all"
        >
          {/* Decorative Elite Accent Line */}
          <span className="h-[1px] w-12 bg-[#FFD700] group-hover:w-24 transition-all duration-500"></span>

          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors">
            View All Products
            <span className="material-symbols-outlined text-lg group-hover:translate-x-2 transition-transform">
              arrow_right_alt
            </span>
          </div>
        </button>
      </div>

      {/* PRODUCT GRID: Optimized spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </section>
  );
};
