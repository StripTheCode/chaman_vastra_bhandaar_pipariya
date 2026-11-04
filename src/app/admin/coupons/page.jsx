"use client";

import { useState, useEffect } from "react";
import { Coins, Plus, Trash2, X, Check, AlertCircle, Sparkles, Tag } from "lucide-react";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    festival: "Diwali Grand Utsav",
    discountType: "percentage",
    value: 20,
    minOrderValue: 3000,
    maxDiscount: 5000,
    description: "Special Festival Discount for Privilege Members",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const loadCoupons = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/coupons");
      const json = await res.json();
      if (json.success) setCoupons(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const openCreateModal = () => {
    setFormData({
      code: "",
      festival: "Diwali Grand Utsav",
      discountType: "percentage",
      value: 20,
      minOrderValue: 3000,
      maxDiscount: 5000,
      description: "Special Festival Discount for Privilege Members",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      const payload = {
        ...formData,
        code: formData.code.toUpperCase().trim(),
        value: Number(formData.value),
        minOrderValue: Number(formData.minOrderValue || 0),
        maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : null,
      };

      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Failed to create coupon");

      setCoupons((prev) => [...prev, json.data]);
      setIsModalOpen(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (couponId) => {
    if (!confirm("Are you sure you want to deactivate this coupon?")) return;

    try {
      const res = await fetch(`/api/admin/coupons/${couponId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCoupons((prev) => prev.filter((c) => String(c.id) !== String(couponId)));
      } else {
        alert("Failed to delete coupon");
      }
    } catch (err) {
      alert("Error deleting coupon");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EADBCA] shadow-2xs">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#19181B] flex items-center gap-2.5">
            <Coins className="w-6 h-6 text-[#C59B27]" />
            <span>Festival Coupons & Privilege Discounts</span>
          </h1>
          <p className="text-xs text-[#7C7367] mt-0.5">
            Create promotional codes, seasonal festive sales, and cart discount rules.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Create Festival Coupon</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-3 py-16 text-center">
            <div className="w-8 h-8 border-3 border-[#C59B27] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-[#7C7367]">Loading coupons...</p>
          </div>
        ) : coupons.length === 0 ? (
          <div className="col-span-3 py-16 text-center bg-white rounded-3xl border border-[#EADBCA]">
            <Tag className="w-10 h-10 text-[#C59B27] mx-auto mb-2 opacity-50" />
            <p className="font-serif text-base font-bold text-[#19181B]">No active festival coupons</p>
            <p className="text-xs text-[#7C7367] mt-1 mb-4">Create your first campaign to boost sales.</p>
            <button
              type="button"
              onClick={openCreateModal}
              className="px-4 py-2 rounded-full bg-[#19181B] text-white text-xs font-bold"
            >
              Create Coupon
            </button>
          </div>
        ) : (
          coupons.map((c) => (
            <div
              key={c.id || c.code}
              className="bg-white rounded-3xl p-6 border border-[#EADBCA] hover:border-[#C59B27] shadow-xs transition-all relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-300 text-amber-900 font-mono font-black text-sm tracking-wider">
                    {c.code}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id)}
                    className="p-1 rounded-lg text-[#7C7367] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Coupon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs font-bold text-[#A34850] uppercase tracking-wide">
                  {c.festival || "Special Privilege"}
                </p>
                <p className="font-serif text-lg font-bold text-[#19181B] mt-0.5">
                  {c.discountType === "percentage" ? `${c.value}% Instant Discount` : `Flat ₹${c.value} OFF`}
                </p>
                <p className="text-xs text-[#5A5348] mt-1 leading-relaxed">
                  {c.description || "Valid on all handcrafted ethnic wear"}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#F4EFEA] flex items-center justify-between text-[11px] text-[#7C7367]">
                <span>Min Order: ₹{Number(c.minOrderValue || 0).toLocaleString("en-IN")}</span>
                {c.maxDiscount && <span>Max Cap: ₹{Number(c.maxDiscount).toLocaleString("en-IN")}</span>}
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE COUPON MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]">
          <div className="bg-[#FFFAF3] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#EADBCA] shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EADBCA]">
              <h3 className="font-serif text-lg font-bold text-[#19181B]">
                Create Festival Coupon
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white text-[#7C7367] hover:text-black flex items-center justify-center border border-[#EADBCA] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. DIWALI25, ROYAL15"
                  required
                  className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none font-mono font-bold tracking-wider"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                  Festival / Campaign Name
                </label>
                <input
                  type="text"
                  value={formData.festival}
                  onChange={(e) => setFormData({ ...formData, festival: e.target.value })}
                  placeholder="e.g. Diwali Grand Utsav"
                  required
                  className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                    Discount Type
                  </label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                    className="w-full h-10 px-3 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none cursor-pointer"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Flat Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="20"
                    required
                    min={1}
                    className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                    Min Order Value (INR)
                  </label>
                  <input
                    type="number"
                    value={formData.minOrderValue}
                    onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                    placeholder="3000"
                    className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                    Max Discount Cap (INR)
                  </label>
                  <input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    placeholder="5000"
                    className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. 25% OFF on Bridal Lehengas"
                  className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full h-11 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-75"
                >
                  {formLoading ? "Publishing Coupon..." : "Publish Festival Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

