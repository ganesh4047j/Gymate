import React, { useState } from "react";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string, params?: any) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onNavigate,
}) => {
  const { id, name, description, price, originalPrice, rating, image, badge } =
    product;
  const [isWishlisted, setIsWishlisted] = useState(false);

  // E-commerce logic: Calculate savings percentage
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleNavigate = () => onNavigate("product-detail", { productId: id });

  return (
    <div className="group relative flex flex-col bg-[#0A0A0A] border border-white/5 transition-all duration-500 hover:border-[#FFD700]/30 hover:-translate-y-2">
      {/* 1. TOP MEDIA SECTION */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#111111]">
        {/* Dynamic Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {badge && (
            <span className="bg-[#FFD700] text-black text-[9px] font-black px-3 py-1 uppercase tracking-widest shadow-lg">
              {badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-white text-black text-[9px] font-black px-3 py-1 uppercase tracking-widest shadow-lg">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Toggle (Essential E-comm functionality) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 text-white hover:text-[#FFD700] transition-all rounded-sm"
        >
          <span
            className={`material-symbols-outlined text-xl ${isWishlisted ? "fill-current text-[#FFD700]" : ""}`}
          >
            {isWishlisted ? "favorite" : "favorite_border"}
          </span>
        </button>

        {/* Product Image */}
        <img
          src={image}
          alt={name}
          onClick={handleNavigate}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100 cursor-pointer"
        />

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-sm hover:bg-[#FFD700] transition-all flex items-center justify-center gap-3 shadow-2xl"
          >
            <span className="material-symbols-outlined text-lg">
              add_shopping_cart
            </span>
            Add to Bag
          </button>
        </div>
      </div>

      {/* 2. PRODUCT INFO SECTION */}
      <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-transparent to-black/20">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[#FFD700] text-[8px] font-black uppercase tracking-[0.3em]">
            Gymate // GM-{id}
          </p>
          <div className="flex text-[#FFD700]">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined text-[14px] fill-current"
              >
                {rating >= i + 1
                  ? "star"
                  : rating >= i + 0.5
                    ? "star_half"
                    : "star_outline"}
              </span>
            ))}
          </div>
        </div>

        <h3
          className="font-display font-black text-white text-lg leading-none uppercase italic tracking-tighter mb-3 group-hover:text-[#FFD700] transition-colors cursor-pointer"
          onClick={handleNavigate}
        >
          {name}
        </h3>

        <p className="text-gray-500 text-[10px] uppercase tracking-wider line-clamp-2 leading-relaxed mb-6">
          {description}
        </p>

        {/* Pricing Layout */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-baseline gap-3">
          <span className="text-white font-black text-xl tracking-tighter">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-gray-600 text-xs line-through font-bold">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
