import { db } from "../../../../lib/db.js";
import { apiSuccess, apiError } from "../../../../lib/apiResponse.js";

/**
 * GET /api/products/[id]
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    let product = await db.products.findById(id);

    // If not found by numeric/string ID, try slug or title match
    if (!product) {
      product = await db.products.findOne(
        (p) => String(p.id) === String(id) || p.slug === id
      );
    }

    if (!product) {
      return apiError("Product not found", 404);
    }

    return apiSuccess(product, "Product details retrieved");
  } catch (err) {
    console.error("[Get Single Product Error]:", err);
    return apiError("Failed to fetch product details", 500);
  }
}

