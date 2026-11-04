import { POST as createOrderHandler } from "../src/app/api/checkout/create-order/route.js";
import { POST as verifyPaymentHandler } from "../src/app/api/checkout/verify-payment/route.js";
import { GET as getOrderHandler } from "../src/app/api/orders/[id]/route.js";
import { GET as getAdminOrdersHandler } from "../src/app/api/admin/orders/route.js";
import { PUT as updateAdminOrderHandler } from "../src/app/api/admin/orders/[id]/route.js";

async function runCheckoutTests() {
  console.log("=========================================");
  console.log("🧪 STARTING PHASE 6 CHECKOUT & RAZORPAY TESTS");
  console.log("=========================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      failed++;
    }
  }

  try {
    // 1. Initiate Checkout Order
    const createReq = new Request("http://localhost:3000/api/checkout/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: { name: "Ananya Sharma", email: "ananya.test@chaman.com", phone: "+91 94250 98765" },
        items: [
          {
            productId: "1",
            title: "Luminous Champagne Gold Pure Katan Banarasi Silk Saree",
            priceINR: 18500,
            quantity: 1,
            size: "Custom Stitched Blouse",
          },
        ],
        shippingAddress: {
          fullName: "Ananya Sharma",
          street: "74, Civil Lines, Near Railway Station",
          city: "Pipariya",
          state: "Madhya Pradesh",
          pincode: "461775",
          phone: "+91 94250 98765",
        },
        couponCode: "ROYAL10",
        pointsToRedeem: 0,
      }),
    });

    const createRes = await createOrderHandler(createReq);
    const createData = await createRes.json();

    assert(createRes.status === 200 && createData.success === true, "POST /api/checkout/create-order initiates order with 200 status");
    assert(Boolean(createData.data.razorpayOrderId), "Razorpay order ID generated");
    assert(createData.data.amountINR === 16650, "Subtotal ₹18,500 - 10% Coupon (₹1,850) = Net ₹16,650");

    const orderId = createData.data.orderId;
    const rzpOrderId = createData.data.razorpayOrderId;

    // 2. Verify Payment
    const verifyReq = new Request("http://localhost:3000/api/checkout/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        razorpayOrderId: rzpOrderId,
        razorpayPaymentId: "pay_test_simulated_998877",
        razorpaySignature: "simulated_success_signature",
      }),
    });

    const verifyRes = await verifyPaymentHandler(verifyReq);
    const verifyData = await verifyRes.json();

    assert(verifyRes.status === 200 && verifyData.success === true, "POST /api/checkout/verify-payment confirms order");
    assert(verifyData.data.order.paymentStatus === "PAID", "Order paymentStatus updated to PAID");
    assert(verifyData.data.order.orderStatus === "CONFIRMED", "Order orderStatus updated to CONFIRMED");

    // 3. Fetch Order by Tracking Number
    const trackNum = verifyData.data.trackingNumber;
    const getReq = new Request(`http://localhost:3000/api/orders/${trackNum}`);
    const getRes = await getOrderHandler(getReq, { params: Promise.resolve({ id: trackNum }) });
    const getData = await getRes.json();
    assert(getRes.status === 200 && getData.data.trackingNumber === trackNum, "GET /api/orders/[id] fetches order by tracking #");

    // 4. Admin Orders Listing
    const adminOrdersRes = await getAdminOrdersHandler();
    const adminOrdersData = await adminOrdersRes.json();
    assert(adminOrdersRes.status === 200 && adminOrdersData.data.length >= 1, "GET /api/admin/orders lists customer orders");

    // 5. Admin Update Order to SHIPPED
    const updateReq = new Request(`http://localhost:3000/api/admin/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderStatus: "SHIPPED",
        courierName: "BlueDart Insured Express",
        courierTrackingUrl: "https://bluedart.com/track/BD99887766",
        note: "Dispatched from Chaman Pipariya central warehouse",
      }),
    });
    const updateRes = await updateAdminOrderHandler(updateReq, { params: Promise.resolve({ id: orderId }) });
    const updateData = await updateRes.json();
    assert(updateRes.status === 200 && updateData.data.orderStatus === "SHIPPED", "PUT /api/admin/orders/[id] marks order as SHIPPED");

    console.log("\n=========================================");
    console.log(`📊 CHECKOUT TESTS: ${passed} PASSED, ${failed} FAILED`);
    console.log("=========================================\n");

    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error("❌ UNCAUGHT ERROR IN CHECKOUT TESTS:", err);
    process.exit(1);
  }
}

runCheckoutTests();

