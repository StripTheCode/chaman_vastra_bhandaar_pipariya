import { db } from "../../../lib/db.js";
import { apiSuccess, apiError } from "../../../lib/apiResponse.js";

/**
 * GET /api/categories
 * Returns active categories with style counts and subcategories (Used by Web & Mobile)
 */
export async function GET() {
  try {
    const categories = await db.categories.find();
    return apiSuccess(categories, "Categories retrieved successfully");
  } catch (err) {
    console.error("[Get Categories Error]:", err);
    return apiError("Failed to fetch categories", 500);
  }
}

