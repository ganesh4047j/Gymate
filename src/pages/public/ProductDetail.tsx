import React from 'react';
import { Product } from '../../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onNavigate }) => {
  const { name, description, price, originalPrice, rating, image, badge } = product;

  const handleBuyNow = () => {
    onAddToCart(product);
    onNavigate('checkout');
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <button 
        onClick={() => onNavigate('shop')} 
        className="flex items-center gap-2 text-text-muted hover:text-primary mb-8 transition-colors"
      >
        <span className="material-symbols-outlined">arrow_back</span> Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="relative aspect-square bg-[#151515] rounded-xl overflow-hidden border border-white/5 shadow-glow">
           <img 
             src={image} 
             alt={name} 
             className="w-full h-full object-cover" 
           />
           {badge && (
             <div className="absolute top-6 left-6 px-4 py-2 bg-primary text-black font-bold uppercase tracking-wider rounded">
               {badge}
             </div>
           )}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="font-display font-black text-4xl md:text-5xl text-white uppercase italic leading-tight mb-4">
            {name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
             <div className="flex text-primary">
               {Array.from({ length: 5 }).map((_, i) => {
                 const starValue = i + 1;
                 const isHalf = rating + 0.5 === starValue;
                 const isFull = rating >= starValue;
                 return (
                   <span key={i} className={`material-symbols-outlined text-[20px] ${!isFull && !isHalf ? 'text-gray-600' : 'fill-current'}`}>
                      {isHalf ? 'star_half' : 'star'}
                   </span>
                 )
               })}
             </div>
             <span className="text-gray-400 text-sm">(120 Reviews)</span>
          </div>

          <div className="flex items-baseline gap-4 mb-8">
            <span className="font-bold text-4xl text-primary">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-xl text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
            )}
            {originalPrice && (
              <span className="text-green-500 text-sm font-bold uppercase">
                Save ${(originalPrice - price).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-8 border-b border-white/10 pb-8">
            {description}. Engineered for maximum performance and durability. 
            Tested by elite athletes to ensure it meets the highest standards of competition.
            <br/><br/>
            <span className="text-text-muted text-sm block mt-2">
              ✓ Fast Shipping &nbsp; • &nbsp; ✓ 30-Day Returns &nbsp; • &nbsp; ✓ Lifetime Warranty
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-white text-black font-bold uppercase py-4 rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">add_shopping_cart</span>
              Add To Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-primary text-black font-bold uppercase py-4 rounded hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 shadow-glow"
            >
              <span className="material-symbols-outlined">flash_on</span>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
