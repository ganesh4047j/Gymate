import React, { useState } from "react";
import { User } from "../../types";

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

// Modal Component for Resetting Password
const ForgotPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for password reset would go here
    setIsSent(true);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md transition-all">
      <div className="bg-[#0A0A0A] border border-[#FFD700]/30 w-full max-w-md p-8 rounded-sm shadow-[0_0_80px_rgba(255,215,0,0.05)]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display font-black text-xl text-white uppercase italic tracking-widest">
            Reset <span className="text-[#FFD700]">Access</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white text-2xl transition-colors"
          >
            &times;
          </button>
        </div>

        {!isSent ? (
          <form onSubmit={handleReset} className="space-y-6">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest leading-relaxed">
              Enter your elite email address. We will send a recovery link to
              deploy a new password.
            </p>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 font-black">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111111] border border-white/10 rounded-sm p-4 text-white focus:border-[#FFD700] focus:outline-none transition-all placeholder-gray-600 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FFD700] text-black font-black uppercase py-4 rounded-sm hover:bg-white transition-all shadow-lg shadow-[#FFD700]/10 text-xs tracking-[0.2em]"
            >
              Send Recovery Link
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <span className="material-symbols-outlined text-[#FFD700] text-5xl mb-4 animate-bounce">
              mail
            </span>
            <p className="text-white text-xs font-black uppercase tracking-widest mb-2">
              Transmission Sent
            </p>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-6">
              Check your inbox for deployment instructions.
            </p>
            <button
              onClick={onClose}
              className="text-[#FFD700] text-[10px] font-black uppercase tracking-widest border-b border-[#FFD700] pb-1 hover:text-white hover:border-white transition-all"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.email === "admin@gymate.com" &&
      formData.password === "admin123"
    ) {
      onLogin({
        name: "Administrator",
        username: "admin",
        email: "admin@gymate.com",
        role: "admin",
      });
    } else {
      onLogin({
        name: formData.email.split("@")[0],
        username: formData.email,
        email: formData.email,
        role: "user",
      });
    }
  };

  const inputStyle =
    "w-full bg-[#111111] border border-white/10 rounded-sm p-4 text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] focus:outline-none transition-all placeholder-gray-600 text-sm";
  const labelStyle =
    "block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 font-black";

  return (
    <div className="pt-32 pb-20 px-6 max-w-lg mx-auto min-h-screen flex flex-col justify-center bg-black">
      <div className="bg-[#0A0A0A] p-10 rounded-sm border border-[#FFD700]/20 shadow-[0_0_60px_rgba(255,215,0,0.03)]">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <span className="material-symbols-outlined text-[#FFD700] text-4xl animate-pulse">
              lock_open
            </span>
          </div>
          <h2 className="font-display font-black text-4xl text-white uppercase italic tracking-tighter">
            Welcome <span className="text-[#FFD700]">Back</span>
          </h2>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-[0.2em]">
            Enter your elite credentials
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelStyle}>Email Address</label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={inputStyle}
            />
          </div>

          <div className="relative">
            <div className="flex justify-between items-center">
              <label className={labelStyle}>Password</label>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)} // Modal Trigger
                className="text-[10px] uppercase tracking-widest text-[#FFD700] hover:text-white transition-colors mb-2"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FFD700]"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <label className="flex items-center text-xs text-gray-500 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData({ ...formData, rememberMe: e.target.checked })
                }
                className="mr-3 accent-[#FFD700] w-4 h-4 rounded-sm border-white/10"
              />
              <span className="group-hover:text-gray-300 transition-colors uppercase tracking-widest text-[10px]">
                Keep me logged in
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFD700] text-black font-black uppercase py-4 rounded-sm hover:bg-white transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-[#FFD700]/10 text-xs tracking-[0.2em]"
          >
            Sign In to Gymate
          </button>
        </form>
        <br />

        <p className="text-center text-gray-500 text-[11px] uppercase tracking-widest">
          New to the community?
          <span
            onClick={() => onNavigate("register")}
            className="text-white font-black underline cursor-pointer hover:text-[#FFD700] ml-2 transition-colors"
          >
            Join The Elite
          </span>
        </p>
      </div>

      {/* Forgot Password Modal Render */}
      {isForgotModalOpen && (
        <ForgotPasswordModal onClose={() => setIsForgotModalOpen(false)} />
      )}
    </div>
  );
};