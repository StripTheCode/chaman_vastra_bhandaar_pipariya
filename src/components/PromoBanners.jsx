"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Video } from "lucide-react";

export default function PromoBanners({ onSelectCategory }) {
  return (
    <section className="py-10 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Promo Card 1: Bridal Pavilion */}
          <div className="group relative rounded-3xl overflow-hidden bg-[#18161B] text-white min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10 border border-[#EBE3DA] shadow-sm">
            <Image
              src="/images/promo-bridal.jpg"
              alt="Bridal Couture Pavilion"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.82]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10">
              <span className="text-[12px] uppercase tracking-[0.22em] font-bold text-[#E6C665] block mb-2 font-sans">
                The Bridal Pavilion • 2026
              </span>
              <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold leading-snug mb-2.5">
                Handcrafted Zardozi & Velvet Lehengas
              </h3>
              <p className="text-[13.5px] sm:text-[14.5px] text-[#E2DACF] mb-6 max-w-md font-normal leading-relaxed">
                Heirloom kalidars, custom-tailored cholis, and royal dupattas crafted for the Indian bride.
              </p>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <Link
                  href="/collections/lehengas"
                  onClick={() => onSelectCategory && onSelectCategory("lehengas")}
                  className="px-6 py-3 rounded-full bg-white text-[#19181B] hover:bg-[#A34850] hover:text-white transition-all text-[13px] sm:text-[13.5px] font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Explore Bridal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/918269260928?text=Namaste%20Chaman%20Vastra%20Bhandar%20Pipariya,%20I%20am%20looking%20for%20bridal%20lehengas%20for%20an%20upcoming%20wedding."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-[13px] sm:text-[13.5px] font-medium tracking-wide transition-all flex items-center gap-2 border border-white/20"
                >
                  <Video className="w-4 h-4 text-emerald-400" />
                  <span>Book Consultation</span>
                </a>
              </div>
            </div>
          </div>

          {/* Promo Card 2: Master Loom Pure Silks */}
          <div className="group relative rounded-3xl overflow-hidden bg-[#18161B] text-white min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10 border border-[#EBE3DA] shadow-sm">
            <Image
              src="/images/promo-handloom.jpg"
              alt="Handloom Silk Sarees"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.82]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10">
              <span className="text-[12px] uppercase tracking-[0.22em] font-bold text-[#E6C665] block mb-2 font-sans">
                Direct From Master Looms
              </span>
              <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold leading-snug mb-2.5">
                Pure Banarasi & Kanjivaram Silks
              </h3>
              <p className="text-[13.5px] sm:text-[14.5px] text-[#E2DACF] mb-6 max-w-md font-normal leading-relaxed">
                Certified pure Katan silks woven with kadwa bootis, antique gold zari, and timeless pallus.
              </p>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <Link
                  href="/collections/sarees"
                  onClick={() => onSelectCategory && onSelectCategory("sarees")}
                  className="px-6 py-3 rounded-full bg-white text-[#19181B] hover:bg-[#A34850] hover:text-white transition-all text-[13px] sm:text-[13.5px] font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Shop Pure Silks</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/918269260928?text=Namaste%20Chaman%20Vastra%20Bhandar%20Pipariya,%20I%20would%20like%20to%20see%20Banarasi%20silk%20sarees%20over%20video%20call."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-[13px] sm:text-[13.5px] font-medium tracking-wide transition-all flex items-center gap-2 border border-white/20"
                >
                  <Video className="w-4 h-4 text-emerald-400" />
                  <span>Video Preview</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
