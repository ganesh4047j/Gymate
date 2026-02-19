import React from "react";
import { Hero } from "../../components/home/Hero";
import { Marquee } from "../../components/layout/Marquee";
import { ProductSection } from "../../components/home/ProductSection";
import { FeatureSection } from "../../components/home/FeatureSection";
import { Testimonials } from "../../components/home/Testimonials";
import { Product } from "../../types";

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
  onOpenScience: () => void;
  onAddToCart: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  onOpenScience,
  onAddToCart,
}) => {
  // Internal Style Constants
  const sectionLabel =
    "text-[#FFD700] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block text-center";

  return (
    <div className="bg-black overflow-x-hidden">
      {/* 1. HERO: The Hook */}
      <Hero onNavigate={onNavigate} />

      {/* 2. DYNAMIC MARQUEE: Brand Energy */}
      <Marquee />

      {/* 3. CATEGORY SPOTLIGHT: Navigation-First UX (New Element) */}
      <section className="py-24 px-8 border-b border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <span className={sectionLabel}>01 // Choose Your Discipline</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: "recovery",
                title: "RECOVERY",
                desc: "Percussive Therapy",
                img: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=800",
              },
              {
                id: "accessories",
                title: "STRENGTH",
                desc: "Belts & Support",
                img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800",
              },
              {
                id: "equipment",
                title: "EQUIPMENT",
                desc: "Heavy Stations",
                img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800",
              },
            ].map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate("shop", { filter: cat.id })}
                className="relative h-[400px] group cursor-pointer overflow-hidden border border-white/5"
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <h4 className="text-white font-display font-black text-3xl italic tracking-tighter uppercase">
                    {cat.title}
                  </h4>
                  <p className="text-[#FFD700] text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {cat.desc} // EXPLORE
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRODUCT SHOWCASE: Core Inventory */}
      <div className="py-12">
        <span className={sectionLabel}>02 // The Elite Collection</span>
        <ProductSection onAddToCart={onAddToCart} onNavigate={onNavigate} />
      </div>

      {/* 5. TRUST BUILDER: The Science (FeatureSection) */}
      <FeatureSection onOpenScience={onOpenScience} />

      {/* 6. TRUST BANNERS: Value Propositions (New Element) */}
      <section className="py-20 px-8 bg-[#0A0A0A] border-y border-white/5">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            {
              icon: "local_shipping",
              title: "ELITE LOGISTICS",
              desc: "Fast global deployment",
            },
            {
              icon: "verified_user",
              title: "LIFETIME WARRANTY",
              desc: "Engineered to last",
            },
            {
              icon: "cyclone",
              title: "PRO RECOVERY",
              desc: "Athlete tested tech",
            },
            {
              icon: "support_agent",
              title: "24/7 SUPPORT",
              desc: "Technical assist ready",
            },
          ].map((trust, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group"
            >
              <span className="material-symbols-outlined text-[#FFD700] text-4xl mb-4 group-hover:scale-110 transition-transform">
                {trust.icon}
              </span>
              <h5 className="text-white font-black text-[11px] uppercase tracking-widest mb-2">
                {trust.title}
              </h5>
              <p className="text-gray-600 text-[10px] uppercase font-bold tracking-tighter">
                {trust.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SOCIAL PROOF: Testimonials */}
      <Testimonials />

      {/* 8. NEWSLETTER: Community Retention (New Element) */}
      <section className="py-32 px-8 bg-black">
        <div className="max-w-[800px] mx-auto text-center">
          <span className={sectionLabel}>Join the Community</span>
          <h3 className="font-display font-black text-4xl md:text-6xl text-white uppercase italic tracking-tighter mb-8">
            STAY AHEAD OF <br />{" "}
            <span className="text-[#FFD700]">THE DROP</span>
          </h3>
          <form
            className="flex flex-col sm:flex-row gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="ENTER EMAIL ADDRESS"
              className="flex-grow bg-[#111111] border border-white/10 p-5 text-white text-xs font-black uppercase tracking-widest focus:border-[#FFD700] outline-none"
            />
            <button className="bg-[#FFD700] text-black px-12 py-5 text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-[#FFD700]/10">
              SUBSCRIBE
            </button>
          </form>
          <p className="text-gray-700 text-[9px] uppercase tracking-widest mt-6">
            By signing up, you agree to receive Gymate performance alerts.
          </p>
        </div>
      </section>
    </div>
  );
};
