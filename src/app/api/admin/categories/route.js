import { db } from "../../../../lib/db.js";
import { CategoryModel } from "../../../../models/Category.js";
import { apiSuccess, apiError } from "../../../../lib/apiResponse.js";

/**
 * POST /api/admin/categories
 * Create new category
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const validation = CategoryModel.validate(body);
    if (!validation.isValid) {
      return apiError(validation.errors.join(", "), 400);
    }

    const formatted = CategoryModel.format(body);

    // Check slug collision
    const existing = await db.categories.findOne((c) => c.slug === formatted.slug);
    if (existing) {
      return apiError(`Category with slug '${formatted.slug}' already exists`, 409);
    }

    const newCategory = await db.categories.create(formatted);
    return apiSuccess(newCategory, "Category created successfully", 201);
  } catch (err) {
    console.error("[Create Category Error]:", err);
    return apiError("Internal server error creating category", 500);
  }
}

