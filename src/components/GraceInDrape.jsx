"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Star } from "lucide-react";
import { CURRENCIES } from "@/data/products";

const SAREES = [
  {
    id: 2,
    title: "Luminous Champagne Gold Pure Katan Banarasi Silk Saree",
    fabric: "100% Certified Pure Katan Silk & Antique Gold Zari",
    priceINR: 18500,
    originalPriceINR: 24999,
    discount: "26% OFF",
    rating: 5.0,
    image: "/images/saree-champagne.jpg",
  },
  {
    id: 4,
    title: "Royal Crimson Maroon Bridal Banarasi Silk Saree",
    fabric: "Pure Handloom Katan Silk with Heavy Meenakari Pallu",
    priceINR: 21999,
    originalPriceINR: 28500,
    discount: "23% OFF",
    rating: 4.9,
    image: "/images/saree-crimson.jpg",
  },
  {
    id: 6,
    title: "Sage & Rose Twin Festive Silk Gown Ensemble",
    fabric: "Silk Georgette with Delicate Sequins & Cutdana Handwork",
    priceINR: 12499,
    originalPriceINR: 16500,
    discount: "24% OFF",
    rating: 5.0,
    image: "/images/banner-editorial.jpg",
  },
];

export default function GraceInDrape({ onQuickView, onSelectCategory, currentCurrency }) {
  const currencyObj = CURRENCIES[currentCurrency] || CURRENCIES.INR;

  return (
    <section className="py-14 bg-white border-y border-[#EBE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11.5px] uppercase tracking-[0.24em] font-bold text-[#A34850] block mb-1">
              Handloom Silk Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#19181B]">
              Grace in Every Drape
            </h2>
            <p className="text-[13.5px] sm:text-[14px] text-[#786F63] mt-1 font-normal max-w-xl">
              Explore handpicked sarees that embody tradition, beauty, and modern sophistication.
            </p>
          </div>

          <Link
            href="/collections/sarees"
            onClick={() => onSelectCategory && onSelectCategory("sarees")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white text-[13px] sm:text-[13.5px] font-semibold uppercase tracking-wider transition-colors self-start md:self-auto shadow-xs cursor-pointer"
          >
            <span>SHOP NOW</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Card Saree Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SAREES.map((saree) => {
            const price = Math.round(saree.priceINR * currencyObj.rate);
            const orig = Math.round(saree.originalPriceINR * currencyObj.rate);

            return (
              <div
                key={saree.id}
                onClick={() => onQuickView(saree)}
                className="group relative rounded-3xl overflow-hidden bg-[#FAF8F5] border border-[#EBE3DA] hover:border-[#A34850]/40 hover:shadow-lg transition-all cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4EFEA]">
                  <Image
                    src={saree.image}
                    alt={saree.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 flex gap-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#19181B] text-white text-[10px] font-bold uppercase tracking-wider">
                      {saree.discount}
                    </span>
                  </div>

                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(saree);
                      }}
                      className="w-full py-2.5 rounded-xl bg-white/95 text-[#19181B] text-xs font-semibold backdrop-blur-md shadow-md flex items-center justify-center gap-1.5 hover:bg-white"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[#C59B27] mb-1 text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-[#19181B]">{saree.rating}</span>
                    </div>
                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#19181B] group-hover:text-[#A34850] transition-colors line-clamp-1 mb-1">
                      {saree.title}
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-[#786F63] line-clamp-1">
                      {saree.fabric}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#EAE3D5] flex items-baseline gap-2">
                    <span className="text-[16px] sm:text-[17px] font-bold text-[#19181B]">
                      {currencyObj.symbol}{price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[12.5px] sm:text-[13px] text-[#9E9485] line-through">
                      {currencyObj.symbol}{orig.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
