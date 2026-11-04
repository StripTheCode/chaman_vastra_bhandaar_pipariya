import { db } from "../../../../lib/db.js";
import { OrderModel, PaymentStatus } from "../../../../models/Order.js";
import { createRazorpayOrder, razorpayConfig } from "../../../../lib/razorpay.js";
import { extractUserFromRequest } from "../../../../lib/jwt.js";
import { apiSuccess, apiError } from "../../../../lib/apiResponse.js";


/**
 * POST /api/checkout/create-order
 * Initiates Razorpay checkout order with coupon and points applied
 */
export async function POST(request) {
  try {
    const payload = extractUserFromRequest(request);
    const body = await request.json();

    const {
      customer,
      items,
      shippingAddress,
      couponCode,
      pointsToRedeem = 0,
      paymentMethod = "RAZORPAY",
    } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return apiError("Shopping cart is empty", 400);
    }

    if (!shippingAddress || !shippingAddress.street || !shippingAddress.pincode) {
      return apiError("Valid shipping address is required", 400);
    }

    // 1. Calculate subtotal directly from items
    let subtotalINR = 0;
    const validatedItems = [];

    for (const item of items) {
      const price = Number(item.priceINR || 0);
      const qty = Number(item.quantity || 1);
      subtotalINR += price * qty;

      validatedItems.push({
        productId: item.productId || item.id,
        title: item.title,
        priceINR: price,
        quantity: qty,
        size: item.size || "Free Size",
        image: item.image || "/images/saree-champagne.jpg",
      });
    }

    // 2. Coupon Validation
    let discountINR = 0;
    let appliedCoupon = null;
    if (couponCode) {
      const couponRes = await db.coupons.validateCoupon(couponCode, subtotalINR);
      if (couponRes.valid) {
        discountINR = couponRes.discountAmount;
        appliedCoupon = couponRes.coupon;
      }
    }

    // 3. Points Redemption (1 Coin = ₹1)
    let pointsRedeemed = 0;
    let pointsDiscountINR = 0;
    const requestedPoints = Number(pointsToRedeem || 0);

    if (requestedPoints > 0 && payload && payload.userId) {
      const user = await db.users.findById(payload.userId);
      const userPoints = user?.loyaltyPoints || 0;
      if (requestedPoints <= userPoints) {
        // Max 50% of (subtotal - coupon discount)
        const eligibleBase = subtotalINR - discountINR;
        const maxPoints = Math.floor(eligibleBase * 0.5);
        pointsRedeemed = Math.min(requestedPoints, maxPoints);
        pointsDiscountINR = pointsRedeemed;
      }
    }

    // 4. Free Shipping threshold: Free for orders >= ₹1,500
    const shippingINR = subtotalINR >= 1500 ? 0 : 150;

    // 5. Net Total
    const netTotalINR = Math.max(0, subtotalINR - discountINR - pointsDiscountINR + shippingINR);

    // 6. Create Razorpay Order
    const receiptId = `rcpt_${Date.now().toString().slice(-8)}`;
    const rzpOrder = await createRazorpayOrder({
      amountINR: netTotalINR,
      receipt: receiptId,
    });

    // 7. Store Pending Order in Database
    const orderDoc = OrderModel.create({
      userId: payload ? payload.userId : null,
      customer: {
        name: customer?.name || shippingAddress.fullName || "Valued Customer",
        email: customer?.email || shippingAddress.email || "",
        phone: customer?.phone || shippingAddress.phone || "",
      },
      items: validatedItems,
      shippingAddress,
      subtotalINR,
      discountINR,
      pointsRedeemed,
      pointsDiscountINR,
      shippingINR,
      totalINR: netTotalINR,
      paymentMethod,
      razorpayOrderId: rzpOrder.id,
      couponCode: appliedCoupon ? appliedCoupon.code : null,
    });

    const savedOrder = await db.orders.create(orderDoc);

    return apiSuccess(
      {
        orderId: savedOrder.id,
        trackingNumber: savedOrder.trackingNumber,
        razorpayOrderId: rzpOrder.id,
        amount: rzpOrder.amount,
        amountINR: netTotalINR,
        currency: rzpOrder.currency,
        keyId: razorpayConfig.keyId,
        customer: savedOrder.customer,
      },
      "Checkout order initiated"
    );
  } catch (err) {
    console.error("[Create Checkout Order Error]:", err);
    return apiError("Internal server error creating checkout order", 500);
  }
}
