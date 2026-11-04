"use client";

import { useState } from "react";

// 1. 100% Satisfaction: Customer silhouette with 3 stars arching below
function SatisfactionIcon({ className = "w-9 h-9" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Customer Head Circle */}
      <circle cx="24" cy="13.5" r="5" fill="currentColor" fillOpacity="0.08" />
      {/* Neck & Shoulders Contour */}
      <path d="M15.5 26.5c0-4.2 3.8-7 8.5-7s8.5 2.8 8.5 7" />
      {/* Left Star */}
      <path
        d="M14.5 33.5l.9 2 2.2.3-1.6 1.5.4 2.2-1.9-1-1.9 1 .4-2.2-1.6-1.5 2.2-.3z"
        fill="currentColor"
        fillOpacity="0.25"
      />
      {/* Center Star */}
      <path
        d="M24 35.5l1.1 2.2 2.5.4-1.8 1.7.5 2.4-2.3-1.2-2.3 1.2.5-2.4-1.8-1.7 2.5-.4z"
        fill="currentColor"
        fillOpacity="0.25"
      />
      {/* Right Star */}
      <path
        d="M33.5 33.5l.9 2 2.2.3-1.6 1.5.4 2.2-1.9-1-1.9 1 .4-2.2-1.6-1.5 2.2-.3z"
        fill="currentColor"
        fillOpacity="0.25"
      />
    </svg>
  );
}

// 2. Easy Returns: 3D Isometric Parcel Cradled by Supportive Palm
function EasyReturnsIcon({ className = "w-9 h-9" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Top Diamond Face of Parcel */}
      <path
        d="M24 7.5l9.5 5.5-9.5 5.5-9.5-5.5L24 7.5z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Left Vertical Face */}
      <path d="M14.5 13v10l9.5 5.5V18.5L14.5 13z" fill="currentColor" fillOpacity="0.05" />
      {/* Right Vertical Face */}
      <path d="M33.5 13v10L24 28.5V18.5l9.5-5.5z" fill="currentColor" fillOpacity="0.08" />
      {/* Parcel Tape Line */}
      <path d="M19.5 10.3l9 5.2" />
      {/* Cradling Hand / Protective Curve Under Parcel */}
      <path d="M10 29.5c3.5 6.5 16 8.5 24.5 3.5l4-3" />
      <path d="M10 29.5c.8 2.8 3.5 5 7.5 5.8" />
    </svg>
  );
}

// 3. Premium Quality: Laurel Wreath Enclosing a Radiant 5-Point Star
function PremiumQualityIcon({ className = "w-9 h-9" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Left Laurel Branch */}
      <path d="M22 41c-7.5-2-12-7.5-12-16.5 0-6 2-10.5 5-14.5" />
      <path d="M14 13.5c1.8 1.8 1 4.5-.8 5.5-1.8.8-3.5-.8-3.5-2.5 0-1.8 2.5-2.8 4.3-3z" fill="currentColor" fillOpacity="0.2" />
      <path d="M11 20.5c2.5 1 2.5 3.8.8 5.5-1.8 1-3.5 0-3.5-1.8 0-1.8 1.8-3.5 2.7-3.7z" fill="currentColor" fillOpacity="0.2" />
      <path d="M10 28.5c2.5 0 3.5 2.8 2.5 4.5-1.8 1.8-3.5 1-4.3-.8s0-3.5 1.8-3.7z" fill="currentColor" fillOpacity="0.2" />
      <path d="M13 35.5c1.8-.8 3.5.8 3.5 2.5-.8 1.8-2.5 1.8-3.5.8s-.8-2.5 0-3.3z" fill="currentColor" fillOpacity="0.2" />

      {/* Right Laurel Branch */}
      <path d="M26 41c7.5-2 12-7.5 12-16.5 0-6-2-10.5-5-14.5" />
      <path d="M34 13.5c-1.8 1.8-1 4.5.8 5.5 1.8.8 3.5-.8 3.5-2.5 0-1.8-2.5-2.8-4.3-3z" fill="currentColor" fillOpacity="0.2" />
      <path d="M37 20.5c-2.5 1-2.5 3.8-.8 5.5 1.8 1 3.5 0 3.5-1.8 0-1.8-1.8-3.5-2.7-3.7z" fill="currentColor" fillOpacity="0.2" />
      <path d="M38 28.5c-2.5 0-3.5 2.8-2.5 4.5 1.8 1.8 3.5 1 4.3-.8s0-3.5-1.8-3.7z" fill="currentColor" fillOpacity="0.2" />
      <path d="M35 35.5c-1.8-.8-3.5.8-3.5 2.5.8 1.8 2.5 1.8 3.5.8s.8-2.5 0-3.3z" fill="currentColor" fillOpacity="0.2" />

      {/* Center 5-Point Star */}
      <path
        d="M24 16.5l1.6 3.5 3.8.5-2.8 2.6.7 3.8-3.3-1.8-3.3 1.8.7-3.8-2.8-2.6 3.8-.5z"
        fill="currentColor"
        fillOpacity="0.25"
      />
    </svg>
  );
}

