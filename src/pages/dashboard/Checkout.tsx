import React, { useState } from "react";
import { Product } from "../../types";

interface CheckoutProps {
  items: Product[];
  onClear: () => void;
  onNavigate: (page: string) => void;
}

// Extend Window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Checkout: React.FC<CheckoutProps> = ({
  items,
  onClear,
  onNavigate,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  const handleRazorpayPayment = () => {
    setIsProcessing(true);

    // In a real app, you would fetch the 'order_id' from your FastAPI backend here
    const options = {
      key: "rzp_test_0rwYxZvUXDUeW7", // Enter your Key ID from Razorpay Dashboard
      amount: total * 100, // Amount in paise
      currency: "USD",
      name: "GYMATE PERFORMANCE",
      description: "Elite Training Gear Purchase",
      image: "https://your-logo-url.com/logo.png", // Replace with your Gymate Bolt logo
      handler: function (response: any) {
        // This executes on successful payment
        console.log("Payment ID:", response.razorpay_payment_id);
        setIsProcessing(false);
        setIsSuccess(true);
        onClear();
      },
      prefill: {
        name: "Joker Elite",
        email: "joker@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#FFD700", // Gymate Golden Yellow
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const inputStyle =
    "bg-[#111111] border border-white/10 rounded-sm p-4 text-white focus:border-[#FFD700] focus:outline-none w-full transition-all placeholder-gray-600 text-sm";
  const labelStyle =
    "block text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2 font-black";

  if (isSuccess) {
    return (
      <div className="pt-32 pb-12 px-6 max-w-xl mx-auto text-center min-h-screen flex flex-col justify-center animate-fade-in">
        <div className="mb-8">
          <span className="material-symbols-outlined text-[#FFD700] text-9xl animate-pulse">
            verified
          </span>
        </div>
        <h2 className="font-display font-black text-5xl text-white uppercase italic mb-4 tracking-tighter">
          Mission Accomplished
        </h2>
        <p className="text-gray-400 mb-10 uppercase tracking-widest text-sm">
          Your elite gear is being prepped for deployment. Welcome to the 1%.
        </p>
        <button
          onClick={() => onNavigate("home")}
          className="bg-[#FFD700] text-black font-black uppercase py-4 px-12 rounded-sm hover:bg-white transition-all shadow-lg shadow-[#FFD700]/10 mx-auto"
        >
          Return to Base
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-8 max-w-[1440px] mx-auto min-h-screen">
      <button
        onClick={() => onNavigate("cart")}
        className="flex items-center gap-2 text-gray-500 hover:text-[#FFD700] mb-12 transition-colors uppercase text-[10px] font-black tracking-widest group"
      >
        <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">
          west
        </span>
        Back to Training Bag
      </button>

      <div className="grid lg:grid-cols-12 gap-16">
        {/* SHIPPING FORM */}
        <div className="lg:col-span-7">
          <div className="mb-10">
            <h2 className="font-display font-black text-4xl text-white uppercase italic tracking-tighter mb-2">
              Secure Deployment
            </h2>
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em]">
              Confirm your shipping destination
            </p>
          </div>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>First Name</label>
                <input
                  required
                  type="text"
                  placeholder="John"
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Last Name</label>
                <input
                  required
                  type="text"
                  placeholder="Doe"
                  className={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className={labelStyle}>Deployment Address</label>
              <input
                required
                type="text"
                placeholder="Street Name, House No."
                className={inputStyle}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className={labelStyle}>City</label>
                <input
                  required
                  type="text"
                  placeholder="New York"
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>ZIP Code</label>
                <input
                  required
                  type="text"
                  placeholder="10001"
                  className={inputStyle}
                />
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <div className="bg-[#111111] p-6 border border-[#FFD700]/10 rounded-sm flex items-center gap-6">
                <div className="bg-[#FFD700]/10 p-4 rounded-full">
                  <span className="material-symbols-outlined text-[#FFD700]">
                    shield_with_heart
                  </span>
                </div>
                <div>
                  <h4 className="text-white text-xs font-black uppercase tracking-widest mb-1">
                    Razorpay Secure Payment
                  </h4>
                  <p className="text-gray-500 text-[10px] uppercase">
                    Encrypted transaction handled by global leaders.
                  </p>
                </div>
              </div>
            </div>

            <button
              disabled={isProcessing || items.length === 0}
              type="button"
              onClick={handleRazorpayPayment}
              className="w-full bg-[#FFD700] text-black font-black uppercase py-5 rounded-sm hover:bg-white transition-all transform active:scale-95 shadow-lg shadow-[#FFD700]/20 mt-10 disabled:opacity-50 tracking-[0.2em]"
            >
              {isProcessing
                ? "INITIALIZING..."
                : `PAY $${total.toFixed(2)} VIA RAZORPAY`}
            </button>
          </form>
        </div>

        {/* ORDER SUMMARY SIDEBAR */}
        <div className="lg:col-span-5">
          <div className="bg-[#0A0A0A] p-8 border border-white/5 sticky top-32 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
            <h3 className="text-white font-black uppercase text-xs tracking-[0.3em] mb-8 border-b border-white/5 pb-4">
              Manifest Summary
            </h3>

            <div className="max-h-[300px] overflow-y-auto space-y-6 pr-2 custom-scrollbar mb-8">
              {items.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="flex justify-between items-center group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#111111] p-1 border border-white/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="block text-white text-[10px] font-black uppercase tracking-widest group-hover:text-[#FFD700] transition-colors">
                        {item.name}
                      </span>
                      <span className="block text-gray-600 text-[8px] uppercase">
                        Unit: 1
                      </span>
                    </div>
                  </div>
                  <span className="text-white font-black tracking-tighter text-sm">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                <span className="text-gray-500">Shipping</span>
                <span className="text-white">${shipping.toFixed(2)}</span>
              </div>
              <div className="pt-6 flex justify-between items-center">
                <span className="text-white font-black text-sm uppercase tracking-widest">
                  Total Investment
                </span>
                <span className="text-[#FFD700] font-black text-3xl tracking-tighter">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Trust Markers */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/5 pt-8 opacity-20">
              <span className="material-symbols-outlined text-center text-4xl">
                verified
              </span>
              <span className="material-symbols-outlined text-center text-4xl">
                security
              </span>
              <span className="material-symbols-outlined text-center text-4xl">
                local_shipping
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
