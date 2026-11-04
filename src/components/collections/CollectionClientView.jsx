"use client";

import { useState, useMemo } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import TrendiaCollectionHeader from "./TrendiaCollectionHeader";
import AllCollectionsHub from "./AllCollectionsHub";
import CollectionSidebarFilter from "./CollectionSidebarFilter";
import CollectionToolbar from "./CollectionToolbar";
import CollectionProductGrid from "./CollectionProductGrid";
import CollectionMobileFilterDrawer from "./CollectionMobileFilterDrawer";
import FloatingCurrencyPill from "@/components/FloatingCurrencyPill";
import FloatingWhatsAppBubble from "@/components/FloatingWhatsAppBubble";
import WelcomeDiscountModal from "@/components/WelcomeDiscountModal";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { useShop } from "@/context/ShopContext";

export default function CollectionClientView({ initialCategorySlug = "all" }) {
  const {
    currentCurrency,
    setCurrentCurrency,
    addToCart,
    wishlist,
    toggleWishlist,
    openQuickView,
    openCart,
    totalCartCount,
  } = useShop();

  const [searchQuery, setSearchQuery] = useState("");
  const [columns, setColumns] = useState(4); // 4 columns matching Trendia desktop screenshot
  const [sortBy, setSortBy] = useState("featured");

  // Filter state
  const [selectedFilters, setSelectedFilters] = useState({
    price: null, // { min, max, label }
    fabrics: [],
    colors: [],
    works: [], // types
    sizes: [],
    occasions: [],
    discount: null,
  });

  // Find category object
  const currentCategory = useMemo(() => {
    return (
      CATEGORIES.find(
        (c) => c.slug === initialCategorySlug || c.id === initialCategorySlug
      ) ||
      CATEGORIES[0]
    );
  }, [initialCategorySlug]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedFilters.price) count++;
    if (selectedFilters.discount) count++;
    count += (selectedFilters.fabrics || []).length;
    count += (selectedFilters.colors || []).length;
    count += (selectedFilters.works || []).length;
    count += (selectedFilters.sizes || []).length;
    count += (selectedFilters.occasions || []).length;
    return count;
  }, [selectedFilters]);

  // Filter handlers
  const handleFilterChange = (key, value) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleRemoveFilter = (key, value) => {
    if (key === "price" || key === "discount") {
      setSelectedFilters((prev) => ({ ...prev, [key]: null }));
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        [key]: (prev[key] || []).filter((item) => item !== value),
      }));
    }
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      price: null,
      fabrics: [],
      colors: [],
      works: [],
      sizes: [],
      occasions: [],
      discount: null,
    });
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Category Filter (unless 'all')
    if (initialCategorySlug && initialCategorySlug !== "all") {
      const slug = initialCategorySlug.toLowerCase();
      result = result.filter((p) => {
        const cat = (p.category || "").toLowerCase();
        const title = (p.title || "").toLowerCase();
        if (cat === slug) return true;
        if (slug === "kurta-sets" || slug === "kurtas") {
          return cat.includes("kurta") || cat === "kurtas";
        }
        if (slug === "kurtas-kurtis") {
          return cat.includes("kurti") || title.includes("kurti") || cat.includes("kurta");
        }
        if (slug === "pakistani-suits") {
          return cat.includes("pakistani") || title.includes("pakistani");
        }
        if (slug === "anarkali-sets" || slug === "anarkali") {
          return cat.includes("anarkali") || title.includes("anarkali");
        }
        if (slug === "tunics-tops") {
          return cat.includes("tunic") || title.includes("tunic") || title.includes("top");
        }
        if (slug === "gowns" || slug === "dresses") {
          return cat.includes("gown") || cat === "dresses" || title.includes("gown");
        }
        if (slug === "lehengas") {
          return cat === "lehengas" || title.includes("lehenga");
        }
        if (slug === "sarees" || slug === "chanderi") {
          return cat === "sarees" || cat === "chanderi" || title.includes("saree");
        }
        return cat.includes(slug);
      });
    }

    // 2. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.fabric && p.fabric.toLowerCase().includes(q)) ||
          (p.work && p.work.toLowerCase().includes(q)) ||
          (p.colorName && p.colorName.toLowerCase().includes(q))
      );
    }

    // 3. Price Filter
    if (selectedFilters.price) {
      result = result.filter(
        (p) =>
          p.priceINR >= selectedFilters.price.min &&
          p.priceINR <= selectedFilters.price.max
      );
    }

    // 4. Fabric Filter
    if (selectedFilters.fabrics && selectedFilters.fabrics.length > 0) {
      result = result.filter((p) =>
        selectedFilters.fabrics.some(
          (fab) =>
            p.fabric?.toLowerCase().includes(fab.toLowerCase())
        )
      );
    }

    // 5. Color Filter
    if (selectedFilters.colors && selectedFilters.colors.length > 0) {
      result = result.filter((p) =>
        selectedFilters.colors.includes(p.color?.toLowerCase())
      );
    }

    // 6. Type/Work Filter
    if (selectedFilters.works && selectedFilters.works.length > 0) {
      result = result.filter((p) =>
        selectedFilters.works.some((w) =>
          p.work?.toLowerCase().includes(w.toLowerCase()) ||
          p.category?.toLowerCase().includes(w.toLowerCase()) ||
          p.title?.toLowerCase().includes(w.toLowerCase())
        )
      );
    }

    // 7. Size Filter
    if (selectedFilters.sizes && selectedFilters.sizes.length > 0) {
      result = result.filter((p) =>
        selectedFilters.sizes.some((sz) =>
          (p.sizes || []).includes(sz) || sz === "M" || sz === "L" || sz === "XL" // fallback default sizes
        )
      );
    }

    // 8. Occasion Filter
    if (selectedFilters.occasions && selectedFilters.occasions.length > 0) {
      result = result.filter((p) =>
        selectedFilters.occasions.some(
          (occ) =>
            p.occasion?.toLowerCase() === occ.toLowerCase()
        )
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.priceINR - b.priceINR);
        break;
      case "price-desc":
        result.sort((a, b) => b.priceINR - a.priceINR);
        break;
      case "discount-desc":
        result.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "featured":
      default:
        // Featured keeps default editorial rank
        break;
    }

    return result;
  }, [initialCategorySlug, searchQuery, selectedFilters, sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20 md:pb-0">
      {/* 1. Black Top Bar with Sitewide Discount Ticker */}
      <TopBar
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
      />

      {/* 2. Main Luxury Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={openCart}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={initialCategorySlug}
      />

      {/* 3. Category Navigation Bar (No Men's, Kids, or Jewellery) */}
      <CategoryNav activeCategory={initialCategorySlug} />

      {/* 4. When viewing All Collections: Full Width Trendia Collections Hub (NO SIDEBAR FILTERS) */}
      {initialCategorySlug === "all" || !initialCategorySlug ? (
        <AllCollectionsHub />
      ) : (
        <>
          {/* Exact Trendia Page Header (Centered Title + Soft Blue Trust Strip) */}
          <TrendiaCollectionHeader
            category={currentCategory}
            productCount={filteredProducts.length}
          />

          {/* Main Collection Workspace: Full-Bleed 100% Width (Proportional Wide & Tall Cards) */}
          <div className="w-full px-2 xs:px-3 sm:px-5 lg:px-6 2xl:px-8 py-3 max-w-[1920px] mx-auto">
            <div className="flex gap-4 lg:gap-6 items-start">
              
              {/* Desktop Left Sidebar (Exact Trendia Categories: Type, Price, Size, Fabric, Color) */}
              <div className="hidden lg:block w-[225px] xl:w-[240px] flex-shrink-0 sticky top-20">
                <CollectionSidebarFilter
                  selectedFilters={selectedFilters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  activeFilterCount={activeFilterCount}
                />
              </div>

              {/* Right Product Grid Area */}
              <div className="flex-1 min-w-0">
                {/* Top-Right Sort Dropdown Row */}
                <CollectionToolbar
                  productCount={filteredProducts.length}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  selectedFilters={selectedFilters}
                  onRemoveFilter={handleRemoveFilter}
                  onClearFilters={handleClearFilters}
                  activeFilterCount={activeFilterCount}
                />

                {/* 4-Column Product Cards Grid (Exact Trendia Screenshot Layout) */}
                <CollectionProductGrid
                  products={filteredProducts}
                  columns={4}
                  currentCurrency={currentCurrency}
                  onQuickView={openQuickView}
                  onAddToCart={addToCart}
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>
          </div>

          {/* Mobile Sticky Bottom Filter Bar & Slide-Up Drawers */}
          <CollectionMobileFilterDrawer
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            activeFilterCount={activeFilterCount}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalMatchingCount={filteredProducts.length}
          />
        </>
      )}

      {/* 7. Floating Widgets (Exact Trendia Screenshot) */}
      <FloatingCurrencyPill />
      <FloatingWhatsAppBubble />
      <WelcomeDiscountModal />

      {/* 8. Footer */}
      <Footer />

      {/* 9. Mobile Bottom Navigation */}
      <MobileBottomNav
        activeCategory={initialCategorySlug}
        wishlistCount={wishlist.length}
        cartCount={totalCartCount}
        onOpenCart={openCart}
      />
    </div>
  );
}
