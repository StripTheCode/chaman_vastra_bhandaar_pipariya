import { db } from "../../../../lib/db.js";
import { ProductModel } from "../../../../models/Product.js";
import { apiSuccess, apiError } from "../../../../lib/apiResponse.js";

/**
 * POST /api/admin/products
 * Create new product listing
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const validation = ProductModel.validate(body);
    if (!validation.isValid) {
      return apiError(validation.errors.join(", "), 400);
    }

    const formatted = ProductModel.format(body);

    // Auto-generate slug if not provided
    if (!formatted.slug && formatted.title) {
      formatted.slug = formatted.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    const newProduct = await db.products.create(formatted);
    return apiSuccess(newProduct, "Product created successfully", 201);
  } catch (err) {
    console.error("[Create Product Error]:", err);
    return apiError("Internal server error creating product", 500);
  }
}

