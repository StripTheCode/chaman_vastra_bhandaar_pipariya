"use client";

import Link from "next/link";
import Image from "next/image";

/**
 * Trendia-Style Collections Hub Page
 * Fully responsive across 6 distinct screen tiers:
 * 1. Big Desktop / 4K (2xl: >= 1536px): 5 columns, max-w-[1920px], 22-24px font
 * 2. Standard Desktop / Laptop (lg, xl: 1024px - 1535px): 5 columns, 22px Poppins
 * 3. Tablet Landscape / Small Laptop (md: 768px - 1023px): 4 columns, 19-20px font
 * 4. Tablet Portrait / Large Mobile (sm: 640px - 767px): 3 columns, 16.5-18px font
 * 5. Mobile Standard (xs: 390px - 639px): 2 columns, 15-16px font
 * 6. Mobile Small (< 390px, e.g. 320px - 389px): 2 columns, 13.5-14.5px font, edge-to-edge
 */
export const TRENDIA_COLLECTIONS_CARDS = [
  // ROW 1
  {
    id: "kurta-sets",
    title: "Women's Kurta Sets",
    slug: "kurta-sets",
    count: "6,616",
    image: "/images/anarkali-rust.jpg",
  },
  {
    id: "bridal-lehenga",
    title: "Bridal Lehenga",
    slug: "lehengas",
    count: "1,150",
    image: "/images/lehenga-rose.jpg",
  },
  {
    id: "sarees-for-women",
    title: "Sarees for Women",
    slug: "sarees",
    count: "3,420",
    image: "/images/saree-champagne.jpg",
  },
  {
    id: "anarkali-kurta-sets",
    title: "Anarkali Kurta Sets",
    slug: "anarkali-sets",
    count: "928",
    image: "/images/promo-bridal.jpg",
  },
  {
    id: "kurtas",
    title: "Kurtas",
    slug: "kurtas-kurtis",
    count: "1,840",
    image: "/images/banner-editorial.jpg",
  },

  // ROW 2
  {
    id: "tops",
    title: "Tops",
    slug: "tunics-tops",
    count: "410",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "skirts-for-women",
    title: "Skirts for Women",
    slug: "lehengas",
    count: "54",
    image: "/images/lehenga-sage.jpg",
  },
  {
    id: "kaftans-for-women",
    title: "Kaftans for Women",
    slug: "tunics-tops",
    count: "280",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kurtis",
    title: "Kurtis",
    slug: "kurtas-kurtis",
    count: "1,250",
    image: "/images/anarkali-rust.jpg",
  },
  {
    id: "dresses-for-women",
    title: "Dresses for Women",
    slug: "gowns",
    count: "620",
    image: "/images/saree-crimson.jpg",
  },

  // ROW 3
  {
    id: "tunics",
    title: "Tunics",
    slug: "tunics-tops",
    count: "340",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gowns-for-women",
    title: "Gowns for Women",
    slug: "gowns",
    count: "212",
    image: "/images/saree-crimson.jpg",
  },
  {
    id: "women-jumpsuits",
    title: "Women Jumpsuits",
    slug: "tunics-tops",
    count: "185",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dupattas",
    title: "Dupattas",
    slug: "kurta-sets",
    count: "520",
    image: "/images/promo-bridal.jpg",
  },
  {
    id: "night-suits-for-women",
    title: "Night Suits for Women",
    slug: "tunics-tops",
    count: "160",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
  },

  // ROW 4
  {
    id: "saree-blouses",
    title: "Saree Blouses",
    slug: "sarees",
    count: "310",
    image: "/images/saree-champagne.jpg",
  },
  {
    id: "bottoms",
    title: "Bottoms",
    slug: "kurta-sets",
    count: "420",
    image: "/images/banner-editorial.jpg",
  },
  {
    id: "jackets",
    title: "Jackets",
    slug: "kurtas-kurtis",
    count: "190",
    image: "/images/promo-handloom.jpg",
  },
  {
    id: "pakistani-suits",
    title: "Pakistani Suits",
    slug: "pakistani-suits",
    count: "680",
    image: "/images/promo-bridal.jpg",
  },
  {
    id: "pure-banarasi-silks",
    title: "Pure Banarasi Silks",
    slug: "sarees",
    count: "1,240",
    image: "/images/promo-handloom.jpg",
  },
];

