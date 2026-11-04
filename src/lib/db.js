import fs from "fs";
import path from "path";
import { CATEGORIES, PRODUCTS } from "../data/products.js";

// Disk storage location for persistent local data
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

// Helper to load or initialize database state
function loadDatabase() {
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
    saveDatabase(data);
  }

  globalThis.__chaman_db__ = data;
  return data;
}

// Helper to save database to disk
function saveDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("[DB Save Error]:", err.message);
  }
}

// Generic collection repository factory
function createRepository(collectionName) {
  return {
    async find(filterFn = () => true) {
      const db = loadDatabase();
      const list = db[collectionName] || [];
      if (typeof filterFn === "function") {
        return list.filter(filterFn);
      }
      return list;
    },

    async findOne(predicate) {
      const db = loadDatabase();
      const list = db[collectionName] || [];
      return list.find(predicate) || null;
    },

    async findById(id) {
      const db = loadDatabase();
      const list = db[collectionName] || [];
      return list.find((item) => String(item.id) === String(id)) || null;
    },

    async create(doc) {
      const db = loadDatabase();
      const newDoc = {
        id: doc.id || `${collectionName.slice(0, 3)}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...doc,
      };
      db[collectionName].push(newDoc);
      saveDatabase(db);
      return newDoc;
    },

    async updateOne(predicate, updates) {
      const db = loadDatabase();
      const index = db[collectionName].findIndex(predicate);
      if (index === -1) return null;

      db[collectionName][index] = {
        ...db[collectionName][index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      saveDatabase(db);
      return db[collectionName][index];
    },

    async deleteOne(predicate) {
      const db = loadDatabase();
      const index = db[collectionName].findIndex(predicate);
      if (index === -1) return false;

      db[collectionName].splice(index, 1);
      saveDatabase(db);
      return true;
    },

    async count(filterFn = () => true) {
      const db = loadDatabase();
      const list = db[collectionName] || [];
      return list.filter(filterFn).length;
    },
  };
}

// Core Database Repositories
export const db = {
  users: {
    ...createRepository("users"),

    /**
     * Credit loyalty points (Chaman Coins) with ledger entry
     */
    async addPoints(userId, points, reason = "Order Reward") {
      const database = loadDatabase();
      const user = database.users.find((u) => String(u.id) === String(userId));
      if (!user) return null;

      user.loyaltyPoints = (user.loyaltyPoints || 0) + Number(points);
      user.pointsHistory = user.pointsHistory || [];
      user.pointsHistory.unshift({
        id: `pts_${Date.now()}`,
        type: "CREDIT",
        amount: Number(points),
        reason,
        timestamp: new Date().toISOString(),
      });
      user.updatedAt = new Date().toISOString();
      saveDatabase(database);
      return user;
    },

    /**
     * Debit loyalty points
     */
    async deductPoints(userId, points, reason = "Redeemed at Checkout") {
      const database = loadDatabase();
      const user = database.users.find((u) => String(u.id) === String(userId));
      if (!user) return null;

      const currentPoints = user.loyaltyPoints || 0;
      if (currentPoints < Number(points)) {
        throw new Error("Insufficient loyalty points balance");
      }

      user.loyaltyPoints = currentPoints - Number(points);
      user.pointsHistory = user.pointsHistory || [];
      user.pointsHistory.unshift({
        id: `pts_${Date.now()}`,
        type: "DEBIT",
        amount: Number(points),
        reason,
        timestamp: new Date().toISOString(),
      });
      user.updatedAt = new Date().toISOString();
      saveDatabase(database);
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
      const database = loadDatabase();
      let list = [...database.products];

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
        // default: newest or featured
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
      const database = loadDatabase();
      const coupon = database.coupons.find(
        (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.active !== false
      );

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

