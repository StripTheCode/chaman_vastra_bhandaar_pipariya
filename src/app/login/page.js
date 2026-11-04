"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Gift, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!identifier.trim()) {
      setErrorMessage("Please enter your Mobile Number or Email ID");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password");
      return;
    }

    try {
      setIsLoading(true);
      await login(identifier.trim(), password);
      // Redirect to home or account after successful login
      router.push("/");
    } catch (err) {
      setErrorMessage(err.message || "Invalid Mobile Number/Email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Header Bar */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#786F63] hover:text-[#A34850] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </Link>
        <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#A34850]">
          Secure Sign In
        </span>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#EBE3DA] shadow-xl">
        
        {/* Brand Crest */}
        <div className="text-center mb-7">
          <Link href="/" className="inline-flex flex-col items-center group">
            <div className="w-12 h-12 rounded-full bg-[#19181B] border border-[#C59B27]/70 flex items-center justify-center text-[#E6C665] font-serif font-black text-sm tracking-widest shadow-md group-hover:scale-105 transition-transform">
              CVB
            </div>
            <span className="font-serif text-lg font-black tracking-[0.2em] text-[#19181B] uppercase mt-2.5">
              CHAMAN
            </span>
            <span className="text-[10px] tracking-[0.25em] font-serif font-bold text-[#A34850] uppercase">
              VASTRA BHANDAR • PIPARIYA
            </span>
          </Link>

          <h1 className="text-2xl sm:text-[26px] font-bold text-[#19181B] mt-5">
            Log In
          </h1>
          <p className="text-[13px] sm:text-[13.5px] text-[#786F63] mt-1 font-normal">
            Enter your mobile number or email address to continue
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs sm:text-[13px]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Field 1: Mobile Number or Email ID */}
          <div>
            <label
              htmlFor="identifier"
              className="block text-xs font-bold uppercase tracking-wider text-[#4A453E] mb-1.5"
            >
              Mobile Number or Email ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8273]">
                <User className="w-4 h-4" />
              </div>
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter 10-digit mobile or email..."
                className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm text-[#19181B] placeholder-[#8C8273] focus:outline-none focus:border-[#A34850] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Field 2: Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-[#4A453E]"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => alert("Please contact store support at +91 82692 60928 to reset your password.")}
                className="text-[11px] font-medium text-[#A34850] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8273]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password..."
                className="w-full pl-10 pr-10 py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm text-[#19181B] placeholder-[#8C8273] focus:outline-none focus:border-[#A34850] focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8C8273] hover:text-[#19181B] cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#19181B] hover:bg-[#A34850] disabled:bg-[#786F63] text-white text-[13.5px] font-bold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span>Logging in...</span>
            ) : (
              <>
                <span>Log In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Bottom Line: Don't have an account? Sign Up */}
        <div className="mt-7 pt-6 border-t border-[#F0EBE2] text-center">
          <p className="text-[13.5px] text-[#5A544C]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-[#A34850] hover:text-[#802D34] hover:underline cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Member Privilege Note */}
        <div className="mt-4 p-3 rounded-xl bg-[#FAF6EE] border border-[#EADBCA] flex items-center justify-center gap-2 text-[11.5px] text-[#8C6510] font-medium text-center">
          <Gift className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
          <span>New members get 100 Free Chaman Coins upon signing up!</span>
        </div>

      </div>

      {/* Footer copyright */}
      <div className="text-center mt-6 text-xs text-[#8C8273]">
        <p>© 2026 Chaman Vastra Bhandar, Pipariya. All rights reserved.</p>
      </div>
    </div>
  );
}

