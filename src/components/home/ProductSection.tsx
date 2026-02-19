import React from 'react';
import { PRODUCTS } from '../../data';
import { Product } from '../../types';
import { ProductCard } from '../shared/ProductCard';

interface ProductSectionProps {
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string, params?: any) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({ onAddToCart, onNavigate }) => {
  return (
    <section className="py-24 px-4 md:px-8 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-6">
        <div>
          <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Performance Gear</h3>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">Best Sellers</h2>
        </div>
        <button 
          onClick={() => onNavigate('shop')}
          className="group flex items-center gap-1 text-sm font-medium text-text-muted hover:text-primary transition-colors"
        >
          View All Products
          <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {PRODUCTS.map(product => (
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