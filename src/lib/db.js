import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { CATEGORIES, PRODUCTS } from "../data/products.js";

// Disk storage location for persistent local fallback
const DB_FILE_PATH = path.join(process.cwd(), ".chaman_db.json");

// Default initial coupons
const INITIAL_COUPONS = [
  {
    id: "coupon_royal10",
    code: "ROYAL10",
    discountType: "percentage",
    value: 10,
    minOrderValue: 1500,
    maxDiscount: 2500,
    festival: "Welcome Privilege",
    description: "Get 10% OFF on all handcrafted ethnic wear",
    active: true,
  },
  {
    id: "coupon_diwali20",
    code: "DIWALI20",
    discountType: "percentage",
    value: 20,
    minOrderValue: 5000,
    maxDiscount: 5000,
    festival: "Diwali Grand Utsav",
    description: "Flat 20% OFF on Festive Anarkalis & Lehengas",
    active: true,
  },
  {
    id: "coupon_festive500",
    code: "FESTIVE500",
    discountType: "fixed",
    value: 500,
    minOrderValue: 3000,
    maxDiscount: 500,
    festival: "Pipariya Heritage Festive",
    description: "Flat ₹500 Instant Discount on orders above ₹3,000",
    active: true,
  },
];

// ========================================================
// MONGODB CLOUD CONNECTION SINGLETON
// ========================================================
let mongoClient = null;
let mongoDb = null;
let isMongoConnecting = false;

async function getMongoDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (mongoDb) return mongoDb;
  if (globalThis.__mongoDbInstance__) {
    mongoDb = globalThis.__mongoDbInstance__;
    return mongoDb;
  }

  if (isMongoConnecting) {
    while (isMongoConnecting) {
      await new Promise((r) => setTimeout(r, 50));
    }
    return mongoDb;
  }

  try {
    isMongoConnecting = true;
    mongoClient = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    await mongoClient.connect();
    const dbName = uri.includes(".net/") ? uri.split(".net/")[1].split("?")[0] : "chaman_db";
    mongoDb = mongoClient.db(dbName || "chaman_db");
    globalThis.__mongoDbInstance__ = mongoDb;

    // Auto-seed initial collections if empty
    await seedMongoIfEmpty(mongoDb);

    console.log(`[MongoDB] Connected successfully to cloud database: ${dbName || "chaman_db"}`);
    return mongoDb;
  } catch (err) {
    console.warn("[MongoDB] Connection failed, falling back to local storage:", err.message);
    return null;
  } finally {
    isMongoConnecting = false;
  }
}

async function seedMongoIfEmpty(db) {
  try {
    const productsCount = await db.collection("products").countDocuments();
    if (productsCount === 0) {
      const initialProducts = PRODUCTS.map((p) => ({
        ...p,
        id: String(p.id),
        inStock: p.inStock ?? 15,
        featured: p.featured ?? true,
        createdAt: new Date().toISOString(),
      }));
      await db.collection("products").insertMany(initialProducts);
      console.log(`[MongoDB] Seeded ${initialProducts.length} initial products.`);
    }

    const categoriesCount = await db.collection("categories").countDocuments();
    if (categoriesCount === 0) {
      const initialCategories = CATEGORIES.map((c) => ({
        ...c,
        id: String(c.id),
        createdAt: new Date().toISOString(),
      }));
      await db.collection("categories").insertMany(initialCategories);
      console.log(`[MongoDB] Seeded ${initialCategories.length} initial categories.`);
    }

    const couponsCount = await db.collection("coupons").countDocuments();
    if (couponsCount === 0) {
      await db.collection("coupons").insertMany(INITIAL_COUPONS);
      console.log(`[MongoDB] Seeded ${INITIAL_COUPONS.length} initial festival coupons.`);
    }
  } catch (err) {
    console.warn("[MongoDB Seed Error]:", err.message);
  }
}