export default function AllCollectionsHub() {
  return (
    <div className="w-full bg-white">
      {/* 1. Charcoal Header Banner - Fluid Height & Font across all screens */}
      <div className="w-full bg-[#706F74] py-3.5 xs:py-4 sm:py-5 md:py-6 lg:py-6.5 text-center shadow-xs">
        <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-[26px] font-medium text-white tracking-wide font-sans">
          Collections
        </h1>
      </div>

      {/* 2. Full-Bleed Fluid Multi-Tier Responsive Grid */}
      <div className="w-full px-1 xs:px-1.5 sm:px-1.5 md:px-2 lg:px-2.5 2xl:px-4 py-1.5 xs:py-2 sm:py-2.5 md:py-3 2xl:max-w-[1920px] 2xl:mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 xs:gap-1.5 sm:gap-1.5 md:gap-2 lg:gap-2 2xl:gap-3">
          {TRENDIA_COLLECTIONS_CARDS.map((card, idx) => (
            <div
              key={card.id}
              className="hdt-collection-item group relative w-full"
            >
              <Link
                href={`/collections/${card.slug}`}
                className="hdt-collection-inner relative block w-full aspect-[2/3] overflow-hidden rounded-[2px] bg-[#F4EFEA] cursor-pointer"
              >
                {/* 1. Image with Trendia Zoom Effect (hdt-eff-img-zoom) */}
                <div className="hdt-collection-img relative w-full h-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-106"
                    priority={idx < 5}
                  />
                </div>

                {/* 2. Centered Content (hdt-collection-content hdt-place-self-center) */}
                <div className="hdt-collection-content absolute inset-0 flex items-center justify-center text-center p-1.5 xs:p-2 sm:p-2.5 md:p-3 z-10 pointer-events-none select-none">
                  <div className="hdt-collection-wrapper flex flex-col items-center justify-center text-center w-full px-1">
                    {/* Title: Fluidly Responsive 13.5px on small mobile up to 22px on desktop */}
                    <h2 className="hdt-collection-title text-white text-[#FFFFFF] text-[13.5px] xs:text-[15px] sm:text-[16.5px] md:text-[18.5px] lg:text-[22px] font-semibold leading-tight tracking-normal">
                      <span className="hdt-collection-title-text block">
                        {card.title}
                      </span>
                    </h2>

                    {/* Count: Smooth Hover & Touch Reveal */}
                    {card.count && (
                      <div className="hdt-collection-count overflow-hidden transition-all duration-300 ease-out max-h-0 opacity-0 -translate-y-1 group-hover:max-h-8 group-hover:opacity-100 group-hover:translate-y-0 group-hover:mt-1 group-active:max-h-8 group-active:opacity-100 group-active:translate-y-0 group-active:mt-1">
                        <p className="text-white text-[#FFFFFF] text-[11px] xs:text-[12px] sm:text-[12.5px] md:text-[13px] lg:text-[14px] font-normal leading-normal">
                          <span className="font-semibold">{card.count}</span>{" "}
                          <span className="opacity-95">Products</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Customer Rating Trust Bar (Responsive from 320px mobile to 4K displays) */}
      <div className="w-full py-3 sm:py-4 bg-white border-y border-[#EBEBEB] flex flex-wrap items-center justify-center gap-2 xs:gap-3 sm:gap-4 text-[11px] xs:text-xs sm:text-sm text-[#333333] font-medium my-3 px-3 text-center">
        <span className="flex items-center gap-1.5 font-bold text-[#107C41]">
          <span className="bg-[#107C41] text-white text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-[2px]">
            4.7
          </span>
          <span className="text-[#107C41] tracking-widest text-[11px] sm:text-xs">★★★★★</span>
        </span>
        <span className="text-[#222222]">
          4.7 out of 5 stars based on 7,583 reviews
        </span>
        <span className="text-gray-300 hidden sm:inline">|</span>
        <span className="text-[#107C41] font-semibold flex items-center gap-1">
          Verified
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-[#107C41]"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}