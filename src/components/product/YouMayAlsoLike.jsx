"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Eye, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS, CURRENCIES } from "@/data/products";

export default function YouMayAlsoLike({ currentProductId, category, onSelectProduct, currentCurrency = "INR" }) {
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    // Filter 8 to 10 products from the same category (or fallback to top products)
    const filtered = PRODUCTS.filter(
      (p) => String(p.id) !== String(currentProductId) && p.category?.toLowerCase() === category?.toLowerCase()
    );

    // If less than 6 from same category, supplement with other luxury items
    let pool = [...filtered];
    if (pool.length < 8) {
      const other = PRODUCTS.filter((p) => String(p.id) !== String(currentProductId) && !pool.some((item) => item.id === p.id));
      pool = [...pool, ...other];
    }

    setSimilarProducts(pool.slice(0, 10));
  }, [currentProductId, category]);

  if (similarProducts.length === 0) return null;

  const currencyObj = CURRENCIES[currentCurrency] || CURRENCIES.INR;

  return (
    <div className="w-full pt-8 pb-4 border-t border-[#EADBCA] mt-8">
      <div className="flex items-center justify-between mb-5 px-1">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#A34850] block">
            Curated For Your Tastes
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#19181B] flex items-center gap-2">
            <span>You May Also Like</span>
            <Sparkles className="w-4 h-4 text-[#C59B27]" />
          </h3>
        </div>

        <Link
          href={`/collections/${category || "all"}`}
          className="text-xs font-bold text-[#A34850] hover:underline flex items-center gap-1"
        >
          <span>View All in {category || "Collection"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Horizontal Scrollable Carousel / Grid */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-amber-200 snap-x">
        {similarProducts.map((p) => {
          const price = Math.round((p.priceINR || 0) * (currencyObj.rate || 1));
          const orig = Math.round((p.originalPriceINR || 0) * (currencyObj.rate || 1));

          return (
            <div
              key={p.id}
              onClick={() => {
                if (typeof onSelectProduct === "function") {
                  onSelectProduct(p);
                }
              }}
              className="w-48 sm:w-56 shrink-0 bg-white rounded-2xl p-3 border border-[#EADBCA] hover:border-[#C59B27] hover:shadow-lg transition-all group cursor-pointer snap-start flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#FAF8F5] mb-2.5">
                  <Image
                    src={p.image || "/images/saree-champagne.jpg"}
                    alt={p.title}
                    fill
                    sizes="220px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {p.discount && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#19181B] text-white text-[9px] font-bold">
                      {p.discount}
                    </span>
                  )}
                </div>

                {/* Title */}
                <p className="text-xs font-bold text-[#19181B] line-clamp-2 leading-snug group-hover:text-[#A34850] transition-colors">
                  {p.title}
                </p>
                <p className="text-[10.5px] text-[#7C7367] mt-0.5">{p.fabric || "Pure Silk"}</p>
              </div>

              {/* Price & Quick View Button */}
              <div className="mt-3 pt-2.5 border-t border-[#F4EFEA] flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-xs text-[#19181B]">
                    {currencyObj.symbol}{price.toLocaleString("en-IN")}
                  </span>
                  {orig > price && (
                    <span className="text-[10px] text-[#8C8273] line-through block">
                      {currencyObj.symbol}{orig.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className="px-2.5 py-1 rounded-full bg-[#FAF8F5] group-hover:bg-[#19181B] group-hover:text-white text-[#19181B] text-[10px] font-bold uppercase tracking-wider transition-all border border-[#EADBCA]"
                >
                  360° View
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

