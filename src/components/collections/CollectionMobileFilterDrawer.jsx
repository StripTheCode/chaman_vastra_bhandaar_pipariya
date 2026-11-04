"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { FILTER_OPTIONS } from "./CollectionSidebarFilter";

export default function CollectionMobileFilterDrawer({
  selectedFilters,
  onFilterChange,
  onClearFilters,
  activeFilterCount,
  sortBy,
  onSortChange,
  totalMatchingCount,
}) {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    price: true,
    fabric: true,
    color: true,
    work: false,
    occasion: false,
    discount: false,
  });

  const toggleSection = (s) => {
    setOpenSections((prev) => ({ ...prev, [s]: !prev[s] }));
  };

  const SORT_OPTIONS = [
    { id: "featured", label: "Featured" },
    { id: "newest", label: "New Arrivals" },
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "discount-desc", label: "Discount: High to Low" },
    { id: "rating-desc", label: "Customer Rating: High to Low" },
  ];

  const handlePriceToggle = (range) => {
    const isSelected = selectedFilters.price?.label === range.label;
    onFilterChange("price", isSelected ? null : range);
  };

  const handleArrayToggle = (key, item) => {
    const current = selectedFilters[key] || [];
    const updated = current.includes(item)
      ? current.filter((x) => x !== item)
      : [...current, item];
    onFilterChange(key, updated);
  };

  const handleDiscountToggle = (disc) => {
    const isSelected = selectedFilters.discount?.label === disc.label;
    onFilterChange("discount", isSelected ? null : disc);
  };

  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.id === sortBy)?.label || "Featured";

  return (
    <>
      {/* 1. TRENDIA EXACT STICKY BOTTOM FILTER & SORT BAR (MOBILE ONLY) */}
      <div className="fixed bottom-[56px] left-0 right-0 z-40 bg-white border-t border-[#DDD] shadow-[0_-2px_14px_rgba(0,0,0,0.08)] md:hidden">
        <div className="flex items-stretch h-11">
          {/* Left: Filter Trigger with Trendia 3-Sliders SVG */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#222222] active:bg-[#FAF5EE] transition-colors cursor-pointer"
          >
            {/* Trendia Sliders Filter SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 -960 960 960"
              width="18px"
              fill="#222222"
            >
              <path d="M200-160v-280h-80v-80h240v80h-80v280h-80Zm0-440v-200h80v200h-80Zm160 0v-80h80v-120h80v120h80v80H360Zm80 440v-360h80v360h-80Zm240 0v-120h-80v-80h240v80h-80v120h-80Zm0-280v-360h80v360h-80Z" />
            </svg>
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#222222] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Center Vertical Divider */}
          <div className="w-px bg-[#DDD] my-1.5" />

          {/* Right: Sort Trigger with Arrow Icon */}
          <button
            onClick={() => setIsSortDrawerOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#222222] active:bg-[#FAF5EE] transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4 text-[#222222]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18M6 12h12m-9 6h6" />
            </svg>
            <span className="truncate max-w-[120px]">Sort: {currentSortLabel}</span>
          </button>
        </div>
      </div>

      {/* 2. TRENDIA EXACT MOBILE SORT DRAWER (SLIDE-UP FROM BOTTOM) */}
      <AnimatePresence>
        {isSortDrawerOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSortDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="relative z-10 w-full bg-white rounded-t-2xl shadow-2xl flex flex-col overflow-hidden max-h-[75vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#EBEBEB]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#222222]">
                  Sort By
                </h3>
                <button
                  onClick={() => setIsSortDrawerOpen(false)}
                  className="p-1 rounded-full text-[#696969] hover:text-black cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sort Options List (Trendia radio style) */}
              <div className="p-2 divide-y divide-[#F2F2F2]">
                {SORT_OPTIONS.map((opt) => {
                  const isActive = sortBy === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        onSortChange(opt.id);
                        setIsSortDrawerOpen(false);
                      }}
                      className="w-full py-3.5 px-4 flex items-center justify-between text-left cursor-pointer transition-colors active:bg-[#FAF5EE]"
                    >
                      <span
                        className={`text-sm ${
                          isActive
                            ? "font-bold text-[#222222]"
                            : "font-normal text-[#555]"
                        }`}
                      >
                        {opt.label}
                      </span>

                      {/* Trendia Indicator Dot */}
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isActive
                            ? "border-[#222222]"
                            : "border-[#DDD]"
                        }`}
                      >
                        {isActive && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#222222]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. TRENDIA FULL SLIDE-UP FILTER SHEET */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="relative z-10 w-full max-h-[85vh] bg-white rounded-t-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#EBEBEB] bg-[#FAF7F2]">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#222222]">
                    Filters
                  </h3>
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#222222] text-white text-[10px] font-bold flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={onClearFilters}
                      className="text-xs font-semibold text-[#A34850] hover:text-[#7A2E35] flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear All</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="p-1 rounded-full text-[#696969] hover:text-black cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Accordions */}
              <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#F2F2F2]">
                {/* 1. PRICE */}
                <div className="py-3.5">
                  <button
                    onClick={() => toggleSection("price")}
                    className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#222222] py-1 cursor-pointer"
                  >
                    <span>Price</span>
                    {openSections.price ? (
                      <ChevronUp className="w-4 h-4 text-[#878787]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#878787]" />
                    )}
                  </button>
                  {openSections.price && (
                    <div className="mt-3 space-y-2">
                      {FILTER_OPTIONS.priceRanges.map((range, idx) => {
                        const isSelected =
                          selectedFilters.price?.label === range.label;
                        return (
                          <label
                            key={idx}
                            onClick={() => handlePriceToggle(range)}
                            className="flex items-center gap-2.5 text-xs text-[#555] cursor-pointer"
                          >
                            <div
                              className={`w-4 h-4 rounded-[3px] border flex items-center justify-center ${
                                isSelected
                                  ? "bg-[#222222] border-[#222222] text-white"
                                  : "border-[#DDD] bg-white"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span>{range.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 2. FABRIC */}
                <div className="py-3.5">
                  <button
                    onClick={() => toggleSection("fabric")}
                    className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#222222] py-1 cursor-pointer"
                  >
                    <span>Fabric</span>
                    {openSections.fabric ? (
                      <ChevronUp className="w-4 h-4 text-[#878787]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#878787]" />
                    )}
                  </button>
                  {openSections.fabric && (
                    <div className="mt-3 space-y-2">
                      {FILTER_OPTIONS.fabrics.map((fab) => {
                        const isSelected = (
                          selectedFilters.fabrics || []
                        ).includes(fab);
                        return (
                          <label
                            key={fab}
                            onClick={() => handleArrayToggle("fabrics", fab)}
                            className="flex items-center gap-2.5 text-xs text-[#555] cursor-pointer"
                          >
                            <div
                              className={`w-4 h-4 rounded-[3px] border flex items-center justify-center ${
                                isSelected
                                  ? "bg-[#222222] border-[#222222] text-white"
                                  : "border-[#DDD] bg-white"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span>{fab}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 3. COLOR */}
                <div className="py-3.5">
                  <button
                    onClick={() => toggleSection("color")}
                    className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#222222] py-1 cursor-pointer"
                  >
                    <span>Color</span>
                    {openSections.color ? (
                      <ChevronUp className="w-4 h-4 text-[#878787]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#878787]" />
                    )}
                  </button>
                  {openSections.color && (
                    <div className="mt-3 grid grid-cols-5 gap-3">
                      {FILTER_OPTIONS.colors.map((col) => {
                        const isSelected = (
                          selectedFilters.colors || []
                        ).includes(col.id);
                        return (
                          <button
                            key={col.id}
                            onClick={() => handleArrayToggle("colors", col.id)}
                            className="flex flex-col items-center gap-1 cursor-pointer"
                          >
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                                col.border ? "border border-[#DDD]" : ""
                              } ${
                                isSelected
                                  ? "ring-2 ring-[#222222] ring-offset-2 scale-105"
                                  : "border border-black/10"
                              }`}
                              style={{ backgroundColor: col.hex }}
                            >
                              {isSelected && (
                                <Check
                                  className={`w-3.5 h-3.5 ${
                                    col.id === "ivory" || col.id === "yellow"
                                      ? "text-black"
                                      : "text-white"
                                  }`}
                                />
                              )}
                            </div>
                            <span className="text-[10px] text-[#696969] capitalize">
                              {col.id}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 4. WORK */}
                <div className="py-3.5">
                  <button
                    onClick={() => toggleSection("work")}
                    className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#222222] py-1 cursor-pointer"
                  >
                    <span>Craft & Work</span>
                    {openSections.work ? (
                      <ChevronUp className="w-4 h-4 text-[#878787]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#878787]" />
                    )}
                  </button>
                  {openSections.work && (
                    <div className="mt-3 space-y-2">
                      {FILTER_OPTIONS.works.map((w) => {
                        const isSelected = (
                          selectedFilters.works || []
                        ).includes(w);
                        return (
                          <label
                            key={w}
                            onClick={() => handleArrayToggle("works", w)}
                            className="flex items-center gap-2.5 text-xs text-[#555] cursor-pointer"
                          >
                            <div
                              className={`w-4 h-4 rounded-[3px] border flex items-center justify-center ${
                                isSelected
                                  ? "bg-[#222222] border-[#222222] text-white"
                                  : "border-[#DDD] bg-white"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span>{w}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 5. OCCASION */}
                <div className="py-3.5">
                  <button
                    onClick={() => toggleSection("occasion")}
                    className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#222222] py-1 cursor-pointer"
                  >
                    <span>Occasion</span>
                    {openSections.occasion ? (
                      <ChevronUp className="w-4 h-4 text-[#878787]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#878787]" />
                    )}
                  </button>
                  {openSections.occasion && (
                    <div className="mt-3 space-y-2">
                      {FILTER_OPTIONS.occasions.map((occ) => {
                        const isSelected = (
                          selectedFilters.occasions || []
                        ).includes(occ);
                        return (
                          <label
                            key={occ}
                            onClick={() => handleArrayToggle("occasions", occ)}
                            className="flex items-center gap-2.5 text-xs text-[#555] cursor-pointer"
                          >
                            <div
                              className={`w-4 h-4 rounded-[3px] border flex items-center justify-center ${
                                isSelected
                                  ? "bg-[#222222] border-[#222222] text-white"
                                  : "border-[#DDD] bg-white"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span>{occ}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 6. DISCOUNT */}
                <div className="py-3.5">
                  <button
                    onClick={() => toggleSection("discount")}
                    className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#222222] py-1 cursor-pointer"
                  >
                    <span>Discount</span>
                    {openSections.discount ? (
                      <ChevronUp className="w-4 h-4 text-[#878787]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#878787]" />
                    )}
                  </button>
                  {openSections.discount && (
                    <div className="mt-3 space-y-2">
                      {FILTER_OPTIONS.discounts.map((disc, idx) => {
                        const isSelected =
                          selectedFilters.discount?.label === disc.label;
                        return (
                          <label
                            key={idx}
                            onClick={() => handleDiscountToggle(disc)}
                            className="flex items-center gap-2.5 text-xs text-[#555] cursor-pointer"
                          >
                            <div
                              className={`w-4 h-4 rounded-[3px] border flex items-center justify-center ${
                                isSelected
                                  ? "bg-[#222222] border-[#222222] text-white"
                                  : "border-[#DDD] bg-white"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span>{disc.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Sticky Bottom Apply Button (Trendia style pill) */}
              <div className="p-4 border-t border-[#EBEBEB] bg-white">
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-full py-3 rounded-full bg-[#222222] hover:bg-[#000] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                >
                  Apply Filters ({totalMatchingCount} Products)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
