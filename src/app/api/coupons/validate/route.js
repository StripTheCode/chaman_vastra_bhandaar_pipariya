import { db } from "../../../../lib/db.js";
import { apiSuccess, apiError } from "../../../../lib/apiResponse.js";

/**
 * POST /api/coupons/validate
 * Validates a coupon code against cart total
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { code, cartTotal = 0 } = body;

    if (!code || !code.trim()) {
      return apiError("Coupon code is required", 400);
    }

    const validation = await db.coupons.validateCoupon(code, Number(cartTotal));

    if (!validation.valid) {
      return apiError(validation.message, 400);
    }

    return apiSuccess(
      {
        coupon: validation.coupon,
        discountAmount: validation.discountAmount,
        finalTotal: validation.finalTotal,
      },
      validation.message
    );
  } catch (err) {
    console.error("[Validate Coupon Error]:", err);
    return apiError("Internal server error validating coupon", 500);
  }
}