// ========================================================
// LOCAL JSON FALLBACK ADAPTER
// ========================================================
function loadLocalDatabase() {
  if (globalThis.__chaman_db__) {
    return globalThis.__chaman_db__;
  }

  let data = null;

  if (fs.existsSync(DB_FILE_PATH)) {
    try {
      const raw = fs.readFileSync(DB_FILE_PATH, "utf-8");
      data = JSON.parse(raw);
    } catch (err) {
      console.warn("[DB] Could not parse .chaman_db.json, reinitializing from seed.");
    }
  }

  if (!data) {
    data = {
      users: [],
      categories: CATEGORIES.map((c) => ({
        ...c,
        createdAt: new Date().toISOString(),
      })),
      products: PRODUCTS.map((p) => ({
        ...p,
        inStock: p.inStock ?? 15,
        featured: p.featured ?? true,
        createdAt: new Date().toISOString(),
      })),
      coupons: INITIAL_COUPONS,
      orders: [],
    };
    saveLocalDatabase(data);
  }

  globalThis.__chaman_db__ = data;
  return data;
}

function saveLocalDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    // In serverless / read-only environment, keep in memory
  }
}

// Clean document utility (removes MongoDB _id from mutating client expectations)
function cleanDoc(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: doc.id || (_id ? String(_id) : undefined), ...rest };
}

