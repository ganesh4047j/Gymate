import React from 'react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string, params?: any) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onNavigate }) => {
  const { id, name, description, price, originalPrice, rating, image, badge } = product;

  return (
    <div className="group relative flex flex-col bg-surface-dark rounded-lg overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-2">
      {badge && (
        <div className={`absolute top-3 left-3 z-10 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
          badge === 'Best Value' 
            ? 'bg-white/10 backdrop-blur-md text-white border border-white/20' 
            : 'bg-primary text-black'
        }`}>
          {badge}
        </div>
      )}

      <div 
        className="relative aspect-[4/5] bg-[#151515] overflow-hidden cursor-pointer"
        onClick={() => onNavigate('product-detail', { productId: id })}
      >
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
        />
        
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent flex gap-2"
             onClick={(e) => e.stopPropagation()} 
        >
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full h-10 bg-white text-black font-bold text-sm uppercase tracking-wide rounded hover:bg-primary transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">add_shopping_cart</span>
            Quick Add
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-1 flex-1">
        <div className="flex justify-between items-start">
          <h3 
            className="font-display font-bold text-white text-lg leading-tight group-hover:text-primary transition-colors cursor-pointer"
            onClick={() => onNavigate('product-detail', { productId: id })}
          >
            {name}
          </h3>
          <div className="flex text-primary text-[10px] items-center">
             {Array.from({ length: 5 }).map((_, i) => {
               const starValue = i + 1;
               const isHalf = rating + 0.5 === starValue;
               const isFull = rating >= starValue;
               
               return (
                 <span key={i} className={`material-symbols-outlined text-[14px] ${!isFull && !isHalf ? 'text-gray-600' : 'fill-current'}`}>
                    {isHalf ? 'star_half' : 'star'}
                 </span>
               )
             })}
          </div>
        </div>
        <p className="text-text-muted text-xs line-clamp-1">{description}</p>
        <div className="mt-auto pt-3 flex items-center gap-2">
          <span className="text-white font-bold">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-gray-500 text-xs line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};
