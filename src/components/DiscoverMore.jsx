"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DiscoverMore({ onSelectCategory }) {
  return (
    <section className="py-14 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#A34850] block mb-1">
            Complete Family Wardrobe
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#19181B]">
            Discover More
          </h2>
          <p className="text-xs text-[#786F63] mt-1 font-light">
            Catering to every celebration across generations
          </p>
        </div>

        {/* 2-Column Banner Grid: Kid's Wear & Men's Wear */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Card 1: Kid's Wear */}
          <div className="group relative rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[300px] flex flex-col justify-end p-6 sm:p-8 bg-[#2C2833] text-white border border-[#EBE3DA] shadow-xs">
            <Image
              src="/images/lehenga-rose.jpg"
              alt="Kid's Festive Wear"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700 filter brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E6C665] block mb-1">
                Ages 2 to 14 Years
              </span>
              <h3 className="font-serif text-2xl font-bold mb-2">
                Kid&apos;s Festive Wear
              </h3>
              <p className="text-xs text-[#E0D8CE] mb-4 max-w-sm font-light">
                Adorable miniature lehengas, kurta pyjamas, and ethnic dresses crafted in breathable fabrics.
              </p>
              <Link
                href="/collections/kids"
                onClick={() => onSelectCategory && onSelectCategory("kids")}
                className="inline-flex px-5 py-2.5 rounded-full bg-white text-[#19181B] hover:bg-[#A34850] hover:text-white transition-all text-xs font-bold uppercase tracking-wider items-center gap-2 cursor-pointer shadow-md"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Men's Wear */}
          <div className="group relative rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[300px] flex flex-col justify-end p-6 sm:p-8 bg-[#2C2833] text-white border border-[#EBE3DA] shadow-xs">
            <Image
              src="/images/banner-editorial.jpg"
              alt="Men's Kurta & Sherwani"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700 filter brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E6C665] block mb-1">
                Grooms & Festive Edit
              </span>
              <h3 className="font-serif text-2xl font-bold mb-2">
                Men&apos;s Ethnic Wear
              </h3>
              <p className="text-xs text-[#E0D8CE] mb-4 max-w-sm font-light">
                Pure raw silk kurtas, Modi Nehru jackets, wedding sherwanis, and festive dhotis.
              </p>
              <Link
                href="/collections/men"
                onClick={() => onSelectCategory && onSelectCategory("men")}
                className="inline-flex px-5 py-2.5 rounded-full bg-white text-[#19181B] hover:bg-[#A34850] hover:text-white transition-all text-xs font-bold uppercase tracking-wider items-center gap-2 cursor-pointer shadow-md"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 2-Column Sub-Grid: Bags & Footwear */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 3: Potlis & Clutches */}
          <div className="group relative rounded-2xl overflow-hidden p-6 bg-white border border-[#EBE3DA] shadow-2xs hover:shadow-md transition-all flex items-center justify-between">
            <div className="max-w-[65%]">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#A34850] block mb-1">
                Handcrafted Accessories
              </span>
              <h4 className="font-serif text-lg font-bold text-[#19181B] mb-1">
                Potlis & Bridal Clutches
              </h4>
              <p className="text-[11px] text-[#786F63] mb-3">
                Zardozi, pearl-embellished and velvet drawstring bags.
              </p>
              <Link
                href="/collections/jewellery"
                onClick={() => onSelectCategory && onSelectCategory("jewellery")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A34850] hover:underline cursor-pointer"
              >
                <span>Browse Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#F4EFEA] border border-[#EBE3DA] shrink-0">
              <Image
                src="/images/saree-champagne.jpg"
                alt="Bridal Accessories"
                fill
                sizes="96px"
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Card 4: Juttis & Mojaris */}
          <div className="group relative rounded-2xl overflow-hidden p-6 bg-white border border-[#EBE3DA] shadow-2xs hover:shadow-md transition-all flex items-center justify-between">
            <div className="max-w-[65%]">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#A34850] block mb-1">
                Traditional Footwear
              </span>
              <h4 className="font-serif text-lg font-bold text-[#19181B] mb-1">
                Handmade Juttis & Mojaris
              </h4>
              <p className="text-[11px] text-[#786F63] mb-3">
                Padded leather juttis with dabka and mirror embroidery.
              </p>
              <Link
                href="/collections/all"
                onClick={() => onSelectCategory && onSelectCategory("all")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A34850] hover:underline cursor-pointer"
              >
                <span>Browse Footwear</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#F4EFEA] border border-[#EBE3DA] shrink-0">
              <Image
                src="/images/anarkali-rust.jpg"
                alt="Juttis & Footwear"
                fill
                sizes="96px"
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
