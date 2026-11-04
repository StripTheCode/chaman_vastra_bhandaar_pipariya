"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TrendiaTrustPillars from "./TrendiaTrustPillars";

export default function TrendiaCollectionHeader({ category, productCount }) {
  const getHeaderTitle = (cat) => {
    if (!cat) return "All Collections";
    const slug = (cat.slug || cat.id || "").toLowerCase();
    if (slug === "kurta-sets") return "Kurta Sets";
    if (slug === "kurtas-kurtis") return "Kurtas & Kurtis";
    if (slug === "pakistani-suits") return "Pakistani Suits";
    if (slug === "anarkali-sets" || slug === "kurtas" || slug === "anarkali") return "Anarkali Kurta Sets";
    if (slug === "tunics-tops") return "Tunics & Tops";
    if (slug === "gowns" || slug === "dresses") return "Festive Gowns & Co-ords";
    if (slug === "lehengas") return "Bridal & Wedding Lehengas";
    if (slug === "sarees" || slug === "chanderi") return "Banarasi & Silk Sarees";
    if (slug === "all") return "All Collections";
    return cat.name || cat.title || "Ethnic Wear Collection";
  };

  const title = getHeaderTitle(category);

  return (
    <div className="w-full bg-white">
      {/* 1. Centered Title (Exact Trendia Style) */}
      <div className="pt-6 pb-3 text-center">
        <h1 className="font-sans text-[28px] sm:text-[34px] font-bold text-[#111111] tracking-tight">
          {title}
        </h1>
      </div>

      {/* 2. Soft Pastel Blue Trust Strip (Exact Trendia Style - Full Width) */}
      <TrendiaTrustPillars />
    </div>
  );
}
