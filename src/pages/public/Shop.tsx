import React, { useState, useMemo } from "react";
import { PRODUCTS } from "../../data";
import { Product } from "../../types";
import { ProductCard } from "../../components/shared/ProductCard";

interface ShopProps {
  filter?: string;
  searchQuery?: string;
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string, params?: any) => void;
}

export const Shop: React.FC<ShopProps> = ({
  filter,
  searchQuery,
  onAddToCart,
  onNavigate,
}) => {
  // Use a string state for the UI, but we will map it to valid types for the logic
  const [activeCategory, setActiveCategory] = useState<string>(filter || "all");

  const displayedProducts = useMemo(() => {
    let list = PRODUCTS;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q),
      );
    }

    if (activeCategory !== "all") {
      // Logic adjusted to match the types: "footwear" | "gear" | "accessories" | "gift-card"
      switch (activeCategory) {
        case "new":
          return list.filter((p) => p.isNew);
        case "best-sellers":
          return list.filter((p) => p.rating >= 4.8);
        case "accessories":
          return list.filter((p) => p.category === "accessories");
        case "gift-card":
          return list.filter((p) => p.category === "gift-card");
        // Map "equipment" and "recovery" gear to the existing "gear" type to satisfy TypeScript
        case "equipment":
        case "recovery":
        case "gear":
          return list.filter((p) => p.category === "gear");
        default:
          return list;
      }
    }

    return list;
  }, [searchQuery, activeCategory]);

  const categories = [
    { id: "all", label: "All Gear" },
    { id: "new", label: "New Drops" },
    { id: "recovery", label: "Recovery Gear" }, // UI Label
    { id: "accessories", label: "Accessories" },
    { id: "equipment", label: "Heavy Equipment" }, // UI Label
    { id: "best-sellers", label: "Best Sellers" },
  ];

  const sectionLabel =
    "text-[#FFD700] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block";

  return (
    <div className="bg-black min-h-screen pt-32 pb-20 px-8">
      <div className="max-w-[1440px] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/5 pb-10 gap-8 animate-fade-in">
          <div>
            <span className={sectionLabel}>Gymate Deployment Center</span>
            <h2 className="font-display font-black text-5xl md:text-7xl text-white uppercase italic tracking-tighter leading-none">
              {searchQuery
                ? `SEARCH: ${searchQuery}`
                : activeCategory.replace("-", " ")}
            </h2>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">
              {displayedProducts.length} Units Available
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-[#FFD700] to-transparent"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* SIDEBAR */}
          <aside className="lg:col-span-3 space-y-12">
            <div>
              <h4 className="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-8">
                Navigation
              </h4>
              <nav className="flex flex-col gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-left text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center gap-4 group ${
                      activeCategory === cat.id
                        ? "text-[#FFD700]"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    <span
                      className={`h-[1px] bg-[#FFD700] transition-all duration-500 ${
                        activeCategory === cat.id
                          ? "w-8"
                          : "w-0 group-hover:w-4"
                      }`}
                    ></span>
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="bg-[#0A0A0A] p-8 border border-[#FFD700]/10 rounded-sm">
              <span className="material-symbols-outlined text-[#FFD700] mb-4">
                verified
              </span>
              <h5 className="text-white text-[10px] font-black uppercase tracking-widest mb-2">
                Elite Quality
              </h5>
              <p className="text-gray-600 text-[9px] uppercase leading-relaxed tracking-tighter">
                All equipment is tested for kinetic stability and material
                durability.
              </p>
            </div>
          </aside>

          {/* GRID */}
          <main className="lg:col-span-9">
            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {displayedProducts.map((product) => (
                  <div key={product.id} className="animate-fade-in-up">
                    <ProductCard
                      product={product}
                      onAddToCart={onAddToCart}
                      onNavigate={onNavigate}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 border border-white/5 bg-[#0A0A0A] rounded-sm text-center">
                <span className="material-symbols-outlined text-gray-800 text-8xl mb-6">
                  search_off
                </span>
                <h3 className="text-white font-black uppercase text-xl mb-2">
                  No Gear Found
                </h3>
                <p className="text-gray-600 text-xs uppercase tracking-widest">
                  Adjust your search to re-equip.
                </p>
                <button
                  onClick={() => setActiveCategory("all")}
                  className="mt-8 text-[#FFD700] text-[10px] font-black uppercase tracking-widest border-b border-[#FFD700] pb-1 hover:text-white hover:border-white transition-all"
                >
                  Reset Inventory View
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};