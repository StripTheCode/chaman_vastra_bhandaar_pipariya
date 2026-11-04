"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, RotateCcw, Check } from "lucide-react";

export const FILTER_OPTIONS = {
  types: [
    { label: "Kurta Sets", count: 6634, value: "kurta" },
    { label: "Kurtas & Kurtis", count: 1840, value: "kurti" },
    { label: "Pakistani Suits", count: 680, value: "pakistani" },
    { label: "Anarkali Sets", count: 928, value: "anarkali" },
    { label: "Tunics & Tops", count: 340, value: "tunic" },
    { label: "Gowns", count: 512, value: "gown" },
    { label: "Lehengas", count: 1150, value: "lehenga" },
    { label: "Sarees", count: 3420, value: "saree" },
  ],
  priceRanges: [
    { label: "$0 - $25", sublabel: "Under ₹2,999", min: 0, max: 2999, count: 386 },
    { label: "$25 - $50", sublabel: "₹2,999 - ₹4,999", min: 3000, max: 4999, count: 4271 },
    { label: "$51 - $75", sublabel: "₹4,999 - ₹7,999", min: 5000, max: 7999, count: 1404 },
    { label: "$76 - $100", sublabel: "₹7,999 - ₹12,999", min: 8000, max: 12999, count: 245 },
    { label: "$101 - $150", sublabel: "₹12,999 - ₹19,999", min: 13000, max: 19999, count: 144 },
    { label: "$151 - $200", sublabel: "₹20,000 - ₹30,000", min: 20000, max: 29999, count: 20 },
    { label: "$201 & Above", sublabel: "Above ₹30,000", min: 30000, max: 100000, count: 29 },
  ],
  sizes: [
    { label: "UN STITCHED", count: 1 },
    { label: "XS", count: 136 },
    { label: "S", count: 4193 },
    { label: "M", count: 787 },
    { label: "L", count: 650 },
    { label: "XL", count: 410 },
    { label: "XXL", count: 230 },
  ],
  fabrics: [
    { label: "Vichitra Silk", count: 32 },
    { label: "Pure Katan Silk", count: 24 },
    { label: "Chanderi Handloom", count: 18 },
    { label: "Georgette", count: 45 },
    { label: "Organza & Tissue", count: 15 },
    { label: "Raw Silk & Velvet", count: 12 },
  ],
  colors: [
    { id: "purple", label: "Purple", count: 28 },
    { id: "grey", label: "Grey", count: 16 },
    { id: "orange", label: "Orange", count: 14 },
    { id: "white", label: "White / Off White", count: 36 },
    { id: "red", label: "Red / Maroon", count: 55 },
    { id: "green", label: "Emerald & Sage", count: 22 },
    { id: "gold", label: "Champagne Gold", count: 40 },
    { id: "yellow", label: "Mustard Haldi", count: 19 },
  ],
  occasions: [
    { label: "Wedding & Bridal", count: 68 },
    { label: "Festive & Puja", count: 112 },
    { label: "Sangeet & Reception", count: 45 },
    { label: "Party Wear", count: 80 },
  ],
};

