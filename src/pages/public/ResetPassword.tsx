import React, { useState } from "react";

export const ResetPassword = ({
  onNavigate,
}: {
  onNavigate: (p: string) => void;
}) => {
  const [formData, setFormData] = useState({
    password: "",
    confirm: "",
    email: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      alert("Strategic Error: Passwords do not match.");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch(
        "http://localhost:8000/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            new_password: formData.password,
            confirm_password: formData.confirm,
          }),
        },
      );

      if (response.ok) {
        setStatus("success");
      } else {
        alert("Verification Error: Reset link may be expired.");
      }
    } catch (error) {
      alert("Network Error: Command Center unreachable.");
    } finally {
      setStatus("idle");
    }
  };

  const inputStyle =
    "w-full bg-[#111111] border border-white/10 rounded-sm p-4 text-white focus:border-[#FFD700] outline-none text-sm font-bold";

  return (
    <div className="pt-32 pb-20 px-6 max-w-lg mx-auto min-h-screen flex flex-col justify-center bg-black">
      <div className="bg-[#0A0A0A] p-10 rounded-sm border border-[#FFD700]/20 shadow-2xl">
        <h2 className="font-display font-black text-4xl text-white uppercase italic tracking-tighter mb-8 text-center">
          Update <span className="text-[#FFD700]">Credentials</span>
        </h2>

        {status === "success" ? (
          <div className="text-center">
            <p className="text-gray-400 uppercase text-xs tracking-widest mb-8">
              Access restored. You may now sign in.
            </p>
            <button
              onClick={() => onNavigate("login")}
              className="w-full bg-[#FFD700] text-black font-black uppercase py-4 text-xs tracking-[0.2em]"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <input
              type="email"
              required
              placeholder="CONFIRM EMAIL"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={inputStyle}
            />
            <input
              type="password"
              required
              placeholder="NEW PASSWORD"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={inputStyle}
            />
            <input
              type="password"
              required
              placeholder="CONFIRM NEW PASSWORD"
              value={formData.confirm}
              onChange={(e) =>
                setFormData({ ...formData, confirm: e.target.value })
              }
              className={inputStyle}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#FFD700] text-black font-black uppercase py-4 text-xs tracking-[0.2em] hover:bg-white transition-all"
            >
              {status === "loading" ? "ENCRYPTING..." : "Deploy New Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
