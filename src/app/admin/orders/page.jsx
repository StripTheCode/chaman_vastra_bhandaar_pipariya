"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, Truck, Check, Clock, AlertCircle, Search, ExternalLink } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/orders");
      const json = await res.json();
      if (json.success) setOrders(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderStatus: newStatus,
          note: `Merchant advanced status to ${newStatus}`,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setOrders((prev) =>
          prev.map((o) => (String(o.id) === String(orderId) ? json.data : o))
        );
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      alert("Error updating order");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EADBCA] shadow-2xs">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#19181B] flex items-center gap-2.5">
            <ShoppingBag className="w-6 h-6 text-[#C59B27]" />
            <span>Customer Orders & Showroom Fulfillment</span>
          </h1>
          <p className="text-xs text-[#7C7367] mt-0.5">
            Track incoming purchases, verify payment status, and dispatch shipments with courier tracking.
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-[#EADBCA] shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-[#C59B27] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-[#7C7367]">Loading customer orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingBag className="w-10 h-10 text-[#C59B27] mx-auto mb-2 opacity-50" />
            <p className="font-serif text-base font-bold text-[#19181B]">No orders received yet</p>
            <p className="text-xs text-[#7C7367] mt-1">Orders placed from web and mobile will appear here live.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#EADBCA] text-[11px] font-bold uppercase tracking-wider text-[#7C7367]">
                  <th className="py-3.5 px-4">Tracking #</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Total</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4">Order Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4EFEA]">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#19181B]">
                      {o.trackingNumber || o.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#19181B]">{o.customer?.name || "Customer"}</p>
                      <p className="text-[11px] text-[#7C7367]">{o.customer?.phone || o.customer?.email}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#19181B]">
                        {Array.isArray(o.items) ? `${o.items.length} item(s)` : "1 item"}
                      </p>
                      <p className="text-[10px] text-[#7C7367] truncate max-w-xs">
                        {Array.isArray(o.items) && o.items[0]?.title}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-[#19181B]">
                      ₹{Number(o.totalINR || 0).toLocaleString("en-IN")}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          o.paymentStatus === "PAID"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {o.paymentStatus || "PENDING"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          o.orderStatus === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-900"
                            : o.orderStatus === "SHIPPED"
                            ? "bg-blue-100 text-blue-900"
                            : "bg-amber-100 text-amber-900"
                        }`}
                      >
                        {o.orderStatus || "PLACED"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {o.orderStatus !== "SHIPPED" && o.orderStatus !== "DELIVERED" && (
                          <button
                            type="button"
                            disabled={updatingId === o.id}
                            onClick={() => handleUpdateStatus(o.id, "SHIPPED")}
                            className="px-3 py-1 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white text-[11px] font-bold cursor-pointer transition-colors disabled:opacity-50"
                          >
                            Mark Shipped
                          </button>
                        )}
                        {o.orderStatus === "SHIPPED" && (
                          <button
                            type="button"
                            disabled={updatingId === o.id}
                            onClick={() => handleUpdateStatus(o.id, "DELIVERED")}
                            className="px-3 py-1 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold cursor-pointer transition-colors disabled:opacity-50"
                          >
                            Mark Delivered
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

