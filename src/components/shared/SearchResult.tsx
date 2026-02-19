import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
}

export const SearchResults: React.FC<{ query: string }> = ({ query }) => {
  const [sortBy, setSortBy] = useState('featured');

  // Mock data representing your core 5-product catalog
  const allProducts: Product[] = [
    { id: 1, name: "Pro Massage Gun V2", price: 189, category: "Recovery", image: "/gun.jpg", isNew: true },
    { id: 2, name: "Titan Lever Lifting Belt", price: 120, category: "Accessories", image: "/belt.jpg" },
    { id: 3, name: "Padded Wrist Wraps", price: 35, category: "Accessories", image: "/wraps.jpg" },
    { id: 4, name: "Apex Pull-Up Station", price: 299, category: "Equipment", image: "/station.jpg" },
    { id: 5, name: "MaxPro Cable Machine", price: 850, category: "Equipment", image: "/cable.jpg", isNew: true },
  ];

  const results = allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-8">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/5 pb-8 gap-6">
          <div className="animate-fade-in-up">
            <p className="text-[#FFD700] text-[10px] font-black uppercase tracking-[0.4em] mb-2">Search Results</p>
            <h2 className="text-white text-4xl md:text-5xl font-display font-black uppercase italic tracking-tighter">
              Showing Results For: <span className="text-gray-500">"{query}"</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{results.length} Products Found</span>
             <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white text-[10px] uppercase font-black tracking-widest border border-white/10 p-2 focus:border-[#FFD700] outline-none cursor-pointer"
             >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
             </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-10 hidden lg:block">
            <div>
              <h4 className="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-6">Categories</h4>
              <ul className="space-y-3">
                {['All Gear', 'Recovery', 'Accessories', 'Heavy Equipment'].map(cat => (
                  <li key={cat} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-1.5 h-1.5 rounded-full border border-white/20 group-hover:bg-[#FFD700] group-hover:border-[#FFD700] transition-all"></div>
                    <span className="text-gray-500 text-xs uppercase font-bold tracking-widest group-hover:text-white transition-colors">{cat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-6">Price Range</h4>
              <input type="range" className="w-full accent-[#FFD700]" min="0" max="1000" />
              <div className="flex justify-between text-[10px] text-gray-500 font-bold mt-2">
                <span>$0</span>
                <span>$1000+</span>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {results.map((product) => (
                <div key={product.id} className="group relative bg-[#111111] border border-white/5 hover:border-[#FFD700]/30 transition-all duration-500 overflow-hidden">
                  
                  {/* Badge */}
                  {product.isNew && (
                    <span className="absolute top-4 left-4 z-10 bg-[#FFD700] text-black text-[9px] font-black px-3 py-1 uppercase tracking-widest">New</span>
                  )}

                  {/* Image Container with Zoom Effect */}
                  <div className="aspect-[4/5] bg-[#1a1a1a] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                    <div className="w-full h-full bg-gray-800 transition-transform duration-700 group-hover:scale-110">
                       {/* Image would go here */}
                    </div>
                    
                    {/* Hover Quick Add */}
                    <button className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[80%] bg-white text-black text-[10px] font-black uppercase py-3 tracking-widest translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#FFD700]">
                      Add to Training Bag
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.3em] mb-2">{product.category}</p>
                    <h3 className="text-white text-sm font-black uppercase tracking-widest group-hover:text-[#FFD700] transition-colors mb-3">
                      {product.name}
                    </h3>
                    <p className="text-[#FFD700] font-black text-lg tracking-tighter">${product.price}.00</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {results.length === 0 && (
              <div className="flex flex-col items-center justify-center py-40 border border-white/5 rounded-sm">
                <span className="material-symbols-outlined text-gray-800 text-8xl mb-6">search_off</span>
                <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">No elite gear found for that query.</p>
                <button className="mt-8 text-[#FFD700] text-[10px] font-black uppercase tracking-widest border-b border-[#FFD700]">Clear Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};