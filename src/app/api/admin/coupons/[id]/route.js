import { db } from "../../../../../lib/db.js";
import { apiSuccess, apiError } from "../../../../../lib/apiResponse.js";

/**
 * DELETE /api/admin/coupons/[id]
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const existing = await db.coupons.findById(id);
    if (!existing) {
      return apiError("Coupon not found", 404);
    }

    await db.coupons.deleteOne((c) => String(c.id) === String(id));
    return apiSuccess(null, "Coupon removed successfully");
  } catch (err) {
    console.error("[Delete Coupon Error]:", err);
    return apiError("Internal server error deleting coupon", 500);
  }
}

