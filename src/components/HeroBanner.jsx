"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, MessageCircle } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    tag: "CHAMAN VASTRA BHANDAR • PIPARIYA",
    title: "The Royal Splendor of Pure Handloom Sarees",
    subtitle: "Handpicked pure Banarasi Katan silks, authentic Kanjivaram treasures, and bespoke bridal lehengas from Pipariya's premier saree destination since 1985.",
    image: "/images/banner-editorial.jpg",
    cta: "Explore Silk Sarees",
    category: "sarees",
  },
  {
    id: 2,
    tag: "HEIRLOOM BANARASI & KATAN SILKS",
    title: "Pure Champagne Gold & Crimson Weaves",
    subtitle: "Certified 100% pure silk with intricate antique zari jaal work, directly from master artisans to our Pipariya showroom.",
    image: "/images/saree-champagne.jpg",
    cta: "Shop Banarasi Sarees",
    category: "sarees",
  },
  {
    id: 3,
    tag: "BRIDAL & WEDDING TROUSSEAU",
    title: "Handcrafted Zardozi & Velvet Lehengas",
    subtitle: "Exquisite bridal masterpieces tailored with authentic craftsmanship for the discerning Indian bride.",
    image: "/images/lehenga-sage.jpg",
    cta: "Shop Bridal Edit",
    category: "lehengas",
  },
];

export default function HeroBanner({ onSelectCategory, onQuickView }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden bg-white text-white w-full">
      {/* Main Slide Stage */}
      <div className="relative h-[520px] sm:h-[620px] lg:h-[680px] w-full">
        {SLIDES.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center filter brightness-[0.98]"
            />

            {/* Subtle Gradient Overlays - Reduced Opacity for Vibrant Imagery */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              
              {/* Stacked Slide Text Container - All 3 Slides Layered to Anchor Buttons Firmly */}
              <div className="relative min-h-[220px] xs:min-h-[235px] sm:min-h-[265px] lg:min-h-[290px] mb-5 sm:mb-7">
                {SLIDES.map((s, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <div
                      key={s.id}
                      className={`absolute inset-x-0 top-0 transition-opacity duration-700 ease-in-out ${
                        isActive
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0 pointer-events-none"
                      }`}
                    >
                      {/* Pre-title Brand Tag */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-[#F5E6CC] text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] inline-block" />
                        <span>{s.tag}</span>
                      </div>

                      {/* Headline with Drop Shadow */}
                      <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight text-white mb-3.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] min-h-[72px] sm:min-h-[105px] lg:min-h-[125px] flex items-start">
                        {s.title}
                      </h1>

                      {/* Subtitle with Drop Shadow */}
                      <p className="text-sm sm:text-base text-[#F5EFE6] leading-relaxed max-w-xl font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] min-h-[48px] sm:min-h-[52px]">
                        {s.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* CTAs - 100% Rock-Solid Fixed Position, Zero Movement During Slide Changes */}
              <div className="flex flex-wrap items-center gap-3.5">
                <Link
                  href={`/collections/${slide.category}`}
                  onClick={() => onSelectCategory && onSelectCategory(slide.category)}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-[#19181B] hover:bg-[#A34850] hover:text-white transition-all text-xs font-bold tracking-widest uppercase shadow-lg group cursor-pointer w-[220px] sm:w-[235px] text-center shrink-0"
                >
                  <span className="truncate">{slide.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="https://wa.me/918269260928?text=Namaste%20Chaman%20Vastra%20Bhandar%20Pipariya,%20I%20would%20like%20to%20book%20a%20live%20video%20call%20saree%20preview."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Book Live Video Call</span>
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Interactive Shoppable Garment Hotspot */}
        <div className="hidden lg:block absolute bottom-24 right-20 z-20">
          <div className="group relative">
            <span className="flex h-5 w-5 relative items-center justify-center cursor-pointer">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A34850] border-2 border-white shadow-lg"></span>
            </span>
            <div className="absolute right-0 bottom-8 w-64 p-3 rounded-xl bg-white/95 backdrop-blur-md text-[#19181B] shadow-2xl border border-[#EBE3DA] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
              <span className="text-[10px] uppercase font-bold text-[#A34850] tracking-wider block">
                Chaman Heritage Spotlight
              </span>
              <p className="font-serif text-xs font-bold text-[#19181B] mt-0.5 line-clamp-1">
                Pure Banarasi Katan Silk Saree
              </p>
              <p className="text-[11px] text-[#71695E] mt-0.5">Video Call Preview Available • Dispatches in 24 hrs</p>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer hidden sm:flex"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer hidden sm:flex"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </section>
  );
}
