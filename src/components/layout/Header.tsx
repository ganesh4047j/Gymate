import React, { useState, useEffect, useRef } from "react";
import { User } from "../../types";
import logoImg from "../../../Public/images/logo.png";

interface HeaderProps {
  onNavigate: (page: string, params?: any) => void;
  onSearch: (query: string) => void;
  onOpenProfile: () => void;
  cartCount: number;
  user: User | null;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onSearch,
  onOpenProfile,
  cartCount,
  user,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  // Focus input when expanded
  useEffect(() => {
    if (isSearchActive) {
      searchInputRef.current?.focus();
    }
  }, [isSearchActive]);

  const handleNav = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    setIsSearchActive(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsSearchActive(false);
      setSearchQuery("");
    }
  };

  const navLinkStyle =
    "relative text-[11px] font-black uppercase tracking-[0.2em] text-gray-300 hover:text-[#FFD700] transition-all duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#FFD700] after:transition-all hover:after:w-full";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? "h-20 bg-black/95 backdrop-blur-md border-b border-[#FFD700]/20 shadow-2xl"
            : "h-28 bg-transparent border-b border-white/5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-full flex items-center">
          {/* LEFT: Nav / Mobile Trigger */}
          <div className="flex-1 flex items-center justify-start">
            <button
              className={`lg:hidden text-white hover:text-[#FFD700] transition-all ${isSearchActive ? "hidden" : "block"}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="material-symbols-outlined text-4xl">
                menu_open
              </span>
            </button>

            <nav className="hidden lg:flex items-center gap-10">
              <button
                onClick={() => handleNav("home")}
                className={navLinkStyle}
              >
                Home
              </button>
              <button
                onClick={() => handleNav("shop")}
                className={navLinkStyle}
              >
                Shop
              </button>
              <button
                onClick={() => handleNav("about")}
                className={navLinkStyle}
              >
                Manifesto
              </button>
            </nav>
          </div>

          {/* CENTER: Logo (Hidden on mobile search to save space) */}
          <div
            className={`flex-none transition-all duration-500 flex justify-center ${
              isSearchActive
                ? "opacity-0 invisible w-0 lg:opacity-20 lg:visible lg:w-auto"
                : "opacity-100 visible"
            }`}
          >
            <button
              onClick={() => handleNav("home")}
              className="flex items-center py-2"
            >
              <img
                src={logoImg}
                alt="Gymate Logo"
                className="h-16 md:h-20 w-auto object-contain transition-transform duration-500 drop-shadow-[0_0_15px_rgba(255,215,0,0.2)]"
              />
            </button>
          </div>

          {/* RIGHT: Actions & Search */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-6">
            <form
              onSubmit={handleSearchSubmit}
              className={`relative flex items-center transition-all duration-500 ${isSearchActive ? "w-full md:max-w-md" : "w-12"}`}
            >
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH GEAR..."
                className={`w-full bg-[#111111] text-white text-xs font-bold tracking-widest uppercase transition-all duration-500 border-b italic ${
                  isSearchActive
                    ? "opacity-100 py-3 px-12 border-[#FFD700]"
                    : "opacity-0 p-0 border-transparent pointer-events-none"
                } focus:outline-none`}
              />

              {/* MAGNIFYING GLASS: Toggle / Submit */}
              <button
                type={isSearchActive ? "submit" : "button"}
                onClick={() => !isSearchActive && setIsSearchActive(true)}
                className={`absolute left-0 w-12 h-12 flex items-center justify-center z-10 ${isSearchActive ? "text-[#FFD700]" : "text-white"}`}
              >
                <span className="material-symbols-outlined text-[28px]">
                  search
                </span>
              </button>

              {/* CLOSE BUTTON: Collapses search (FIXED) */}
              {isSearchActive && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSearchActive(false);
                    setSearchQuery("");
                  }}
                  className="absolute right-0 w-12 h-12 flex items-center justify-center text-gray-500 hover:text-white z-20"
                >
                  <span className="material-symbols-outlined text-2xl">
                    close
                  </span>
                </button>
              )}
            </form>

            {/* PROFILE & CART (Hidden on mobile search) */}
            <div
              className={`flex items-center gap-4 transition-all ${isSearchActive ? "hidden md:flex" : "flex"}`}
            >
              <button
                onClick={user ? onOpenProfile : () => handleNav("login")}
                className="w-10 h-10 flex items-center justify-center text-white relative"
              >
                <span className="material-symbols-outlined text-[26px]">
                  person
                </span>
                {user && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#FFD700] rounded-full shadow-[0_0_10px_#FFD700]"></span>
                )}
              </button>
              <button
                onClick={() => handleNav("cart")}
                className="bg-[#FFD700] text-black h-12 px-5 flex items-center gap-2 rounded-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[24px] font-black">
                  shopping_cart
                </span>
                {cartCount > 0 && (
                  <span className="bg-black text-[#FFD700] text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR (LEFT DRAWER) */}
      <div
        className={`fixed inset-0 z-[200] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        <div
          className={`absolute top-0 left-0 h-full w-[280px] bg-[#0A0A0A] border-r border-white/5 flex flex-col transition-transform duration-500 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <img
              src={logoImg}
              className="h-10 w-auto opacity-50"
              alt="Gymate"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>

          <nav className="flex-1 px-8 py-12 flex flex-col gap-8">
            {[
              { label: "Home", icon: "home", target: "home" },
              {
                label: "Shop All Gear",
                icon: "fitness_center",
                target: "shop",
              },
              { label: "Our Manifesto", icon: "shield", target: "about" },
              {
                label: "Visual Lookbook",
                icon: "photo_library",
                target: "lookbook",
              },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => handleNav(item.target)}
                className="flex items-center gap-4 text-white hover:text-[#FFD700] transition-all group"
              >
                <span className="material-symbols-outlined text-gray-700 group-hover:text-[#FFD700] transition-colors">
                  {item.icon}
                </span>
                <span className="text-base font-black uppercase italic tracking-tighter leading-none">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="p-8 border-t border-white/5 space-y-4">
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-black">
              Elite Personnel Only
            </p>
            <button
              onClick={() => handleNav(user ? "profile" : "login")}
              className="w-full py-4 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#FFD700] hover:text-black transition-all"
            >
              {user ? "View Credentials" : "Join The Elite"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};