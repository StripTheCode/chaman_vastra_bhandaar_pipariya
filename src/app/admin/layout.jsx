"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  Layers,
  ShoppingBag,
  Coins,
  ArrowLeft,
  ShieldCheck,
  Plus,
  LayoutDashboard,
  ExternalLink,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const NAV_LINKS = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Product Listings", icon: Package },
    { href: "/admin/categories", label: "Categories", icon: Layers },
    { href: "/admin/orders", label: "Customer Orders", icon: ShoppingBag },
    { href: "/admin/coupons", label: "Festival Coupons", icon: Coins },
  ];

  return (
    <div className="min-h-screen bg-[#F4EFEA] text-[#19181B] flex flex-col md:flex-row font-sans">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#19181B] text-white flex flex-col shrink-0 border-r border-white/10">
        {/* Brand Seal Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E6C665] via-[#C59B27] to-[#8C6B1C] flex items-center justify-center text-[#1A181C] font-serif font-black text-xs shadow-md">
              CVB
            </div>
            <div>
              <p className="font-serif text-sm font-bold tracking-wider text-white uppercase leading-none">
                CHAMAN ADMIN
              </p>
              <p className="text-[10px] text-[#C59B27] tracking-widest uppercase mt-0.5 font-mono">
                Store Console
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#C59B27] text-[#19181B] font-bold shadow-md"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Back to Customer Store Link */}
        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/80 hover:text-white transition-all"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C59B27]" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-[#EBE3DA] px-6 sm:px-8 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-[#5A5348]">Chaman Pipariya Store Live</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-bold">
              👑 Head Merchant
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

