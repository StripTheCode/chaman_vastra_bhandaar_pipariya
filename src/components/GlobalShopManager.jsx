"use client";

import { useShop } from "@/context/ShopContext";
import CartDrawer from "@/components/CartDrawer";
import ProductDetailModal from "@/components/ProductDetailModal";
import AuthModal from "@/components/auth/AuthModal";

export default function GlobalShopManager() {
  const {
    isCartOpen,
    closeCart,
    cart,
    updateQuantity,
    removeItem,
    currentCurrency,
    selectedProduct,
    closeQuickView,
    addToCart,
    isWishlisted,
    toggleWishlist,
  } = useShop();

  return (
    <>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        currentCurrency={currentCurrency}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={closeQuickView}
        onAddToCart={addToCart}
        currentCurrency={currentCurrency}
        isWishlisted={selectedProduct ? isWishlisted(selectedProduct.id) : false}
        onToggleWishlist={toggleWishlist}
      />

      <AuthModal />
    </>
  );
}

