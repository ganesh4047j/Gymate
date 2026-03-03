import React from "react";

interface StatusModalProps {
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
    onClose: () => void;
    onAction?: () => void;
    actionText?: string;
}

export const StatusModal: React.FC<StatusModalProps> = ({
    isOpen,
    type,
    title,
    message,
    onClose,
    onAction,
    actionText,
}) => {
    if (!isOpen) return null;

    const isSuccess = type === "success";

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md">
            <div
                className={`bg-[#0A0A0A] border ${isSuccess ? "border-green-500/30" : "border-red-500/30"
                    } w-full max-w-[90%] sm:max-w-md p-6 sm:p-8 rounded-sm shadow-2xl animate-fade-in-up flex flex-col items-center text-center`}
            >
                <span
                    className={`material-symbols-outlined text-5xl sm:text-6xl mb-4 ${isSuccess ? "text-green-500" : "text-red-500"
                        }`}
                >
                    {isSuccess ? "check_circle" : "error"}
                </span>
                <h3
                    className={`font-display font-black text-xl sm:text-2xl uppercase italic tracking-widest mb-2 ${isSuccess ? "text-green-500" : "text-red-500"
                        }`}
                >
                    {title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-8 leading-relaxed">
                    {message}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                    {onAction && (
                        <button
                            onClick={onAction}
                            className={`w-full ${isSuccess
                                    ? "bg-green-500 hover:bg-green-400"
                                    : "bg-red-500 hover:bg-red-400"
                                } text-black font-black uppercase py-3 sm:py-4 text-xs tracking-[0.2em] transition-all shadow-lg active:scale-95`}
                        >
                            {actionText || "Continue"}
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className={`w-full bg-transparent border ${isSuccess
                                ? "border-green-500 text-green-500 hover:bg-green-500"
                                : "border-red-500 text-red-500 hover:bg-red-500"
                            } hover:text-black font-black uppercase py-3 sm:py-4 text-xs tracking-[0.2em] transition-all shadow-lg active:scale-95`}
                    >
                        {onAction ? "Close" : actionText || "Close"}
                    </button>
                </div>
            </div>
        </div>
    );
};
