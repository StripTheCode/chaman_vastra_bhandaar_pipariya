"use client";

import ProductCard from "@/components/ProductCard";
import { Search, RotateCcw } from "lucide-react";

export default function CollectionProductGrid({
  products,
  columns = 4,
  currentCurrency,
  onQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onClearFilters,
}) {
  if (products.length === 0) {
    return (
      <div className="w-full py-16 px-4 text-center bg-white rounded-lg border border-[#EBEBEB] my-4">
        <div className="w-14 h-14 mx-auto mb-3.5 rounded-full bg-[#FAF5EE] border border-[#DDD] flex items-center justify-center text-[#777777]">
          <Search className="w-6 h-6" />
        </div>
        <h3 className="text-[17px] sm:text-[19px] font-bold text-[#222222] mb-1.5">
          No Styles Match Your Filters
        </h3>
        <p className="text-[13.5px] sm:text-[14px] text-[#696969] max-w-md mx-auto mb-5 leading-relaxed font-normal">
          We could not find any products matching your specific combination. Try clearing some filters to explore our full handcrafted collection.
        </p>
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 py-2.5 px-6 rounded-full bg-[#222222] hover:bg-[#000] text-white text-[13px] font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear All Filters</span>
        </button>
      </div>
    );
  }

  // Dynamic grid classes with proportional width and taller statuesque cards
  let gridColsClass = "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2.5 xs:gap-x-3.5 sm:gap-x-4 lg:gap-x-5 gap-y-6 sm:gap-y-9";
  if (columns === 2) {
    gridColsClass = "grid-cols-2 gap-x-3.5 sm:gap-x-5 gap-y-7 sm:gap-y-9";
  } else if (columns === 3) {
    gridColsClass = "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-3.5 sm:gap-x-5 gap-y-7 sm:gap-y-9";
  }

  return (
    <div className={`grid ${gridColsClass}`}>
      {products.map((product) => (
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
  );
}
