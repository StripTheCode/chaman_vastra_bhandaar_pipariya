import { GET as getCategoriesHandler } from "../src/app/api/categories/route.js";
import { POST as createCategoryHandler } from "../src/app/api/admin/categories/route.js";
import { PUT as updateCategoryHandler, DELETE as deleteCategoryHandler } from "../src/app/api/admin/categories/[id]/route.js";
import { GET as getProductsHandler } from "../src/app/api/products/route.js";
import { GET as getSingleProductHandler } from "../src/app/api/products/[id]/route.js";
import { POST as createProductHandler } from "../src/app/api/admin/products/route.js";
import { PUT as updateProductHandler, DELETE as deleteProductHandler } from "../src/app/api/admin/products/[id]/route.js";

async function runCatalogAdminTests() {
  console.log("=========================================");
  console.log("🧪 STARTING PHASE 3 CATALOG & ADMIN API TESTS");
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
    // 1. Test GET /api/categories
    const catRes = await getCategoriesHandler();
    const catData = await catRes.json();
    assert(catRes.status === 200 && catData.success === true, "GET /api/categories succeeds with 200 status");
    assert(catData.data.length >= 10, `Categories returned (count: ${catData.data.length})`);

    // 2. Test POST /api/admin/categories (Create Category)
    const testCatSlug = `test-couture-${Date.now()}`;
    const createCatReq = new Request("http://localhost:3000/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Royal Velvet Couture",
        slug: testCatSlug,
        title: "Designer Velvet Ethnic Wear Online",
        description: "Handcrafted Zardozi and Velvet Anarkalis & Lehengas from Pipariya",
        bannerImage: "/images/anarkali-rust.jpg",
      }),
    });
    const createCatRes = await createCategoryHandler(createCatReq);
    const createCatData = await createCatRes.json();
    assert(createCatRes.status === 201 && createCatData.success === true, "POST /api/admin/categories creates category");
    const createdCatId = createCatData.data.id;

    // 3. Test PUT /api/admin/categories/[id]
    const updateCatReq = new Request(`http://localhost:3000/api/admin/categories/${createdCatId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: "Updated description with winter festive discount",
      }),
    });
    const updateCatRes = await updateCategoryHandler(updateCatReq, { params: Promise.resolve({ id: createdCatId }) });
    const updateCatData = await updateCatRes.json();
    assert(updateCatRes.status === 200 && updateCatData.data.description.includes("winter festive"), "PUT /api/admin/categories/[id] updates category description");

    // 4. Test GET /api/products (Paginated & Filtered)
    const prodReq = new Request("http://localhost:3000/api/products?category=sarees&limit=10&page=1");
    const prodRes = await getProductsHandler(prodReq);
    const prodData = await prodRes.json();
    assert(prodRes.status === 200 && prodData.success === true, "GET /api/products returns paginated products");
    assert(prodData.pagination && prodData.pagination.page === 1, "Pagination metadata included in products response");

    // 5. Test POST /api/admin/products (Create Product)
    const createProdReq = new Request("http://localhost:3000/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Regal Royal Rust Embroidered Velvet Anarkali Suit",
        category: "anarkali-sets",
        priceINR: 12999,
        originalPriceINR: 17999,
        fabric: "Pure Micro Velvet with Zardozi Work",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colorName: "Royal Rust",
        image: "/images/anarkali-rust.jpg",
        inStock: 8,
      }),
    });
    const createProdRes = await createProductHandler(createProdReq);
    const createProdData = await createProdRes.json();
    assert(createProdRes.status === 201 && createProdData.success === true, "POST /api/admin/products creates product");
    assert(createProdData.data.discountPercent > 0, "Discount percentage auto-calculated from price & originalPrice");
    const createdProdId = createProdData.data.id;

    // 6. Test GET /api/products/[id]
    const singleProdRes = await getSingleProductHandler(new Request("http://localhost:3000/api/products/" + createdProdId), {
      params: Promise.resolve({ id: createdProdId }),
    });
    const singleProdData = await singleProdRes.json();
    assert(singleProdRes.status === 200 && singleProdData.data.title.includes("Velvet Anarkali"), "GET /api/products/[id] fetches created dress details");

    // 7. Test PUT /api/admin/products/[id]
    const updateProdReq = new Request(`http://localhost:3000/api/admin/products/${createdProdId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceINR: 11999,
        inStock: 5,
      }),
    });
    const updateProdRes = await updateProductHandler(updateProdReq, { params: Promise.resolve({ id: createdProdId }) });
    const updateProdData = await updateProdRes.json();
    assert(updateProdRes.status === 200 && updateProdData.data.priceINR === 11999, "PUT /api/admin/products/[id] updates product price & stock");

    // 8. Clean up created product & category
    const delProdRes = await deleteProductHandler(new Request("http://localhost:3000"), { params: Promise.resolve({ id: createdProdId }) });
    assert(delProdRes.status === 200, "DELETE /api/admin/products/[id] deletes test product");

    const delCatRes = await deleteCategoryHandler(new Request("http://localhost:3000"), { params: Promise.resolve({ id: createdCatId }) });
    assert(delCatRes.status === 200, "DELETE /api/admin/categories/[id] deletes test category");

    console.log("\n=========================================");
    console.log(`📊 CATALOG & ADMIN TESTS: ${passed} PASSED, ${failed} FAILED`);
    console.log("=========================================\n");

    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error("❌ UNCAUGHT ERROR IN CATALOG TESTS:", err);
    process.exit(1);
  }
}

runCatalogAdminTests();

