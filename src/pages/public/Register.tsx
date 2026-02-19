import React, { useState } from "react";
import { User } from "../../types";

interface RegisterProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

// Separate Modal Component for clean logic
const LegalModal = ({
  title,
  content,
  onClose,
}: {
  title: string;
  content: string;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md transition-all">
    <div className="bg-[#0A0A0A] border border-[#FFD700]/30 w-full max-w-2xl max-h-[85vh] flex flex-col rounded-sm shadow-[0_0_100px_rgba(255,215,0,0.1)]">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h3 className="font-display font-black text-xl text-[#FFD700] uppercase italic tracking-widest">
          {title}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white text-3xl transition-colors"
        >
          &times;
        </button>
      </div>
      <div className="p-8 overflow-y-auto text-gray-400 text-sm leading-relaxed space-y-6 font-sans">
        {content.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      <div className="p-6 border-t border-white/5 flex justify-end">
        <button
          onClick={onClose}
          className="bg-[#FFD700] text-black px-10 py-3 text-xs font-black uppercase tracking-widest hover:bg-white transition-all"
        >
          I Understand
        </button>
      </div>
    </div>
  </div>
);

export const Register: React.FC<RegisterProps> = ({ onLogin, onNavigate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    postalCode: "",
    password: "",
    confirmPassword: "",
    newsletter: true,
  });

  const [activeModal, setActiveModal] = useState<"tos" | "privacy" | null>(
    null,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    onLogin({
      name: `${formData.firstName} ${formData.lastName}`,
      username: formData.email,
      email: formData.email,
      role: "user",
    });
  };

  const inputStyle =
    "w-full bg-[#111111] border border-white/10 rounded-sm p-3 text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] focus:outline-none transition-all placeholder-gray-600";
  const labelStyle =
    "block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold";

  // Legal Content
  const tosContent = `1. ACCEPTANCE OF TERMS\n\nBy accessing Sportic, you agree to be bound by these Terms of Service. All equipment purchased is intended for fitness use by individuals over the age of 18.\n\n2. LIABILITY WAIVER\n\nSportic is not responsible for any injuries sustained while using our products. We strongly recommend consulting a physician before beginning any new exercise regimen with our Lever Belts or Cable Machines.\n\n3. SHIPPING & DROPSHIPPING\n\nAs we curate elite products globally, shipping times typically range from 7-15 business days. Customers are responsible for providing accurate shipping details.`;

  const privacyContent = `1. DATA COLLECTION\n\nWe collect your personal information (name, address, email) solely for order fulfillment and account management. Your data is protected using enterprise-grade encryption.\n\n2. THIRD-PARTY SERVICES\n\nWe may share necessary details with shipping partners to ensure your 'Elite' gear reaches you. We do not sell your personal data to third-party marketers.\n\n3. COOKIES & TRACKING\n\nSportic uses cookies to optimize your shopping experience and manage your cart performance.`;

  return (
    <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto min-h-screen flex flex-col justify-center bg-black">
      <div className="bg-[#0A0A0A] p-10 rounded-sm border border-[#FFD700]/20 shadow-[0_0_50px_rgba(255,215,0,0.05)]">
        <div className="text-center mb-10">
          <h2 className="font-display font-black text-4xl text-white uppercase italic tracking-tighter">
            Create Your <span className="text-[#FFD700]">Elite</span> Account
          </h2>
          <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">
            Join the Sportic Performance Team
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className={inputStyle}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Phone Number</label>
              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Shipping Address</label>
            <input
              type="text"
              placeholder="Street, House No, Landmark"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>City</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Postal Code</label>
              <input
                type="text"
                required
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
                className={inputStyle}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div>
              <label className={labelStyle}>Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Confirm Password</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className={inputStyle}
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center text-xs text-gray-400 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.newsletter}
                onChange={(e) =>
                  setFormData({ ...formData, newsletter: e.target.checked })
                }
                className="mr-3 accent-[#FFD700]"
              />
              Get early access to drops & workout plans.
            </label>
            <p className="text-[10px] text-gray-600 uppercase tracking-tighter">
              By registering, you agree to our{" "}
              <span
                onClick={() => setActiveModal("tos")}
                className="text-[#FFD700] underline cursor-pointer hover:text-white"
              >
                Terms of Service
              </span>{" "}
              and{" "}
              <span
                onClick={() => setActiveModal("privacy")}
                className="text-[#FFD700] underline cursor-pointer hover:text-white"
              >
                Privacy Policy
              </span>
              .
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFD700] text-black font-black uppercase py-4 rounded-sm hover:bg-white transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-[#FFD700]/10"
          >
            Create Elite Account
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-8 uppercase tracking-widest">
          Already a Member?
          <span
            onClick={() => onNavigate("login")}
            className="text-white font-bold underline cursor-pointer hover:text-[#FFD700] ml-2 transition-colors"
          >
            Sign In
          </span>
        </p>
      </div>

      {/* Render Modals conditionally */}
      {activeModal === "tos" && (
        <LegalModal
          title="Terms of Service"
          content={tosContent}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "privacy" && (
        <LegalModal
          title="Privacy Policy"
          content={privacyContent}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
};