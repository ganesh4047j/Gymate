import React, { useState, useEffect } from "react";
import { User } from "../../types";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdateUser: (user: User) => void;
  onLogout: () => void; // Added for core e-commerce functionality
  onNavigate: (page: string) => void; // Added to access Order History/Dashboard
}

export const Profile: React.FC<ProfileProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onLogout,
  onNavigate,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  // Sync form data with user prop on open
  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        mobile: user.mobile || "",
        password: "",
      });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [user, isOpen, onClose]);

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ ...user, ...formData });
    onClose();
  };

  const inputStyle =
    "w-full bg-[#111111] border border-white/10 rounded-sm p-4 text-white focus:border-[#FFD700] focus:outline-none transition-all placeholder-gray-700 text-sm font-bold";
  const labelStyle =
    "block text-[9px] uppercase tracking-[0.3em] text-gray-500 mb-2 font-black";

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
      {/* Immersive Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-fade-in"
        onClick={onClose}
      ></div>

      <div className="relative bg-[#0A0A0A] border border-white/10 rounded-sm max-w-xl w-full max-h-[90vh] shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col z-10 animate-[fade-in-up_0.4s_ease-out] overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/5 bg-[#0A0A0A] z-20">
          <div className="flex items-center gap-4">
            <div className="w-1 h-6 bg-[#FFD700]"></div>
            <h3 className="font-display font-black text-xl md:text-2xl text-white uppercase italic tracking-tighter">
              Account <span className="text-[#FFD700]">Profile</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar p-8 md:p-10">
          {/* USER OVERVIEW & RANK */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12 pb-12 border-b border-white/5">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FFD700] to-[#B8860B] flex items-center justify-center text-black font-black text-4xl italic shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                {user.name?.charAt(0) || user.username?.charAt(0)}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white text-black px-2 py-1 text-[8px] font-black uppercase tracking-widest border border-black">
                Elite
              </div>
            </div>

            <div className="text-center md:text-left space-y-2">
              <h4 className="text-white font-black text-2xl uppercase tracking-tighter italic leading-none">
                {user.name || user.username}
              </h4>
              <p className="text-[#FFD700] text-[10px] font-black uppercase tracking-[0.4em]">
                {user.role === "admin"
                  ? "Strategic Commander"
                  : "Active Personnel"}
              </p>

              {/* E-commerce Essential: Quick Links */}
              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => {
                    onNavigate("orders");
                    onClose();
                  }}
                  className="text-[9px] text-gray-500 hover:text-white font-black uppercase tracking-widest border-b border-white/10 pb-1"
                >
                  Order History
                </button>
                <button
                  onClick={() => {
                    onNavigate("cart");
                    onClose();
                  }}
                  className="text-[9px] text-gray-500 hover:text-white font-black uppercase tracking-widest border-b border-white/10 pb-1"
                >
                  My Bag
                </button>
              </div>
            </div>
          </div>

          {/* EDIT FORM */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelStyle}>Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className={labelStyle}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>Mobile Number</label>
              <input
                type="tel"
                maxLength={10}
                minLength={10}
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>Secure Password (Optional)</label>
              <input
                type="password"
                placeholder="ENCRYPT NEW PASSWORD"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={inputStyle}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-black uppercase py-5 text-xs tracking-[0.3em] rounded-sm hover:bg-[#FFD700] transition-all transform hover:scale-[1.02] shadow-xl"
            >
              Update Credentials
            </button>
          </form>
        </div>

        {/* FOOTER: Security & Logout */}
        <div className="p-6 border-t border-white/5 bg-[#111111]/50 flex justify-between items-center">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="flex items-center gap-2 text-red-500/50 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Terminate Session
          </button>
          <div className="flex items-center gap-2 opacity-20 grayscale">
            <span className="material-symbols-outlined text-sm text-white">
              shield
            </span>
            <span className="text-[8px] text-white font-black uppercase tracking-widest">
              Secure 256-Bit
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};