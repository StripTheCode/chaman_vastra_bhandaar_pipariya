import { db } from "../src/lib/db.js";
import { UserModel } from "../src/models/User.js";
import { signToken, verifyToken } from "../src/lib/jwt.js";
import { ProductModel } from "../src/models/Product.js";
import { CouponModel } from "../src/models/Coupon.js";
import { OrderModel, OrderStatus, PaymentStatus } from "../src/models/Order.js";

async function runTests() {
  console.log("=========================================");
  console.log("🧪 STARTING PHASE 1 FOUNDATION & DB TESTS");
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
    // 1. Categories Seed Check
    const categories = await db.categories.find();
    assert(categories.length >= 10, `Categories initialized with seed (count: ${categories.length})`);

    // 2. Products Seed Check
    const products = await db.products.find();
    assert(products.length >= 20, `Products initialized with seed (count: ${products.length})`);

    // 3. Catalog Advanced Query: Filter by category 'sarees'
    const sareeCatalog = await db.products.queryCatalog({ category: "sarees" });
    assert(sareeCatalog.items.length > 0, `Catalog query filters by category 'sarees' (found: ${sareeCatalog.items.length})`);

    // 4. Catalog Advanced Query: Search by keyword 'Champagne'
    const searchRes = await db.products.queryCatalog({ search: "Champagne" });
    assert(searchRes.items.length > 0 && searchRes.items[0].title.includes("Champagne"), `Catalog search works for 'Champagne'`);

    // 5. User Creation & Password Hashing
    const plainPass = "RoyalSecret@2026";
    const passwordHash = await UserModel.hashPassword(plainPass);
    assert(passwordHash !== plainPass && passwordHash.startsWith("$2"), "Password hashed securely with bcrypt");

    const passMatch = await UserModel.verifyPassword(plainPass, passwordHash);
    assert(passMatch === true, "Password verification succeeds for correct password");

    const passMismatch = await UserModel.verifyPassword("WrongPassword", passwordHash);
    assert(passMismatch === false, "Password verification fails for wrong password");

    // 6. User Creation with Welcome Loyalty Points
    const testUser = await db.users.create(
      UserModel.createInitial({
        name: "Devendra Verma",
        email: "devendra.test@chaman.com",
        phone: "+91 98260 12345",
        passwordHash,
      })
    );
    assert(testUser.id && testUser.loyaltyPoints === 100, `User registered with 100 Welcome Points (id: ${testUser.id})`);

    // 7. JWT Token Signing & Verification
    const token = signToken({ userId: testUser.id, email: testUser.email, role: testUser.role });
    assert(typeof token === "string" && token.split(".").length === 3, "JWT token signed with 3 segments");

    const decoded = verifyToken(token);
    assert(decoded && decoded.userId === testUser.id, "JWT token verified and payload extracted cleanly");

    // 8. Loyalty Points Credit & Debit Operations
    const creditedUser = await db.users.addPoints(testUser.id, 50, "Review Submitted");
    assert(creditedUser.loyaltyPoints === 150, `Points credited: 100 + 50 = 150 (current: ${creditedUser.loyaltyPoints})`);

    const debitedUser = await db.users.deductPoints(testUser.id, 100, "Redeemed on Order");
    assert(debitedUser.loyaltyPoints === 50, `Points debited: 150 - 100 = 50 (current: ${debitedUser.loyaltyPoints})`);

    // 9. Coupon Validation
    const validCouponRes = await db.coupons.validateCoupon("ROYAL10", 3000);
    assert(validCouponRes.valid === true && validCouponRes.discountAmount === 300, `Coupon ROYAL10 on ₹3000 calculates ₹300 discount`);

    const minOrderFail = await db.coupons.validateCoupon("ROYAL10", 1000);
    assert(minOrderFail.valid === false, `Coupon ROYAL10 fails on ₹1000 (< ₹1500 min order requirement)`);

    const invalidCoupon = await db.coupons.validateCoupon("INVALID999", 5000);
    assert(invalidCoupon.valid === false, `Invalid coupon code rejected`);

    // 10. Order Model Creation & Calculations
    const testOrder = OrderModel.create({
      userId: testUser.id,
      customer: { name: testUser.name, email: testUser.email, phone: testUser.phone },
      items: [
        { productId: products[0].id, title: products[0].title, priceINR: products[0].priceINR, quantity: 1, size: "Free Size" }
      ],
      subtotalINR: 18500,
      discountINR: 1850,
      totalINR: 16650,
      paymentMethod: "RAZORPAY",
      couponCode: "ROYAL10",
    });
    assert(testOrder.id.startsWith("ord_") && testOrder.trackingNumber.startsWith("CHM"), `Order created with tracking #${testOrder.trackingNumber}`);
    assert(testOrder.pointsEarned > 0, `Order earns 5% loyalty points on net total (Earned: ${testOrder.pointsEarned} pts)`);

    console.log("\n=========================================");
    console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log("=========================================\n");

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ UNCAUGHT ERROR IN TEST SUITE:", err);
    process.exit(1);
  }
}

runTests();

