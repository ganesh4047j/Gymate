import React, { useState, useEffect } from "react";
import { User } from "../../types";

interface RegisterProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

export const Register: React.FC<RegisterProps> = ({ onLogin, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    otp: "",
    password: "",
    confirmPassword: "",
    newsletter: true,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(0);

  // MSG91 Placeholder logic for SMS integration
  const handleSendOTP = async () => {
    if (formData.mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Integration Point: MSG91 API Call would go here
    // Example: await fetch(`https://api.msg91.com/api/v5/otp?template_id=TEMPLATE_ID&mobile=${formData.mobile}&authkey=YOUR_AUTH_KEY`);

    console.log(`MSG91: Sending OTP to ${formData.mobile}`);
    setOtpSent(true);
    setTimer(30); // 30 second cooldown for resend
  };

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Final registration logic
    onLogin({
      name: formData.name,
      username: formData.email,
      email: formData.email,
      role: "user",
    });
  };

  const inputStyle =
    "w-full bg-[#111111] border border-white/10 rounded-sm p-3 text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] focus:outline-none transition-all placeholder-gray-600 text-sm";
  const labelStyle =
    "block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-black";

  return (
    <div className="pt-32 pb-20 px-6 max-w-xl mx-auto min-h-screen flex flex-col justify-center bg-black">
      <div className="bg-[#0A0A0A] p-10 rounded-sm border border-[#FFD700]/20 shadow-[0_0_50px_rgba(255,215,0,0.05)]">
        <div className="text-center mb-10">
          <h2 className="font-display font-black text-4xl text-white uppercase italic tracking-tighter leading-none">
            Join The <span className="text-[#FFD700]">Elite</span>
          </h2>
          <p className="text-gray-500 text-[10px] mt-3 uppercase tracking-[0.3em]">
            Deploy your performance profile
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Unified Name Field */}
          <div>
            <label className={labelStyle}>Full Name</label>
            <input
              type="text"
              required
              placeholder="E.G. JOHN DOE"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Email Address</label>
            <input
              type="email"
              required
              placeholder="NAME@EMAIL.COM"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={inputStyle}
            />
          </div>

          {/* Phone & OTP Logic */}
          <div className="space-y-4">
            <div className="relative">
              <label className={labelStyle}>Mobile Number</label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  maxLength={10}
                  required
                  placeholder="10-DIGIT NUMBER"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mobile: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className={`${inputStyle} flex-grow`}
                />
                <button
                  type="button"
                  disabled={formData.mobile.length !== 10 || timer > 0}
                  onClick={handleSendOTP}
                  className={`px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${
                    timer > 0
                      ? "bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed"
                      : "bg-white text-black hover:bg-[#FFD700]"
                  }`}
                >
                  {otpSent
                    ? timer > 0
                      ? `Retry in ${timer}s`
                      : "Resend OTP"
                    : "Send OTP"}
                </button>
              </div>
            </div>

            {/* Hidden until OTP is sent */}
            {otpSent && (
              <div className="animate-fade-in-up">
                <label className={labelStyle}>
                  Verification Code (4-Digits)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="X X X X"
                    className={`${inputStyle} text-center tracking-[1em] text-lg font-black`}
                    value={formData.otp}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        otp: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                  {formData.otp.length === 4 && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsVerifying(true);
                        setTimeout(() => setIsVerifying(false), 1500); // Mock verification delay
                      }}
                      className="bg-[#FFD700] text-black px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-white animate-pulse"
                    >
                      {isVerifying ? "Verifying..." : "Verify OTP"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div>
              <label className={labelStyle}>Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Confirm</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className={inputStyle}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFD700] text-black font-black uppercase py-5 rounded-sm hover:bg-white transition-all shadow-xl shadow-[#FFD700]/10 text-xs tracking-[0.3em] mt-6"
          >
            Create Elite Account
          </button>
        </form>

        <p className="text-center text-gray-600 text-[10px] mt-10 uppercase tracking-[0.3em]">
          Already Operational?
          <span
            onClick={() => onNavigate("login")}
            className="text-white font-black underline cursor-pointer hover:text-[#FFD700] ml-2 transition-colors"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};
