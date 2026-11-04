"use client";

import Link from "next/link";
import { ChevronRight, Home, Tag } from "lucide-react";

export default function CollectionHeroBanner({ category, productCount }) {
  const title = category?.title || category?.name || "Luxury Collections";
  const subtitle =
    category?.subtitle || "Handcrafted Heritage from Pipariya Showroom";
  const description =
    category?.description ||
    "Immerse in timeless elegance with certified handloom weaves, bridal masterpieces, and festive ensembles curated directly by Chaman Vastra Bhandar.";

  return (
    <div className="relative w-full bg-[#FAF7F2] border-b border-[#EAE2D7] py-8 sm:py-10">
      {/* Soft Ambient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-[#EAD9C6] to-[#FAF1E8] blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-[#E6D4BE] to-[#FAF5EE] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        {/* Breadcrumbs (Trendia clean style) */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#786F63] mb-3 overflow-x-auto whitespace-nowrap"
        >
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#222222] transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A89F91] flex-shrink-0" />
          <Link
            href="/collections/all"
            className="hover:text-[#222222] transition-colors cursor-pointer"
          >
            Collections
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A89F91] flex-shrink-0" />
          <span className="text-[#222222] font-semibold line-clamp-1">
            {category?.name || "All"}
          </span>
        </nav>

        {/* Title & Metadata Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-3xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0E6] border border-[#E4D1BF] text-[11px] font-bold text-[#8C6510] uppercase tracking-wider mb-2.5 shadow-2xs">
              <Tag className="w-3 h-3 text-[#B68D40]" />
              <span>{category?.name || "Collection"}</span>
              <span className="w-1 h-1 rounded-full bg-[#B68D40]" />
              <span>{productCount} Styles</span>
            </div>

            {/* Main Category Heading */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#222222] mb-2">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#5C554B] font-medium mb-2">
              {subtitle}
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#786F63] max-w-2xl leading-relaxed hidden sm:block">
              {description}
            </p>
          </div>

          {/* Guarantee Pill */}
          <div className="hidden lg:flex flex-col items-end text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#108474] flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              100% Genuine Handloom
            </span>
            <span className="text-[11px] text-[#786F63] mt-1">
              Direct from Master Weavers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
