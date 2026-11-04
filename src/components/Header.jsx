"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  MessageCircle,
  X,
  Phone,
  ChevronRight,
  ChevronDown,
  MapPin,
  User,
  Package,
  Flame,
  Globe,
  Video,
  Coins,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { CATEGORIES } from "@/data/products";
import SearchAutocompleteModal from "@/components/SearchAutocompleteModal";
import { useTypewriter } from "@/hooks/useTypewriter";

// Mobile Drawer Accordion Menu Data matching Trendia structure (Women's Luxury Ethnic)
const MOBILE_MENU_ITEMS = [
  {
    id: "women",
    title: "Women's Collection",
    image: "/images/anarkali-rust.jpg",
    subItems: [
      { name: "Kurta Sets", category: "kurta-sets" },
      { name: "Kurtas & Kurtis", category: "kurtas-kurtis" },
      { name: "Pakistani Suits", category: "pakistani-suits" },
      { name: "Anarkali Sets", category: "anarkali-sets" },
      { name: "Tunics & Tops", category: "tunics-tops" },
      { name: "Gowns", category: "gowns" },
      { name: "Lehengas", category: "lehengas" },
      { name: "Sarees", category: "sarees" },
      { name: "View All Collections", category: "all" },
    ],
  },
  {
    id: "sale",
    title: "Festive Sale & Offers",
    image: "/images/promo-bridal.jpg",
    subItems: [
      { name: "Flat 30% Off Bridal Lehengas", category: "lehengas" },
      { name: "Up to 35% Off Pure Silk Sarees", category: "sarees" },
      { name: "Deals Under ₹4,999", category: "all" },
      { name: "Ready to Ship in 24 Hours", category: "all" },
    ],
  },
];

