"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/products";
import SareeIcon from "@/components/icons/SareeIcon";
import LehengaIcon from "@/components/icons/LehengaIcon";
import KurtaIcon from "@/components/icons/KurtaIcon";
import FabricIcon from "@/components/icons/FabricIcon";
import HangerIcon from "@/components/icons/HangerIcon";

const CATEGORY_ICONS = {
  "kurta-sets": KurtaIcon,
  "kurtas-kurtis": KurtaIcon,
  "pakistani-suits": KurtaIcon,
  "anarkali-sets": KurtaIcon,
  "tunics-tops": HangerIcon,
  "gowns": HangerIcon,
  "lehengas": LehengaIcon,
  "sarees": SareeIcon,
  "banarasi-silk": SareeIcon,
  "chanderi": SareeIcon,
  "kanjivaram": SareeIcon,
  "sharara-sets": KurtaIcon,
  "party-wear-dresses": HangerIcon,
  "dupattas": FabricIcon,
  "bridal-trousseau": LehengaIcon,
};

export default function CategoryStories({ activeCategory, onSelectCategory }) {
  const [isPaused, setIsPaused] = useState(false);

  // Filter out the meta "all" collection to only show real categories
  const displayCategories = CATEGORIES.filter((c) => c.id !== "all");

  // Duplicate for seamless 100% infinite continuous auto-scroll
  const duplicatedCategories = [...displayCategories, ...displayCategories];

  return (
    <section className="py-10 bg-[#FAF8F5] border-b border-[#EBE3DA] overflow-hidden">
      {/* Scoped Keyframes to guarantee 100% Turbopack & Browser execution */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes cvbCategoryMarquee {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-50%, 0, 0);
              }
            }
            .cvb-marquee-track {
              display: flex !important;
              width: max-content !important;
              animation-name: cvbCategoryMarquee !important;
              animation-duration: 38s !important;
              animation-timing-function: linear !important;
              animation-iteration-count: infinite !important;
              animation-play-state: running;
              will-change: transform;
            }
            .cvb-marquee-track:hover,
            .cvb-marquee-track.is-paused {
              animation-play-state: paused !important;
            }
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-bold text-[#A34850]">
              Explore Collections
            </span>
            <h2 className="text-2xl sm:text-[32px] font-bold text-[#19181B] mt-0.5">
              Shop By Category
            </h2>
          </div>
          <Link
            href="/collections/all"
            className="text-[13px] font-semibold text-[#A34850] hover:underline cursor-pointer"
          >
            View All ({displayCategories.length})
          </Link>
        </div>

        {/* Infinite Auto-Scroll Track Container with Left/Right Soft Fade Edges */}
        <div className="relative w-full overflow-hidden py-2">
          {/* Soft Gradient Fade on Left Edge */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-10 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent" />

          {/* Soft Gradient Fade on Right Edge */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-10 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent" />

          {/* Continuous Hardware-Accelerated Infinite Scrolling Track */}
          <div
            className={`cvb-marquee-track flex gap-3.5 sm:gap-4.5 w-max ${
              isPaused ? "is-paused" : ""
            }`}
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {duplicatedCategories.map((cat, index) => {
              const IconComponent = CATEGORY_ICONS[cat.id] || HangerIcon;
              const isActive = activeCategory === cat.id;

              return (
                <Link
                  key={`${cat.id}-${index}`}
                  href={`/collections/${cat.id}`}
                  onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                  className={`group flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl bg-white border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer w-[138px] sm:w-[158px] shrink-0 select-none ${
                    isActive
                      ? "border-[#A34850] ring-2 ring-[#A34850]/20 shadow-xs"
                      : "border-[#EAE3D5] hover:border-[#A34850]"
                  }`}
                >
                  {/* Circular Category Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-2.5 border-2 border-[#EBE3DA] group-hover:border-[#A34850] transition-colors shadow-2xs">
                    <Image
                      src={cat.image || cat.bannerImage || "/images/banner-editorial.jpg"}
                      alt={cat.name}
                      fill
                      sizes="90px"
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Floating Icon Badge */}
                    <div className="absolute bottom-0.5 right-0.5 w-5 h-5 rounded-full bg-white/95 text-[#A34850] flex items-center justify-center shadow-md border border-[#EBE3DA]">
                      <IconComponent className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Category Title */}
                  <div className="flex items-center justify-center w-full">
                    <h3 className="text-[13px] sm:text-[14px] font-semibold text-[#19181B] group-hover:text-[#A34850] transition-colors truncate px-1">
                      {cat.name.replace("Pure Silk ", "").replace("M.P. ", "")}
                    </h3>
                  </div>

                  {/* Style Count */}
                  <span className="text-[11.5px] text-[#777] mt-0.5 font-sans">
                    {cat.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
