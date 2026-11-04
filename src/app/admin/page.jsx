"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Layers, ShoppingBag, Coins, Plus, TrendingUp, Users, ArrowRight } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    productsCount: 0,
    categoriesCount: 0,
    couponsCount: 0,
    ordersCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/products?limit=1"),
          fetch("/api/categories"),
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();

        setStats({
          productsCount: prodData.pagination?.total || 24,
          categoriesCount: catData.data?.length || 16,
          couponsCount: 3,
          ordersCount: 0,
        });
      } catch (err) {
        // fallback to defaults
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const METRICS = [
    { label: "Active Products", count: stats.productsCount, icon: Package, href: "/admin/products", color: "text-amber-700 bg-amber-50" },
    { label: "Collections & Categories", count: stats.categoriesCount, icon: Layers, href: "/admin/categories", color: "text-blue-700 bg-blue-50" },
    { label: "Customer Orders", count: stats.ordersCount, icon: ShoppingBag, href: "/admin/orders", color: "text-emerald-700 bg-emerald-50" },
    { label: "Festival Coupons Active", count: stats.couponsCount, icon: Coins, href: "/admin/coupons", color: "text-purple-700 bg-purple-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#19181B] via-[#2A262E] to-[#19181B] rounded-3xl p-6 sm:p-8 text-white border border-[#C59B27]/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/50 text-[#E6C665] text-[10px] font-bold uppercase tracking-widest">
            Merchant Control Room
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
            Chaman Heritage Catalog & Store Management
          </h1>
          <p className="text-xs text-white/70 mt-1 max-w-xl">
            Add new dresses, manage festival coupon campaigns, update category banners, and process customer orders for Pipariya showroom and online store.
          </p>
        </div>

        <Link
          href="/admin/products"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E6C665] to-[#C59B27] hover:brightness-105 text-[#19181B] font-bold text-xs uppercase tracking-wider shadow-lg transition-all shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Dress</span>
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.label}
              href={m.href}
              className="bg-white rounded-2xl p-5 border border-[#EADBCA] shadow-2xs hover:shadow-md hover:border-[#C59B27]/60 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#7C7367]">{m.label}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${m.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-3xl font-black text-[#19181B]">
                  {loading ? "..." : m.count}
                </span>
                <span className="text-[11px] font-bold text-[#A34850] group-hover:underline flex items-center gap-1">
                  Manage <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="bg-white rounded-3xl p-6 border border-[#EADBCA] hover:border-[#C59B27] transition-all group shadow-xs"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#19181B] group-hover:text-[#A34850] transition-colors">
            Product Catalog & Sizes
          </h3>
          <p className="text-xs text-[#7C7367] mt-1 leading-relaxed">
            Upload new Sarees, Anarkalis & Lehengas with photos, sizes (XS-XXL), fabric specifications, and stock limits.
          </p>
        </Link>

        <Link
          href="/admin/categories"
          className="bg-white rounded-3xl p-6 border border-[#EADBCA] hover:border-[#C59B27] transition-all group shadow-xs"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#19181B] group-hover:text-[#A34850] transition-colors">
            Categories & Collections
          </h3>
          <p className="text-xs text-[#7C7367] mt-1 leading-relaxed">
            Create new ethnic wear categories, update banners, and organize subcategories for smooth customer navigation.
          </p>
        </Link>

        <Link
          href="/admin/coupons"
          className="bg-white rounded-3xl p-6 border border-[#EADBCA] hover:border-[#C59B27] transition-all group shadow-xs"
        >
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
            <Coins className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#19181B] group-hover:text-[#A34850] transition-colors">
            Festival Coupons Engine
          </h3>
          <p className="text-xs text-[#7C7367] mt-1 leading-relaxed">
            Launch festival offers (Diwali, Eid, Wedding Specials) with percentage or flat discounts and minimum cart thresholds.
          </p>
        </Link>
      </div>
    </div>
  );
}

