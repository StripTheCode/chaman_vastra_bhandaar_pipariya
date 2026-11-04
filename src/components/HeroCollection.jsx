"use client";

import Image from "next/image";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { CURRENCIES } from "@/data/products";

const DECOR_ITEMS = [
  {
    id: 101,
    title: "Handcrafted Brass Hanging Diya with Bells",
    tag: "Puja Decor",
    priceINR: 1899,
    originalPriceINR: 2499,
    discount: "24% OFF",
    image: "/images/saree-champagne.jpg",
  },
  {
    id: 102,
    title: "Divine Ganesh Chowki Idol in Marble Dust",
    tag: "Auspicious Idol",
    priceINR: 2499,
    originalPriceINR: 3299,
    discount: "24% OFF",
    image: "/images/promo-bridal.jpg",
  },
  {
    id: 103,
    title: "Handmade Antique Brass Urli with Floating Diya",
    tag: "Festive Centerpiece",
    priceINR: 2199,
    originalPriceINR: 2899,
    discount: "24% OFF",
    image: "/images/anarkali-rust.jpg",
  },
];

export default function HeroCollection({ currentCurrency, onAddToCart }) {
  const currencyObj = CURRENCIES[currentCurrency] || CURRENCIES.INR;

  return (
    <section className="py-14 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <div className="rounded-3xl bg-[#201D24] text-white p-6 sm:p-10 mb-8 border border-[#3E3A46] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C59B27] text-[#19181B] text-[10px] font-bold uppercase tracking-wider mb-3">
              Sale Upto 40% Off
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mb-2">
              Elevate Every Space
            </h2>
            <p className="text-xs sm:text-sm text-[#D4CCC0] font-light leading-relaxed">
              Discover thoughtfully curated decor pieces that bring warmth, style, and auspicious personality to your home.
            </p>
          </div>

          <a
            href="https://wa.me/918269260928?text=Namaste%20Chaman%20Vastra%20Bhandar%20Pipariya,%20I%20am%20interested%20in%20Festive%20Home%20Decor."
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#19181B] hover:bg-[#A34850] hover:text-white transition-all text-xs font-bold uppercase tracking-wider shrink-0 shadow-lg"
          >
            <span>Explore Home Decor</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Decor Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DECOR_ITEMS.map((item) => {
            const price = Math.round(item.priceINR * currencyObj.rate);
            const orig = Math.round(item.originalPriceINR * currencyObj.rate);

            return (
              <div
                key={item.id}
                className="group p-4 rounded-2xl bg-white border border-[#EBE3DA] hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#F4EFEA] shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="100px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-sm bg-[#A34850] text-white text-[9px] font-bold">
                    {item.discount}
                  </span>
                </div>

                <div className="flex-1">
                  <span className="text-[10px] text-[#A34850] font-bold uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <h3 className="font-serif text-xs font-bold text-[#19181B] line-clamp-1 mt-0.5 mb-1.5">
                    {item.title}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-extrabold text-[#19181B]">
                      {currencyObj.symbol}{price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] text-[#9E9485] line-through">
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
