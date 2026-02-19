import React from 'react';
import { PRODUCTS } from '../../data';
import { Product } from '../../types';
import { ProductCard } from '../../components/shared/ProductCard';

interface ShopProps {
  filter?: string;
  searchQuery?: string;
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string, params?: any) => void;
}

export const Shop: React.FC<ShopProps> = ({ filter, searchQuery, onAddToCart, onNavigate }) => {
  let displayedProducts = PRODUCTS;

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    displayedProducts = displayedProducts.filter(p => 
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  } else if (filter) {
    if (filter === 'new') displayedProducts = displayedProducts.filter(p => p.isNew);
    else if (filter === 'accessories') displayedProducts = displayedProducts.filter(p => p.category === 'accessories');
    else if (filter === 'gift-card') displayedProducts = displayedProducts.filter(p => p.category === 'gift-card');
    else if (filter === 'best-sellers') displayedProducts = displayedProducts.filter(p => p.rating >= 4.8);
  }

  return (
    <div className="pt-28 pb-12 px-6 max-w-[1600px] mx-auto min-h-screen">
      <div className="mb-8 border-b border-white/10 pb-4">
        <h2 className="font-display font-bold text-3xl text-white uppercase italic">
          {searchQuery ? `Search: "${searchQuery}"` : 
           filter === 'new' ? 'New Arrivals' :
           filter === 'accessories' ? 'Accessories' :
           filter === 'gift-card' ? 'Gift Cards' :
           filter === 'best-sellers' ? 'Best Sellers' : 'Shop All Gear'}
        </h2>
        <p className="text-text-muted text-sm mt-1">{displayedProducts.length} items found</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
};
