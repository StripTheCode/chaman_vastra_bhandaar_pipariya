import { db } from "../../../../lib/db.js";
import { CouponModel } from "../../../../models/Coupon.js";
import { apiSuccess, apiError } from "../../../../lib/apiResponse.js";

/**
 * POST /api/admin/coupons
 * Create a new festival coupon campaign
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const validation = CouponModel.validate(body);
    if (!validation.isValid) {
      return apiError(validation.errors.join(", "), 400);
    }

    const formatted = CouponModel.format(body);

    const existing = await db.coupons.findOne((c) => c.code === formatted.code);
    if (existing) {
      return apiError(`Coupon code '${formatted.code}' already exists`, 409);
    }

    const newCoupon = await db.coupons.create(formatted);
    return apiSuccess(newCoupon, "Festival coupon created successfully", 201);
  } catch (err) {
    console.error("[Create Coupon Error]:", err);
    return apiError("Internal server error creating coupon", 500);
  }
}

