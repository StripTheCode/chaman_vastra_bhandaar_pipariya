"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Flame,
  ArrowRight,
  TrendingUp,
  ShoppingBag,
  Clock,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { PRODUCTS, CATEGORIES, CURRENCIES } from "@/data/products";
import { useShop } from "@/context/ShopContext";

// Popular search chips curated for luxury ethnic wear
const POPULAR_SEARCHES = [
  "Pure Katan Silk",
  "Bridal Lehengas",
  "Banarasi Kadwa",
  "Anarkali Sets",
  "M.P. Chanderi Handloom",
  "Bridal Crimson Red",
  "Organza & Tissue",
  "Festive Gowns",
];

const QUICK_CATEGORIES = [
  { name: "Silk Sarees", href: "/collections/sarees", count: "70+" },
  { name: "Bridal Lehengas", href: "/collections/lehengas", count: "45+" },
  { name: "Suits & Anarkalis", href: "/collections/kurtas", count: "55+" },
  { name: "M.P. Chanderi", href: "/collections/chanderi", count: "35+" },
];

export default function SearchAutocompleteModal({
  isOpen,
  onClose,
  searchQuery = "",
  onSearchChange,
  isMobile = false,
  placeholder,
}) {
  const router = useRouter();
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const { currentCurrency, openQuickView } = useShop();

  const currencyObj = CURRENCIES[currentCurrency] || CURRENCIES.INR;

  // Auto-focus input when modal opens on mobile
  useEffect(() => {
    if (isOpen && isMobile && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMobile]);

  // Handle outside click to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filter products based on live search query
  const matchingProducts = useMemo(() => {
    const trimmed = (searchQuery || "").trim();
    if (!trimmed) {
      // Default to curated bestsellers when no query entered
      return PRODUCTS.filter((p) => p.isBestseller || p.badge).slice(0, 5);
    }

    const q = trimmed.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.fabric && p.fabric.toLowerCase().includes(q)) ||
        (p.work && p.work.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.colorName && p.colorName.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [searchQuery]);

  // Match categories
  const matchingCategories = useMemo(() => {
    const trimmed = (searchQuery || "").trim();
    if (!trimmed) return QUICK_CATEGORIES;
    const q = trimmed.toLowerCase();
    return CATEGORIES.filter(
      (c) =>
        c.id !== "all" &&
        (c.name.toLowerCase().includes(q) ||
          c.title?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q))
    ).map((c) => ({
      name: c.name,
      href: `/collections/${c.slug}`,
      count: c.count || "Explore",
    }));
  }, [searchQuery]);

  const handleSelectQuery = (term) => {
    onSearchChange(term);
    router.push(`/collections/all?q=${encodeURIComponent(term)}`);
    onClose();
  };

  const handleViewAll = () => {
    const q = searchQuery.trim();
    router.push(q ? `/collections/all?q=${encodeURIComponent(q)}` : "/collections/all");
    onClose();
  };

  const handleProductClick = (product) => {
    onClose();
    if (openQuickView) {
      openQuickView(product);
    }
  };

  if (!isOpen) return null;

  // Render Mobile Full-Screen Overlay vs Desktop Floating Dropdown
  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            ref={modalRef}
            className="w-full bg-white max-h-[90vh] flex flex-col shadow-2xl rounded-b-2xl overflow-hidden"
          >
            {/* Mobile Search Header */}
            <div className="p-3.5 border-b border-[#EBE3DA] flex items-center gap-2 bg-[#FAF8F5]">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8273]" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={placeholder ?? "Search for Sarees, Lehengas, Kurtas..."}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleViewAll()}
                  className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#DDD6CC] rounded-full text-xs text-[#19181B] placeholder-[#8C8273] focus:outline-none focus:border-[#A34850]"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8273] hover:text-[#19181B] p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-xs font-semibold text-[#A34850] px-2 py-1.5 cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {/* Mobile Scrollable Content */}
            <div className="overflow-y-auto p-4 space-y-5">
              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7C7367] mb-2.5">
                  <Flame className="w-3.5 h-3.5 text-[#C2414C]" />
                  <span>Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SEARCHES.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectQuery(term)}
                      className="px-2.5 py-1 rounded-full bg-[#F5EFE6] hover:bg-[#A34850] hover:text-white text-[11px] font-medium text-[#4A453E] transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Products */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#7C7367] mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span>{searchQuery ? "Matching Products" : "Curated Bestsellers"}</span>
                  </div>
                  {matchingProducts.length > 0 && (
                    <button
                      onClick={handleViewAll}
                      className="text-[11px] font-semibold text-[#A34850] hover:underline"
                    >
                      View All ({matchingProducts.length})
                    </button>
                  )}
                </div>

                <div className="divide-y divide-[#F0EBE1]">
                  {matchingProducts.map((p) => {
                    const price = Math.round(p.priceINR * currencyObj.rate);
                    const origPrice = Math.round(p.originalPriceINR * currencyObj.rate);
                    return (
                      <div
                        key={p.id}
                        onClick={() => handleProductClick(p)}
                        className="py-2.5 flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative w-12 h-16 rounded-md overflow-hidden bg-[#F5EFE6] shrink-0 border border-[#EAE3D9]">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes="60px"
                            className="object-cover object-top"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#19181B] truncate group-hover:text-[#A34850] transition-colors">
                            {p.title}
                          </p>
                          <p className="text-[10px] text-[#7C7367]">{p.fabric || p.category}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-[#A34850]">
                              {currencyObj.symbol}
                              {price.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[10px] text-[#8C8273] line-through">
                              {currencyObj.symbol}
                              {origPrice.toLocaleString("en-IN")}
                            </span>
                            {p.discount && (
                              <span className="text-[9px] font-bold text-[#C2414C]">
                                {p.discount}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#8C8273] group-hover:text-[#A34850] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom View All CTA */}
            <div className="p-3 bg-[#FAF8F5] border-t border-[#EBE3DA] flex items-center justify-between">
              <span className="text-xs text-[#7C7367]">
                Chaman Vastra Bhandar • Pipariya
              </span>
              <button
                onClick={handleViewAll}
                className="px-4 py-2 rounded-full bg-[#19181B] text-white text-xs font-bold hover:bg-[#A34850] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Search All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Desktop Floating Dropdown Overlay (anchored beneath search bar)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.99 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        ref={modalRef}
        className="absolute top-full left-0 right-0 mt-2 z-50 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-[#E8DFD5] overflow-hidden"
        style={{ width: "620px", maxWidth: "90vw" }}
      >
        <div className="p-5">
          {/* Top: Popular / Recent Chips */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7C7367] mb-2">
              <Flame className="w-3.5 h-3.5 text-[#C2414C]" />
              <span>Trending Searches in Pipariya</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_SEARCHES.map((term, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectQuery(term)}
                  className="px-3 py-1 rounded-full bg-[#F5EFE6] hover:bg-[#A34850] hover:text-white text-[11px] font-medium text-[#4A453E] transition-all cursor-pointer hover:shadow-xs"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Categories Bar */}
          <div className="mb-4 py-2 px-3 rounded-xl bg-[#FAF8F5] border border-[#F0EBE1] flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8273]">
              Quick Categories:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {matchingCategories.slice(0, 4).map((c, i) => (
                <Link
                  key={i}
                  href={c.href}
                  onClick={onClose}
                  className="text-xs font-medium text-[#19181B] hover:text-[#A34850] hover:underline transition-colors flex items-center gap-1"
                >
                  <span>{c.name}</span>
                  <span className="text-[10px] text-[#8C8273]">({c.count})</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Live Product Matches */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#7C7367] mb-2 pb-1 border-b border-[#F0EBE1]">
              <div className="flex items-center gap-1.5">
                <span>
                  {searchQuery
                    ? `Live Matches for "${searchQuery}" (${matchingProducts.length})`
                    : "Curated Handcrafted Pieces"}
                </span>
              </div>
              <button
                onClick={handleViewAll}
                className="text-[11px] font-semibold text-[#A34850] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View All In Store</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {matchingProducts.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#7C7367]">
                No direct matches found for &quot;{searchQuery}&quot;. Try searching for &quot;Banarasi&quot;, &quot;Silk Saree&quot;, or &quot;Bridal Lehenga&quot;.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
                {matchingProducts.map((p) => {
                  const price = Math.round(p.priceINR * currencyObj.rate);
                  const origPrice = Math.round(p.originalPriceINR * currencyObj.rate);

                  return (
                    <div
                      key={p.id}
                      onClick={() => handleProductClick(p)}
                      className="group flex items-center gap-2.5 p-2 rounded-xl border border-transparent hover:border-[#E8DFD5] hover:bg-[#FAF8F5] transition-all cursor-pointer"
                    >
                      <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-[#F5EFE6] shrink-0 border border-[#EAE3D9]">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="60px"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#19181B] truncate group-hover:text-[#A34850] transition-colors">
                          {p.title}
                        </p>
                        <p className="text-[10px] text-[#7C7367] truncate">
                          {p.fabric || p.work || p.category}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-[#A34850]">
                            {currencyObj.symbol}
                            {price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-[#8C8273] line-through">
                            {currencyObj.symbol}
                            {origPrice.toLocaleString("en-IN")}
                          </span>
                          {p.discount && (
                            <span className="text-[9px] font-bold text-[#C2414C]">
                              {p.discount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Banner & Stylist Direct WhatsApp */}
        <div className="px-5 py-3 bg-[#FAF8F5] border-t border-[#E8DFD5] flex items-center justify-between text-xs">
          <a
            href="https://wa.me/918269260928?text=Namaste%20Chaman%20Vastra%20Bhandar%20Pipariya,%20I%20am%20looking%20for%20handcrafted%20ethnic%20wear%20recommendations."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#15803D] hover:underline font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Chat with Pipariya Stylist on WhatsApp</span>
          </a>

          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#19181B] text-white hover:bg-[#A34850] font-semibold text-xs transition-colors cursor-pointer"
          >
            <span>View All Results</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

