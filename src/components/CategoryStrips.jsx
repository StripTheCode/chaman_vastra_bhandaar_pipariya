"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STRIPS = [
  {
    id: 1,
    tag: "EVERYDAY & FESTIVE",
    title: "Kurta & Anarkali Sets",
    priceNote: "Starting from ₹1,999",
    image: "/images/anarkali-rust.jpg",
    category: "kurtas",
  },
  {
    id: 2,
    tag: "HEIRLOOM WEAVES",
    title: "Pure Handloom Sarees",
    priceNote: "Under ₹9,999",
    image: "/images/saree-champagne.jpg",
    category: "sarees",
  },
  {
    id: 3,
    tag: "WEDDING PAVILION",
    title: "Bespoke Bridal Lehengas",
    priceNote: "Up to 30% Off",
    image: "/images/lehenga-sage.jpg",
    category: "lehengas",
  },
];

export default function CategoryStrips({ onSelectCategory }) {
  return (
    <section className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-bold text-[#A34850] block mb-1">
            Handpicked Value
          </span>
          <h2 className="text-2xl sm:text-[32px] font-bold text-[#19181B]">
            Festive Styles. Lowest Prices.
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#786F63] mt-1 font-normal">
            Direct from certified artisans with authentic price guarantees
          </p>
        </div>

        {/* 3-Column Strip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STRIPS.map((strip) => (
            <Link
              key={strip.id}
              href={`/collections/${strip.category}`}
              onClick={() => onSelectCategory && onSelectCategory(strip.category)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#EBE3DA] shadow-xs cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFEA]">
                <Image
                  src={strip.image}
                  alt={strip.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] uppercase font-bold tracking-widest text-[#E6C665] block mb-1">
                    {strip.tag}
                  </span>
                  <h3 className="text-[19px] sm:text-[20px] font-bold leading-tight">
                    {strip.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
                    <span className="text-[13.5px] sm:text-[14px] font-semibold text-[#EDE7DE]">
                      {strip.priceNote}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[12.5px] font-bold uppercase tracking-wider text-[#E6C665] group-hover:translate-x-1 transition-transform">
                      <span>Shop Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
