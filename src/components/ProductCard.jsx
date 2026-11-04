"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Check } from "lucide-react";
import { CURRENCIES } from "@/data/products";

/**
 * Trendia-Style Product Card
 * Exactly matches the live Trendia card screenshot:
 * - Top-Left: Clean Minimalist White Outline Heart (Wishlist)
 * - Top-Right: Solid Orange Discount Badge (-46%)
 * - Image Center (Hover Reveal): Elegant White Pill "Quick Shop" Button with Smooth Scale & Fade
 * - Image Bottom (Hover Reveal): Clean White Plain Text Size List ("S, M, L, XL, XXL")
 * - Centered Info: Vendor, 2-line Title, Teal Rating Stars, Strikethrough + Bold Red Price, Color Swatch Circle
 */
export default function ProductCard({
  product,
  currentCurrency = "INR",
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currencyObj = CURRENCIES[currentCurrency] || CURRENCIES.INR;
  const currentPrice = Math.round(product.priceINR * currencyObj.rate);
  const originalPrice = Math.round(
    (product.originalPriceINR || product.priceINR * 1.46) * currencyObj.rate
  );

  // Discount percentage calculation
  const discountPercent =
    product.discountPercent ||
    (originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 46);

  const reviewCount = product.reviews || 13;

  // Format sizes for the bottom overlay text: "S, M, L, XL, XXL"
  const formattedSizesText = (() => {
    if (!product.sizes || product.sizes.length === 0) return "S, M, L, XL, XXL";
    return product.sizes
      .map((s) => {
        if (typeof s === "string" && s.toLowerCase().includes("unstitched")) {
          return "Unstitched";
        }
        if (typeof s === "string" && s.toLowerCase().includes("semi")) {
          return "Semi-Stitched";
        }
        if (typeof s === "string" && s.length > 4) {
          return s.slice(0, 3).toUpperCase();
        }
        return s;
      })
      .slice(0, 5)
      .join(", ");
  })();

  const handleQuickShop = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedSize: product.sizes?.[0] || "Standard",
      });
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1500);
    }
  };

  return (
    <div
      className="group relative flex flex-col bg-white overflow-hidden transition-all duration-300 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. MEDIA SECTION - TALL STATUESQUE PORTRAIT (ASPECT 2/3, 1080x1620) */}
      <div
        className="relative w-full aspect-[2/3] bg-[#F7F4F0] overflow-hidden rounded-[2px] cursor-pointer"
        onClick={() => onQuickView && onQuickView(product)}
      >
        {/* Main Image */}
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover object-top transition-all duration-700 ease-out ${
            isHovered && product.hoverImage
              ? "opacity-0 scale-104"
              : "opacity-100 group-hover:scale-104"
          }`}
          priority={false}
        />

        {/* Hover Alternate Image (Smooth Crossfade) */}
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${product.title} alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-top transition-all duration-700 ease-out absolute inset-0 ${
              isHovered ? "opacity-100 scale-104" : "opacity-0 scale-100"
            }`}
          />
        )}

        {/* Top-Left: Clean Minimalist Heart Icon (Wishlist) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleWishlist) onToggleWishlist(product.id);
          }}
          className="absolute top-3 left-3 z-20 p-1 cursor-pointer transition-transform duration-200 hover:scale-115"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title="Wishlist"
        >
          <Heart
            className={`w-5 h-5 transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] ${
              isWishlisted
                ? "text-[#E53935] fill-[#E53935]"
                : "text-white fill-none stroke-[1.8]"
            }`}
          />
        </button>

        {/* Top-Right: Solid Orange Discount Badge (-46%) */}
        {discountPercent > 0 && (
          <div className="absolute top-0 right-0 z-20 pointer-events-none">
            <span className="inline-block bg-[#FF5500] text-white text-[12px] sm:text-[12.5px] font-bold px-3 py-1 shadow-xs tracking-tight">
              -{discountPercent}%
            </span>
          </div>
        )}

        {/* DEAD CENTER: Exact Trendia White Capsule "Quick Shop" Button */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <button
            onClick={handleQuickShop}
            className={`pointer-events-auto px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white text-[#222222] hover:bg-[#111111] hover:text-white font-medium text-[13.5px] sm:text-[14px] shadow-xl tracking-normal transition-all duration-300 ease-out transform cursor-pointer border border-black/5 ${
              isHovered
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-2 pointer-events-none"
            }`}
          >
            {addedAnimation ? (
              <span className="flex items-center gap-1.5 text-[#107C41]">
                <Check className="w-4 h-4" />
                <span>Added</span>
              </span>
            ) : (
              <span>Quick Shop</span>
            )}
          </button>
        </div>

        {/* BOTTOM OF IMAGE: Clean Plain White Sizes List ("S, M, L, XL, XXL") */}
        <div
          className={`absolute bottom-3 inset-x-0 z-20 text-center px-2 pointer-events-none transition-all duration-300 ease-out transform ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-1.5"
          }`}
        >
          <span className="text-white text-[12px] sm:text-[13px] font-semibold tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] font-sans">
            {formattedSizesText}
          </span>
        </div>
      </div>

      {/* 2. PRODUCT INFO SECTION (Center Aligned, Exact Trendia Typography) */}
      <div className="pt-3 pb-2 text-center px-1 flex flex-col items-center">
        {/* Vendor Line: Muted Grey Brand */}
        <span className="text-[12px] sm:text-[12.5px] text-[#999999] font-normal tracking-wide block truncate max-w-full">
          {product.vendor || "Dwija Fashion"}
        </span>

        {/* Product Title: 2-line clamped clean text */}
        <h3
          onClick={() => onQuickView && onQuickView(product)}
          className="text-[14px] sm:text-[14.5px] font-normal text-[#19181B] hover:text-[#A34850] transition-colors line-clamp-2 leading-snug mt-1 cursor-pointer min-h-[38px] font-sans"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Teal Customer Star Rating (Exact Trendia Cyan Stars) */}
        <div className="flex items-center justify-center gap-1.5 mt-1 text-[#00BCD4]">
          <div className="flex items-center text-[#00BCD4] text-[13px] sm:text-[14px] tracking-tight">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
          <span className="text-[12px] text-[#666666] font-normal">
            {reviewCount} Reviews
          </span>
        </div>

        {/* Price Row: Regular Price (strikethrough) + Sale Price (Bold Red) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-1.5 text-[13px] sm:text-[14px]">
          {originalPrice > currentPrice && (
            <span className="text-[#888888] line-through font-normal text-[13px] sm:text-[13.5px]">
              Rs. {originalPrice.toLocaleString("en-IN")}.00 {currentCurrency}
            </span>
          )}
          <span className="font-semibold text-[#D32F2F] text-[13.5px] sm:text-[14.5px]">
            Rs. {currentPrice.toLocaleString("en-IN")}.00 {currentCurrency}
          </span>
        </div>

        {/* Color Swatch Dot: Circular Variant Ring at Bottom Center */}
        <div className="mt-2 flex items-center justify-center">
          <div
            className="w-4 h-4 rounded-full border border-gray-400 shadow-xs cursor-pointer hover:border-black transition-colors"
            style={{
              backgroundColor: product.colorHex || "#E0E0E0",
            }}
            title={product.colorName || "Color"}
          />
        </div>
      </div>
    </div>
  );
}