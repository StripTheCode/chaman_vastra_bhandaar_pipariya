"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  Ruler,
  Check,
  Video,
  Coins,
  ChevronDown,
  Heart,
  Share2,
} from "lucide-react";
import { CURRENCIES } from "@/data/products";
import InteractiveProductViewer from "./product/InteractiveProductViewer";
import YouMayAlsoLike from "./product/YouMayAlsoLike";

export default function ProductDetailModal({
  product: initialProduct,
  isOpen,
  onClose,
  currentCurrency,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) {
  const [currentProduct, setCurrentProduct] = useState(initialProduct);
  const [selectedSize, setSelectedSize] = useState("Free Size");
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("craft");
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setCurrentProduct(initialProduct);
      const defaultSize =
        Array.isArray(initialProduct.sizes) && initialProduct.sizes.length > 0
          ? initialProduct.sizes[0]
          : "Free Size";
      setSelectedSize(defaultSize);
      setQuantity(1);
    }
  }, [initialProduct]);

  if (!isOpen || !currentProduct) return null;

  const currencyObj = CURRENCIES[currentCurrency] || CURRENCIES.INR;
  const currentPrice = Math.round((currentProduct.priceINR || 0) * (currencyObj.rate || 1));
  const originalPrice = Math.round(
    (currentProduct.originalPriceINR || currentProduct.priceINR || 0) * (currencyObj.rate || 1)
  );
  const earnedCoins = Math.round((currentProduct.priceINR || 0) * 0.05);

  const handleAdd = () => {
    onAddToCart(currentProduct, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 1100);
  };

  const handleSelectSimilarProduct = (prod) => {
    setCurrentProduct(prod);
    const defaultSize =
      Array.isArray(prod.sizes) && prod.sizes.length > 0 ? prod.sizes[0] : "Free Size";
    setSelectedSize(defaultSize);
    setQuantity(1);
  };

  const whatsappMessage = `Namaste Chaman Vastra Bhandar Pipariya, I am interested in purchasing "${currentProduct.title}" (Size: ${selectedSize}, Qty: ${quantity}) priced at ${currencyObj.symbol}${(currentPrice * quantity).toLocaleString('en-IN')}. Please confirm dispatch timeline.`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Soft Dark Blur Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-[3px]"
        />

        {/* Main Luxury Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: "spring", duration: 0.45, bounce: 0.12 }}
          className="relative w-full max-w-5xl bg-[#FFFAF3] rounded-3xl shadow-2xl overflow-hidden border border-[#EADBCA] z-10 my-auto text-[#19181B] max-h-[92vh] flex flex-col"
        >
          {/* Top Bar with Close Button */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-white/95 backdrop-blur-md border-b border-[#EADBCA]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C59B27]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C7367]">
                Chaman Heritage Pipariya • Live 360° Studio
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleWishlist && onToggleWishlist(currentProduct.id)}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isWishlisted
                    ? "bg-[#A34850] text-white border-[#A34850]"
                    : "bg-white text-[#19181B] border-[#EADBCA] hover:border-[#A34850]"
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white text-[#19181B] hover:bg-[#19181B] hover:text-white flex items-center justify-center border border-[#EADBCA] transition-all cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT COLUMN: INTERACTIVE 360° ROTATE & ZOOM STUDIO */}
              <div className="lg:col-span-7">
                <InteractiveProductViewer product={currentProduct} />
              </div>

              {/* RIGHT COLUMN: COMPLETE LUXURY DETAILS & PURCHASE FLOW */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                <div>
                  {/* Rating & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#19181B] text-[#E6C665] text-[10px] font-bold uppercase tracking-widest">
                      {currentProduct.badge || "Pure Handloom Heritage"}
                    </span>

                    <div className="flex items-center gap-1 text-[#C59B27] text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{currentProduct.rating || 5}</span>
                      <span className="text-[#8C8273] font-normal">
                        ({currentProduct.reviews || 84} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#19181B] leading-snug">
                    {currentProduct.title}
                  </h2>
                  <p className="text-xs text-[#7C7367] mt-0.5">
                    Category: <strong className="text-[#A34850] uppercase">{currentProduct.category}</strong>
                  </p>

                  {/* Price Bar */}
                  <div className="flex items-baseline gap-3 my-4 pb-3 border-b border-[#EADBCA]">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-[#19181B]">
                      {currencyObj.symbol}{currentPrice.toLocaleString("en-IN")}
                    </span>
                    {originalPrice > currentPrice && (
                      <span className="text-sm text-[#9E9485] line-through">
                        {currencyObj.symbol}{originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                    {currentProduct.discount && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-extrabold">
                        {currentProduct.discount}
                      </span>
                    )}
                  </div>

                  {/* Loyalty Points Reward Pill */}
                  <div className="mb-5 p-2.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border border-amber-300/60 flex items-center gap-2.5">
                    <Coins className="w-5 h-5 text-amber-700 shrink-0" />
                    <p className="text-xs text-amber-950 font-bold leading-tight">
                      Earn <span className="underline decoration-amber-600">{earnedCoins} Chaman Coins</span> (₹{earnedCoins} Cashback) on this purchase!
                    </p>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#19181B]">
                        Select Size / Blouse Stitching:
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowSizeGuide(!showSizeGuide)}
                        className="text-[11px] font-bold text-[#A34850] flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Ruler className="w-3.5 h-3.5" />
                        <span>Size Chart</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(currentProduct.sizes) ? currentProduct.sizes : ["Free Size"]).map(
                        (sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setSelectedSize(sz)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                              selectedSize === sz
                                ? "border-[#19181B] bg-[#19181B] text-white shadow-sm"
                                : "border-[#DDD5C9] bg-white text-[#19181B] hover:border-[#19181B]"
                            }`}
                          >
                            {sz}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Quantity & Stock Status */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#19181B]">
                        Qty:
                      </span>
                      <div className="flex items-center border border-[#DDD5C9] rounded-xl overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="px-3 py-1.5 hover:bg-[#EBE2D6] font-bold text-sm cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3.5 py-1.5 text-xs font-mono font-bold">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => q + 1)}
                          className="px-3 py-1.5 hover:bg-[#EBE2D6] font-bold text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      ✓ Ready in Pipariya Showroom
                    </span>
                  </div>

                  {/* Primary Action Button: Add to Bag */}
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={handleAdd}
                      disabled={addedNotice}
                      className={`w-full py-3.5 px-6 rounded-full font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                        addedNotice
                          ? "bg-emerald-600 text-white scale-[1.02]"
                          : "bg-gradient-to-r from-[#19181B] via-[#2A262E] to-[#19181B] hover:from-[#A34850] hover:to-[#842A32] text-white"
                      }`}
                    >
                      {addedNotice ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Added to Shopping Bag!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>
                            Add to Bag • {currencyObj.symbol}
                            {(currentPrice * quantity).toLocaleString("en-IN")}
                          </span>
                        </>
                      )}
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`https://wa.me/918269260928?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-full bg-[#15803D] hover:bg-[#166534] text-white font-bold text-[11px] tracking-wide flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>WhatsApp Order</span>
                      </a>

                      <a
                        href={`https://wa.me/918269260928?text=${encodeURIComponent(
                          `Namaste, I want to book a live video call for ${currentProduct.title}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#DDD5C9] text-[#19181B] font-bold text-[11px] tracking-wide flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      >
                        <Video className="w-4 h-4 text-[#A34850]" />
                        <span>Live Video Call</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Fabric Specifications Accordion */}
                <div className="border-t border-[#EADBCA] pt-4 space-y-2 text-xs">
                  <div className="p-3 bg-white rounded-2xl border border-[#EADBCA] space-y-1.5">
                    <p className="flex justify-between">
                      <span className="text-[#7C7367]">Fabric & Zari:</span>
                      <strong className="text-[#19181B]">{currentProduct.fabric || "Pure Silk"}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-[#7C7367]">Occasion:</span>
                      <strong className="text-[#19181B]">{currentProduct.occasion || "Bridal / Festive"}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-[#7C7367]">Care:</span>
                      <strong className="text-[#19181B]">{currentProduct.care || "Dry Clean Only"}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-[#7C7367]">Dispatch:</span>
                      <strong className="text-emerald-700">{currentProduct.dispatch || "Dispatches in 24 hrs"}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* "YOU MAY ALSO LIKE" SECTION: 8-10 SIMILAR CATEGORY PRODUCTS */}
            <YouMayAlsoLike
              currentProductId={currentProduct.id}
              category={currentProduct.category}
              onSelectProduct={handleSelectSimilarProduct}
              currentCurrency={currentCurrency}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
