"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  Coins,
  Check,
  AlertCircle,
  Tag,
  ArrowRight,
  Lock,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#C59B27] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const router = useRouter();
  const { cart, clearCart, currentCurrency } = useShop();
  const { user } = useAuth();

  // Address fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Pipariya");
  const [state, setState] = useState("Madhya Pradesh");
  const [pincode, setPincode] = useState("461775");

  // Coupon & Points
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMsg, setCouponMsg] = useState("");
  const [couponError, setCouponError] = useState("");

  const [redeemCoins, setRedeemCoins] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  // Prefill user details if logged in
  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.name || "");
      if (!email) setEmail(user.email || "");
      if (!phone) setPhone(user.phone || "");

      if (user.addresses && user.addresses.length > 0) {
        const defaultAddr = user.addresses.find((a) => a.isDefault) || user.addresses[0];
        setStreet(defaultAddr.street || "");
        setCity(defaultAddr.city || "Pipariya");
        setState(defaultAddr.state || "Madhya Pradesh");
        setPincode(defaultAddr.pincode || "461775");
      }
    }
  }, [user]);

  // Calculate Subtotal
  const subtotalINR = cart.reduce(
    (sum, item) => sum + (Number(item.priceINR) || 0) * (item.quantity || 1),
    0
  );

  // Apply Coupon
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    setCouponError("");
    setCouponMsg("");

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: couponCode.trim(),
          cartTotal: subtotalINR,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid coupon code");
      }

      setAppliedCoupon(data.data.coupon);
      setCouponDiscount(data.data.discountAmount);
      setCouponMsg(data.message);
    } catch (err) {
      setAppliedCoupon(null);
      setCouponDiscount(0);
      setCouponError(err.message);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCode("");
    setCouponMsg("");
    setCouponError("");
  };

  // Points Discount (1 coin = ₹1, max 50% of subtotal)
  const userCoins = user?.loyaltyPoints || 0;
  const maxCoinsAllowed = Math.floor((subtotalINR - couponDiscount) * 0.5);
  const coinsToRedeem = redeemCoins ? Math.min(userCoins, maxCoinsAllowed) : 0;
  const pointsDiscountINR = coinsToRedeem;

  // Free shipping threshold: ₹1,500
  const shippingINR = subtotalINR >= 1500 || subtotalINR === 0 ? 0 : 150;
  const netTotalINR = Math.max(0, subtotalINR - couponDiscount - pointsDiscountINR + shippingINR);

  // Initiate Payment
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your shopping cart is empty!");
      return;
    }

    if (!fullName || !email || !phone || !street || !pincode) {
      setCheckoutError("Please fill in all delivery details");
      return;
    }

    setIsProcessing(true);
    setCheckoutError("");

    try {
      // 1. Create order on backend
      const token = typeof window !== "undefined" ? localStorage.getItem("chaman_auth_token") : null;
      const headers = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const createRes = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers,
        body: JSON.stringify({
          customer: { name: fullName, email, phone },
          shippingAddress: { fullName, phone, street, city, state, pincode },
          items: cart.map((item) => ({
            productId: item.id,
            title: item.title,
            priceINR: item.priceINR,
            quantity: item.quantity,
            size: item.selectedSize || item.size || "Free Size",
            image: item.image,
          })),
          couponCode: appliedCoupon ? appliedCoupon.code : null,
          pointsToRedeem: coinsToRedeem,
          paymentMethod,
        }),
      });

      const createData = await createRes.json();
      if (!createRes.ok || !createData.success) {
        throw new Error(createData.message || "Failed to initiate order");
      }

      const { orderId, razorpayOrderId, trackingNumber } = createData.data;

      // 2. Complete payment (using simulated test signature for local testing)
      const verifyRes = await fetch("/api/checkout/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          razorpayOrderId,
          razorpayPaymentId: `pay_sim_${Date.now()}`,
          razorpaySignature: "simulated_success_signature",
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.message || "Payment verification failed");
      }

      // Clear cart
      if (typeof clearCart === "function") {
        clearCart();
      }

      // Redirect to Order Success Page
      router.push(`/order-success/${trackingNumber}`);
    } catch (err) {
      setCheckoutError(err.message);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#19181B] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#7C7367] mb-6">
          <Link href="/" className="hover:text-[#A34850] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8AE9F]" />
          <Link href="/collections/all" className="hover:text-[#A34850] transition-colors">Collections</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8AE9F]" />
          <span className="font-semibold text-[#19181B]">Secure Checkout</span>
        </div>

        {cart.length === 0 ? (
          <div className="max-w-md mx-auto my-16 text-center bg-white rounded-3xl p-8 border border-[#EADBCA] shadow-sm">
            <ShoppingBag className="w-12 h-12 text-[#C59B27] mx-auto mb-3 opacity-60" />
            <h2 className="font-serif text-2xl font-bold text-[#19181B]">Your Shopping Bag is Empty</h2>
            <p className="text-xs text-[#7C7367] mt-1.5 mb-6">
              Add pure silk Banarasi sarees, anarkalis or festive lehengas to proceed to checkout.
            </p>
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT 7 COLS: ADDRESS & PAYMENT FORM */}
            <div className="lg:col-span-7 space-y-6">
              {/* Form Box */}
              <form onSubmit={handlePlaceOrder} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCA] shadow-sm space-y-6">
                {/* Step 1: Contact Details */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#19181B] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#19181B] text-white text-xs flex items-center justify-center font-mono">1</span>
                    <span>Customer & Contact Information</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ananya Sharma"
                        required
                        className="w-full h-10 px-3.5 bg-[#FAF8F5] border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">Phone Number (For Delivery SMS/WhatsApp) *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                        className="w-full h-10 px-3.5 bg-[#FAF8F5] border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">Email Address (For Digital Invoice) *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ananya@example.com"
                        required
                        className="w-full h-10 px-3.5 bg-[#FAF8F5] border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Delivery Address */}
                <div className="pt-4 border-t border-[#F4EFEA]">
                  <h3 className="font-serif text-lg font-bold text-[#19181B] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#19181B] text-white text-xs flex items-center justify-center font-mono">2</span>
                    <span>Shipping Address in India</span>
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">Flat / Street / Area *</label>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="House No, Street, Landmark"
                        required
                        className="w-full h-10 px-3.5 bg-[#FAF8F5] border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">City *</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                          className="w-full h-10 px-3 bg-[#FAF8F5] border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">State *</label>
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          required
                          className="w-full h-10 px-3 bg-[#FAF8F5] border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">Pincode *</label>
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          required
                          className="w-full h-10 px-3 bg-[#FAF8F5] border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Payment Method Selection */}
                <div className="pt-4 border-t border-[#F4EFEA]">
                  <h3 className="font-serif text-lg font-bold text-[#19181B] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#19181B] text-white text-xs flex items-center justify-center font-mono">3</span>
                    <span>Payment Selection</span>
                  </h3>

                  <div className="space-y-2.5">
                    <label
                      onClick={() => setPaymentMethod("RAZORPAY")}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        paymentMethod === "RAZORPAY"
                          ? "border-[#C59B27] bg-[#FFFDF9] shadow-xs"
                          : "border-[#EADBCA] bg-white hover:border-[#C59B27]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "RAZORPAY"}
                        onChange={() => setPaymentMethod("RAZORPAY")}
                        className="mt-1 accent-[#C59B27]"
                      />
                      <div>
                        <p className="font-bold text-xs text-[#19181B]">
                          Online Payment (UPI, GooglePay, PhonePe, Cards, NetBanking via Razorpay)
                        </p>
                        <p className="text-[11px] text-[#7C7367] mt-0.5">
                          100% Secure • Instant confirmation & expedited showroom dispatch
                        </p>
                      </div>
                    </label>

                    <label
                      onClick={() => setPaymentMethod("COD")}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        paymentMethod === "COD"
                          ? "border-[#C59B27] bg-[#FFFDF9] shadow-xs"
                          : "border-[#EADBCA] bg-white hover:border-[#C59B27]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                        className="mt-1 accent-[#C59B27]"
                      />
                      <div>
                        <p className="font-bold text-xs text-[#19181B]">
                          Cash on Delivery (COD)
                        </p>
                        <p className="text-[11px] text-[#7C7367] mt-0.5">
                          Pay cash to courier executive upon delivery
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {checkoutError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{checkoutError}</span>
                  </div>
                )}

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#19181B] via-[#2A262E] to-[#19181B] hover:from-[#A34850] hover:to-[#842A32] text-white font-extrabold text-xs uppercase tracking-wider shadow-xl transition-all cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isProcessing
                      ? "Securing Order..."
                      : `Pay & Confirm Order • ₹${netTotalINR.toLocaleString("en-IN")}`}
                  </span>
                </button>
              </form>
            </div>

            {/* RIGHT 5 COLS: ORDER SUMMARY, COUPONS & COINS */}
            <div className="lg:col-span-5 space-y-6">
              {/* Order Items Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#EADBCA] shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#19181B] border-b border-[#F4EFEA] pb-3 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-xs font-mono font-bold text-[#7C7367]">{cart.length} items</span>
                </h3>

                {/* Items List */}
                <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-[#F4EFEA]">
                  {cart.map((item, idx) => (
                    <div key={idx} className="pt-2 flex items-center gap-3">
                      <div className="w-12 h-14 rounded-lg bg-[#FAF8F5] relative overflow-hidden shrink-0 border border-[#EADBCA]">
                        <Image src={item.image || "/images/saree-champagne.jpg"} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#19181B] truncate">{item.title}</p>
                        <p className="text-[11px] text-[#7C7367]">
                          Size: {item.selectedSize || "Standard"} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#19181B]">
                        ₹{((item.priceINR || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Festival Coupon Form */}
                <div className="pt-3 border-t border-[#F4EFEA]">
                  <p className="text-[11px] font-bold text-[#5A5348] mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>Have a Festival Coupon Code?</span>
                  </p>

                  {appliedCoupon ? (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                      <div>
                        <span className="font-mono font-black">{appliedCoupon.code}</span>
                        <span className="ml-1 text-[11px]">(-₹{couponDiscount.toLocaleString("en-IN")})</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="e.g. ROYAL10, DIWALI20"
                        className="flex-1 h-9 px-3 bg-[#FAF8F5] border border-[#DDD5C9] rounded-xl text-xs outline-none font-mono font-bold"
                      />
                      <button
                        type="submit"
                        disabled={couponLoading}
                        className="px-4 py-1.5 rounded-xl bg-[#19181B] text-white text-xs font-bold hover:bg-[#A34850] transition-colors cursor-pointer disabled:opacity-75"
                      >
                        {couponLoading ? "..." : "Apply"}
                      </button>
                    </form>
                  )}

                  {couponMsg && <p className="text-[11px] font-bold text-emerald-700 mt-1">{couponMsg}</p>}
                  {couponError && <p className="text-[11px] font-bold text-rose-600 mt-1">{couponError}</p>}
                </div>

                {/* Chaman Coins Redemption Toggle */}
                {user && userCoins > 0 && (
                  <div className="pt-3 border-t border-[#F4EFEA]">
                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={redeemCoins}
                          onChange={(e) => setRedeemCoins(e.target.checked)}
                          className="accent-amber-600 w-4 h-4 rounded"
                        />
                        <div>
                          <p className="text-xs font-bold text-amber-950 flex items-center gap-1">
                            <Coins className="w-3.5 h-3.5 text-amber-600" />
                            <span>Redeem Chaman Coins</span>
                          </p>
                          <p className="text-[10px] text-amber-800">
                            Available: {userCoins} coins (₹{userCoins} value)
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-amber-950">
                        {redeemCoins ? `-₹${coinsToRedeem}` : "Apply"}
                      </span>
                    </label>
                  </div>
                )}

                {/* Price Breakdown Calculation */}
                <div className="pt-3 border-t border-[#F4EFEA] space-y-2 text-xs">
                  <div className="flex justify-between text-[#5A5348]">
                    <span>Cart Subtotal</span>
                    <span className="font-mono">₹{subtotalINR.toLocaleString("en-IN")}</span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Festival Coupon ({appliedCoupon?.code})</span>
                      <span className="font-mono">-₹{couponDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  {pointsDiscountINR > 0 && (
                    <div className="flex justify-between text-amber-800 font-semibold">
                      <span>Chaman Coins Redeemed ({coinsToRedeem})</span>
                      <span className="font-mono">-₹{pointsDiscountINR.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#5A5348]">
                    <span>Insured Courier Delivery</span>
                    <span className="font-mono">
                      {shippingINR === 0 ? (
                        <strong className="text-emerald-700 uppercase">FREE</strong>
                      ) : (
                        `₹${shippingINR}`
                      )}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#EADBCA] flex justify-between items-baseline font-bold text-base text-[#19181B]">
                    <span>Total Amount</span>
                    <span className="font-mono text-xl text-[#19181B]">
                      ₹{netTotalINR.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="p-4 bg-[#FCFAF5] rounded-2xl border border-[#EADBCA] flex items-center justify-around text-center text-[10.5px] text-[#7C7367]">
                <div className="space-y-1">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto" />
                  <p>100% Authentic Handloom</p>
                </div>
                <div className="space-y-1">
                  <Truck className="w-5 h-5 text-[#C59B27] mx-auto" />
                  <p>Insured Doorstep Delivery</p>
                </div>
                <div className="space-y-1">
                  <Coins className="w-5 h-5 text-amber-600 mx-auto" />
                  <p>5% Loyalty Cashback</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

