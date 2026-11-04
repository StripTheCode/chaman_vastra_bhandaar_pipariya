import { db } from "../../../../lib/db.js";
import { apiSuccess, apiError } from "../../../../lib/apiResponse.js";


/**
 * GET /api/admin/orders
 * Returns all customer orders for merchant management
 */
export async function GET() {
  try {
    const orders = await db.orders.find();
    // Sort newest first
    orders.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return apiSuccess(orders, "Orders retrieved successfully");
  } catch (err) {
    console.error("[Get Admin Orders Error]:", err);
    return apiError("Failed to fetch admin orders", 500);
  }
}
