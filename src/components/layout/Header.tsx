import React, { useState, useEffect, useRef } from "react";
import { User } from "../../types";

interface HeaderProps {
  onNavigate: (page: string, params?: any) => void;
  onSearch: (query: string) => void; // Changed from onOpenSearch
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

  // Focus input when search is activated
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
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? "h-16 bg-black/95 backdrop-blur-md border-b border-[#FFD700]/20"
          : "h-24 bg-transparent border-b border-white/5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between relative">
        {/* LEFT SECTION: Nav Links (Hidden when searching) */}
        <div
          className={`flex-1 flex items-center transition-all duration-300 ${isSearchActive ? "opacity-0 invisible w-0" : "opacity-100 visible"}`}
        >
          <button
            className="lg:hidden text-white hover:text-[#FFD700] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? "close" : "menu_open"}
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-10">
            <button onClick={() => handleNav("home")} className={navLinkStyle}>
              Home
            </button>
            <button onClick={() => handleNav("shop")} className={navLinkStyle}>
              Shop
            </button>
            <button onClick={() => handleNav("about")} className={navLinkStyle}>
              Manifesto
            </button>
          </nav>
        </div>

        {/* CENTER SECTION: Logo (Hidden when searching on small screens) */}
        <div
          className={`flex-none transition-all duration-300 ${isSearchActive ? "hidden md:block opacity-20" : "opacity-100"}`}
        >
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-2 group"
          >
            <span className="material-symbols-outlined text-[#FFD700] text-3xl group-hover:rotate-12 transition-transform duration-300">
              fitness_center
            </span>
            <h1 className="font-display font-black text-3xl tracking-tighter uppercase italic text-white">
              <span className="text-[#FFD700]">GYM</span>ATE
            </h1>
          </button>
        </div>

        {/* RIGHT SECTION: Search Expansion & Actions */}
        <div
          className={`flex-1 flex items-center justify-end transition-all duration-500 ${isSearchActive ? "w-full" : "w-auto"}`}
        >
          {/* EXPANDING SEARCH BAR */}
          <form
            onSubmit={handleSearchSubmit}
            className={`relative flex items-center transition-all duration-500 ease-in-out ${
              isSearchActive ? "w-full md:max-w-md mr-4" : "w-10"
            }`}
          >
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH ELITE GEAR..."
              className={`w-full bg-[#111111] text-white text-xs font-bold tracking-widest uppercase transition-all duration-500 border-b ${
                isSearchActive
                  ? "opacity-100 py-2 px-10 border-[#FFD700]"
                  : "opacity-0 p-0 border-transparent pointer-events-none"
              } focus:outline-none`}
            />

            {/* Search Trigger/Submit Icon */}
            <button
              type="submit"
              onClick={() => !isSearchActive && setIsSearchActive(true)}
              className={`absolute left-0 w-10 h-10 flex items-center justify-center transition-colors ${
                isSearchActive
                  ? "text-[#FFD700]"
                  : "text-white hover:text-[#FFD700]"
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">
                search
              </span>
            </button>

            {/* Close Search Button */}
            {isSearchActive && (
              <button
                type="submit"
                onClick={() => {
                  setIsSearchActive(false);
                  setSearchQuery("");
                }}
                className="absolute right-0 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            )}
          </form>

          {/* OTHER ACTIONS (Hidden when search is fully expanded on mobile) */}
          <div
            className={`flex items-center gap-5 transition-all duration-300 ${isSearchActive ? "hidden sm:flex" : "flex"}`}
          >
            <button
              onClick={user ? onOpenProfile : () => handleNav("login")}
              className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/5 rounded-full transition-all relative"
            >
              <span className="material-symbols-outlined text-[22px]">
                person
              </span>
              {user && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#FFD700] rounded-full shadow-[0_0_10px_#FFD700]"></span>
              )}
            </button>

            <button
              onClick={() => handleNav("cart")}
              className="h-10 px-4 flex items-center gap-2 bg-[#FFD700] text-black rounded-sm hover:bg-white transition-all group overflow-hidden relative"
            >
              <span className="material-symbols-outlined text-[20px] font-bold">
                shopping_cart
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest hidden sm:block">
                Cart
              </span>
              {cartCount > 0 && (
                <span className="bg-black text-[#FFD700] text-[9px] font-bold h-5 w-5 flex items-center justify-center rounded-full ml-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY MENU (Unchanged) */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[inherit] bg-black/98 backdrop-blur-2xl border-b border-[#FFD700]/20 transition-all duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen
            ? "h-[40vh] opacity-100 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            : "h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          <button
            onClick={() => handleNav("home")}
            className="text-2xl font-black uppercase italic text-white hover:text-[#FFD700]"
          >
            Home
          </button>
          <button
            onClick={() => handleNav("shop")}
            className="text-2xl font-black uppercase italic text-white hover:text-[#FFD700]"
          >
            Shop
          </button>
          <button
            onClick={() => handleNav("about")}
            className="text-2xl font-black uppercase italic text-white hover:text-[#FFD700]"
          >
            Manifesto
          </button>
        </nav>
      </div>
    </header>
  );
};