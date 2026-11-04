import { db } from "../../../lib/db.js";
import { apiPaginated, apiError } from "../../../lib/apiResponse.js";


/**
 * GET /api/products
 * Advanced query endpoint used by Web catalog & Mobile catalog
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category") || undefined;
    const minPrice = searchParams.get("minPrice") || undefined;
    const maxPrice = searchParams.get("maxPrice") || undefined;
    const fabric = searchParams.get("fabric") || undefined;
    const size = searchParams.get("size") || undefined;
    const search = searchParams.get("search") || undefined;
    const sort = searchParams.get("sort") || "featured";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "24", 10);

    const result = await db.products.queryCatalog({
      category,
      minPrice,
      maxPrice,
      fabric,
      size,
      search,
      sort,
      page,
      limit,
    });

    return apiPaginated(
      result.items,
      result.page,
      result.limit,
      result.total,
      "Products retrieved successfully"
    );
  } catch (err) {
    console.error("[Get Products Error]:", err);
    return apiError("Failed to fetch products", 500);
  }
}
