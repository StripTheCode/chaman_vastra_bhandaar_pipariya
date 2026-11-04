"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Copy, Gift, ArrowRight } from "lucide-react";

export default function WelcomeDiscountModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFloatingPillVisible, setIsFloatingPillVisible] = useState(false);

  const COUPON_CODE = "ROYAL10";

  // Auto-open modal on page load after a pleasant delay
  useEffect(() => {
    const hasClosed = sessionStorage.getItem("chaman_discount_dismissed");
    const hasClaimed = sessionStorage.getItem("chaman_discount_claimed");

    if (hasClaimed) {
      setIsSubmitted(true);
      setIsFloatingPillVisible(true);
    } else if (hasClosed) {
      setIsFloatingPillVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Keyboard shortcut (Escape to dismiss)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("chaman_discount_dismissed", "true");
    setIsFloatingPillVisible(true);
  };

  const handleOpenManually = () => {
    setIsOpen(true);
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setErrorMessage("Please enter your first name");
      return;
    }
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      sessionStorage.setItem("chaman_discount_claimed", "true");
      setIsFloatingPillVisible(true);
    }, 400);
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(COUPON_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      {/* Floating Re-Open Badge on Bottom-Left */}
      {isFloatingPillVisible && !isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenManually}
          aria-label="Unlock 10% Discount"
          className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#F59E0B] via-[#E88900] to-[#D97706] text-white shadow-xl border border-amber-200/50 text-xs font-bold tracking-wide cursor-pointer hover:shadow-2xl transition-all group"
        >
          <Gift className="w-4 h-4 text-white animate-bounce" />
          <span className="font-serif tracking-wider">
            {isSubmitted ? "Coupon: ROYAL10" : "Get 10% Off"}
          </span>
          <span className="w-2 h-2 rounded-full bg-white group-hover:animate-ping" />
        </motion.button>
      )}

      {/* Main Luxury Modal Backdrop & Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            {/* Soft Dark Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
            />

            {/* DESKTOP / TABLET VIEW (>= 640px): 100% EXACT TRENDIA DESIGN WITH CLEAN FLOWER MODEL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0.12 }}
              className="hidden sm:flex relative w-[736px] min-h-[500px] items-center justify-end z-10 my-auto bg-no-repeat bg-center select-none"
              style={{
                backgroundImage: `url('/images/trendia-welcome-bg.png')`,
                backgroundSize: "700px auto",
              }}
            >
              {/* Trendia Exact White Circular Close Button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close dialog"
                className="absolute top-[14px] right-[31px] z-30 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-[#373F47] hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer border border-black/5"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>

              {/* Form Content Column (Positioned in Right 55% of the Card) */}
              <div className="w-[56%] pr-10 pl-2 py-8 flex flex-col items-center justify-center text-center">
                {!isSubmitted ? (
                  <div className="w-full max-w-[310px]">
                    {/* Exact Title Image: "Get 10% Off by signing up!" */}
                    <div className="mb-1.5 flex justify-center">
                      <Image
                        src="/images/trendia-welcome-title.png"
                        alt="Get 10% OFF by signing up!"
                        width={905}
                        height={255}
                        priority
                        className="w-[280px] h-auto object-contain"
                      />
                    </div>

                    {/* Exact Subtitle Image */}
                    <div className="mb-4 flex justify-center">
                      <Image
                        src="/images/trendia-welcome-subtitle.png"
                        alt="Join our community of fashion icons and enthusiasts, and you'll get an exclusive discount."
                        width={766}
                        height={70}
                        priority
                        className="w-[260px] h-auto object-contain"
                      />
                    </div>

                    {/* Inputs Form */}
                    <form onSubmit={handleSubmit} className="space-y-2 w-full">
                      <div>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First Name"
                          className="w-full h-10 px-3.5 bg-[#E6E1D8] focus:bg-white text-[#19181B] placeholder-[#9A8F82] rounded-md text-[13px] outline-none border border-transparent focus:border-[#C59B27] transition-all"
                          required
                        />
                      </div>

                      <div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          className="w-full h-10 px-3.5 bg-[#E6E1D8] focus:bg-white text-[#19181B] placeholder-[#9A8F82] rounded-md text-[13px] outline-none border border-transparent focus:border-[#C59B27] transition-all"
                          required
                        />
                      </div>

                      {errorMessage && (
                        <p className="text-[11px] font-medium text-rose-600">
                          {errorMessage}
                        </p>
                      )}

                      {/* Terms Disclaimer */}
                      <p className="text-[9.5px] text-[#B67311] leading-tight pt-0.5">
                        By signing up, you accept Chaman&apos;s{" "}
                        <span className="underline hover:text-[#19181B] cursor-pointer">
                          Terms of Service
                        </span>{" "}
                        and{" "}
                        <span className="underline hover:text-[#19181B] cursor-pointer">
                          Privacy Policy
                        </span>
                        .
                      </p>

                      {/* Vibrant Orange Pill Button: "GET DISCOUNT" */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-10 rounded-full bg-[#FFA000] hover:bg-[#F59E0B] active:bg-[#EA580C] text-white font-extrabold text-[13px] uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center cursor-pointer disabled:opacity-75 mt-1"
                      >
                        {isSubmitting ? "Applying Discount..." : "GET DISCOUNT"}
                      </button>
                    </form>
                  </div>
                ) : (
                  /* CELEBRATORY UNLOCKED DISCOUNT STATE (DESKTOP) */
                  <div className="w-full max-w-[290px] py-4 text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 shadow-xs">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#19181B]">
                      10% Discount Unlocked!
                    </h3>
                    <p className="text-xs text-[#7C7367] mt-1 mb-4">
                      Welcome to the Chaman Heritage Family, {firstName}!
                    </p>

                    {/* Coupon Box */}
                    <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 mb-4 flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-amber-800 block">
                          Coupon Code
                        </span>
                        <span className="font-mono text-base font-black text-amber-950 tracking-wider">
                          {COUPON_CODE}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="px-3 py-1.5 rounded-lg bg-[#FFA000] hover:bg-[#F59E0B] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-full py-2.5 rounded-full bg-[#19181B] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#A34850] transition-colors cursor-pointer"
                    >
                      Shop Collections Now
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* MOBILE VIEW (< 640px): CLEAN RESPONSIVE ELEGANT CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0.12 }}
              className="sm:hidden relative w-full max-w-[340px] bg-[#FCFAF5] rounded-3xl p-6 border border-[#EADBCA] shadow-2xl z-10 my-auto text-center overflow-hidden"
            >
              {/* White Circular Close Button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close dialog"
                className="absolute top-3.5 right-3.5 z-30 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-[#373F47] hover:text-black cursor-pointer border border-black/5"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>

              {!isSubmitted ? (
                <div>
                  {/* Heritage Flower Badge on Mobile */}
                  <div className="flex justify-center -mt-1 mb-1">
                    <Image
                      src="/images/chaman-flower-badge.png"
                      alt="Chaman Heritage"
                      width={346}
                      height={344}
                      priority
                      className="w-20 h-20 object-contain drop-shadow-md"
                    />
                  </div>

                  {/* Title Image */}
                  <div className="mb-1 flex justify-center">
                    <Image
                      src="/images/trendia-welcome-title.png"
                      alt="Get 10% OFF by signing up!"
                      width={905}
                      height={255}
                      priority
                      className="w-[230px] h-auto object-contain"
                    />
                  </div>

                  {/* Subtitle Image */}
                  <div className="mb-4 flex justify-center">
                    <Image
                      src="/images/trendia-welcome-subtitle.png"
                      alt="Join our community of fashion icons and enthusiasts, and you'll get an exclusive discount."
                      width={766}
                      height={70}
                      priority
                      className="w-[220px] h-auto object-contain"
                    />
                  </div>

                  {/* Inputs */}
                  <form onSubmit={handleSubmit} className="space-y-2.5">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="w-full h-10 px-3.5 bg-[#EAE5DC] focus:bg-white text-[#19181B] placeholder-[#9A8F82] rounded-md text-xs outline-none border border-transparent focus:border-[#C59B27] transition-all"
                      required
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full h-10 px-3.5 bg-[#EAE5DC] focus:bg-white text-[#19181B] placeholder-[#9A8F82] rounded-md text-xs outline-none border border-transparent focus:border-[#C59B27] transition-all"
                      required
                    />

                    {errorMessage && (
                      <p className="text-[11px] font-medium text-rose-600">
                        {errorMessage}
                      </p>
                    )}

                    <p className="text-[9px] text-[#B67311] leading-tight">
                      By signing up, you accept Chaman&apos;s{" "}
                      <span className="underline">Terms</span> and{" "}
                      <span className="underline">Privacy Policy</span>.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-10 rounded-full bg-[#FFA000] hover:bg-[#F59E0B] active:bg-[#EA580C] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center cursor-pointer mt-1"
                    >
                      {isSubmitting ? "Applying..." : "GET DISCOUNT"}
                    </button>
                  </form>
                </div>
              ) : (
                /* CELEBRATORY UNLOCKED DISCOUNT STATE (MOBILE) */
                <div className="py-2 text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#19181B]">
                    10% Off Unlocked!
                  </h3>
                  <p className="text-xs text-[#7C7367] mt-0.5 mb-3">
                    Use code at checkout:
                  </p>

                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 mb-3 flex items-center justify-between">
                    <span className="font-mono text-sm font-black text-amber-950 tracking-wider">
                      {COUPON_CODE}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-2.5 py-1 rounded bg-[#FFA000] text-white text-[11px] font-bold cursor-pointer"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full py-2 rounded-full bg-[#19181B] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
