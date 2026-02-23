import React, { useState, useEffect } from "react";
import { User } from "../../types";

interface RegisterProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

export const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    accessToken: "",
  });

  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Load MSG91 script once
  useEffect(() => {
    if (!document.querySelector('script[src*="otp-provider.js"]')) {
      const script = document.createElement("script");
      script.src = "https://verify.msg91.com/otp-provider.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // MSG91 Widget Config
  const getMsg91Config = () => ({
    widgetId: import.meta.env.VITE_MSG91_WIDGET_ID,
    tokenAuth: import.meta.env.VITE_MSG91_AUTH_TOKEN,
    identifier: `91${formData.mobile}`,
    exposeMethods: false,

    success: (data: any) => {
      console.log("MSG91 FULL RESPONSE:", data);

      if (data.type !== "success") {
        setStatus("✕ Verification failed.");
        return;
      }

      const token = data.message; // 🔥 THIS IS THE CORRECT FIELD

      console.log("EXTRACTED TOKEN:", token);

      if (!token) {
        setStatus("Verification failed. Token missing.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        accessToken: token,
      }));

      setIsVerified(true);
      setStatus("✓ Mobile number verified successfully");
    },

    failure: () => {
      setStatus("✕ Verification failed. Try again.");
    },
  });

  const handleSendOtp = () => {
    if (formData.mobile.length !== 10) {
      alert("Enter valid 10-digit mobile number");
      return;
    }

    if ((window as any).initSendOTP) {
      (window as any).initSendOTP(getMsg91Config());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVerified) {
      alert("Please verify your mobile number first.");
      return;
    }

    if (!formData.accessToken) {
      alert("OTP token missing. Please verify again.");
      return;
    }

    if (formData.password.length < 10) {
      alert("Password must be at least 10 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.full_name,
      email: formData.email,
      mobile: formData.mobile,
      password: formData.password,
      otp: formData.accessToken,
    };

    console.log("FINAL REGISTER PAYLOAD:", payload);

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data);
      } else {
        alert(data.detail || "Registration failed");
      }
    } catch (error) {
      alert("Server error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full bg-[#111111] border border-white/10 rounded-sm p-4 text-white focus:border-[#FFD700] outline-none text-sm font-bold transition-all";

  return (
    <div className="pt-32 pb-20 px-6 max-w-xl mx-auto min-h-screen bg-black">
      <div className="bg-[#0A0A0A] p-10 border border-[#FFD700]/20 shadow-2xl">
        <h2 className="text-3xl text-white text-center mb-8">
          Register Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            required
            className={inputStyle}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            required
            className={inputStyle}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <div className="flex gap-2">
            <input
              type="tel"
              maxLength={10}
              placeholder="Mobile Number"
              required
              disabled={isVerified}
              className={`${inputStyle} flex-grow`}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mobile: e.target.value.replace(/\D/g, ""),
                })
              }
            />
            {!isVerified && (
              <button
                type="button"
                onClick={handleSendOtp}
                className="px-4 bg-[#FFD700] text-black font-bold"
              >
                Verify
              </button>
            )}
          </div>

          {status && (
            <p className="text-sm text-[#FFD700] font-bold">{status}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            required
            className={inputStyle}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
            className={inputStyle}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={!isVerified || loading}
            className="w-full bg-[#FFD700] text-black py-4 font-bold disabled:opacity-30"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};
