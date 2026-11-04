import { db } from "../../../../../lib/db.js";
import { ProductModel } from "../../../../../models/Product.js";
import { apiSuccess, apiError } from "../../../../../lib/apiResponse.js";

/**
 * PUT /api/admin/products/[id]
 */
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await db.products.findById(id);
    if (!existing) {
      return apiError("Product not found", 404);
    }

    const formatted = ProductModel.format({ ...existing, ...body });
    const updated = await db.products.updateOne(
      (p) => String(p.id) === String(id),
      formatted
    );

    return apiSuccess(updated, "Product updated successfully");
  } catch (err) {
    console.error("[Update Product Error]:", err);
    return apiError("Internal server error updating product", 500);
  }
}

/**
 * DELETE /api/admin/products/[id]
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const existing = await db.products.findById(id);
    if (!existing) {
      return apiError("Product not found", 404);
    }

    await db.products.deleteOne((p) => String(p.id) === String(id));
    return apiSuccess(null, "Product deleted successfully");
  } catch (err) {
    console.error("[Delete Product Error]:", err);
    return apiError("Internal server error deleting product", 500);
  }
}

