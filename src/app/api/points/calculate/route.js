import { db } from "../../../../lib/db.js";
import { extractUserFromRequest } from "../../../../lib/jwt.js";
import { apiSuccess, apiError } from "../../../../lib/apiResponse.js";

/**
 * POST /api/points/calculate
 * Calculate instant discount for redeemed Chaman Coins (1 Coin = ₹1)
 */
export async function POST(request) {
  try {
    const payload = extractUserFromRequest(request);
    const body = await request.json();
    const { points = 0, cartTotal = 0 } = body;

    const requestedPoints = Number(points);
    const total = Number(cartTotal);

    if (requestedPoints <= 0) {
      return apiSuccess({
        discountAmount: 0,
        finalTotal: total,
      });
    }

    let userBalance = null;
    const targetUserId = (payload && payload.userId) || body.userId;
    if (targetUserId) {
      const user = await db.users.findById(targetUserId);
      if (user) {
        userBalance = user.loyaltyPoints || 0;
      }
    }

    if (userBalance !== null && requestedPoints > userBalance) {
      return apiError(`Cannot redeem ${requestedPoints} coins. Your balance is ${userBalance} coins.`, 400);
    }

    // Maximum 50% of cart total can be paid via coins
    const maxRedeemable = Math.floor(total * 0.5);
    const allowedPoints = Math.min(requestedPoints, maxRedeemable);
    const discountAmount = allowedPoints; // 1 coin = ₹1

    return apiSuccess({
      requestedPoints,
      appliedPoints: allowedPoints,
      discountAmount,
      finalTotal: Math.max(0, total - discountAmount),
      remainingBalance: userBalance - allowedPoints,
    });
  } catch (err) {
    console.error("[Calculate Points Error]:", err);
    return apiError("Failed to calculate point redemption", 500);
  }
}
