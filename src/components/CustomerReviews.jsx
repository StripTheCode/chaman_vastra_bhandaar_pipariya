"use client";

import { useState } from "react";
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Check } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    author: "Pooja Sharma",
    location: "Bhopal, M.P.",
    rating: 5,
    title: "Pure Banarasi Katan Silk - Outstanding Quality!",
    review:
      "I ordered the Champagne Gold Banarasi Saree for my sister's wedding. The fabric drape and antique zari shine are 100% authentic. The video call preview by the Chaman team helped me see the exact border details before ordering.",
    product: "Luminous Champagne Gold Pure Katan Banarasi Silk Saree",
    date: "Verified Buyer • 4 days ago",
  },
  {
    id: 2,
    author: "Ananya Rathore",
    location: "Indore, M.P.",
    rating: 5,
    title: "Bespoke Bridal Lehenga - Dream Fitting",
    review:
      "Got my wedding reception lehenga customized to my exact measurements. The zardozi handwork is so clean and opulent. Received delivery in beautiful muslin packing with insured courier within 3 days.",
    product: "Ivory & Sage Green Handcrafted Zardozi Bridal Lehenga",
    date: "Verified Buyer • 1 week ago",
  },
  {
    id: 3,
    author: "Meera Patel",
    location: "Mumbai, Maharashtra",
    rating: 5,
    title: "Royal Crimson Bridal Saree - Pure Elegance",
    review:
      "Ordered all the way from Mumbai. The heavy meenakari pallu is breathtaking! Chaman Vastra Bhandar has maintained their 40-year trust. Thank you for the quick dispatch.",
    product: "Royal Crimson Maroon Bridal Banarasi Silk Saree",
    date: "Verified Buyer • 2 weeks ago",
  },
  {
    id: 4,
    author: "Ritu Verma",
    location: "Jabalpur, M.P.",
    rating: 5,
    title: "Terracotta Anarkali Set - Flawless Craftsmanship",
    review:
      "The raw silk fabric and gotta patti handwork look even richer in person than in the photos. The tissue dupatta adds such a royal touch. Highly recommended!",
    product: "Terracotta Rust Embroidered Pure Silk Anarkali Set",
    date: "Verified Buyer • 3 weeks ago",
  },
];

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-14 bg-white border-b border-[#EBE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Aggregate Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[#F0EBE2]">
          <div>
            <span className="text-[11.5px] uppercase tracking-[0.24em] font-bold text-[#A34850] block mb-1">
              Real Stories From Real Brides
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#19181B]">
              Let Our Customers Speak For Us
            </h2>
            <p className="text-[13.5px] sm:text-[14px] text-[#786F63] mt-1 font-normal">
              Trusted by thousands of families across Central India & nationwide
            </p>
          </div>

          {/* Aggregate Rating Badge (Judge.me Style) */}
          <div className="flex items-center gap-4 bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#EBE3DA]">
            <div className="text-right">
              <div className="flex items-center gap-1 text-[#C59B27] justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-[12px] font-bold text-[#19181B] mt-0.5">
                4.9 / 5.0 Rating
              </p>
            </div>
            <div className="h-9 w-px bg-[#E5DDD2]" />
            <div className="text-left">
              <span className="text-[13px] font-bold text-[#19181B] block">
                2,840+ Reviews
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                100% Verified Buyers
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#FAF8F5] border border-[#EBE3DA] hover:border-[#A34850]/40 hover:shadow-md transition-all"
            >
              <div>
                {/* Star Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-[#C59B27]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>

                {/* Review Title */}
                <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#19181B] mb-2 line-clamp-1">
                  &ldquo;{rev.title}&rdquo;
                </h3>

                {/* Review Text */}
                <p className="text-[13px] sm:text-[13.5px] text-[#524D46] leading-relaxed font-normal mb-4 line-clamp-4">
                  {rev.review}
                </p>
              </div>

              {/* Author & Product Info */}
              <div className="pt-3 border-t border-[#EAE3D5]">
                <p className="text-[13px] sm:text-[13.5px] font-semibold text-[#19181B]">
                  {rev.author}
                </p>
                <p className="text-[12px] text-[#8C8273]">
                  {rev.location}
                </p>
                <p className="text-[11.5px] text-[#A34850] font-medium truncate mt-1">
                  Item: {rev.product}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
