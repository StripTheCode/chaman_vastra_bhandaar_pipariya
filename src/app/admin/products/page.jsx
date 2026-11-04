"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  X,
  Check,
  AlertCircle,
  Sparkles,
  Layers,
} from "lucide-react";

const STANDARD_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free Size", "Unstitched Blouse Piece"];

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "sarees",
    priceINR: "",
    originalPriceINR: "",
    fabric: "Pure Silk",
    sizes: ["S", "M", "L", "XL"],
    colorName: "Royal Gold",
    image: "/images/saree-champagne.jpg",
    hoverImage: "/images/saree-crimson.jpg",
    inStock: 15,
    details: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Load products & categories
  const loadData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/products?limit=100"),
        fetch("/api/categories"),
      ]);
      const prodJson = await prodRes.json();
      const catJson = await catRes.json();

      if (prodJson.success) setProducts(prodJson.data || []);
      if (catJson.success) setCategories(catJson.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      category: categories[0]?.slug || "sarees",
      priceINR: "",
      originalPriceINR: "",
      fabric: "Pure Silk",
      sizes: ["S", "M", "L", "XL"],
      colorName: "Royal Gold",
      image: "/images/saree-champagne.jpg",
      hoverImage: "/images/saree-crimson.jpg",
      inStock: 15,
      details: "",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setFormData({
      title: prod.title || "",
      category: prod.category || "sarees",
      priceINR: prod.priceINR || "",
      originalPriceINR: prod.originalPriceINR || "",
      fabric: prod.fabric || "",
      sizes: Array.isArray(prod.sizes) ? prod.sizes : ["Free Size"],
      colorName: prod.colorName || "",
      image: prod.image || "/images/saree-champagne.jpg",
      hoverImage: prod.hoverImage || "/images/saree-crimson.jpg",
      inStock: prod.inStock !== undefined ? prod.inStock : 15,
      details: prod.details || prod.includes || "",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const toggleSize = (sz) => {
    setFormData((prev) => {
      const exists = prev.sizes.includes(sz);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter((s) => s !== sz) : [...prev.sizes, sz],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      const payload = {
        ...formData,
        priceINR: Number(formData.priceINR),
        originalPriceINR: Number(formData.originalPriceINR || formData.priceINR),
        inStock: Number(formData.inStock),
      };

      if (editingProduct) {
        // Update product
        const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.message || "Failed to update product");

        setProducts((prev) =>
          prev.map((p) => (String(p.id) === String(editingProduct.id) ? json.data : p))
        );
      } else {
        // Create product
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.message || "Failed to create product");

        setProducts((prev) => [json.data, ...prev]);
      }

      setIsModalOpen(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (prodId) => {
    if (!confirm("Are you sure you want to delete this dress listing?")) return;

    try {
      const res = await fetch(`/api/admin/products/${prodId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => String(p.id) !== String(prodId)));
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      alert("Error deleting product");
    }
  };

  // Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery.trim() || p.title?.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EADBCA] shadow-2xs">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#19181B] flex items-center gap-2.5">
            <Package className="w-6 h-6 text-[#C59B27]" />
            <span>Product Listings & Inventory</span>
          </h1>
          <p className="text-xs text-[#7C7367] mt-0.5">
            Manage your ethnic collections, sizes, pricing, and stock availability.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 rounded-2xl border border-[#EADBCA]">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C7367]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by title, fabric or color..."
            className="w-full h-10 pl-10 pr-4 bg-[#FAF8F5] border border-[#EADBCA] rounded-xl text-xs outline-none focus:border-[#C59B27] transition-all"
          />
        </div>

        {/* Category Dropdown Filter */}
        <div className="w-full sm:w-60">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-10 px-3 bg-[#FAF8F5] border border-[#EADBCA] rounded-xl text-xs outline-none focus:border-[#C59B27] cursor-pointer"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id || c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Data Table */}
      <div className="bg-white rounded-3xl border border-[#EADBCA] shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-[#C59B27] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-[#7C7367]">Loading catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center">
            <Package className="w-10 h-10 text-[#C59B27] mx-auto mb-2 opacity-50" />
            <p className="font-serif text-base font-bold text-[#19181B]">No products found</p>
            <p className="text-xs text-[#7C7367] mt-1 mb-4">Try clearing your search query or add a new product.</p>
            <button
              type="button"
              onClick={openCreateModal}
              className="px-4 py-2 rounded-full bg-[#19181B] text-white text-xs font-bold hover:bg-[#A34850] transition-colors"
            >
              Add First Dress
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#EADBCA] text-[11px] font-bold uppercase tracking-wider text-[#7C7367]">
                  <th className="py-3.5 px-4">Item</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price (INR)</th>
                  <th className="py-3.5 px-4">Fabric</th>
                  <th className="py-3.5 px-4">Sizes</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4EFEA]">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-lg bg-[#EFE9DF] overflow-hidden relative shrink-0 border border-[#EADBCA]">
                          <Image
                            src={p.image || "/images/saree-champagne.jpg"}
                            alt={p.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="max-w-xs">
                          <p className="font-bold text-[#19181B] truncate">{p.title}</p>
                          <p className="text-[11px] text-[#7C7367]">ID: #{String(p.id).slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category Badge */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                        {p.category}
                      </span>
                    </td>

                    {/* Price & Discount */}
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-[#19181B]">
                        ₹{Number(p.priceINR || 0).toLocaleString("en-IN")}
                      </div>
                      {p.originalPriceINR > p.priceINR && (
                        <div className="text-[10px] text-[#7C7367] line-through">
                          ₹{Number(p.originalPriceINR).toLocaleString("en-IN")}
                        </div>
                      )}
                    </td>

                    {/* Fabric */}
                    <td className="py-3 px-4 text-[#5A5348]">{p.fabric || "Pure Silk"}</td>

                    {/* Sizes Available */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[140px]">
                        {Array.isArray(p.sizes) ? (
                          p.sizes.slice(0, 4).map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-[#EFE9DF] text-[9.5px] font-bold text-[#5A5348]">
                              {s}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-[#7C7367]">Free Size</span>
                        )}
                        {Array.isArray(p.sizes) && p.sizes.length > 4 && (
                          <span className="text-[9.5px] text-[#7C7367]">+{p.sizes.length - 4}</span>
                        )}
                      </div>
                    </td>

                    {/* Stock status */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          (p.inStock || 0) > 5
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-rose-50 text-rose-800 border border-rose-200"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${(p.inStock || 0) > 5 ? "bg-emerald-500" : "bg-rose-500"}`} />
                        <span>{p.inStock || 0} left</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg text-[#5A5348] hover:bg-[#FAF8F5] hover:text-[#A34850] transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 rounded-lg text-[#5A5348] hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] overflow-y-auto">
          <div className="bg-[#FFFAF3] rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#EADBCA] shadow-2xl my-8">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EADBCA]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#19181B]">
                  {editingProduct ? "Edit Dress Listing" : "Add New Dress Listing"}
                </h3>
                <p className="text-[11px] text-[#7C7367]">
                  Configure sizes, price, fabric details and photographs
                </p>
              </div>
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

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Title */}
              <div>
                <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Royal Rust Embroidered Velvet Anarkali Suit"
                  required
                  className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                />
              </div>

              {/* Category & Color */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full h-10 px-3 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id || c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                    Color Name
                  </label>
                  <input
                    type="text"
                    value={formData.colorName}
                    onChange={(e) => setFormData({ ...formData, colorName: e.target.value })}
                    placeholder="e.g. Champagne Gold"
                    className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                    Selling Price (INR) *
                  </label>
                  <input
                    type="number"
                    value={formData.priceINR}
                    onChange={(e) => setFormData({ ...formData, priceINR: e.target.value })}
                    placeholder="e.g. 12999"
                    required
                    min={1}
                    className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                    Original Price (INR)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPriceINR}
                    onChange={(e) => setFormData({ ...formData, originalPriceINR: e.target.value })}
                    placeholder="e.g. 17999"
                    className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                    Inventory Stock
                  </label>
                  <input
                    type="number"
                    value={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.value })}
                    placeholder="15"
                    className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none font-mono"
                  />
                </div>
              </div>

              {/* Fabric Details */}
              <div>
                <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                  Fabric & Craftsmanship
                </label>
                <input
                  type="text"
                  value={formData.fabric}
                  onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                  placeholder="e.g. Pure Katan Silk with Kadwa Zari Weave"
                  className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                />
              </div>

              {/* Sizes Available */}
              <div>
                <label className="block text-[11px] font-semibold text-[#5A5348] mb-1.5">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {STANDARD_SIZES.map((sz) => {
                    const active = formData.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => toggleSize(sz)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                          active
                            ? "bg-[#19181B] text-white border-[#19181B]"
                            : "bg-white text-[#5A5348] border-[#DDD5C9]"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Image Path */}
              <div>
                <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                  Primary Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/anarkali-rust.jpg"
                  required
                  className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none font-mono"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full h-11 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-75"
                >
                  {formLoading
                    ? "Saving to Catalog..."
                    : editingProduct
                    ? "Update Dress Listing"
                    : "Publish Dress Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

