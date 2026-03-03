import React, { useState } from "react";
import { User } from "../../types";
import { StatusModal } from "../../components/shared/StatusModal";

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

/**
 * 🔑 Recovery Handshake Modal
 * Interfaces with the /auth/forgot-password backend endpoint.
 */
const ForgotPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      // Backend returns 200 even if email isn't found to prevent enumeration attacks
      if (response.ok) {
        setIsSent(true);
      } else {
        const data = await response.json();
        alert(data.detail || "Recovery transmission failed.");
      }
    } catch (error) {
      alert("Network Error: Command Center is offline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
      <div className="bg-[#0A0A0A] border border-[#FFD700]/30 w-full max-w-md p-8 rounded-sm shadow-2xl animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display font-black text-xl text-white uppercase italic tracking-widest">
            Reset <span className="text-[#FFD700]">Access</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white text-2xl transition-all"
          >
            &times;
          </button>
        </div>

        {!isSent ? (
          <form onSubmit={handleReset} className="space-y-6">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest leading-relaxed">
              Enter your elite email. We will initialize a recovery sequence.
            </p>
            <input
              type="email"
              required
              placeholder="DESIGNATION@EMAIL.COM"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111111] border border-white/10 p-4 text-white focus:border-[#FFD700] outline-none text-sm font-bold placeholder:opacity-30"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFD700] text-black font-black uppercase py-4 text-xs tracking-[0.2em] hover:bg-white transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {loading ? "INITIATING..." : "Send Recovery Link"}
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <span className="material-symbols-outlined text-[#FFD700] text-5xl mb-4 animate-bounce">
              mail
            </span>
            <p className="text-white text-xs font-black uppercase tracking-widest mb-6">
              Link Deployed Successfully
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

/**
 * 🏛️ Elite Login Component
 * Performs the final JWT handshake with the FastAPI backend.
 */
export const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({ isOpen: false, type: "success", title: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        setStatusModal({
          isOpen: true,
          type: "error",
          title: "Incomplete Credentials",
          message: "Please enter both your email and password.",
        });
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Securely store JWT for the session
        localStorage.setItem("elite_token", data.access_token);

        setStatusModal({
          isOpen: true,
          type: "success",
          title: "Access Granted",
          message: "Authorization successful. Deploying to home sequence.",
        });

        // Delay updating state to allow modal to show
        setTimeout(() => {
          // Update Global State with Backend-Verified User Profile
          onLogin({
            name: data.user.name,
            username: data.user.email,
            email: data.user.email,
            role: data.user.role as "user" | "admin",
          });
          onNavigate("home");
        }, 2000);
      } else {
        setStatusModal({
          isOpen: true,
          type: "error",
          title: "Authorization Failure",
          message: data.detail || "Strategic Authorization Failure.",
        });
      }
    } catch (error) {
      setStatusModal({
        isOpen: true,
        type: "error",
        title: "Network Error",
        message: "Backend Command Center is unreachable.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full bg-[#111111] border border-white/10 rounded-sm p-3 sm:p-4 text-white focus:border-[#FFD700] outline-none transition-all placeholder-gray-600 text-xs sm:text-sm font-bold";

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[95%] sm:max-w-lg mx-auto min-h-screen flex flex-col justify-center bg-black">
      <div className="bg-[#0A0A0A] p-6 sm:p-10 rounded-sm border border-[#FFD700]/20 shadow-[0_0_60px_rgba(255,215,0,0.03)]">
        <div className="text-center mb-8 sm:mb-10">
          <span className="material-symbols-outlined text-[#FFD700] text-3xl sm:text-4xl animate-pulse mb-3 sm:mb-4 block">
            lock_open
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase italic tracking-tighter leading-none">
            Welcome <span className="text-[#FFD700]">Back</span>
          </h2>
          <p className="text-gray-500 text-[10px] mt-4 uppercase tracking-[0.3em]">
            Authorize credentials
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 font-black">
              Elite Email
            </label>
            <input
              type="email"
              required
              placeholder="DESIGNATION@EMAIL.COM"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={inputStyle}
            />
          </div>

          <div className="relative">
            <div className="flex justify-between items-center">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 font-black">
                Access Password
              </label>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-[9px] uppercase tracking-widest text-[#FFD700] mb-2 font-bold hover:text-white transition-colors"
              >
                Lost Access?
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FFD700] transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFD700] text-black font-black uppercase py-5 rounded-sm hover:bg-white transition-all shadow-xl text-xs tracking-[0.3em] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "AUTHORIZING..." : "Authorize Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-[10px] mt-10 uppercase tracking-[0.3em]">
          New Subject?{" "}
          <span
            onClick={() => onNavigate("register")}
            className="text-white font-black underline cursor-pointer hover:text-[#FFD700] ml-2 transition-colors"
          >
            Join The Elite
          </span>
        </p>
      </div>

      {isForgotModalOpen && (
        <ForgotPasswordModal onClose={() => setIsForgotModalOpen(false)} />
      )}
      <StatusModal
        isOpen={statusModal.isOpen}
        type={statusModal.type}
        title={statusModal.title}
        message={statusModal.message}
        onClose={() => setStatusModal({ ...statusModal, isOpen: false })}
      />
    </div>
  );
};