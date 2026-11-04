export const OrderStatus = {
  PLACED: "PLACED",
  CONFIRMED: "CONFIRMED",
  SHIPPED: "SHIPPED",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
};

export const PaymentStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
};

export class OrderModel {
  static create({
    userId = null,
    customer,
    items,
    shippingAddress,
    subtotalINR,
    discountINR = 0,
    pointsRedeemed = 0,
    pointsDiscountINR = 0,
    shippingINR = 0,
    totalINR,
    paymentMethod = "RAZORPAY",
    razorpayOrderId = null,
    razorpayPaymentId = null,
    couponCode = null,
  }) {
    const trackingNumber = `CHM${Date.now().toString().slice(-8)}${Math.floor(10 + Math.random() * 90)}`;
    
    // Earn 5% loyalty points on net order value
    const pointsEarned = Math.round((totalINR * 0.05));

    return {
      id: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      trackingNumber,
      userId,
      customer: {
        name: customer?.name || "",
        email: customer?.email || "",
        phone: customer?.phone || "",
      },
      shippingAddress,
      items: Array.isArray(items) ? items : [],
      subtotalINR: Number(subtotalINR || 0),
      discountINR: Number(discountINR || 0),
      pointsRedeemed: Number(pointsRedeemed || 0),
      pointsDiscountINR: Number(pointsDiscountINR || 0),
      shippingINR: Number(shippingINR || 0),
      totalINR: Number(totalINR || 0),
      pointsEarned,
      paymentMethod,
      paymentStatus: PaymentStatus.PENDING,
      orderStatus: OrderStatus.PLACED,
      razorpayOrderId,
      razorpayPaymentId,
      couponCode,
      timeline: [
        {
          status: OrderStatus.PLACED,
          message: "Order placed successfully at Chaman Vastra Bhandar",
          timestamp: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

export default OrderModel;

