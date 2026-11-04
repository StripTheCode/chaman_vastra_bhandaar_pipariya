"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Layers, Plus, Edit2, Trash2, X, AlertCircle } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    title: "",
    subtitle: "",
    description: "",
    bannerImage: "/images/banner-editorial.jpg",
    count: "500+ Styles",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories");
      const json = await res.json();
      if (json.success) setCategories(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      title: "",
      subtitle: "",
      description: "",
      bannerImage: "/images/banner-editorial.jpg",
      count: "500+ Styles",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name || "",
      slug: cat.slug || "",
      title: cat.title || "",
      subtitle: cat.subtitle || "",
      description: cat.description || "",
      bannerImage: cat.bannerImage || cat.image || "/images/banner-editorial.jpg",
      count: cat.count || "500+ Styles",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      if (editingCategory) {
        const res = await fetch(`/api/admin/categories/${editingCategory.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.message || "Failed to update category");

        setCategories((prev) =>
          prev.map((c) => (String(c.id) === String(editingCategory.id) ? json.data : c))
        );
      } else {
        const res = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.message || "Failed to create category");

        setCategories((prev) => [...prev, json.data]);
      }

      setIsModalOpen(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (catId) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`/api/admin/categories/${catId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => String(c.id) !== String(catId)));
      } else {
        alert("Failed to delete category");
      }
    } catch (err) {
      alert("Error deleting category");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EADBCA] shadow-2xs">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#19181B] flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-[#C59B27]" />
            <span>Store Categories & Collections</span>
          </h1>
          <p className="text-xs text-[#7C7367] mt-0.5">
            Organize ethnic sections, banner headers, and navigation hierarchies.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-3xl border border-[#EADBCA] shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-[#C59B27] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-[#7C7367]">Loading categories...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#EADBCA] text-[11px] font-bold uppercase tracking-wider text-[#7C7367]">
                  <th className="py-3.5 px-4">Banner Preview</th>
                  <th className="py-3.5 px-4">Category Name</th>
                  <th className="py-3.5 px-4">URL Slug</th>
                  <th className="py-3.5 px-4">Styles Range</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4EFEA]">
                {categories.map((c) => (
                  <tr key={c.id || c.slug} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="w-16 h-10 rounded-lg bg-[#EFE9DF] overflow-hidden relative border border-[#EADBCA]">
                        <Image
                          src={c.bannerImage || c.image || "/images/banner-editorial.jpg"}
                          alt={c.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-bold text-[#19181B]">{c.name}</p>
                      <p className="text-[11px] text-[#7C7367] truncate max-w-xs">{c.title}</p>
                    </td>

                    <td className="py-3 px-4 font-mono text-[#5A5348]">/collections/{c.slug}</td>

                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 font-bold text-[10px]">
                        {c.count || "Styles Live"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(c)}
                          className="p-1.5 rounded-lg text-[#5A5348] hover:bg-[#FAF8F5] hover:text-[#A34850] transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 rounded-lg text-[#5A5348] hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
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

      {/* CREATE / EDIT CATEGORY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]">
          <div className="bg-[#FFFAF3] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#EADBCA] shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EADBCA]">
              <h3 className="font-serif text-lg font-bold text-[#19181B]">
                {editingCategory ? "Edit Category" : "Add New Category"}
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
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData({
                      ...formData,
                      name,
                      slug: editingCategory ? formData.slug : name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                    });
                  }}
                  placeholder="e.g. Bridal Lehengas"
                  required
                  className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. bridal-lehengas"
                  required
                  className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                  Page Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Designer Bridal Lehengas Online"
                  className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5A5348] mb-1">
                  Banner Image URL
                </label>
                <input
                  type="text"
                  value={formData.bannerImage}
                  onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                  placeholder="/images/anarkali-rust.jpg"
                  className="w-full h-10 px-3.5 bg-white border border-[#DDD5C9] focus:border-[#C59B27] rounded-xl text-xs outline-none font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full h-11 rounded-full bg-[#19181B] hover:bg-[#A34850] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-75"
                >
                  {formLoading
                    ? "Saving Category..."
                    : editingCategory
                    ? "Update Category"
                    : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

