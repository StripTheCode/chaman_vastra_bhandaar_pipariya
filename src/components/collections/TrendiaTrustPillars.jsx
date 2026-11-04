"use client";

/**
 * Trendia-Style 3-Pillar Trust Banner
 * Exactly replicates the cyan-blue trust strip from Trendia:
 * 1. Express Shipping (Truck with motion arrow + 3 sparkles)
 * 2. Easy Returns & Exchange (Center carton box + 2 circular cycle arrows)
 * 3. 100% Satisfaction (Security shield + thumbs up hand gesture)
 */

export function ExpressShippingIcon({ className = "w-7 h-7 sm:w-8 sm:h-8" }) {
  return (
    <svg
      width="34"
      height="32"
      viewBox="0 0 36 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* 3 Speed Sparkles above the truck */}
      <path d="M7 6v2.5M5.75 7.25h2.5" strokeWidth="1.5" />
      <path d="M15 2v4.5M12.75 4.25h4.5" strokeWidth="1.6" />
      <path d="M28 5v2.5M26.75 6.25h2.5" strokeWidth="1.5" />

      {/* Delivery Truck Cargo Trailer */}
      <rect x="3.5" y="10.5" width="16" height="12" rx="0.75" />
      {/* Express Motion Arrow inside Cargo Trailer */}
      <path d="M7.5 16.5h7.5m-3-3l3 3-3 3" strokeWidth="1.8" />

      {/* Truck Driver Cab */}
      <path d="M19.5 13.5h5l4 4.5v4.5h-9" />
      {/* Cab Windshield Window */}
      <path d="M20.5 15h3.2l2.5 3h-5.7z" strokeWidth="1.4" />

      {/* Wheels and Under-Chassis */}
      <circle cx="8.5" cy="24" r="2.5" fill="#E8F6FB" strokeWidth="1.8" />
      <circle cx="24.5" cy="24" r="2.5" fill="#E8F6FB" strokeWidth="1.8" />
      <path d="M3.5 22.5h2.5m5 0h10.5m5 0h1.5" strokeWidth="1.8" />
    </svg>
  );
}

export function EasyReturnsIcon({ className = "w-7 h-7 sm:w-8 sm:h-8" }) {
  return (
    <svg
      width="34"
      height="32"
      viewBox="0 0 34 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Top clockwise loop return/exchange arrow */}
      <path d="M8 12.5C9.8 7.8 14 5 18.5 5c4.5 0 8.5 2.5 10.5 6.5" />
      <path d="M29 7.5v4.5h-4.5" strokeWidth="1.8" />

      {/* Bottom counter-clockwise loop return/exchange arrow */}
      <path d="M26 19.5c-1.8 4.7-6 7.5-10.5 7.5-4.5 0-8.5-2.5-10.5-6.5" />
      <path d="M5 24.5v-4.5h4.5" strokeWidth="1.8" />

      {/* Central Cardboard Parcel Box */}
      <rect x="11.5" y="10.5" width="11" height="11" rx="1.5" strokeWidth="1.8" />
      {/* Box Packaging Tape / Flap lines */}
      <path d="M11.5 14h11" strokeWidth="1.4" />
      <path d="M17 10.5v3.5" strokeWidth="1.4" />
    </svg>
  );
}

export function SatisfactionIcon({ className = "w-7 h-7 sm:w-8 sm:h-8" }) {
  return (
    <svg
      width="34"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Security Shield Contour */}
      <path
        d="M16 3.5c4.2-1.5 8.5.5 8.5.5v9.5c0 6.5-4.2 11.2-8.5 13.5-4.3-2.3-8.5-7-8.5-13.5V4s4.3-2 8.5-.5z"
        strokeWidth="1.8"
      />

      {/* Thumbs Up Hand Gesture Inside Shield */}
      {/* Wrist / Sleeve Cuff */}
      <path d="M11.5 15.5v4.5" strokeWidth="1.8" />
      {/* Curled Fingers & Thumb pointing up */}
      <path
        d="M13.5 16.5v3.5h5.5c.8 0 1.2-.4 1.2-1 0-.3-.1-.5-.3-.7.5-.2.7-.5.7-.9 0-.3-.1-.6-.4-.8.4-.2.6-.5.6-.9 0-.7-.5-1.2-1.3-1.2h-2.5v-1.5c0-.9-.3-2.2-.9-2.2-.6 0-.8.6-.8 1.4 0 1.2-.6 2.3-1.8 2.3z"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export default function TrendiaTrustPillars() {
  return (
    <div className="w-full bg-[#E8F6FB] border-y border-[#D6EDF6] py-2.5 sm:py-3.5 px-2 sm:px-4">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-around sm:justify-center gap-2 xs:gap-5 sm:gap-12 md:gap-20 lg:gap-28">
        {/* Pillar 1: Express Shipping */}
        <div className="flex flex-col items-center text-center group cursor-default">
          <div className="text-[#17B4C8] mb-1 sm:mb-1.5 flex items-center justify-center">
            <ExpressShippingIcon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
          </div>
          <span className="text-[11px] xs:text-[12px] sm:text-[13px] md:text-[13.5px] font-medium text-[#222222] whitespace-nowrap">
            Express Shipping
          </span>
        </div>

        {/* Pillar 2: Easy Returns & Exchange */}
        <div className="flex flex-col items-center text-center group cursor-default">
          <div className="text-[#17B4C8] mb-1 sm:mb-1.5 flex items-center justify-center">
            <EasyReturnsIcon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
          </div>
          <span className="text-[11px] xs:text-[12px] sm:text-[13px] md:text-[13.5px] font-medium text-[#222222] whitespace-nowrap">
            Easy Returns & Exchange
          </span>
        </div>

        {/* Pillar 3: 100% Satisfaction */}
        <div className="flex flex-col items-center text-center group cursor-default">
          <div className="text-[#17B4C8] mb-1 sm:mb-1.5 flex items-center justify-center">
            <SatisfactionIcon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
          </div>
          <span className="text-[11px] xs:text-[12px] sm:text-[13px] md:text-[13.5px] font-medium text-[#222222] whitespace-nowrap">
            100% Satisfaction
          </span>
        </div>
      </div>
    </div>
  );
}

