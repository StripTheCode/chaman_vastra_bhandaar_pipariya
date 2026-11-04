import { db } from "../../../../lib/db.js";
import { PaymentStatus, OrderStatus } from "../../../../models/Order.js";
import { verifyRazorpaySignature } from "../../../../lib/razorpay.js";
import { NotificationService } from "../../../../services/notificationService.js";
import { apiSuccess, apiError } from "../../../../lib/apiResponse.js";


/**
 * POST /api/checkout/verify-payment
 * Verifies Razorpay payment signature, confirms order, debits redeemed points,
 * awards 5% cashback coins, and deducts inventory stock.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    if (!orderId) {
      return apiError("orderId is required", 400);
    }

    // 1. Verify Payment Signature
    const isValidSignature = verifyRazorpaySignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    if (!isValidSignature) {
      return apiError("Payment signature verification failed", 400);
    }

    // 2. Find Order
    const order = await db.orders.findById(orderId);
    if (!order) {
      return apiError("Order not found", 404);
    }

    // 3. Update Order Status
    const updatedOrder = await db.orders.updateOne(
      (o) => String(o.id) === String(orderId),
      {
        paymentStatus: PaymentStatus.PAID,
        orderStatus: OrderStatus.CONFIRMED,
        razorpayPaymentId,
        paidAt: new Date().toISOString(),
        timeline: [
          ...(order.timeline || []),
          {
            status: OrderStatus.CONFIRMED,
            message: `Payment of ₹${Number(order.totalINR).toLocaleString("en-IN")} received via Razorpay (Txn: ${razorpayPaymentId})`,
            timestamp: new Date().toISOString(),
          },
        ],
      }
    );

    // 4. Handle Points: Debit redeemed points & Credit 5% loyalty points
    if (order.userId) {
      if (order.pointsRedeemed > 0) {
        try {
          await db.users.deductPoints(
            order.userId,
            order.pointsRedeemed,
            `Redeemed on Order #${order.trackingNumber}`
          );
        } catch (e) {
          console.warn("[Points Debit Warning]:", e.message);
        }
      }

      if (order.pointsEarned > 0) {
        try {
          await db.users.addPoints(
            order.userId,
            order.pointsEarned,
            `5% Reward on Order #${order.trackingNumber}`
          );
        } catch (e) {
          console.warn("[Points Credit Warning]:", e.message);
        }
      }
    }

    // 5. Deduct Product Inventory Stock
    if (Array.isArray(order.items)) {
      for (const item of order.items) {
        if (item.productId) {
          const prod = await db.products.findById(item.productId);
          if (prod && prod.inStock !== undefined) {
            const nextStock = Math.max(0, prod.inStock - (item.quantity || 1));
            await db.products.updateOne(
              (p) => String(p.id) === String(item.productId),
              { inStock: nextStock }
            );
          }
        }
      }
    }

    // 6. Send Transactional Confirmation Notification
    try {
      await NotificationService.sendOrderConfirmation(updatedOrder);
    } catch (e) {
      console.warn("[Notification Dispatch Error]:", e.message);
    }

    return apiSuccess(
      {
        order: updatedOrder,
        trackingNumber: updatedOrder.trackingNumber,
      },
      "Payment verified and order confirmed successfully!"
    );
  } catch (err) {
    console.error("[Verify Payment Error]:", err);
    return apiError("Internal server error verifying payment", 500);
  }
}
