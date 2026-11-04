import { db } from "../../../lib/db.js";
import { apiSuccess, apiError } from "../../../lib/apiResponse.js";

/**
 * GET /api/coupons
 * Returns active festival offers and promotional codes
 */
export async function GET() {
  try {
    const coupons = await db.coupons.find((c) => c.active !== false);
    return apiSuccess(coupons, "Active coupons retrieved successfully");
  } catch (err) {
    console.error("[Get Coupons Error]:", err);
    return apiError("Failed to fetch coupons", 500);
  }
}

