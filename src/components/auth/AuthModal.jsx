"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, AlertCircle, Eye, EyeOff, Coins, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalTab, openAuthModal, login, register } = useAuth();

  const [tab, setTab] = useState(authModalTab || "signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const resetForm = () => {
    setError("");
    setSuccessMsg("");
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
  };

  const handleSwitchTab = (newTab) => {
    resetForm();
    setTab(newTab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (tab === "signin") {
        await login(email, password);
      } else {
        await register({ name, email, phone, password });
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Soft Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="relative w-full max-w-[420px] bg-[#FFFAF3] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EBE3DA] z-10 my-auto overflow-hidden text-[#19181B]"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeAuthModal}
            aria-label="Close dialog"
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#7C7367] hover:text-black flex items-center justify-center transition-all cursor-pointer border border-[#EBE3DA]"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Heritage Monogram & Title */}
          <div className="text-center mb-5">
            <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-[#2D2A32] via-[#1A181C] to-[#121114] border border-[#C59B27]/60 flex items-center justify-center text-[#E6C665] font-serif font-black text-sm tracking-widest shadow-md mb-2.5">
              CVB
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#19181B]">
              {tab === "signin" ? "Welcome Back to Chaman" : "Join the Privilege Club"}
            </h2>
            <p className="text-xs text-[#7C7367] mt-0.5">
              Handcrafted Luxury from Pipariya • Est. 1985
            </p>
          </div>

          {/* Loyalty Reward Banner */}
          <div className="mb-5 p-2.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-amber-500/10 border border-amber-300/40 flex items-center gap-2.5 text-left">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-700 flex items-center justify-center shrink-0">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-amber-900 leading-tight">
                {tab === "register" ? "100 Welcome Points Waiting!" : "Earn 5% Chaman Coins on Every Order"}
              </p>
              <p className="text-[10px] text-amber-800/80 leading-tight">
                1 Coin = ₹1 Instant Discount during checkout
              </p>
            </div>
          </div>

          {/* Tabs: Sign In / Create Account */}
          <div className="flex rounded-full bg-[#EFE9DF] p-1 mb-5">
            <button
              type="button"
              onClick={() => handleSwitchTab("signin")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                tab === "signin"
                  ? "bg-white text-[#19181B] shadow-xs"
                  : "text-[#7C7367] hover:text-[#19181B]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab("register")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                tab === "register"
                  ? "bg-white text-[#19181B] shadow-xs"
                  : "text-[#7C7367] hover:text-[#19181B]"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {tab === "register" && (
              <div>
                <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  required
                  className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none transition-all placeholder-[#B0A79B]"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none transition-all placeholder-[#B0A79B]"
              />
            </div>

            {tab === "register" && (
              <div>
                <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                  Phone Number (For Order & Delivery Updates)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none transition-all placeholder-[#B0A79B]"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={tab === "register" ? "Minimum 6 characters" : "Enter your password"}
                  required
                  minLength={6}
                  className="w-full h-10 pl-3.5 pr-10 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none transition-all placeholder-[#B0A79B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C7367] hover:text-[#19181B] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-full bg-gradient-to-r from-[#F59E0B] via-[#E88900] to-[#D97706] hover:brightness-105 active:scale-[0.99] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 mt-2"
            >
              {loading ? (
                <span>Please wait...</span>
              ) : (
                <>
                  <span>{tab === "signin" ? "Sign In" : "Claim 100 Coins & Register"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Privacy Note */}
          <div className="mt-4 pt-3 border-t border-[#EBE3DA] flex items-center justify-center gap-1.5 text-[10px] text-[#7C7367]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-bit encrypted • We never share your details</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

