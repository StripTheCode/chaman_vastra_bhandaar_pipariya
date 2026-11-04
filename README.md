# 👑 Chaman Vastra Bhandar Pipariya — Luxury E-Commerce Ecosystem

A high-performance, full-stack luxury ethnic wear e-commerce web application & API-First backend built for **Chaman Vastra Bhandar (Pipariya, Madhya Pradesh)**.

Designed with an **API-First Architecture** to seamlessly power both this **Next.js Web Store** and future **Flutter / React Native Cross-Platform Mobile Apps** from a single unified backend.

---

## 🌟 Key Features

1. **360° Studio Mannequin & Zoom**:
   - Interactive mouse-drag 360° rotation.
   - Mouse-wheel and pinch-to-zoom (1.0x to 3.5x) on fabric textures, zari, and embroidery.
   - Auto-spin toggle with angle control slider.
   - Available on all product cards (`ProductDetailModal`) and dedicated direct URLs (`/product/[id]`).

2. **Customer Loyalty Coins ("Chaman Coins")**:
   - **100 Welcome Points** credited automatically on new customer registration.
   - **1 Coin = ₹1 Instant Discount** at checkout.
   - **5% Cashback Points** awarded automatically on every completed order.
   - Customer loyalty ledger and balance tracking in `/account`.

3. **Festival Coupons Engine**:
   - Multi-tier promotional discount codes:
     - `ROYAL10`: 10% instant discount (Min order ₹1,500).
     - `DIWALI20`: 20% festive discount (Min order ₹5,000).
     - `FESTIVE500`: Flat ₹500 off (Min order ₹3,000).
   - Real-time cart threshold validation & stacked points redemption.

4. **Merchant Admin Console (`/admin`)**:
   - **Product Manager (`/admin/products`)**: Add/Edit/Delete ethnic dresses, manage size variants (`XS` to `XXL`), live inventory stock, and pricing.
   - **Category Manager (`/admin/categories`)**: Create/manage luxury collections (Sarees, Lehengas, Anarkalis, Chanderi).
   - **Festival Promotions (`/admin/coupons`)**: Create festival discount campaigns.
   - **Live Orders (`/admin/orders`)**: Dispatch progression (`PLACED` → `CONFIRMED` → `SHIPPED` → `DELIVERED`).

5. **Shopping Cart & Multi-Step Razorpay Checkout (`/checkout`)**:
   - Multi-step luxury checkout flow with saved address selector.
   - Live Razorpay payment gateway integration with HMAC SHA-256 server verification.
   - Simulated test mode fallback for instant zero-config testing.
   - Order confirmation & invoice generation (`/order-success/[orderId]`).

6. **Klaviyo-Style Luxury Welcome Discount Modal**:
   - Auto-opens with welcome promotion for new shoppers.
   - Mobile and desktop responsive with 10% coupon unlocking.

---

## 📱 Mobile App (Flutter / React Native) REST API Endpoints

All endpoints return a standardized JSON envelope:
```json
{
  "success": true,
  "message": "Operation description",
  "data": { ... }
}
```

### Authentication & Customers
- `POST /api/auth/register` — Register customer (Auto-awards 100 Welcome Coins).
- `POST /api/auth/login` — Login (Returns JWT Bearer token).
- `GET  /api/auth/me` — Customer profile, coins ledger, saved addresses (`Authorization: Bearer <token>`).
- `PUT  /api/auth/me` — Save new delivery address.
- `POST /api/auth/logout` — Invalidate session.

### Catalog & Categories
- `GET  /api/categories` — List all active ethnic categories.
- `GET  /api/products?category=sarees&minPrice=1000&sort=price_asc&page=1&limit=12` — Filtered & paginated products.
- `GET  /api/products/[id]` — Detailed product specs, sizes, stock, and 360° image assets.

### Coupons & Coins
- `GET  /api/coupons` — List public active promotions.
- `POST /api/coupons/validate` — Validate coupon code against cart subtotal.
- `POST /api/points/calculate` — Calculate maximum allowable coins redemption.

### Orders & Checkout
- `POST /api/checkout/create-order` — Create Razorpay order & lock inventory.
- `POST /api/checkout/verify-payment` — Verify Razorpay signature & finalize order.
- `GET  /api/orders/[id]` — Customer tracking page data.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS, Lucide React Icons
- **Animation**: Framer Motion
- **Security**: JWT (`jose`), `bcryptjs`, HMAC SHA-256
- **Database**: Dual-mode repository layer (`src/lib/db.js`) with persistent JSON & cloud DB adapters
- **Payments**: Razorpay Node.js SDK
- **Media**: Cloudinary CDN

---

## 🚀 Getting Started

### 1. Installation
```bash
git clone <repo-url>
cd "Chaman PPI"
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your credentials or keep defaults for auto-simulated test mode.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Automated QA Test Suite

Run the full automated test suite verifying all 6 phases:
```bash
node tests/test_phase1.js           # DB & Crypto Foundation (17 tests)
node tests/test_phase2_auth.js      # Auth & Points Ledger (12 tests)
node tests/test_phase3_catalog_admin.js # Catalog & Admin CRUD (12 tests)
node tests/test_phase5_coupons.js   # Coupons & Points Engine (7 tests)
node tests/test_phase6_checkout.js  # Cart & Razorpay Checkout (9 tests)
node tests/test_master_e2e.js       # Master End-to-End Regression (13 tests)
```
**Total: 70 Automated Tests Passing (0 Failures).**

### Production Build Verification
```bash
npm run build
```
Certifies all 93 static and dynamic routes compile cleanly with zero errors.

---

## 🚢 Deploying Live (Vercel & Railway)

### Deploy to Vercel (Recommended):
1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/chaman-heritage.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) & click **"Add New Project"**.
3. Select your GitHub repository.
4. Add environment variables from `.env.example` (`JWT_SECRET`, `RAZORPAY_KEY_ID`, etc.).
5. Click **Deploy**! Live in ~2 minutes with free global SSL.

---
© 2026 Chaman Vastra Bhandar, Pipariya (M.P.). All rights reserved.
