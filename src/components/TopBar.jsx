"use client";

import { useState, useEffect } from "react";

const ANNOUNCEMENTS = [
  "Best Indian Ethnic Wear at Lowest Prices | Up to 80% Off Sitewide",
  "100% Certified Pure Silk Assurance • Pipariya's Trusted Bridal Destination Since 1985",
  "All India Free Express Delivery on orders above ₹2,999",
  "Book Live Video Call Saree Inspection: +91 82692 60928",
];

export default function TopBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#111111] text-[#E5B834] text-[12px] sm:text-[14px] font-medium py-2 sm:py-2.5 px-3 sm:px-4 border-b border-black w-full max-w-full overflow-hidden select-none">
      <div className="w-full flex items-center justify-center font-medium tracking-wide text-center">
        <span className="transition-opacity duration-500 ease-in-out text-center break-words max-w-full leading-snug">
          {ANNOUNCEMENTS[index]}
        </span>
      </div>
    </div>
  );
}
