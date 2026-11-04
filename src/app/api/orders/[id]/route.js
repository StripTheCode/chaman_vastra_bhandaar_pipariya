import { db } from "../../../../lib/db.js";
import { apiSuccess, apiError } from "../../../../lib/apiResponse.js";


/**
 * GET /api/orders/[id]
 * Fetch order details by order ID or Tracking Number
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    let order = await db.orders.findById(id);

    if (!order) {
      order = await db.orders.findOne(
        (o) => String(o.id) === String(id) || o.trackingNumber === id
      );
    }

    if (!order) {
      return apiError("Order not found", 404);
    }

    return apiSuccess(order, "Order details retrieved");
  } catch (err) {
    console.error("[Get Order Error]:", err);
    return apiError("Failed to fetch order details", 500);
  }
}
