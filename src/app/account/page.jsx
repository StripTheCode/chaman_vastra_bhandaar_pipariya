"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  User,
  Coins,
  Package,
  MapPin,
  Plus,
  Trash2,
  Check,
  ShieldCheck,
  ArrowRight,
  Award,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  LogOut,
  Gift,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#C59B27] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}

function AccountContent() {
  const { user, loading, logout, openAuthModal, updateProfile } = useAuth();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressLabel, setAddressLabel] = useState("Home");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Pipariya");
  const [state, setState] = useState("Madhya Pradesh");
  const [pincode, setPincode] = useState("461775");
  const [phone, setAddressPhone] = useState("");
  const [savingAddress, setSavingAddress] = useState(false);
  const [addressSuccess, setAddressSuccess] = useState("");

  useEffect(() => {
    if (searchParams.get("tab")) {
      setActiveTab(searchParams.get("tab"));
    }
  }, [searchParams]);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!street || !city || !pincode) return;

    setSavingAddress(true);
    setAddressSuccess("");

    try {
      const currentAddresses = user?.addresses || [];
      const newAddress = {
        id: `addr_${Date.now()}`,
        label: addressLabel,
        street,
        city,
        state,
        pincode,
        phone: phone || user?.phone || "",
        isDefault: currentAddresses.length === 0,
      };

      await updateProfile({
        addresses: [...currentAddresses, newAddress],
      });

      setAddressSuccess("Address saved successfully!");
      setStreet("");
      setShowAddressModal(false);
      setTimeout(() => setAddressSuccess(""), 3000);
    } catch (err) {
      alert("Failed to save address: " + err.message);
    } finally {
      setSavingAddress(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!confirm("Are you sure you want to remove this address?")) return;
    try {
      const updated = (user?.addresses || []).filter((a) => a.id !== addressId);
      await updateProfile({ addresses: updated });
    } catch (err) {
      alert("Failed to delete address");
    }
  };

  const handleSetDefaultAddress = async (addressId) => {
    try {
      const updated = (user?.addresses || []).map((a) => ({
        ...a,
        isDefault: a.id === addressId,
      }));
      await updateProfile({ addresses: updated });
    } catch (err) {
      alert("Failed to update default address");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#19181B] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#7C7367] mb-6">
          <Link href="/" className="hover:text-[#A34850] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8AE9F]" />
          <span className="font-semibold text-[#19181B]">My Heritage Account</span>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-3 border-[#C59B27] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-[#7C7367]">Loading your privilege profile...</p>
          </div>
        ) : !user ? (
          /* GUEST PROMPT VIEW */
          <div className="max-w-md mx-auto my-12 text-center bg-white rounded-3xl p-8 border border-[#EADBCA] shadow-xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-4">
              <User className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#19181B]">
              Sign in to Your Account
            </h2>
            <p className="text-xs text-[#7C7367] mt-1.5 mb-6 leading-relaxed">
              Access your loyalty points, track your orders, save delivery addresses, and enjoy bespoke privileges.
            </p>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => openAuthModal("signin")}
                className="w-full py-3 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => openAuthModal("register")}
                className="w-full py-3 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🎁 Claim 100 Free Chaman Coins</span>
              </button>
            </div>
          </div>
        ) : (
          /* LOGGED IN USER DASHBOARD */
          <div className="space-y-8">
            {/* Top Privilege Card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#2D2A32] via-[#1A181C] to-[#121114] text-white p-6 sm:p-8 shadow-2xl border border-[#C59B27]/40 overflow-hidden">
              {/* Background Ornamental Accent */}
              <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#C59B27]/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#E6C665] via-[#C59B27] to-[#8C6B1C] p-1 shadow-lg shrink-0">
                    <div className="w-full h-full rounded-full bg-[#1A181C] flex items-center justify-center text-[#E6C665] font-serif font-black text-xl sm:text-2xl">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/50 text-[#E6C665] text-[10px] font-bold uppercase tracking-widest">
                        Royal Privilege Member
                      </span>
                    </div>
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                      {user.name}
                    </h1>
                    <p className="text-xs text-white/70 flex items-center gap-2 mt-0.5">
                      <span>{user.email}</span>
                      {user.phone && <span>• {user.phone}</span>}
                    </p>
                  </div>
                </div>

                {/* Loyalty Coins Balance Pill */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-amber-950 shadow-md">
                    <Coins className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-amber-200/90">
                      Chaman Coins
                    </p>
                    <p className="font-mono text-2xl font-black text-white">
                      {user.loyaltyPoints || 0}
                    </p>
                    <p className="text-[10px] text-white/70">
                      = ₹{user.loyaltyPoints || 0} Instant Checkout Discount
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[#EBE3DA] pb-2 overflow-x-auto">
              {[
                { id: "overview", label: "Overview & Ledger", icon: Coins },
                { id: "addresses", label: "Saved Addresses", icon: MapPin },
                { id: "orders", label: "My Orders", icon: Package },
              ].map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-[#19181B] text-white shadow-sm"
                        : "text-[#7C7367] hover:text-[#19181B] hover:bg-black/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT: OVERVIEW & LEDGER */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Points Ledger */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#EADBCA] shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-lg font-bold text-[#19181B] flex items-center gap-2">
                      <Coins className="w-5 h-5 text-amber-600" />
                      <span>Loyalty Points Ledger</span>
                    </h3>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      5% Cashback Active
                    </span>
                  </div>

                  {user.pointsHistory && user.pointsHistory.length > 0 ? (
                    <div className="divide-y divide-[#F4EFEA]">
                      {user.pointsHistory.map((item) => (
                        <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-[#19181B]">{item.reason}</p>
                            <p className="text-[11px] text-[#7C7367] mt-0.5">
                              {new Date(item.timestamp).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          <span
                            className={`font-mono font-bold text-sm px-2.5 py-1 rounded-lg ${
                              item.type === "CREDIT"
                                ? "bg-emerald-50 text-emerald-800"
                                : "bg-rose-50 text-rose-800"
                            }`}
                          >
                            {item.type === "CREDIT" ? `+${item.amount}` : `-${item.amount}`} Coins
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#7C7367] py-6 text-center">
                      No points transactions yet. Complete your first purchase to earn 5% coins!
                    </p>
                  )}
                </div>

                {/* Privilege Benefits Sidecard */}
                <div className="bg-[#FCFAF5] rounded-3xl p-6 border border-[#EADBCA] space-y-4">
                  <h4 className="font-serif text-base font-bold text-[#19181B] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C59B27]" />
                    <span>Your Membership Perks</span>
                  </h4>
                  <ul className="space-y-3 text-xs text-[#5A5348]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>100 Coins Welcome Reward:</strong> Credited to your account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>5% Cashback:</strong> Every order earns 5% Chaman Coins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Festival Early Access:</strong> VIP shopping 24 hrs before public sales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Free Insured Shipping:</strong> Across all pincodes in India</span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    onClick={logout}
                    className="w-full mt-4 py-2.5 rounded-full border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SAVED ADDRESSES */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCA] shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#19181B]">
                      Saved Delivery Addresses
                    </h3>
                    <p className="text-xs text-[#7C7367] mt-0.5">
                      Used for 1-click expedited checkout on Web & Mobile
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddressModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {user.addresses && user.addresses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          addr.isDefault
                            ? "border-[#C59B27] bg-[#FFFDF9] shadow-xs"
                            : "border-[#EADBCA] bg-white hover:border-[#C59B27]/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#EFE9DF] text-[10px] font-bold text-[#19181B] uppercase tracking-wider">
                            {addr.label || "Address"}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                              Default Shipping
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold text-[#19181B]">{user.name}</p>
                        <p className="text-xs text-[#5A5348] mt-1 leading-relaxed">
                          {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        {addr.phone && (
                          <p className="text-xs text-[#7C7367] mt-1">Phone: {addr.phone}</p>
                        )}

                        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[#F4EFEA] text-xs">
                          {!addr.isDefault && (
                            <button
                              type="button"
                              onClick={() => handleSetDefaultAddress(addr.id)}
                              className="text-[#A34850] font-bold hover:underline cursor-pointer"
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="text-rose-600 hover:text-rose-800 font-semibold ml-auto flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center border-2 border-dashed border-[#EADBCA] rounded-2xl">
                    <MapPin className="w-8 h-8 text-[#C59B27] mx-auto mb-2 opacity-60" />
                    <p className="text-xs font-bold text-[#19181B]">No addresses saved yet</p>
                    <p className="text-xs text-[#7C7367] mt-0.5 mb-4">
                      Add your home or office address for faster checkout.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowAddressModal(true)}
                      className="px-4 py-2 rounded-full bg-[#19181B] text-white text-xs font-bold hover:bg-[#A34850] transition-colors cursor-pointer"
                    >
                      Add Address Now
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: MY ORDERS */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCA] shadow-sm">
                <h3 className="font-serif text-xl font-bold text-[#19181B] mb-2">
                  My Orders & Live Tracking
                </h3>
                <p className="text-xs text-[#7C7367] mb-6">
                  Track orders placed from Pipariya showroom or online
                </p>

                <div className="py-12 text-center border-2 border-dashed border-[#EADBCA] rounded-2xl">
                  <Package className="w-8 h-8 text-[#C59B27] mx-auto mb-2 opacity-60" />
                  <p className="text-xs font-bold text-[#19181B]">No recent orders found</p>
                  <p className="text-xs text-[#7C7367] mt-0.5 mb-4">
                    Explore our latest Banarasi silk sarees, Anarkalis, and festive collections!
                  </p>
                  <Link
                    href="/collections/all"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                  >
                    <span>Shop Collections</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ADD ADDRESS MODAL */}
        {showAddressModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]">
            <div className="bg-[#FFFAF3] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#EADBCA] shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold text-[#19181B]">Add Delivery Address</h3>
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="w-8 h-8 rounded-full bg-white text-[#7C7367] hover:text-black flex items-center justify-center border border-[#EADBCA] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddAddress} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                    Address Label
                  </label>
                  <div className="flex gap-2">
                    {["Home", "Office", "Other"].map((lbl) => (
                      <button
                        key={lbl}
                        type="button"
                        onClick={() => setAddressLabel(lbl)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          addressLabel === lbl
                            ? "bg-[#19181B] text-white border-[#19181B]"
                            : "bg-white text-[#5A5348] border-[#DDD5C9]"
                        }`}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                    Street / Flat / Colony
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="e.g. 12, Station Road, Near Main Temple"
                    required
                    className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">Pincode</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required
                      className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setAddressPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={savingAddress}
                  className="w-full h-11 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white font-bold text-xs uppercase tracking-wider transition-all mt-4 cursor-pointer disabled:opacity-75"
                >
                  {savingAddress ? "Saving..." : "Save Delivery Address"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