// 4. Worldwide Delivery: Globe with Orbital Route Ribbon
function WorldwideDeliveryIcon({ className = "w-9 h-9" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Globe Sphere */}
      <circle cx="24" cy="24" r="12" fill="currentColor" fillOpacity="0.08" />
      {/* Central Longitude Ellipse */}
      <ellipse cx="24" cy="24" rx="5.2" ry="12" />
      {/* Horizontal Latitude Parallels */}
      <path d="M12.5 20.5c3.2 2.2 7.2 3.2 11.5 3.2s8.3-1 11.5-3.2" />
      <path d="M13.5 28c3 1.5 6.8 2 10.5 2s7.5-.5 10.5-2" />
      {/* Diagonal Orbit Ribbon */}
      <path
        d="M8.5 32c-3-4-2-13 5-18s19-3 24 3 2 14-4 19-18 2-25-4"
        strokeDasharray="36 3"
      />
      {/* Plane / Transit Loop Arrow */}
      <path d="M37.5 15.5l2.5 2.5-3.5.8" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

// 5. 4.5 Google Rating: Official Google 'G' Insignia Badge
function GoogleRatingIcon({ className = "w-9 h-9" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Circular Emblem Ring */}
      <circle cx="24" cy="24" r="14.5" />
      {/* Stylized Google 'G' geometry */}
      <path
        d="M24 14.5c4.5 0 7.8 2 9.5 3.6l-3.8 3.6c-1.2-1.1-2.9-2.2-5.7-2.2-4.8 0-8.8 4-8.8 8.8s4 8.8 8.8 8.8c5.2 0 7.4-3.8 7.7-5.8H24v-4.8h12.5c.2 1 .3 2 .3 3.2 0 7.2-4.8 12.4-12.8 12.4-7.5 0-13.6-6.1-13.6-13.6s6.1-13.6 13.6-13.6z"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </svg>
  );
}

const TRUST_PILLARS = [
  {
    icon: SatisfactionIcon,
    title: "100% Satisfaction",
    tooltip: "Authentic Pure Handloom Silk Promise",
  },
  {
    icon: EasyReturnsIcon,
    title: "Easy Returns",
    tooltip: "Hassle-free 7-day exchange guarantee",
  },
  {
    icon: PremiumQualityIcon,
    title: "Premium Quality",
    tooltip: "Certified Silk Mark & Master Artisans",
  },
  {
    icon: WorldwideDeliveryIcon,
    title: "Worldwide Delivery",
    tooltip: "Insured express shipping across 50+ countries",
  },
  {
    icon: GoogleRatingIcon,
    title: "4.5 Google Rating",
    tooltip: "Over 7,600+ verified customer reviews",
  },
];

export default function FeaturesBar() {
  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <section
      aria-label="Chaman Vastra Bhandar Trust & Heritage Pillars"
      className="bg-[#FAF7F2] border-y border-[#EBE1D3] py-6 sm:py-8 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Symmetrical 5-Badge Luxury Gold Line-Art Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4 sm:gap-6 items-center justify-items-center">
          {TRUST_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            const isHovered = activeTooltip === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setActiveTooltip(index)}
                onMouseLeave={() => setActiveTooltip(null)}
                className={`group relative flex flex-col items-center justify-center text-center px-1.5 sm:px-2 py-1.5 cursor-default transition-all duration-300 w-full max-w-[210px] min-w-0 ${
                  index === 4 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                {/* Fine-line Metallic Gold Insignia Icon */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-[#B8860B] group-hover:text-[#92400E] transition-all duration-300 group-hover:scale-110 drop-shadow-[0_2px_4px_rgba(184,134,11,0.18)]">
                  <Icon className="w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300" />
                </div>

                {/* Elegant Gold-Bronze Typography */}
                <h3 className="mt-2.5 sm:mt-3 font-sans text-[13px] sm:text-[15px] md:text-[16px] font-semibold tracking-wide text-[#92400E] group-hover:text-[#78350F] transition-colors leading-snug text-center break-words sm:whitespace-nowrap">
                  {pillar.title}
                </h3>

                {/* Subtle Interactive Floating Tooltip */}
                {isHovered && (
                  <div className="hidden sm:block absolute -bottom-7 z-30 bg-[#19181B] text-[#FEF3C7] text-[10px] font-medium px-2.5 py-1 rounded-md shadow-lg border border-[#C59B27]/40 pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-200">
                    {pillar.tooltip}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
