"use client";

import { X, ChevronDown } from "lucide-react";

export default function CollectionToolbar({
  productCount,
  sortBy,
  onSortChange,
  selectedFilters,
  onRemoveFilter,
  onClearFilters,
  activeFilterCount,
}) {
  const SORT_OPTIONS = [
    { id: "featured", label: "Featured" },
    { id: "newest", label: "New Arrivals" },
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "discount-desc", label: "Discount: High to Low" },
    { id: "rating-desc", label: "Top Customer Rated" },
  ];

  return (
    <div className="w-full mb-3">
      {/* Exact Trendia Top-Right Sort Dropdown Row */}
      <div className="flex items-center justify-between gap-4 pb-2">
        {/* Mobile Filter count */}
        <div className="text-[13.5px] text-[#666666] hidden sm:block">
          Showing <span className="font-semibold text-[#111111]">{productCount}</span> designs
        </div>

        {/* Right Sort Dropdown (Exact Trendia rounded border) */}
        <div className="relative ml-auto">
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="py-2 pl-4 pr-9 bg-white border border-[#DDD] rounded-md text-[13.5px] sm:text-[14px] font-normal text-[#333333] focus:outline-none focus:border-[#888] cursor-pointer appearance-none shadow-2xs"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom Chevron Arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#777]">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Active Filter Tags Row (if any) */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1.5 pb-2">
          {selectedFilters.price && (
            <span className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full text-[11px] bg-[#FAF5EE] text-[#A34850] border border-[#EBDCCF]">
              <span>Price: {selectedFilters.price.label}</span>
              <button
                onClick={() => onRemoveFilter("price", selectedFilters.price)}
                className="hover:text-black cursor-pointer p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(selectedFilters.fabrics || []).map((fab) => (
            <span
              key={fab}
              className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full text-[11px] bg-[#FAF5EE] text-[#A34850] border border-[#EBDCCF]"
            >
              <span>{fab}</span>
              <button
                onClick={() => onRemoveFilter("fabrics", fab)}
                className="hover:text-black cursor-pointer p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {(selectedFilters.colors || []).map((col) => (
            <span
              key={col}
              className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full text-[11px] bg-[#FAF5EE] text-[#A34850] border border-[#EBDCCF]"
            >
              <span className="capitalize">{col}</span>
              <button
                onClick={() => onRemoveFilter("colors", col)}
                className="hover:text-black cursor-pointer p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {(selectedFilters.works || []).map((w) => (
            <span
              key={w}
              className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full text-[11px] bg-[#FAF5EE] text-[#A34850] border border-[#EBDCCF]"
            >
              <span>{w}</span>
              <button
                onClick={() => onRemoveFilter("works", w)}
                className="hover:text-black cursor-pointer p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            onClick={onClearFilters}
            className="text-[11px] font-semibold text-[#888888] hover:text-[#111111] underline ml-1 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
