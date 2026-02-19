import React, { useState } from "react";

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
}

// Optimized Modal Component with better content handling
const SupportModal = ({
  title,
  content,
  onClose,
}: {
  title: string;
  content: string;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md transition-all">
    <div className="bg-[#0A0A0A] border border-[#FFD700]/30 w-full max-w-2xl max-h-[85vh] flex flex-col rounded-sm shadow-[0_0_100px_rgba(0,0,0,1)]">
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
        {content ? (
          content
            .split("\n\n")
            .map((paragraph, i) => <p key={i}>{paragraph}</p>)
        ) : (
          <p className="italic">
            Content is being updated by the Gymate Team...
          </p>
        )}
      </div>
      <div className="p-6 border-t border-white/5 flex justify-end">
        <button
          onClick={onClose}
          className="bg-[#FFD700] text-black px-10 py-3 text-xs font-black uppercase tracking-widest hover:bg-white transition-all"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  // Extended state to handle all footer modal types
  const [activeModal, setActiveModal] = useState<
    "tos" | "privacy" | "shipping" | "returns" | "help" | null
  >(null);

  const sectionHeadingStyle =
    "text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8";
  const linkStyle =
    "text-gray-500 hover:text-[#FFD700] transition-colors duration-300 text-xs uppercase tracking-widest block w-fit text-left";

  // Content Mapping
  const modalContent = {
    tos: `1. ACCEPTANCE OF TERMS\n\nBy accessing Gymate, you agree to be bound by these Terms. All equipment is intended for fitness use by adults.\n\n2. LIABILITY\n\nGymate is not responsible for injuries sustained during training. Always consult a professional before using high-resistance cable machines.`,
    privacy: `1. DATA PROTECTION\n\nWe encrypt all personal data. Your shipping address is shared only with elite logistics partners for order fulfillment.\n\n2. COMMUNICATION\n\nWe only send 'New Drop' alerts if you opted in during registration.`,
    shipping: `ORDER TRACKING & LOGISTICS\n\nOnce your order is processed, you will receive a unique tracking ID via email.\n\nStandard elite shipping takes 7-15 business days. For real-time updates, please enter your ID in our global partner portal (Link provided in email).`,
    returns: `RETURN POLICY\n\nWe stand by our gear. If your equipment arrives with defects, we offer a 30-day "No-Questions" replacement policy.\n\nItems must be in original Gymate packaging to qualify for a full refund.`,
    help: `GYMATE HELP CENTER\n\nNeed assistance with assembly? Our technical team is available 24/7 for hardware support.\n\nEmail: support@gymate.com\nResponse time: Under 12 hours.`,
  };

  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Identity */}
          <div className="lg:col-span-4">
            <div
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2 mb-8 group cursor-pointer w-fit"
            >
              <span className="material-symbols-outlined text-[#FFD700] text-3xl group-hover:rotate-12 transition-transform duration-500">
                bolt
              </span>
              <h2 className="font-display font-black text-3xl tracking-tighter uppercase italic text-white">
                Gy<span className="text-[#FFD700]">mate</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm uppercase tracking-tighter">
              Defining the standard for elite fitness. No compromises. No
              excuses.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Corrected Navigation Columns */}
          <div className="lg:col-span-2">
            <h4 className={sectionHeadingStyle}>Explore</h4>
            <nav className="space-y-4">
              <button onClick={() => onNavigate("shop")} className={linkStyle}>
                New Drops
              </button>
              <button onClick={() => onNavigate("shop")} className={linkStyle}>
                Best Sellers
              </button>
              <button onClick={() => onNavigate("about")} className={linkStyle}>
                Performance
              </button>
            </nav>
          </div>

          <div className="lg:col-span-2">
            <h4 className={sectionHeadingStyle}>Support</h4>
            <nav className="space-y-4">
              <button
                onClick={() => setActiveModal("help")}
                className={linkStyle}
              >
                Help Center
              </button>
              <button
                onClick={() => setActiveModal("shipping")}
                className={linkStyle}
              >
                Track Order
              </button>
              <button
                onClick={() => setActiveModal("returns")}
                className={linkStyle}
              >
                Return Portal
              </button>
            </nav>
          </div>

          {/* Partnership CTA */}
          <div className="lg:col-span-4">
            <div className="bg-[#111111] p-8 border border-white/5 relative group overflow-hidden">
              <h4 className="text-[#FFD700] font-black uppercase text-xs tracking-[0.2em] mb-4">
                Commercial Bulk
              </h4>
              <p className="text-gray-400 text-xs mb-6 leading-relaxed">
                Outfit your fitness center with Gymate equipment. Custom
                branding available for high-end facilities.
              </p>
              <button
                onClick={() => setActiveModal("help")}
                className="flex items-center gap-2 text-white font-black uppercase text-[10px] tracking-widest group/btn"
              >
                Inquire Now{" "}
                <span className="material-symbols-outlined text-sm text-[#FFD700] transition-transform group-hover/btn:translate-x-2">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Legal Row */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} Gymate Performance Inc.
          </p>
          <div className="flex gap-8">
            <button
              onClick={() => setActiveModal("privacy")}
              className="text-[10px] text-gray-600 hover:text-[#FFD700] uppercase tracking-[0.2em]"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveModal("tos")}
              className="text-[10px] text-gray-600 hover:text-[#FFD700] uppercase tracking-[0.2em]"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* DYNAMIC MODAL RENDERER */}
      {activeModal && (
        <SupportModal
          title={
            activeModal === "tos"
              ? "Terms of Service"
              : activeModal === "privacy"
                ? "Privacy Policy"
                : activeModal === "shipping"
                  ? "Track Your Order"
                  : activeModal === "returns"
                    ? "Return Policy"
                    : "Help Center"
          }
          content={modalContent[activeModal]}
          onClose={() => setActiveModal(null)}
        />
      )}
    </footer>
  );
};