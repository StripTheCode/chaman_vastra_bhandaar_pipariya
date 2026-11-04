"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { CURRENCIES } from "@/data/products";

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  currentCurrency,
}) {
  const currencyObj = CURRENCIES[currentCurrency] || CURRENCIES.INR;

  const subtotalINR = cart.reduce(
    (total, item) => total + item.product.priceINR * item.quantity,
    0
  );
  const subtotal = Math.round(subtotalINR * currencyObj.rate);
  const freeShippingThresholdINR = 2999;
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotalINR / freeShippingThresholdINR) * 100)
  );

  const cartSummaryText = cart
    .map(
      (item) =>
        `- ${item.product.title} (Size: ${item.size}, Qty: ${item.quantity})`
    )
    .join("\n");

  const whatsappCheckoutLink = `https://wa.me/918269260928?text=${encodeURIComponent(
    `Namaste Chaman Vastra Bhandar Pipariya!\nI want to place an order for the following items:\n${cartSummaryText}\n\nTotal: ${currencyObj.symbol}${subtotal.toLocaleString("en-IN")}\n\nPlease share delivery options to my pincode.`
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-white shadow-2xl flex flex-col border-l border-[#EBE3DA]"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#EBE3DA] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#A34850]" />
                  <h2 className="font-serif text-lg font-bold text-[#19181B]">Your Shopping Bag</h2>
                  <span className="text-xs bg-[#F4EFEA] text-[#786F63] px-2 py-0.5 rounded-full font-bold">
                    {cart.reduce((t, i) => t + i.quantity, 0)} items
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full text-[#786F63] hover:text-[#19181B] hover:bg-[#FAF8F5] cursor-pointer"
                  aria-label="Close Cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="bg-[#FAF8F5] p-4 border-b border-[#EBE3DA] text-xs">
                <div className="flex justify-between font-semibold mb-1.5 text-[#524D46]">
                  {subtotalINR >= freeShippingThresholdINR ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      You unlocked FREE All-India Express Delivery!
                    </span>
                  ) : (
                    <span>
                      Add <strong>{currencyObj.symbol}{Math.round((freeShippingThresholdINR - subtotalINR) * currencyObj.rate).toLocaleString("en-IN")}</strong> more for FREE Delivery!
                    </span>
                  )}
                  <span>{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#E5DDD2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A34850] transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="py-20 text-center text-[#786F63]">
                    <ShoppingBag className="w-12 h-12 mx-auto text-[#D9D0C3] mb-3" />
                    <p className="font-serif text-base text-[#19181B]">Your bag is currently empty</p>
                    <p className="text-xs mt-1">Explore our latest pure silk sarees and bridal collections.</p>
                    <button
                      onClick={onClose}
                      className="mt-5 px-6 py-2.5 rounded-full bg-[#19181B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#A34850] transition-colors cursor-pointer"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item, index) => {
                    const itemPrice = Math.round(item.product.priceINR * currencyObj.rate);
                    return (
                      <div
                        key={`${item.product.id}-${item.size}-${index}`}
                        className="flex gap-4 p-3 rounded-2xl bg-[#FAF8F5] border border-[#EBE3DA]"
                      >
                        <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#F4EFEA] shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.title}
                            fill
                            sizes="80px"
                            className="object-cover object-top"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-serif text-xs font-bold text-[#19181B] line-clamp-1">
                                {item.product.title}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(index)}
                                className="text-[#9E9485] hover:text-[#C2414C] transition-colors cursor-pointer"
                                title="Remove"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-[11px] text-[#786F63] mt-0.5 block">
                              Size: <strong>{item.size}</strong>
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-bold text-[#19181B]">
                              {currencyObj.symbol}{(itemPrice * item.quantity).toLocaleString("en-IN")}
                            </span>

                            {/* Quantity */}
                            <div className="flex items-center border border-[#E5DDD2] rounded-lg bg-white overflow-hidden text-xs">
                              <button
                                onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                                className="px-2 py-0.5 hover:bg-[#FAF8F5] font-bold cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2 font-bold">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                                className="px-2 py-0.5 hover:bg-[#FAF8F5] font-bold cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer / Checkout */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#EBE3DA] bg-white space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#786F63]">Subtotal:</span>
                    <span className="font-extrabold text-base text-[#19181B]">
                      {currencyObj.symbol}{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#8C8273]">
                    GST included. Free insured delivery across India on orders above ₹2,999.
                  </p>

                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="w-full py-3.5 px-6 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={whatsappCheckoutLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-6 rounded-full bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Instant Order via WhatsApp</span>
                  </a>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8C8273] pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Genuine Silk Mark Certified & Insured Delivery</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
