import { GET as getCouponsHandler } from "../src/app/api/coupons/route.js";
import { POST as validateCouponHandler } from "../src/app/api/coupons/validate/route.js";
import { POST as calculatePointsHandler } from "../src/app/api/points/calculate/route.js";
import { POST as createCouponHandler } from "../src/app/api/admin/coupons/route.js";
import { DELETE as deleteCouponHandler } from "../src/app/api/admin/coupons/[id]/route.js";

async function runCouponTests() {
  console.log("=========================================");
  console.log("🧪 STARTING PHASE 5 COUPONS & POINTS ENGINE TESTS");
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
    // 1. Test GET /api/coupons
    const listRes = await getCouponsHandler();
    const listData = await listRes.json();
    assert(listRes.status === 200 && listData.data.length >= 2, `Active coupons retrieved (count: ${listData.data.length})`);

    // 2. Test Validate ROYAL10 (10% off on 4000 = 400)
    const validReq = new Request("http://localhost:3000/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: "ROYAL10", cartTotal: 4000 }),
    });
    const validRes = await validateCouponHandler(validReq);
    const validData = await validRes.json();
    assert(validRes.status === 200 && validData.data.discountAmount === 400, "POST /api/coupons/validate calculates 10% discount on ₹4,000 (₹400)");
    assert(validData.data.finalTotal === 3600, "Final cart total calculated correctly: 4000 - 400 = 3600");

    // 3. Test Min Order Requirement Failure
    const minReq = new Request("http://localhost:3000/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: "ROYAL10", cartTotal: 800 }),
    });
    const minRes = await validateCouponHandler(minReq);
    const minData = await minRes.json();
    assert(minRes.status === 400 && minData.success === false, "POST /api/coupons/validate rejects order below min order threshold (₹1500)");

    // 4. Test Calculate Points
    const ptsReq = new Request("http://localhost:3000/api/points/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ points: 100, cartTotal: 5000 }),
    });
    const ptsRes = await calculatePointsHandler(ptsReq);
    const ptsData = await ptsRes.json();
    assert(ptsRes.status === 200 && ptsData.data.discountAmount === 100, "POST /api/points/calculate redeems 100 points for ₹100 discount");

    // 5. Test Admin Create Festival Coupon
    const testCode = `TEST_${Date.now()}`;
    const createReq = new Request("http://localhost:3000/api/admin/coupons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: testCode,
        festival: "Karwa Chauth Utsav",
        discountType: "percentage",
        value: 15,
        minOrderValue: 2000,
      }),
    });
    const createRes = await createCouponHandler(createReq);
    const createData = await createRes.json();
    assert(createRes.status === 201 && createData.data.code === testCode, "POST /api/admin/coupons creates festival coupon");
    const createdCouponId = createData.data.id;

    // 6. Test Delete Coupon
    const delRes = await deleteCouponHandler(new Request("http://localhost:3000"), {
      params: Promise.resolve({ id: createdCouponId }),
    });
    assert(delRes.status === 200, "DELETE /api/admin/coupons/[id] removes coupon");

    console.log("\n=========================================");
    console.log(`📊 COUPON & POINTS TESTS: ${passed} PASSED, ${failed} FAILED`);
    console.log("=========================================\n");

    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error("❌ UNCAUGHT ERROR IN COUPON TESTS:", err);
    process.exit(1);
  }
}

runCouponTests();

