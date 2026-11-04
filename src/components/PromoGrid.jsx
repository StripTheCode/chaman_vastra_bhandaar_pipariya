"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const JEWELLERY_ITEMS = [
  {
    id: 1,
    title: "Bracelets & Bangles",
    offer: "Upto 55% OFF",
    image: "/images/saree-champagne.jpg",
  },
  {
    id: 2,
    title: "Temple Mangalsutra",
    offer: "Upto 55% OFF",
    image: "/images/saree-crimson.jpg",
  },
  {
    id: 3,
    title: "Jhumkas & Chaandbalis",
    offer: "Upto 55% OFF",
    image: "/images/anarkali-rust.jpg",
  },
  {
    id: 4,
    title: "Kundan Jewellery Sets",
    offer: "Upto 50% OFF",
    image: "/images/promo-bridal.jpg",
  },
];

export default function PromoGrid({ onSelectCategory }) {
  return (
    <section className="py-14 bg-white border-b border-[#EBE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#A34850] block mb-1">
              Heirloom Accessories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#19181B]">
              Crafted to Shine
            </h2>
            <p className="text-xs text-[#786F63] mt-1 font-light">
              Complete your ethnic look with matching bridal and festive jewellery
            </p>
          </div>

          <Link
            href="/collections/jewellery"
            onClick={() => onSelectCategory && onSelectCategory("jewellery")}
            className="text-xs font-semibold text-[#A34850] hover:underline hidden sm:block cursor-pointer"
          >
            View All Jewellery
          </Link>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {JEWELLERY_ITEMS.map((item) => (
            <Link
              key={item.id}
              href="/collections/jewellery"
              onClick={() => onSelectCategory && onSelectCategory("jewellery")}
              className="group relative rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#EBE3DA] p-4 flex flex-col items-center text-center hover:border-[#C59B27] hover:shadow-md transition-all cursor-pointer"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-[#EFE9DF]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#A34850] text-white text-[9px] font-bold tracking-wider">
                  {item.offer}
                </span>
              </div>

              <h4 className="font-serif text-sm font-bold text-[#19181B] group-hover:text-[#A34850] transition-colors mb-1">
                {item.title}
              </h4>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A34850] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
