import { db } from "../../../../../lib/db.js";
import { CategoryModel } from "../../../../../models/Category.js";
import { apiSuccess, apiError } from "../../../../../lib/apiResponse.js";

/**
 * PUT /api/admin/categories/[id]
 */
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await db.categories.findById(id);
    if (!existing) {
      return apiError("Category not found", 404);
    }

    const formatted = CategoryModel.format({ ...existing, ...body });
    const updated = await db.categories.updateOne(
      (c) => String(c.id) === String(id),
      formatted
    );

    return apiSuccess(updated, "Category updated successfully");
  } catch (err) {
    console.error("[Update Category Error]:", err);
    return apiError("Internal server error updating category", 500);
  }
}

/**
 * DELETE /api/admin/categories/[id]
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const existing = await db.categories.findById(id);
    if (!existing) {
      return apiError("Category not found", 404);
    }

    await db.categories.deleteOne((c) => String(c.id) === String(id));
    return apiSuccess(null, "Category deleted successfully");
  } catch (err) {
    console.error("[Delete Category Error]:", err);
    return apiError("Internal server error deleting category", 500);
  }
}

