"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Sparkles, ArrowLeft, Coins } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your full name");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);
      await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password,
      });
      // Redirect to home after successful registration
      router.push("/");
    } catch (err) {
      setErrorMessage(err.message || "Failed to create account. Please try again.");
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
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
          <Coins className="w-3.5 h-3.5 text-amber-600" />
          <span>+100 Welcome Coins</span>
        </div>
      </div>

      {/* Main Register Card */}
      <div className="max-w-md w-full mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#EBE3DA] shadow-xl">
        
        {/* Brand Crest */}
        <div className="text-center mb-6">
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
            Create an Account
          </h1>
          <p className="text-[13px] sm:text-[13.5px] text-[#786F63] mt-1 font-normal">
            Sign up to unlock member privileges & instant discounts
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs sm:text-[13px]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {/* Field 1: Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-bold uppercase tracking-wider text-[#4A453E] mb-1.5"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8273]">
                <User className="w-4 h-4" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm text-[#19181B] placeholder-[#8C8273] focus:outline-none focus:border-[#A34850] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Field 2: Mobile Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-bold uppercase tracking-wider text-[#4A453E] mb-1.5"
            >
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8273]">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile (e.g. 9826012345)"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm text-[#19181B] placeholder-[#8C8273] focus:outline-none focus:border-[#A34850] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Field 3: Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider text-[#4A453E] mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8273]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. priya@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm text-[#19181B] placeholder-[#8C8273] focus:outline-none focus:border-[#A34850] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Field 4: Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-[#4A453E] mb-1.5"
            >
              Create Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8273]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl text-sm text-[#19181B] placeholder-[#8C8273] focus:outline-none focus:border-[#A34850] focus:bg-white transition-colors"
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
            className="w-full mt-3 py-3.5 px-4 rounded-xl bg-[#19181B] hover:bg-[#A34850] disabled:bg-[#786F63] text-white text-[13.5px] font-bold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span>Creating account...</span>
            ) : (
              <>
                <span>Sign Up & Claim 100 Coins</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Bottom Line: Already have an account? Log In */}
        <div className="mt-6 pt-5 border-t border-[#F0EBE2] text-center">
          <p className="text-[13.5px] text-[#5A544C]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#A34850] hover:text-[#802D34] hover:underline cursor-pointer"
            >
              Log In
            </Link>
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-[#8C8273]">
          <span>✓ 100% Free Signup</span>
          <span>•</span>
          <span>✓ Instant Welcome Bonus</span>
          <span>•</span>
          <span>✓ Secure SSL</span>
        </div>

      </div>

      {/* Footer copyright */}
      <div className="text-center mt-6 text-xs text-[#8C8273]">
        <p>© 2026 Chaman Vastra Bhandar, Pipariya. All rights reserved.</p>
      </div>
    </div>
  );
}
