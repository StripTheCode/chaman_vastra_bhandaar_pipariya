import { db } from "@/lib/db";
import { PRODUCTS, CATEGORIES, CURRENCIES } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InteractiveProductViewer from "@/components/product/InteractiveProductViewer";
import YouMayAlsoLike from "@/components/product/YouMayAlsoLike";
import Link from "next/link";
import { Star, ShoppingBag, MessageCircle, Truck, Ruler, Coins, Check, Heart, ShieldCheck, ChevronRight } from "lucide-react";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  // Find product from DB or fallback to PRODUCTS list
  let product = await db.products.findById(id);
  if (!product) {
    product = PRODUCTS.find((p) => String(p.id) === String(id));
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
        <Header />
        <div className="flex-1 max-w-xl mx-auto py-24 px-4 text-center">
          <h1 className="font-serif text-3xl font-bold text-[#19181B] mb-3">Product Not Found</h1>
          <p className="text-xs text-[#7C7367] mb-6">
            The dress you are looking for may have been sold or moved to another collection.
          </p>
          <Link
            href="/collections/all"
            className="px-6 py-3 rounded-full bg-[#19181B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#A34850] transition-colors"
          >
            Explore All Collections
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const priceINR = Number(product.priceINR || 0);
  const origPriceINR = Number(product.originalPriceINR || priceINR);
  const earnedCoins = Math.round(priceINR * 0.05);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#19181B] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#7C7367] mb-6 flex-wrap">
          <Link href="/" className="hover:text-[#A34850] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8AE9F]" />
          <Link href={`/collections/${product.category || "all"}`} className="hover:text-[#A34850] transition-colors capitalize">
            {product.category || "Collections"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8AE9F]" />
          <span className="font-semibold text-[#19181B] truncate max-w-xs">{product.title}</span>
        </div>

        {/* 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCA] shadow-sm">
          {/* LEFT: 360° INTERACTIVE ROTATE & ZOOM STUDIO */}
          <div className="lg:col-span-7">
            <InteractiveProductViewer product={product} />
          </div>

          {/* RIGHT: COMPLETE PRODUCT SPECIFICATIONS & ACTIONS */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#19181B] text-[#E6C665] text-[10px] font-bold uppercase tracking-widest">
                  {product.badge || "Pure Handloom Heritage"}
                </span>

                <div className="flex items-center gap-1 text-[#C59B27] text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating || 5}</span>
                  <span className="text-[#8C8273] font-normal">({product.reviews || 84} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#19181B] leading-snug">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 my-4 pb-3 border-b border-[#F4EFEA]">
                <span className="font-mono text-3xl font-black text-[#19181B]">
                  ₹{priceINR.toLocaleString("en-IN")}
                </span>
                {origPriceINR > priceINR && (
                  <span className="text-sm text-[#9E9485] line-through">
                    ₹{origPriceINR.toLocaleString("en-IN")}
                  </span>
                )}
                {product.discount && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-extrabold">
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Coins Reward */}
              <div className="mb-5 p-2.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border border-amber-300/60 flex items-center gap-2.5">
                <Coins className="w-5 h-5 text-amber-700 shrink-0" />
                <p className="text-xs text-amber-950 font-bold leading-tight">
                  Earn <span className="underline decoration-amber-600">{earnedCoins} Chaman Coins</span> (₹{earnedCoins} Cashback) on this purchase!
                </p>
              </div>

              {/* Sizes Available */}
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#19181B] mb-2">
                  Available Sizes / Blouse Options:
                </p>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(product.sizes) ? product.sizes : ["Free Size"]).map((sz) => (
                    <span
                      key={sz}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-[#DDD5C9] bg-[#FAF8F5] text-[#19181B]"
                    >
                      {sz}
                    </span>
                  ))}
                </div>
              </div>

              {/* WhatsApp Purchase Button */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/918269260928?text=${encodeURIComponent(
                    `Namaste Chaman Vastra Bhandar Pipariya, I am interested in buying "${product.title}" priced at ₹${priceINR.toLocaleString('en-IN')}. Please confirm availability.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order via WhatsApp Direct</span>
                </a>

                <div className="flex items-center justify-center gap-2 text-xs text-[#7C7367] pt-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{product.dispatch || "Dispatches in 24 hrs with Insured Courier"}</span>
                </div>
              </div>
            </div>

            {/* Fabric & Craft Details Card */}
            <div className="p-4 bg-[#FCFAF5] rounded-2xl border border-[#EADBCA] space-y-2 text-xs">
              <p className="flex justify-between">
                <span className="text-[#7C7367]">Fabric:</span>
                <strong className="text-[#19181B]">{product.fabric || "Pure Silk"}</strong>
              </p>
              <p className="flex justify-between">
                <span className="text-[#7C7367]">Occasion:</span>
                <strong className="text-[#19181B]">{product.occasion || "Festive & Bridal"}</strong>
              </p>
              <p className="flex justify-between">
                <span className="text-[#7C7367]">Care:</span>
                <strong className="text-[#19181B]">{product.care || "Dry Clean Only"}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* YOU MAY ALSO LIKE SECTION */}
        <YouMayAlsoLike
          currentProductId={product.id}
          category={product.category}
          currentCurrency="INR"
        />
      </main>

      <Footer />
    </div>
  );
}

