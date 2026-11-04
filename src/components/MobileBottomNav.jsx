"use client";

import Link from "next/link";
import { Home, Zap, Heart, ShoppingBag, MessageCircle } from "lucide-react";

export default function MobileBottomNav({
  activeCategory,
  onSelectCategory,
  wishlistCount,
  cartCount,
  onOpenCart,
}) {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EBE3DA] py-2 px-4 shadow-2xl">
      <div className="flex items-center justify-around text-center">
        
        {/* Home */}
        <Link
          href="/"
          onClick={() => onSelectCategory && onSelectCategory("all")}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold cursor-pointer ${
            activeCategory === "all" ? "text-[#A34850]" : "text-[#786F63]"
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        {/* Express / Collections */}
        <Link
          href="/collections/all"
          onClick={() => onSelectCategory && onSelectCategory("all")}
          className="flex flex-col items-center gap-1 text-[10px] font-semibold text-[#786F63] hover:text-[#A34850] cursor-pointer"
        >
          <Zap className="w-5 h-5 text-[#C59B27]" />
          <span>Collections</span>
        </Link>

        {/* Wishlist */}
        <button
          onClick={() => alert("Wishlist items saved: " + wishlistCount)}
          className="relative flex flex-col items-center gap-1 text-[10px] font-semibold text-[#786F63] hover:text-[#A34850] cursor-pointer"
        >
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 right-2 w-4 h-4 rounded-full bg-[#A34850] text-white text-[9px] font-bold flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
          <span>Wishlist</span>
        </button>

        {/* Cart Bag */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center gap-1 text-[10px] font-semibold text-[#786F63] hover:text-[#A34850] cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 right-2 w-4 h-4 rounded-full bg-[#19181B] text-white text-[9px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span>Cart</span>
        </button>

        {/* WhatsApp Concierge */}
        <a
          href="https://wa.me/918269260928?text=Namaste%20Chaman%20Vastra%20Bhandar%20Pipariya,%20I%20am%20browsing%20your%20collection%20on%20mobile%20and%20need%20assistance."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-[10px] font-semibold text-[#15803D] hover:text-[#166534] cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Concierge</span>
        </a>

      </div>
    </div>
  );
}
