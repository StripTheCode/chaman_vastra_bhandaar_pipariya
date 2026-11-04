import { POST as registerHandler } from "../src/app/api/auth/register/route.js";
import { POST as loginHandler } from "../src/app/api/auth/login/route.js";
import { GET as meGetHandler, PUT as mePutHandler } from "../src/app/api/auth/me/route.js";
import { POST as logoutHandler } from "../src/app/api/auth/logout/route.js";

async function runAuthTests() {
  console.log("=========================================");
  console.log("🧪 STARTING PHASE 2 AUTH & POINTS API TESTS");
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
    const uniqueEmail = `priya.verma_${Date.now()}@chaman.com`;
    const password = "LuxuryHeritage#2026";

    // 1. Test Register
    const regReq = new Request("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Priya Verma",
        email: uniqueEmail,
        phone: "+91 98930 54321",
        password,
      }),
    });

    const regRes = await registerHandler(regReq);
    const regData = await regRes.json();

    assert(regRes.status === 201 && regData.success === true, "POST /api/auth/register creates user with 201 status");
    assert(regData.data.user.loyaltyPoints === 100, "New user awarded 100 Welcome Loyalty Points");
    assert(Boolean(regData.data.token), "Register returns valid JWT token");
    assert(regData.data.user.passwordHash === undefined, "Password hash is sanitized from response");

    const authToken = regData.data.token;

    // 2. Test Duplicate Register
    const dupReq = new Request("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Priya Duplicate",
        email: uniqueEmail,
        password: "AnotherPassword123",
      }),
    });
    const dupRes = await dupReq.json ? await registerHandler(dupReq) : null;
    const dupData = await dupRes.json();
    assert(dupRes.status === 409 && dupData.success === false, "POST /api/auth/register rejects duplicate email with 409 Conflict");

    // 3. Test Login Success
    const loginReq = new Request("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: uniqueEmail,
        password,
      }),
    });
    const loginRes = await loginHandler(loginReq);
    const loginData = await loginRes.json();
    assert(loginRes.status === 200 && loginData.success === true, "POST /api/auth/login succeeds with correct password");
    assert(loginData.data.user.email === uniqueEmail.toLowerCase(), "Logged in user email matches");

    // 4. Test Login Wrong Password
    const wrongLoginReq = new Request("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: uniqueEmail,
        password: "IncorrectPassword123",
      }),
    });
    const wrongLoginRes = await loginHandler(wrongLoginReq);
    const wrongLoginData = await wrongLoginRes.json();
    assert(wrongLoginRes.status === 401 && wrongLoginData.success === false, "POST /api/auth/login rejects wrong password with 401");

    // 5. Test Profile Fetch with Bearer Token (Simulating Mobile App Client)
    const meReq = new Request("http://localhost:3000/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const meRes = await meGetHandler(meReq);
    const meData = await meRes.json();
    assert(meRes.status === 200 && meData.data.user.email === uniqueEmail.toLowerCase(), "GET /api/auth/me fetches profile via Mobile Bearer token");
    assert(meData.data.user.loyaltyPoints === 100, "Profile contains correct loyalty points balance (100 coins)");

    // 6. Test Profile Update (Save Delivery Address)
    const updateReq = new Request("http://localhost:3000/api/auth/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        addresses: [
          {
            id: "addr_1",
            label: "Home",
            street: "Station Road, Near Main Market",
            city: "Pipariya",
            state: "Madhya Pradesh",
            pincode: "461775",
            isDefault: true,
          },
        ],
      }),
    });
    const updateRes = await mePutHandler(updateReq);
    const updateData = await updateRes.json();
    assert(updateRes.status === 200 && updateData.data.user.addresses.length === 1, "PUT /api/auth/me saves user delivery address");

    // 7. Test Logout
    const logoutRes = await logoutHandler();
    const logoutData = await logoutRes.json();
    assert(logoutRes.status === 200 && logoutData.success === true, "POST /api/auth/logout clears auth session");

    console.log("\n=========================================");
    console.log(`📊 AUTH TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log("=========================================\n");

    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error("❌ UNCAUGHT ERROR IN AUTH TESTS:", err);
    process.exit(1);
  }
}

runAuthTests();

