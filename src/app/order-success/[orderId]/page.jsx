import { db } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { Check, Package, MapPin, Coins, Truck, ArrowRight, Printer, Sparkles } from "lucide-react";

export default async function OrderSuccessPage({ params }) {
  const { orderId } = await params;

  let order = await db.orders.findOne(
    (o) => String(o.id) === String(orderId) || o.trackingNumber === orderId
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#19181B] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EADBCA] shadow-xl text-center space-y-6">
          {/* Celebratory Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-md animate-bounce">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
              Order Confirmed & Insured
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#19181B] mt-2">
              Thank You for Shopping with Chaman!
            </h1>
            <p className="text-xs text-[#7C7367] mt-1 max-w-md mx-auto">
              Your handcrafted ethnic dress is being prepared with heirloom care at our Pipariya central showroom.
            </p>
          </div>

          {/* Tracking Number & Estimated Delivery */}
          <div className="p-4 rounded-2xl bg-[#FCFAF5] border border-[#EADBCA] grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-[10.5px] uppercase font-bold text-[#8C8273]">Tracking Number</p>
              <p className="font-mono text-base font-black text-[#19181B]">
                {order?.trackingNumber || orderId}
              </p>
              <p className="text-[11px] text-[#7C7367] mt-0.5">Dispatches via BlueDart Express</p>
            </div>

            <div>
              <p className="text-[10.5px] uppercase font-bold text-[#8C8273]">Estimated Delivery</p>
              <p className="font-serif text-base font-bold text-emerald-800">
                3 to 5 Business Days
              </p>
              <p className="text-[11px] text-[#7C7367] mt-0.5">Insured doorstep handover</p>
            </div>
          </div>

          {/* Loyalty Reward Credit */}
          {order && (order.pointsEarned || 0) > 0 && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border border-amber-300 text-left flex items-center gap-3">
              <Coins className="w-6 h-6 text-amber-700 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-950">
                  🎉 You Earned +{order.pointsEarned} Chaman Coins on this order!
                </p>
                <p className="text-[11px] text-amber-800">
                  These coins have been credited to your account and can be redeemed on your next purchase.
                </p>
              </div>
            </div>
          )}

          {/* Ordered Items Summary */}
          {order && Array.isArray(order.items) && (
            <div className="text-left border-t border-[#F4EFEA] pt-4 space-y-3">
              <h3 className="font-serif text-base font-bold text-[#19181B]">Package Contents</h3>
              <div className="divide-y divide-[#F4EFEA]">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center gap-3">
                    <div className="w-12 h-14 rounded-lg bg-[#FAF8F5] relative overflow-hidden shrink-0 border border-[#EADBCA]">
                      <Image src={item.image || "/images/saree-champagne.jpg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#19181B] truncate">{item.title}</p>
                      <p className="text-[11px] text-[#7C7367]">Size: {item.size || "Standard"} • Qty: {item.quantity}</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#19181B]">
                      ₹{((item.priceINR || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Paid */}
              <div className="pt-3 border-t border-[#EADBCA] flex justify-between items-baseline font-bold text-sm">
                <span>Total Amount Paid</span>
                <span className="font-mono text-lg text-[#19181B]">
                  ₹{Number(order.totalINR || 0).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/collections/all"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/account?tab=orders"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#DDD5C9] text-[#19181B] text-xs font-bold uppercase tracking-wider transition-all"
            >
              View in My Account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

