"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Video } from "lucide-react";

export default function EditorialSpotlight({ onSelectCategory }) {
  return (
    <section className="py-14 bg-[#19181B] text-white relative overflow-hidden">
      {/* Decorative Gold Accent Borders */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C59B27]/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C59B27]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#3E3A46] shadow-2xl">
              <Image
                src="/images/saree-champagne.jpg"
                alt="Champagne Gold Katan Silk Saree"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#C59B27] tracking-wider block">
                    Certified Authentic
                  </span>
                  <p className="font-serif text-xs font-bold text-white">
                    100% Pure Silk Mark Handloom
                  </p>
                </div>
                <span className="text-xs font-bold text-[#E6C665]">
                  Since 1985
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Trust Metrics */}
          <div className="lg:col-span-6">
            <span className="text-[12px] uppercase tracking-[0.24em] font-bold text-[#C59B27] block mb-3 font-sans">
              Legacy of Chaman Vastra Bhandar
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight mb-4 text-white">
              The Finest Weaves of Central India & Varanasi
            </h2>
            <p className="text-[13.5px] sm:text-[14.5px] text-[#C4BCB0] leading-relaxed mb-6 font-normal">
              For over 40 years, our flagship emporium on Station Road, Pipariya has dressed generations of brides and families. Every saree, lehenga, and suit in our collection is handpicked directly from artisan looms — guaranteeing pure fabrics, genuine gold zari, and timeless craftsmanship.
            </p>

            {/* Metric Pillars */}
            <div className="grid grid-cols-3 gap-4 py-4 mb-6 border-y border-[#332F3A]">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#E6C665] block">
                  40+
                </span>
                <span className="text-[11px] sm:text-[12px] text-[#9E9689] uppercase tracking-wider">
                  Years Legacy
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#E6C665] block">
                  100%
                </span>
                <span className="text-[11px] sm:text-[12px] text-[#9E9689] uppercase tracking-wider">
                  Certified Silks
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#E6C665] block">
                  50k+
                </span>
                <span className="text-[11px] sm:text-[12px] text-[#9E9689] uppercase tracking-wider">
                  Happy Families
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/collections/sarees"
                onClick={() => onSelectCategory && onSelectCategory("sarees")}
                className="px-7 py-3.5 rounded-full bg-[#A34850] hover:bg-[#8C3840] text-white text-[13px] sm:text-[13.5px] font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Explore Pure Sarees</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/918269260928?text=Namaste%20Chaman%20Vastra%20Bhandar%20Pipariya,%20I%20would%20like%20to%20book%20a%20video%20call%20for%20bridal%20shopping."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-[13px] sm:text-[13.5px] font-medium tracking-wide transition-all flex items-center gap-2 border border-white/20"
              >
                <Video className="w-4 h-4 text-emerald-400" />
                <span>Book Video Call</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
