"use client";

import { Smartphone, Download, QrCode } from "lucide-react";

export default function AppDownloadBanner() {
  return (
    <section className="py-14 bg-[#141216] text-white relative overflow-hidden border-t border-[#2B2833]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-[#232029] via-[#1D1B21] to-[#141216] border border-[#3E3A46] p-5 sm:p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-2xl">
          
          {/* Left Text */}
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-[12px] uppercase tracking-[0.24em] font-bold text-[#C59B27] block mb-2 font-sans">
              Experience Authentic Indian Fashion Anywhere
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight mb-3">
              Everything Indian At One Place
            </h2>
            <p className="text-[13.5px] sm:text-[14.5px] text-[#C4BCB0] font-normal leading-relaxed mb-6">
              Discover the finest collection of handcrafted ethnic wear, from pure silk sarees and bespoke bridal lehengas to stylish kurta sets, delivered nationwide and globally with love.
            </p>

            {/* App Store / Google Play Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-black border border-[#3E3A46] hover:border-[#C59B27] transition-colors flex items-center gap-3 text-left shadow-md group"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.64-.78 1.08-1.86.96-2.95-1 .04-2.19.67-2.88 1.48-.61.71-1.14 1.83-1 2.9.1.01.21.02.32.02 1.01 0 2.06-.61 2.6-1.45z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-[#8C8377] uppercase block leading-none">Download on</span>
                  <span className="text-[13px] font-semibold text-white block mt-0.5">App Store</span>
                </div>
              </a>

              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-black border border-[#3E3A46] hover:border-[#C59B27] transition-colors flex items-center gap-3 text-left shadow-md group"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.352-.363-.564-.863-.564-1.425V3.239c0-.562.212-1.062.563-1.425zm11.235 11.238l2.378 2.378-12.01 6.897 9.632-9.275zm0-2.104L5.212 1.673l12.01 6.897-2.378 2.378zm1.096 1.052l3.411 1.958c.84.482.84 1.272 0 1.754l-3.411 1.958-2.023-2.023 2.023-2.047z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-[#8C8377] uppercase block leading-none">Download on</span>
                  <span className="text-[13px] font-semibold text-white block mt-0.5">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Phone Mockup Illustration */}
          <div className="w-full sm:w-auto flex items-center gap-3.5 sm:gap-4 bg-[#2A2730] p-3.5 sm:p-4 rounded-2xl border border-[#3E3A46]">
            <QrCode className="w-20 h-20 text-[#E6C665]" />
            <div className="text-xs">
              <span className="font-bold text-white block mb-0.5">Scan to Download</span>
              <p className="text-[11px] text-[#A8A092] leading-tight">
                Get early festive drops, private bridal previews & 10% instant discount.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