export default function Header({
  cartCount,
  onOpenCart,
  wishlistCount,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
}) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState("menu"); // "menu" | "categories"
  const [expandedSection, setExpandedSection] = useState("women");
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [desktopSearchFocused, setDesktopSearchFocused] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, openAuthModal, logout } = useAuth();

  // Dynamic Typewriter Search Placeholder Hook (Auto-types, pauses, backspaces, loops)
  const typewriter = useTypewriter({
    isActive: !searchQuery,
  });

  // When focused, omit the pipe cursor to prevent double cursors with browser's native cursor
  const dynamicPlaceholder = desktopSearchFocused
    ? typewriter.text
    : typewriter.withCursor;

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const toggleSection = (id) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  const handleSelectMobileCategory = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    setMobileMenuOpen(false);
    router.push(`/collections/${catId}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EBE3DA] shadow-2xs transition-all w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            
            {/* 1. Mobile Menu Button (Trendia 3-Line Asymmetric Hamburger) */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                type="button"
                className="p-2 text-[#19181B] hover:text-[#A34850] transition-colors cursor-pointer rounded-lg hover:bg-black/5"
                aria-label="Open Navigation Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="16"
                  viewBox="0 0 30 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect width="30" height="2" rx="1"></rect>
                  <rect y="7" width="20" height="2" rx="1"></rect>
                  <rect y="14" width="30" height="2" rx="1"></rect>
                </svg>
              </button>
            </div>

            {/* 2. Brand Logo & Royal Monogram */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                {/* Gold Heritage Seal / Monogram */}
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#2D2A32] via-[#1A181C] to-[#121114] border border-[#C59B27]/60 flex items-center justify-center text-[#E6C665] font-serif font-black text-xs sm:text-base tracking-widest shadow-md group-hover:scale-105 transition-transform shrink-0">
                  CVB
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-serif text-base sm:text-2xl font-black tracking-[0.16em] sm:tracking-[0.18em] text-[#19181B] group-hover:text-[#A34850] transition-colors uppercase leading-none">
                    CHAMAN
                  </span>
                  <span className="text-[9px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.24em] font-serif font-bold text-[#A34850] uppercase mt-0.5">
                    VASTRA BHANDAR
                  </span>
                  <span className="text-[7px] sm:text-[9px] tracking-[0.28em] sm:tracking-[0.3em] font-sans font-medium text-[#7C7367] uppercase -mt-0.5 hidden xs:block">
                    PIPARIYA • EST. 1985
                  </span>
                </div>
              </Link>
            </div>

            {/* 3. Wide Rectangular Search Bar (Exact Trendia Screenshot) */}
            <div className="hidden lg:flex flex-1 max-w-2xl xl:max-w-3xl mx-6 relative">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                <input
                  type="text"
                  placeholder={dynamicPlaceholder}
                  value={searchQuery}
                  onFocus={() => {
                    setDesktopSearchFocused(true);
                    setDesktopSearchOpen(true);
                  }}
                  onBlur={() => setDesktopSearchFocused(false)}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    setDesktopSearchOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setDesktopSearchOpen(false);
                      const q = searchQuery.trim();
                      if (q) {
                        router.push(`/collections/all?q=${encodeURIComponent(q)}`);
                      } else {
                        const cleanTerm = typewriter.text.replace(/^Search for\s+/i, "").replace(/\.\.\.$/, "").trim();
                        router.push(cleanTerm ? `/collections/all?q=${encodeURIComponent(cleanTerm)}` : "/collections/all");
                      }
                    }
                  }}
                  className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#CCCCCC] rounded-[2px] text-[14px] text-[#19181B] placeholder-[#888888] focus:outline-none focus:border-[#111111] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      onSearchChange("");
                      setDesktopSearchOpen(false);
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-[#19181B] p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Desktop Autocomplete Dropdown Flyout */}
              <SearchAutocompleteModal
                isOpen={desktopSearchOpen}
                onClose={() => setDesktopSearchOpen(false)}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                isMobile={false}
                placeholder={typewriter.text}
              />
            </div>

            {/* 4. Action Icons: Profile, Wishlist, Cart (Luxury Elevated Design) */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              
              {/* Profile / Account with Luxury Flyout Menu (Desktop) */}
              <div
                className="relative hidden lg:block"
                onMouseEnter={() => setProfileMenuOpen(true)}
                onMouseLeave={() => setProfileMenuOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!user) {
                      openAuthModal("signin");
                    } else {
                      setProfileMenuOpen((prev) => !prev);
                    }
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-[#FAF8F5] border border-transparent hover:border-[#EBE3DA] transition-all cursor-pointer group"
                  aria-label="User Account"
                >
                  <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#EAE3D5] flex items-center justify-center text-[#19181B] group-hover:bg-[#A34850] group-hover:text-white group-hover:border-[#A34850] transition-all duration-300 shadow-2xs">
                    <User className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.8} />
                  </div>
                  <div className="flex flex-col items-start leading-none text-left">
                    <span className="text-[13.5px] font-semibold text-[#19181B] group-hover:text-[#A34850] transition-colors truncate max-w-[100px]">
                      {user ? user.name.split(" ")[0] : "Profile"}
                    </span>
                    {user && (
                      <span className="text-[10px] text-amber-700 font-bold flex items-center gap-0.5 mt-0.5">
                        <span>🪙</span>
                        <span>{user.loyaltyPoints || 0}</span>
                      </span>
                    )}
                  </div>
                </button>

                {/* Luxury Dropdown Menu */}
                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-2xl border border-[#EBE3DA] py-2 z-50 overflow-hidden"
                    >
                      {user ? (
                        <>
                          <div className="px-4 py-3 border-b border-[#F4EFEA] bg-[#FAF8F5]">
                            <p className="text-[10px] uppercase tracking-wider text-[#A34850] font-bold">Privilege Member</p>
                            <p className="text-sm font-bold text-[#19181B] truncate mt-0.5">{user.name}</p>
                            <p className="text-xs text-[#7C7367] truncate">{user.email}</p>
                            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                              <Coins className="w-3.5 h-3.5 text-amber-600" />
                              <span>{user.loyaltyPoints || 0} Chaman Coins</span>
                            </div>
                          </div>

                          <div className="py-1.5 text-[13px] text-[#222]">
                            <Link
                              href="/account"
                              onClick={() => setProfileMenuOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF8F5] hover:text-[#A34850] transition-colors"
                            >
                              <User className="w-4 h-4 text-[#777]" />
                              <span>My Account & Addresses</span>
                            </Link>

                            <Link
                              href="/account?tab=orders"
                              onClick={() => setProfileMenuOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF8F5] hover:text-[#A34850] transition-colors"
                            >
                              <Package className="w-4 h-4 text-[#777]" />
                              <span>My Orders & Tracking</span>
                            </Link>

                            <button
                              type="button"
                              onClick={() => {
                                setProfileMenuOpen(false);
                                logout();
                              }}
                              className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-rose-50 hover:text-rose-700 transition-colors text-left cursor-pointer text-rose-600 border-t border-[#F4EFEA] mt-1"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="px-4 py-3 border-b border-[#F4EFEA] bg-[#FAF8F5]">
                            <p className="text-[10.5px] uppercase tracking-wider text-[#A34850] font-bold">Namaste & Welcome</p>
                            <p className="text-xs text-[#555] mt-0.5">Sign in to unlock exclusive privilege perks</p>
                            <button
                              type="button"
                              onClick={() => {
                                setProfileMenuOpen(false);
                                openAuthModal("signin");
                              }}
                              className="w-full mt-2.5 py-1.5 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                            >
                              Sign In / Register
                            </button>
                          </div>

                          <div className="py-1 text-[13px] text-[#222]">
                            <button
                              type="button"
                              onClick={() => {
                                setProfileMenuOpen(false);
                                openAuthModal("register");
                              }}
                              className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-amber-50/50 hover:text-amber-900 transition-colors text-left cursor-pointer text-amber-800 font-semibold"
                            >
                              <Coins className="w-4 h-4 text-amber-600" />
                              <span>🎁 Claim 100 Free Coins</span>
                            </button>

                            <Link
                              href="/collections/all"
                              className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF8F5] hover:text-[#A34850] transition-colors"
                            >
                              <Package className="w-4 h-4 text-[#777]" />
                              <span>Track My Order</span>
                            </Link>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => alert(`You have ${wishlistCount} items saved in your Wishlist!`)}
                className="relative flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-[#FAF8F5] border border-transparent hover:border-[#EBE3DA] transition-all cursor-pointer group"
                aria-label="Wishlist"
                title="Saved Items"
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#EAE3D5] flex items-center justify-center text-[#19181B] group-hover:bg-[#A34850] group-hover:text-white group-hover:border-[#A34850] transition-all duration-300 shadow-2xs">
                    <Heart
                      className={`w-[18px] h-[18px] transition-all duration-300 group-hover:scale-110 ${
                        wishlistCount > 0
                          ? "text-[#A34850] group-hover:text-white fill-[#A34850]/20 group-hover:fill-white"
                          : "text-[#19181B] group-hover:text-white"
                      }`}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Count Badge */}
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#A34850] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center ring-2 ring-white shadow-sm leading-none">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-[13.5px] font-semibold text-[#19181B] group-hover:text-[#A34850] transition-colors">
                  Wishlist
                </span>
              </button>

              {/* Cart Bag Button */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-[#FAF8F5] border border-transparent hover:border-[#EBE3DA] transition-all cursor-pointer group"
                aria-label="Shopping Cart"
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#EAE3D5] flex items-center justify-center text-[#19181B] group-hover:bg-[#19181B] group-hover:text-white group-hover:border-[#19181B] transition-all duration-300 shadow-2xs">
                    <ShoppingBag
                      className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110 text-[#19181B] group-hover:text-white"
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Count Badge */}
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#19181B] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center ring-2 ring-white shadow-sm leading-none">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-[13.5px] font-semibold text-[#19181B] group-hover:text-[#A34850] transition-colors">
                  Cart
                </span>
              </button>
            </div>

          </div>

          {/* 5. Trendia-Style Mobile Permanent Search Bar (Always visible below header row) */}
          <div className="lg:hidden pb-3 pt-0">
            <div
              onClick={() => setMobileSearchOpen(true)}
              className="relative w-full cursor-pointer"
            >
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7C7467]" />
              <input
                type="text"
                readOnly
                placeholder={typewriter.withCursor}
                value={searchQuery}
                className="w-full pl-10 pr-9 py-2 bg-[#F6F2EC] border border-[#DDD6CC] rounded-full text-xs text-[#19181B] placeholder-[#7C7467] focus:outline-none cursor-pointer shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSearchChange("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C8273] hover:text-[#19181B] p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Autocomplete Search Modal */}
            <SearchAutocompleteModal
              isOpen={mobileSearchOpen}
              onClose={() => setMobileSearchOpen(false)}
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              isMobile={true}
              placeholder={typewriter.text}
            />
          </div>
        </div>
      </header>

      {/* 6. Trendia-Style Mobile Slide-Out Drawer Navigation (#menu_mobile) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            
            {/* Drawer Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide-In Drawer Panel (from Left) */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative w-[85%] max-w-[360px] h-full bg-white shadow-2xl flex flex-col z-10 overflow-hidden"
            >
              {/* Drawer Top Header: Logo + Close Button */}
              <div className="flex items-center justify-between p-4 border-b border-[#EBE3DA] bg-[#FAF8F5]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#19181B] text-[#E6C665] flex items-center justify-center font-serif font-black text-xs">
                    CVB
                  </div>
                  <span className="font-serif font-black tracking-widest text-xs text-[#19181B] uppercase">
                    CHAMAN PIPARIYA
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#EFE9E0] text-[#19181B] flex items-center justify-center hover:bg-[#A34850] hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Dual Tab Switcher: [ Menu ] | [ Categories ] */}
              <div className="grid grid-cols-2 border-b border-[#EBE3DA] bg-white text-center">
                <button
                  type="button"
                  onClick={() => setMobileTab("menu")}
                  className={`py-3 text-[13px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                    mobileTab === "menu"
                      ? "text-[#19181B] border-b-2 border-[#19181B]"
                      : "text-[#8C8273] hover:text-[#19181B]"
                  }`}
                >
                  Menu
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab("categories")}
                  className={`py-3 text-[13px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                    mobileTab === "categories"
                      ? "text-[#19181B] border-b-2 border-[#19181B]"
                      : "text-[#8C8273] hover:text-[#19181B]"
                  }`}
                >
                  Categories
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="flex-1 overflow-y-auto">
                
                {/* TAB 1: MENU (Accordion with Thumbnails) */}
                {mobileTab === "menu" && (
                  <div className="divide-y divide-[#F0EAE1]">
                    
                    {/* Expandable Category Accordions */}
                    {MOBILE_MENU_ITEMS.map((item) => {
                      const isExpanded = expandedSection === item.id;
                      return (
                        <div key={item.id} className="bg-white">
                          <button
                            type="button"
                            onClick={() => toggleSection(item.id)}
                            className="w-full flex items-center justify-between p-3.5 hover:bg-[#FAF8F5] transition-colors cursor-pointer text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#FAF6EE] border border-[#E5DDD2] shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  sizes="32px"
                                  className="object-cover object-top"
                                />
                              </div>
                              <span className="text-[14.5px] sm:text-[15px] font-semibold text-[#19181B]">
                                {item.title}
                              </span>
                            </div>
                            <div className="text-[#8C8273]">
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-[#A34850]" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </div>
                          </button>

                          {/* Submenu Accordion Drawer */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden bg-[#FAF8F5] px-4 py-2 border-t border-[#F2ECE3]"
                              >
                                <ul className="space-y-1 py-1 pl-10">
                                  {item.subItems.map((sub, sIdx) => (
                                    <li key={sIdx}>
                                      <button
                                        type="button"
                                        onClick={() => handleSelectMobileCategory(sub.category)}
                                        className="text-[13.5px] sm:text-[14px] text-[#4F4A42] hover:text-[#A34850] py-1.5 block w-full text-left font-medium transition-colors cursor-pointer"
                                      >
                                        {sub.name}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}

                    {/* Single Highlight Links matching Trendia */}
                    <div className="p-2 space-y-1 bg-white">
                      <button
                        type="button"
                        onClick={() => handleSelectMobileCategory("all")}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#FAF8F5] transition-colors cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                            <Flame className="w-4 h-4" />
                          </div>
                          <span className="text-[14px] sm:text-[14.5px] font-semibold text-[#19181B]">
                            New Arrivals
                          </span>
                        </div>
                        <span className="text-[10.5px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                          NEW
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectMobileCategory("sarees")}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#FAF8F5] transition-colors cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                            <Flame className="w-4 h-4" />
                          </div>
                          <span className="text-[14px] sm:text-[14.5px] font-semibold text-[#19181B]">
                            Bestsellers
                          </span>
                        </div>
                        <span className="text-[10.5px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full">
                          HOT
                        </span>
                      </button>

                      <a
                        href="https://maps.google.com/?q=Chaman+Vastra+Bhandar+Pipariya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#FAF8F5] transition-colors cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <span className="text-[14px] sm:text-[14.5px] font-semibold text-[#19181B]">
                            Chaman Store (Pipariya Showroom)
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#8C8273]" />
                      </a>
                    </div>

                    {/* Secondary Account & Support Strip */}
                    <div className="p-4 space-y-3 bg-[#FAF8F5] text-[13px]">
                      <div className="flex items-center justify-between text-[#4F4A42]">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-[#A34850]" />
                          <span>Saved Wishlist Items</span>
                        </div>
                        <span className="font-bold text-[#A34850]">{wishlistCount}</span>
                      </div>

                      {user ? (
                        <div className="pt-2 border-t border-[#EBE3DA] space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-[#A34850]" />
                              <span className="font-bold text-[#19181B] truncate max-w-[160px]">{user.name}</span>
                            </div>
                            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                              🪙 {user.loyaltyPoints || 0}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs pt-1">
                            <Link
                              href="/account"
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-[#A34850] font-bold underline"
                            >
                              My Account & Orders
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                logout();
                              }}
                              className="text-rose-600 font-semibold"
                            >
                              Sign Out
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            openAuthModal("signin");
                          }}
                          className="w-full flex items-center justify-between text-[#4F4A42] pt-2 border-t border-[#EBE3DA] cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-[#7C7367]" />
                            <span>Customer Login / Profile</span>
                          </div>
                          <span className="text-[12px] font-bold text-[#A34850] bg-[#FAF3EC] px-2.5 py-1 rounded-full">
                            Sign In / 100 Coins
                          </span>
                        </button>
                      )}

                      {/* Contact Info Block */}
                      <div className="pt-3 border-t border-[#EBE3DA]">
                        <p className="font-bold uppercase tracking-wider text-[11px] text-[#8C8273] mb-1.5">
                          Showroom Concierge
                        </p>
                        <div className="flex items-center gap-2 text-[#19181B] font-medium py-0.5 text-[13.5px]">
                          <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
                          <a href="tel:+918269260928" className="hover:underline">
                            +91 82692 60928
                          </a>
                        </div>
                        <p className="text-[12px] text-[#7C7367] mt-1">
                          Station Road, Pipariya, M.P. • Est. 1985
                        </p>
                      </div>

                      {/* Live Video Call Preview Button */}
                      <a
                        href="https://wa.me/918269260928?text=Namaste%20Chaman%20Vastra%20Bhandar%20Pipariya,%20I%20am%20browsing%20from%20mobile%20and%20want%20to%20book%20a%20live%20video%20call%20saree%20preview."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-[13px] flex items-center justify-center gap-2 shadow-xs transition-colors"
                      >
                        <Video className="w-4 h-4" />
                        <span>Book Live Video Drape Preview</span>
                      </a>
                    </div>

                  </div>
                )}

                {/* TAB 2: CATEGORIES (Visual Card Grid) */}
                {mobileTab === "categories" && (
                  <div className="p-4 grid grid-cols-2 gap-3 bg-[#FAF8F5]">
                    {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelectMobileCategory(cat.id)}
                        className={`group relative flex flex-col rounded-xl overflow-hidden bg-white border transition-all text-left cursor-pointer ${
                          activeCategory === cat.id
                            ? "border-[#A34850] ring-1 ring-[#A34850]"
                            : "border-[#EBE3DA] hover:border-[#C59B27]"
                        }`}
                      >
                        <div className="relative w-full h-28 bg-[#EFE9E0]">
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            sizes="140px"
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-2.5">
                          <h4 className="text-[13.5px] font-semibold text-[#19181B] leading-tight line-clamp-1">
                            {cat.name}
                          </h4>
                          <span className="text-[11.5px] text-[#A34850] font-medium block mt-0.5">
                            {cat.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

              </div>

              {/* Drawer Bottom Footer (Currency Indicator) */}
              <div className="p-3 border-t border-[#EBE3DA] bg-white flex items-center justify-between text-xs text-[#7C7367]">
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span className="font-semibold text-[#19181B]">Currency: INR (₹)</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Free Pan-India Delivery
                </span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
