import { POST as registerHandler } from "../src/app/api/auth/register/route.js";
import { POST as loginHandler } from "../src/app/api/auth/login/route.js";
import { GET as getProductsHandler } from "../src/app/api/products/route.js";
import { POST as validateCouponHandler } from "../src/app/api/coupons/validate/route.js";
import { POST as createOrderHandler } from "../src/app/api/checkout/create-order/route.js";
import { POST as verifyPaymentHandler } from "../src/app/api/checkout/verify-payment/route.js";
import { GET as getOrderHandler } from "../src/app/api/orders/[id]/route.js";
import { GET as getAdminOrdersHandler } from "../src/app/api/admin/orders/route.js";
import { PUT as updateAdminOrderHandler } from "../src/app/api/admin/orders/[id]/route.js";
import { db } from "../src/lib/db.js";

async function runMasterE2ETest() {
  console.log("==========================================================");
  console.log("👑 RUNNING MASTER END-TO-END REGRESSION & FLOW TEST");
  console.log("==========================================================\n");

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
    const timestamp = Date.now();
    const customerEmail = `meera.patel_${timestamp}@chaman.com`;
    const customerPassword = "ChamanPatron@2026";

    // ----------------------------------------------------
    // STEP 1: USER REGISTRATION & WELCOME POINTS
    // ----------------------------------------------------
    console.log("👉 Step 1: Register New Customer & Award Welcome Points");
    const regReq = new Request("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Meera Patel",
        email: customerEmail,
        phone: "+91 98261 55443",
        password: customerPassword,
      }),
    });
    const regRes = await registerHandler(regReq);
    const regData = await regRes.json();

    assert(regRes.status === 201 && regData.success === true, "User registered successfully");
    assert(regData.data.user.loyaltyPoints === 100, "100 Welcome Chaman Coins credited to customer ledger");
    const authToken = regData.data.token;
    const userId = regData.data.user.id;

    // ----------------------------------------------------
    // STEP 2: BROWSE CATALOG & SEARCH DRESS
    // ----------------------------------------------------
    console.log("\n👉 Step 2: Browse Catalog & Select Ethnic Dress");
    const catalogReq = new Request("http://localhost:3000/api/products?category=sarees&limit=5");
    const catalogRes = await getProductsHandler(catalogReq);
    const catalogData = await catalogRes.json();

    assert(catalogRes.status === 200 && catalogData.data.length > 0, "Catalog returned dresses for 'sarees'");
    const selectedDress = catalogData.data[0];
    console.log(`   Selected Dress: "${selectedDress.title}" (₹${selectedDress.priceINR})`);

    // ----------------------------------------------------
    // STEP 3: FESTIVAL COUPON VALIDATION
    // ----------------------------------------------------
    console.log("\n👉 Step 3: Validate Festival Coupon ROYAL10");
    const couponReq = new Request("http://localhost:3000/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: "ROYAL10",
        cartTotal: selectedDress.priceINR,
      }),
    });
    const couponRes = await validateCouponHandler(couponReq);
    const couponData = await couponRes.json();

    assert(couponRes.status === 200 && couponData.data.discountAmount > 0, `Coupon ROYAL10 valid! Discount: ₹${couponData.data.discountAmount}`);
    const couponDiscount = couponData.data.discountAmount;

    // ----------------------------------------------------
    // STEP 4: INITIATE CHECKOUT ORDER (COUPON + POINTS REDEEMED)
    // ----------------------------------------------------
    console.log("\n👉 Step 4: Initiate Razorpay Order (Coupon + 50 Coins Redeemed)");
    const checkoutReq = new Request("http://localhost:3000/api/checkout/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        customer: { name: "Meera Patel", email: customerEmail, phone: "+91 98261 55443" },
        items: [
          {
            productId: selectedDress.id,
            title: selectedDress.title,
            priceINR: selectedDress.priceINR,
            quantity: 1,
            size: "M",
            image: selectedDress.image,
          },
        ],
        shippingAddress: {
          fullName: "Meera Patel",
          street: "B-402, Royal Residency, Station Road",
          city: "Pipariya",
          state: "Madhya Pradesh",
          pincode: "461775",
          phone: "+91 98261 55443",
        },
        couponCode: "ROYAL10",
        pointsToRedeem: 50,
      }),
    });

    const checkoutRes = await createOrderHandler(checkoutReq);
    const checkoutData = await checkoutRes.json();

    assert(checkoutRes.status === 200 && checkoutData.success === true, "Checkout order initiated");
    assert(Boolean(checkoutData.data.razorpayOrderId), `Razorpay Order generated: ${checkoutData.data.razorpayOrderId}`);
    const orderId = checkoutData.data.orderId;
    const rzpOrderId = checkoutData.data.razorpayOrderId;
    const expectedNet = selectedDress.priceINR - couponDiscount - 50; // free shipping since > 1500
    assert(checkoutData.data.amountINR === expectedNet, `Net total correctly calculated: ₹${expectedNet}`);

    // ----------------------------------------------------
    // STEP 5: VERIFY RAZORPAY PAYMENT & CONFIRM ORDER
    // ----------------------------------------------------
    console.log("\n👉 Step 5: Verify Payment & Confirm Order");
    const verifyReq = new Request("http://localhost:3000/api/checkout/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        razorpayOrderId: rzpOrderId,
        razorpayPaymentId: `pay_e2e_${timestamp}`,
        razorpaySignature: "simulated_success_signature",
      }),
    });

    const verifyRes = await verifyPaymentHandler(verifyReq);
    const verifyData = await verifyRes.json();

    assert(verifyRes.status === 200 && verifyData.data.order.paymentStatus === "PAID", "Payment verified and order status marked PAID");
    assert(verifyData.data.order.orderStatus === "CONFIRMED", "Order status marked CONFIRMED");
    const trackingNumber = verifyData.data.trackingNumber;
    console.log(`   Order Tracking Number: #${trackingNumber}`);

    // ----------------------------------------------------
    // STEP 6: VERIFY USER LOYALTY POINTS BALANCE
    // ----------------------------------------------------
    console.log("\n👉 Step 6: Verify Customer Loyalty Points Balance (Debit + Cashback)");
    const updatedUser = await db.users.findById(userId);
    // User started with 100 points, redeemed 50 points, earned 5% on expectedNet:
    const expectedEarned = Math.round(expectedNet * 0.05);
    const expectedBalance = 100 - 50 + expectedEarned;
    assert(updatedUser.loyaltyPoints === expectedBalance, `Points ledger updated: 100 - 50 + ${expectedEarned} = ${expectedBalance} coins (actual: ${updatedUser.loyaltyPoints})`);

    // ----------------------------------------------------
    // STEP 7: MERCHANT DISPATCH IN ADMIN PANEL
    // ----------------------------------------------------
    console.log("\n👉 Step 7: Merchant Dispatches Order in Admin Console");
    const adminOrdersRes = await getAdminOrdersHandler();
    const adminOrdersData = await adminOrdersRes.json();
    const foundOrder = adminOrdersData.data.find((o) => o.id === orderId);
    assert(Boolean(foundOrder), "Placed order appears in Admin Orders console");

    const dispatchReq = new Request(`http://localhost:3000/api/admin/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderStatus: "SHIPPED",
        courierName: "BlueDart Insured Air",
        courierTrackingUrl: "https://bluedart.com/track/BD778899",
        note: "Dispatched from Pipariya showroom to customer",
      }),
    });
    const dispatchRes = await updateAdminOrderHandler(dispatchReq, { params: Promise.resolve({ id: orderId }) });
    const dispatchData = await dispatchRes.json();

    assert(dispatchRes.status === 200 && dispatchData.data.orderStatus === "SHIPPED", "Merchant marked order as SHIPPED with tracking details");

    // ----------------------------------------------------
    // STEP 8: CUSTOMER TRACKING BY TRACKING #
    // ----------------------------------------------------
    console.log("\n👉 Step 8: Customer Tracks Shipment by Tracking #");
    const trackReq = new Request(`http://localhost:3000/api/orders/${trackingNumber}`);
    const trackRes = await getOrderHandler(trackReq, { params: Promise.resolve({ id: trackingNumber }) });
    const trackData = await trackRes.json();

    assert(trackRes.status === 200 && trackData.data.orderStatus === "SHIPPED", "Customer live tracking shows 'SHIPPED'");

    console.log("\n==========================================================");
    console.log(`🎉 MASTER E2E RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log("==========================================================\n");

    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error("❌ UNCAUGHT ERROR IN MASTER E2E TEST:", err);
    process.exit(1);
  }
}

runMasterE2ETest();
