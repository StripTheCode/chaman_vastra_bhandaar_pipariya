"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal } from "lucide-react";

const TABS = [
  { id: "all", label: "All Best Sellers" },
  { id: "kurta-sets", label: "Kurta Sets" },
  { id: "pakistani-suits", label: "Pakistani Suits" },
  { id: "anarkali-sets", label: "Anarkali Sets" },
  { id: "lehengas", label: "Bridal Lehengas" },
  { id: "sarees", label: "Pure Silk Sarees" },
  { id: "gowns", label: "Festive Gowns" },
];

export default function ProductGrid({
  products,
  currentCurrency,
  activeCategory,
  onSelectCategory,
  onQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  searchQuery,
}) {
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const cat = (p.category || "").toLowerCase();
        const title = (p.title || "").toLowerCase();
        const matchesCategory =
          activeCategory === "all" ||
          activeCategory === "sale" ||
          cat === activeCategory ||
          (activeCategory === "kurta-sets" && (cat.includes("kurta") || cat === "kurtas")) ||
          (activeCategory === "pakistani-suits" && (cat.includes("pakistani") || title.includes("pakistani"))) ||
          (activeCategory === "anarkali-sets" && (cat.includes("anarkali") || title.includes("anarkali"))) ||
          (activeCategory === "gowns" && (cat.includes("gown") || cat === "dresses")) ||
          (activeCategory === "sarees" && (cat === "sarees" || cat === "chanderi")) ||
          (activeCategory === "lehengas" && cat === "lehengas");
        const matchesSearch =
          !searchQuery ||
          title.includes(searchQuery.toLowerCase()) ||
          (p.fabric && p.fabric.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.priceINR - b.priceINR;
        if (sortBy === "price-high") return b.priceINR - a.priceINR;
        if (sortBy === "rating") return b.rating - a.rating;
        return a.id - b.id;
      });
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <section id="collections" className="py-14 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-bold text-[#A34850] block mb-1">
              Trendia Inspired Collection
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#19181B]">
              Best Sellers & Trending Styles
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[#786F63] mt-1 font-normal">
              Showing {filteredProducts.length} authentic handcrafted styles ready for fast dispatch
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-[#786F63]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E5DDD2] rounded-xl px-3.5 py-2 text-[13px] sm:text-[13.5px] font-medium text-[#19181B] outline-none shadow-2xs cursor-pointer focus:border-[#A34850]"
            >
              <option value="featured">Featured Styles</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Trendia-Style Tabbed Switcher Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 border-b border-[#EBE3DA] scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id)}
              className={`px-4.5 py-2 rounded-full text-[13.5px] sm:text-[14px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-[#19181B] text-white shadow-xs"
                  : "bg-white text-[#524D46] border border-[#E5DDD2] hover:border-[#19181B] hover:text-[#19181B]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentCurrency={currentCurrency}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-3xl border border-[#EBE3DA] p-8">
            <p className="font-serif text-lg text-[#19181B]">No matching styles found</p>
            <p className="text-xs text-[#786F63] mt-1">Try clearing your search query or choosing another category.</p>
            <button
              onClick={() => onSelectCategory("all")}
              className="mt-4 px-5 py-2 rounded-full bg-[#19181B] text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
