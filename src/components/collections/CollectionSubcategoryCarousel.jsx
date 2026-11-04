"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/data/products";

export default function CollectionSubcategoryCarousel({ currentCategorySlug = "all" }) {
  const scrollContainerRef = useRef(null);

  // Get active category object
  const currentCategory =
    CATEGORIES.find(
      (c) => c.slug === currentCategorySlug || c.id === currentCategorySlug
    ) || CATEGORIES[0];

  // All top-level collections for primary browsing
  const allCategories = CATEGORIES.filter((c) => c.id !== "all");

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#FCFBF8] border-b border-[#EAE3D9] py-5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Optional Header Row */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#696969]">
              Explore Categories
            </span>
            <span className="w-1 h-1 rounded-full bg-[#C59B27]" />
            <span className="text-[11px] text-[#878787] hidden sm:inline">
              Handpicked from Pipariya
            </span>
          </div>

          <Link
            href="/collections/all"
            className="text-[11px] font-semibold text-[#A34850] hover:text-[#7A2E35] hover:underline"
          >
            View All ({CATEGORIES.length})
          </Link>
        </div>

        {/* Carousel Container with Scroll Arrows */}
        <div className="relative group/carousel">
          {/* Left Arrow Button */}
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-[#DDD] shadow-md items-center justify-center text-[#222] hover:bg-[#222] hover:text-white transition-all duration-200 cursor-pointer opacity-0 group-hover/carousel:opacity-100"
            aria-label="Previous categories"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={scrollRight}
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-[#DDD] shadow-md items-center justify-center text-[#222] hover:bg-[#222] hover:text-white transition-all duration-200 cursor-pointer opacity-0 group-hover/carousel:opacity-100"
            aria-label="Next categories"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Scrollable Tiles Strip */}
          <div
            ref={scrollContainerRef}
            className="flex items-start gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
          >
            {/* "All" Tile */}
            <Link
              href="/collections/all"
              className="flex-shrink-0 flex flex-col items-center text-center group cursor-pointer"
            >
              <div
                className={`relative w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] rounded-full p-[3px] transition-all duration-300 ${
                  currentCategorySlug === "all"
                    ? "ring-2 ring-[#A34850] ring-offset-2 shadow-sm"
                    : "border border-[#DDD] group-hover:border-[#A34850]"
                }`}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[#F5EFE6]">
                  <Image
                    src="/images/banner-editorial.jpg"
                    alt="All Collections"
                    fill
                    sizes="80px"
                    className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <span
                className={`mt-2 text-xs tracking-tight transition-colors line-clamp-1 max-w-[76px] ${
                  currentCategorySlug === "all"
                    ? "font-bold text-[#A34850]"
                    : "font-medium text-[#222222] group-hover:text-[#A34850]"
                }`}
              >
                All Styles
              </span>
            </Link>

            {/* Individual Categories */}
            {allCategories.map((cat) => {
              const isActive =
                currentCategorySlug === cat.slug || currentCategorySlug === cat.id;

              return (
                <Link
                  key={cat.id}
                  href={`/collections/${cat.slug}`}
                  className="flex-shrink-0 flex flex-col items-center text-center group cursor-pointer"
                >
                  <div
                    className={`relative w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] rounded-full p-[3px] transition-all duration-300 ${
                      isActive
                        ? "ring-2 ring-[#A34850] ring-offset-2 shadow-sm"
                        : "border border-[#DDD] group-hover:border-[#A34850]"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-[#F5EFE6]">
                      <Image
                        src={cat.image || cat.bannerImage || "/images/banner-editorial.jpg"}
                        alt={cat.name}
                        fill
                        sizes="80px"
                        className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <span
                    className={`mt-2 text-xs tracking-tight transition-colors line-clamp-1 max-w-[80px] ${
                      isActive
                        ? "font-bold text-[#A34850]"
                        : "font-medium text-[#222222] group-hover:text-[#A34850]"
                    }`}
                  >
                    {cat.name.replace("Pure Silk ", "").replace("M.P. ", "")}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Subcategory Filter Pills (if active category has specialized subcategories) */}
        {currentCategory?.subcategories && currentCategory.subcategories.length > 0 && currentCategory.id !== "all" && (
          <div className="mt-4 pt-3 border-t border-[#EAE3D9]/60 flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#696969] whitespace-nowrap">
              Refine:
            </span>
            {currentCategory.subcategories.map((sub, idx) => (
              <Link
                key={idx}
                href={`/collections/${sub.slug}`}
                className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-white hover:bg-[#FAF5EE] text-[#4A453E] hover:text-[#A34850] border border-[#DDD] hover:border-[#A34850] transition-colors whitespace-nowrap shadow-2xs"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