// ========================================================
// REPOSITORY CREATOR (MONGODB + LOCAL DUAL-MODE)
// ========================================================
function createRepository(collectionName) {
  return {
    async find(filterFn = () => true) {
      const mongo = await getMongoDatabase();
      if (mongo) {
        if (typeof filterFn === "function") {
          const allDocs = await mongo.collection(collectionName).find({}).toArray();
          return allDocs.map(cleanDoc).filter(filterFn);
        }
        const query = typeof filterFn === "object" ? filterFn : {};
        const docs = await mongo.collection(collectionName).find(query).toArray();
        return docs.map(cleanDoc);
      }

      // Local fallback
      const db = loadLocalDatabase();
      const list = db[collectionName] || [];
      if (typeof filterFn === "function") {
        return list.filter(filterFn);
      }
      return list;
    },

    async findOne(predicate) {
      const mongo = await getMongoDatabase();
      if (mongo) {
        if (typeof predicate === "function") {
          const allDocs = await mongo.collection(collectionName).find({}).toArray();
          const found = allDocs.map(cleanDoc).find(predicate);
          return found || null;
        }
        const query = typeof predicate === "object" ? predicate : {};
        const doc = await mongo.collection(collectionName).findOne(query);
        return cleanDoc(doc);
      }

      // Local fallback
      const db = loadLocalDatabase();
      const list = db[collectionName] || [];
      return list.find(predicate) || null;
    },

    async findById(id) {
      const mongo = await getMongoDatabase();
      if (mongo) {
        const doc = await mongo.collection(collectionName).findOne({ id: String(id) });
        return cleanDoc(doc);
      }

      // Local fallback
      const db = loadLocalDatabase();
      const list = db[collectionName] || [];
      return list.find((item) => String(item.id) === String(id)) || null;
    },

    async create(doc) {
      const newDoc = {
        id: doc.id || `${collectionName.slice(0, 3)}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...doc,
      };

      const mongo = await getMongoDatabase();
      if (mongo) {
        await mongo.collection(collectionName).insertOne({ ...newDoc });
        return cleanDoc(newDoc);
      }

      // Local fallback
      const db = loadLocalDatabase();
      db[collectionName].push(newDoc);
      saveLocalDatabase(db);
      return newDoc;
    },

    async updateOne(predicate, updates) {
      const mongo = await getMongoDatabase();
      if (mongo) {
        let targetId = null;
        if (typeof predicate === "function") {
          const allDocs = await mongo.collection(collectionName).find({}).toArray();
          const target = allDocs.map(cleanDoc).find(predicate);
          if (target) targetId = target.id;
        } else if (predicate?.id) {
          targetId = predicate.id;
        }

        if (!targetId) return null;

        const updatePayload = {
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        await mongo.collection(collectionName).updateOne(
          { id: String(targetId) },
          { $set: updatePayload }
        );
        const updatedDoc = await mongo.collection(collectionName).findOne({ id: String(targetId) });
        return cleanDoc(updatedDoc);
      }

      // Local fallback
      const db = loadLocalDatabase();
      const index = db[collectionName].findIndex(predicate);
      if (index === -1) return null;

      db[collectionName][index] = {
        ...db[collectionName][index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      saveLocalDatabase(db);
      return db[collectionName][index];
    },

    async deleteOne(predicate) {
      const mongo = await getMongoDatabase();
      if (mongo) {
        let targetId = null;
        if (typeof predicate === "function") {
          const allDocs = await mongo.collection(collectionName).find({}).toArray();
          const target = allDocs.map(cleanDoc).find(predicate);
          if (target) targetId = target.id;
        } else if (predicate?.id) {
          targetId = predicate.id;
        }

        if (!targetId) return false;
        const res = await mongo.collection(collectionName).deleteOne({ id: String(targetId) });
        return res.deletedCount > 0;
      }

      // Local fallback
      const db = loadLocalDatabase();
      const index = db[collectionName].findIndex(predicate);
      if (index === -1) return false;

      db[collectionName].splice(index, 1);
      saveLocalDatabase(db);
      return true;
    },

    async count(filterFn = () => true) {
      const mongo = await getMongoDatabase();
      if (mongo) {
        if (typeof filterFn === "function") {
          const allDocs = await mongo.collection(collectionName).find({}).toArray();
          return allDocs.map(cleanDoc).filter(filterFn).length;
        }
        return await mongo.collection(collectionName).countDocuments(filterFn || {});
      }

      // Local fallback
      const db = loadLocalDatabase();
      const list = db[collectionName] || [];
      return list.filter(filterFn).length;
    },
  };
}

// ========================================================
// CORE EXPORTED DATABASE ADAPTER
// ========================================================
export const db = {
  users: {
    ...createRepository("users"),

    /**
     * Credit loyalty points (Chaman Coins) with ledger entry
     */
    async addPoints(userId, points, reason = "Order Reward") {
      const mongo = await getMongoDatabase();
      const newLedgerItem = {
        id: `pts_${Date.now()}`,
        type: "CREDIT",
        amount: Number(points),
        reason,
        timestamp: new Date().toISOString(),
      };

      if (mongo) {
        const user = await mongo.collection("users").findOne({ id: String(userId) });
        if (!user) return null;

        await mongo.collection("users").updateOne(
          { id: String(userId) },
          {
            $inc: { loyaltyPoints: Number(points) },
            $push: { pointsHistory: { $each: [newLedgerItem], $position: 0 } },
            $set: { updatedAt: new Date().toISOString() },
          }
        );
        const updated = await mongo.collection("users").findOne({ id: String(userId) });
        return cleanDoc(updated);
      }

      // Local fallback
      const database = loadLocalDatabase();
      const user = database.users.find((u) => String(u.id) === String(userId));
      if (!user) return null;

      user.loyaltyPoints = (user.loyaltyPoints || 0) + Number(points);
      user.pointsHistory = user.pointsHistory || [];
      user.pointsHistory.unshift(newLedgerItem);
      user.updatedAt = new Date().toISOString();
      saveLocalDatabase(database);
      return user;
    },

    /**
     * Debit loyalty points
     */
    async deductPoints(userId, points, reason = "Redeemed at Checkout") {
      const mongo = await getMongoDatabase();
      const newLedgerItem = {
        id: `pts_${Date.now()}`,
        type: "DEBIT",
        amount: Number(points),
        reason,
        timestamp: new Date().toISOString(),
      };

      if (mongo) {
        const user = await mongo.collection("users").findOne({ id: String(userId) });
        if (!user) return null;

        const currentPoints = user.loyaltyPoints || 0;
        if (currentPoints < Number(points)) {
          throw new Error("Insufficient loyalty points balance");
        }

        await mongo.collection("users").updateOne(
          { id: String(userId) },
          {
            $inc: { loyaltyPoints: -Number(points) },
            $push: { pointsHistory: { $each: [newLedgerItem], $position: 0 } },
            $set: { updatedAt: new Date().toISOString() },
          }
        );
        const updated = await mongo.collection("users").findOne({ id: String(userId) });
        return cleanDoc(updated);
      }

      // Local fallback
      const database = loadLocalDatabase();
      const user = database.users.find((u) => String(u.id) === String(userId));
      if (!user) return null;

      const currentPoints = user.loyaltyPoints || 0;
      if (currentPoints < Number(points)) {
        throw new Error("Insufficient loyalty points balance");
      }

      user.loyaltyPoints = currentPoints - Number(points);
      user.pointsHistory = user.pointsHistory || [];
      user.pointsHistory.unshift(newLedgerItem);
      user.updatedAt = new Date().toISOString();
      saveLocalDatabase(database);
      return user;
    },
  },

  categories: createRepository("categories"),

  products: {
    ...createRepository("products"),

    /**
     * Advanced Catalog Query: Supports category filter, price range, fabric, sizes, search, sort & pagination
     */
    async queryCatalog({
      category,
      minPrice,
      maxPrice,
      fabric,
      size,
      search,
      sort = "featured",
      page = 1,
      limit = 20,
    } = {}) {
      const mongo = await getMongoDatabase();
      let list = [];

      if (mongo) {
        const allProducts = await mongo.collection("products").find({}).toArray();
        list = allProducts.map(cleanDoc);
      } else {
        const database = loadLocalDatabase();
        list = [...database.products];
      }

      // 1. Category filter
      if (category && category !== "all") {
        list = list.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
      }

      // 2. Price filter
      if (minPrice !== undefined) {
        list = list.filter((p) => (p.priceINR || 0) >= Number(minPrice));
      }
      if (maxPrice !== undefined) {
        list = list.filter((p) => (p.priceINR || 0) <= Number(maxPrice));
      }

      // 3. Fabric filter
      if (fabric) {
        const fabLower = fabric.toLowerCase();
        list = list.filter((p) => p.fabric?.toLowerCase().includes(fabLower));
      }

      // 4. Size filter
      if (size) {
        list = list.filter((p) => Array.isArray(p.sizes) && p.sizes.includes(size));
      }

      // 5. Search query
      if (search && search.trim()) {
        const q = search.toLowerCase().trim();
        list = list.filter(
          (p) =>
            p.title?.toLowerCase().includes(q) ||
            p.category?.toLowerCase().includes(q) ||
            p.fabric?.toLowerCase().includes(q) ||
            p.colorName?.toLowerCase().includes(q)
        );
      }

      // 6. Sorting
      if (sort === "price-low") {
        list.sort((a, b) => (a.priceINR || 0) - (b.priceINR || 0));
      } else if (sort === "price-high") {
        list.sort((a, b) => (b.priceINR || 0) - (a.priceINR || 0));
      } else if (sort === "rating") {
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      } else if (sort === "discount") {
        list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
      } else {
        list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      }

      const total = list.length;
      const startIndex = (Number(page) - 1) * Number(limit);
      const paginatedItems = list.slice(startIndex, startIndex + Number(limit));

      return {
        items: paginatedItems,
        total,
        page: Number(page),
        limit: Number(limit),
      };
    },
  },

  coupons: {
    ...createRepository("coupons"),

    /**
     * Validate Coupon for a given cart total
     */
    async validateCoupon(code, cartTotal = 0) {
      if (!code) return { valid: false, message: "Please provide a coupon code" };

      const mongo = await getMongoDatabase();
      let coupon = null;

      if (mongo) {
        const raw = await mongo.collection("coupons").findOne({
          code: { $regex: new RegExp(`^${code.trim()}$`, "i") },
          active: { $ne: false },
        });
        coupon = cleanDoc(raw);
      } else {
        const database = loadLocalDatabase();
        coupon = database.coupons.find(
          (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.active !== false
        );
      }

      if (!coupon) {
        return { valid: false, message: "Invalid or expired coupon code" };
      }

      if (cartTotal < (coupon.minOrderValue || 0)) {
        return {
          valid: false,
          message: `Minimum order value of ₹${coupon.minOrderValue.toLocaleString("en-IN")} required for ${coupon.code}`,
        };
      }

      let discountAmount = 0;
      if (coupon.discountType === "percentage") {
        discountAmount = Math.round((cartTotal * coupon.value) / 100);
        if (coupon.maxDiscount) {
          discountAmount = Math.min(discountAmount, coupon.maxDiscount);
        }
      } else if (coupon.discountType === "fixed") {
        discountAmount = Math.min(coupon.value, cartTotal);
      }

      return {
        valid: true,
        coupon,
        discountAmount,
        finalTotal: Math.max(0, cartTotal - discountAmount),
        message: `${coupon.code} applied! Saved ₹${discountAmount.toLocaleString("en-IN")}`,
      };
    },
  },

  orders: createRepository("orders"),
};

export default db;
