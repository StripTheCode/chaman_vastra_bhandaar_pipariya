import { db } from "../../../../../lib/db.js";
import { OrderStatus } from "../../../../../models/Order.js";
import { apiSuccess, apiError } from "../../../../../lib/apiResponse.js";


/**
 * PUT /api/admin/orders/[id]
 * Updates order status and courier tracking info
 */
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { orderStatus, courierName, courierTrackingUrl, note } = body;

    const existing = await db.orders.findById(id);
    if (!existing) {
      return apiError("Order not found", 404);
    }

    const updates = {};
    if (orderStatus) updates.orderStatus = orderStatus;
    if (courierName) updates.courierName = courierName;
    if (courierTrackingUrl) updates.courierTrackingUrl = courierTrackingUrl;

    const timelineEntry = {
      status: orderStatus || existing.orderStatus,
      message: note || `Order status updated to ${orderStatus || existing.orderStatus}`,
      timestamp: new Date().toISOString(),
    };

    updates.timeline = [...(existing.timeline || []), timelineEntry];

    const updated = await db.orders.updateOne(
      (o) => String(o.id) === String(id),
      updates
    );

    return apiSuccess(updated, "Order updated successfully");
  } catch (err) {
    console.error("[Update Admin Order Error]:", err);
    return apiError("Internal server error updating order", 500);
  }
}