export default function CollectionSidebarFilter({
  selectedFilters,
  onFilterChange,
  onClearFilters,
  activeFilterCount,
}) {
  const [openSections, setOpenSections] = useState({
    type: true,
    price: true,
    size: true,
    fabric: true,
    color: true,
    occasion: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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

  return (
    <aside className="w-full bg-white pr-4">
      {/* Reset Filter Header if active */}
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAEAEA]">
          <span className="text-xs font-semibold uppercase text-[#111111]">
            Active Filters ({activeFilterCount})
          </span>
          <button
            onClick={onClearFilters}
            className="text-xs font-semibold text-[#A34850] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        </div>
      )}

      {/* 1. TYPE FILTER (Exact Trendia) */}
      <div className="border-b border-[#EBEBEB] pb-3 mb-3">
        <button
          onClick={() => toggleSection("type")}
          className="w-full flex items-center justify-between text-[15px] font-semibold text-[#111111] py-1 cursor-pointer select-none"
        >
          <span>Type</span>
          {openSections.type ? (
            <ChevronUp className="w-4 h-4 text-[#777]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#777]" />
          )}
        </button>

        {openSections.type && (
          <div className="mt-2.5 space-y-2">
            {FILTER_OPTIONS.types.map((t) => {
              const isSelected = (selectedFilters.works || []).includes(t.value);
              return (
                <label
                  key={t.value}
                  onClick={() => handleArrayToggle("works", t.value)}
                  className="flex items-center gap-2.5 text-[13.5px] sm:text-[14px] text-[#222222] hover:text-[#000] cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors shrink-0 ${
                      isSelected
                        ? "bg-[#111111] border-[#111111] text-white"
                        : "border-[#CCCCCC] bg-white hover:border-[#888]"
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>{t.label}</span>
                  <span className="text-[#777777] text-[12.5px]">({t.count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. PRICE FILTER (Exact Trendia Ranges) */}
      <div className="border-b border-[#EBEBEB] pb-3 mb-3">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between text-[15px] font-semibold text-[#111111] py-1 cursor-pointer select-none"
        >
          <span>Price</span>
          {openSections.price ? (
            <ChevronUp className="w-4 h-4 text-[#777]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#777]" />
          )}
        </button>

        {openSections.price && (
          <div className="mt-2.5 space-y-2">
            {FILTER_OPTIONS.priceRanges.map((range, idx) => {
              const isSelected = selectedFilters.price?.label === range.label;
              return (
                <label
                  key={idx}
                  onClick={() => handlePriceToggle(range)}
                  className="flex items-center gap-2.5 text-[13.5px] sm:text-[14px] text-[#222222] hover:text-[#000] cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors shrink-0 ${
                      isSelected
                        ? "bg-[#111111] border-[#111111] text-white"
                        : "border-[#CCCCCC] bg-white hover:border-[#888]"
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>{range.label}</span>
                  <span className="text-[#777777] text-[12.5px]">({range.count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. SIZE FILTER (Exact Trendia Sizing) */}
      <div className="border-b border-[#EBEBEB] pb-3 mb-3">
        <button
          onClick={() => toggleSection("size")}
          className="w-full flex items-center justify-between text-[15px] font-semibold text-[#111111] py-1 cursor-pointer select-none"
        >
          <span>Size</span>
          {openSections.size ? (
            <ChevronUp className="w-4 h-4 text-[#777]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#777]" />
          )}
        </button>

        {openSections.size && (
          <div className="mt-2.5 space-y-2 max-h-48 overflow-y-auto pr-1">
            {FILTER_OPTIONS.sizes.map((sz) => {
              const isSelected = (selectedFilters.sizes || []).includes(sz.label);
              return (
                <label
                  key={sz.label}
                  onClick={() => handleArrayToggle("sizes", sz.label)}
                  className="flex items-center gap-2.5 text-[13.5px] sm:text-[14px] text-[#222222] hover:text-[#000] cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors shrink-0 ${
                      isSelected
                        ? "bg-[#111111] border-[#111111] text-white"
                        : "border-[#CCCCCC] bg-white hover:border-[#888]"
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>{sz.label}</span>
                  <span className="text-[#777777] text-[12.5px]">({sz.count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. FABRIC FILTER */}
      <div className="border-b border-[#EBEBEB] pb-3 mb-3">
        <button
          onClick={() => toggleSection("fabric")}
          className="w-full flex items-center justify-between text-[15px] font-semibold text-[#111111] py-1 cursor-pointer select-none"
        >
          <span>Fabric</span>
          {openSections.fabric ? (
            <ChevronUp className="w-4 h-4 text-[#777]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#777]" />
          )}
        </button>

        {openSections.fabric && (
          <div className="mt-2.5 space-y-2">
            {FILTER_OPTIONS.fabrics.map((fab) => {
              const isSelected = (selectedFilters.fabrics || []).includes(fab.label);
              return (
                <label
                  key={fab.label}
                  onClick={() => handleArrayToggle("fabrics", fab.label)}
                  className="flex items-center gap-2.5 text-[13.5px] sm:text-[14px] text-[#222222] hover:text-[#000] cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors shrink-0 ${
                      isSelected
                        ? "bg-[#111111] border-[#111111] text-white"
                        : "border-[#CCCCCC] bg-white hover:border-[#888]"
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>{fab.label}</span>
                  <span className="text-[#777777] text-[12.5px]">({fab.count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. COLOR FILTER */}
      <div className="border-b border-[#EBEBEB] pb-3 mb-3">
        <button
          onClick={() => toggleSection("color")}
          className="w-full flex items-center justify-between text-[15px] font-semibold text-[#111111] py-1 cursor-pointer select-none"
        >
          <span>Color</span>
          {openSections.color ? (
            <ChevronUp className="w-4 h-4 text-[#777]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#777]" />
          )}
        </button>

        {openSections.color && (
          <div className="mt-2.5 space-y-2">
            {FILTER_OPTIONS.colors.map((col) => {
              const isSelected = (selectedFilters.colors || []).includes(col.id);
              return (
                <label
                  key={col.id}
                  onClick={() => handleArrayToggle("colors", col.id)}
                  className="flex items-center gap-2.5 text-[13.5px] sm:text-[14px] text-[#222222] hover:text-[#000] cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors shrink-0 ${
                      isSelected
                        ? "bg-[#111111] border-[#111111] text-white"
                        : "border-[#CCCCCC] bg-white hover:border-[#888]"
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>{col.label}</span>
                  <span className="text-[#777777] text-[12.5px]">({col.count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. OCCASION FILTER */}
      <div className="pb-3 mb-3">
        <button
          onClick={() => toggleSection("occasion")}
          className="w-full flex items-center justify-between text-[15px] font-semibold text-[#111111] py-1 cursor-pointer select-none"
        >
          <span>Occasion</span>
          {openSections.occasion ? (
            <ChevronUp className="w-4 h-4 text-[#777]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#777]" />
          )}
        </button>

        {openSections.occasion && (
          <div className="mt-2.5 space-y-2">
            {FILTER_OPTIONS.occasions.map((occ) => {
              const isSelected = (selectedFilters.occasions || []).includes(occ.label);
              return (
                <label
                  key={occ.label}
                  onClick={() => handleArrayToggle("occasions", occ.label)}
                  className="flex items-center gap-2 text-[12.5px] text-[#333333] hover:text-[#000] cursor-pointer select-none"
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-[2px] border flex items-center justify-center transition-colors shrink-0 ${
                      isSelected
                        ? "bg-[#111111] border-[#111111] text-white"
                        : "border-[#CCCCCC] bg-white hover:border-[#888]"
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>{occ.label}</span>
                  <span className="text-[#888888] text-[11.5px]">({occ.count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
