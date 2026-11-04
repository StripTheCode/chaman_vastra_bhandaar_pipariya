"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { CURRENCIES } from "@/data/products";
import { useShop } from "@/context/ShopContext";

const CURRENCY_FLAGS = {
  INR: "🇮🇳",
  USD: "🇺🇸",
  CAD: "🇨🇦",
  GBP: "🇬🇧",
};

export default function FloatingCurrencyPill() {
  const { currentCurrency, setCurrentCurrency } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const pillRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pillRef.current && !pillRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const flag = CURRENCY_FLAGS[currentCurrency] || "🇮🇳";

  return (
    <div
      ref={pillRef}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block"
    >
      {/* Floating Edge Pill (Exact Trendia screenshot) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#DDD] border-r-0 rounded-l-md shadow-md text-xs font-semibold text-[#222222] hover:bg-[#FAF8F5] transition-all cursor-pointer"
        aria-label="Change Currency"
      >
        <span className="text-sm">{flag}</span>
        <span>{currentCurrency}</span>
        <ChevronDown className="w-3.5 h-3.5 text-[#666]" />
      </button>

      {/* Flyout Currency Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#E5E5E5] rounded-lg shadow-xl py-1.5 z-50">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#888] border-b border-[#F0F0F0]">
            Select Currency
          </div>
          {Object.keys(CURRENCIES).map((code) => {
            const isSelected = currentCurrency === code;
            return (
              <button
                key={code}
                onClick={() => {
                  setCurrentCurrency(code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#FAF5EE] text-[#A34850] font-bold"
                    : "text-[#333] hover:bg-[#F8F8F8]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{CURRENCY_FLAGS[code] || "🌐"}</span>
                  <span>{CURRENCIES[code].label}</span>
                </div>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#A34850]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

