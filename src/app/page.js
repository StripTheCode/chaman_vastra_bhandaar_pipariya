"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import HeroBanner from "@/components/HeroBanner";
import CategoryStories from "@/components/CategoryStories";
import FeaturesBar from "@/components/FeaturesBar";
import CategoryStrips from "@/components/CategoryStrips";
import PromoBanners from "@/components/PromoBanners";
import ProductGrid from "@/components/ProductGrid";
import ShoppableVideoReels from "@/components/ShoppableVideoReels";
import GraceInDrape from "@/components/GraceInDrape";
import EditorialSpotlight from "@/components/EditorialSpotlight";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import CustomerReviews from "@/components/CustomerReviews";
import InstagramFeed from "@/components/InstagramFeed";
import TrustFeatures from "@/components/TrustFeatures";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import WelcomeDiscountModal from "@/components/WelcomeDiscountModal";
import { PRODUCTS } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { MessageCircle } from "lucide-react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
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

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] pb-14 md:pb-0 overflow-x-hidden w-full max-w-full">
      {/* 1. Global Announcement Ticker & Currency Bar */}
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
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* 3. Mega-menu Category Strip */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* 4. Full-bleed Cinematic Hero Banner Carousel */}
      <HeroBanner
        onSelectCategory={setActiveCategory}
        onQuickView={(cat) => openQuickView(PRODUCTS[1])}
      />

      {/* 5. Luxury Gold Heritage & Trust Bar (5 Pillars - Direct Below Hero) */}
      <FeaturesBar />

      {/* 6. Visual Story Category Circles */}
      <CategoryStories
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* 7. Festive Category Strips ("Festive Styles. Lowest Prices.") */}
      <CategoryStrips
        onSelectCategory={setActiveCategory}
      />

      {/* 8. Trendia-Style 2-Column Split Promotional Banners */}
      <PromoBanners
        onSelectCategory={setActiveCategory}
      />

      {/* 9. Product Grid with Tabs, Sorting, Hover & Quick View ("Tyohaar Edit'26 / Best Sellers") */}
      <main className="flex-grow">
        <ProductGrid
          products={PRODUCTS}
          currentCurrency={currentCurrency}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onQuickView={openQuickView}
          onAddToCart={addToCart}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          searchQuery={searchQuery}
        />

        {/* 10. Trendia Whatmore Interactive Shoppable Video Reels Carousel */}
        <ShoppableVideoReels
          onSelectProduct={openQuickView}
          onAddToCart={addToCart}
        />

        {/* 11. Saree Showcase ("Grace in Every Drape") */}
        <GraceInDrape
          onQuickView={openQuickView}
          onSelectCategory={setActiveCategory}
          currentCurrency={currentCurrency}
        />

        {/* 11. Full-Width Mid-Page Luxury Editorial Spotlight */}
        <EditorialSpotlight
          onSelectCategory={setActiveCategory}
        />

        {/* 12. Global App Download & Brand Banner ("Everything Indian At One Place") */}
        <AppDownloadBanner />

        {/* 16. Customer Testimonials & Reviews (Judge.me 4.7/5 Based on 7,634 Reviews) */}
        <CustomerReviews />

        {/* 17. Social Community & UGC Instagram Feed */}
        <InstagramFeed />

        {/* 18. Value Propositions & Guarantee Pillars */}
        <TrustFeatures />
      </main>

      {/* 19. Comprehensive E-Commerce Footer */}
      <Footer />

      {/* 20. Mobile Sticky Toolbar (Home, Express, Wishlist, Cart, Concierge) */}
      <MobileBottomNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        wishlistCount={wishlist.length}
        cartCount={totalCartCount}
        onOpenCart={openCart}
      />

      {/* 23. Welcome Newsletter & 10% Discount Modal (Trendia Style) */}
      <WelcomeDiscountModal />

      {/* Sticky Floating WhatsApp Stylist Button for Desktop */}
      <aside aria-label="WhatsApp Stylist" className="hidden md:block fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/918269260928?text=Namaste%20Chaman%20Vastra%20Bhandar%20Pipariya,%20I%20am%20browsing%20your%20online%20collection%20and%20need%20styling%20assistance%20or%20video%20call%20preview."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all group"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
          </span>
          <MessageCircle className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">Chaman Concierge</span>
        </a>
      </aside>
    </div>
  );
}
