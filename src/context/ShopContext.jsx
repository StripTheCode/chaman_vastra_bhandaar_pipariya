"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS, CURRENCIES } from "@/data/products";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [currentCurrency, setCurrentCurrency] = useState("INR");
  const [cart, setCart] = useState([
    {
      product: PRODUCTS[0],
      size: "M",
      quantity: 1,
    },
  ]);
  const [wishlist, setWishlist] = useState([1, 7]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart operations
  const addToCart = (product, size = "M", quantity = 1) => {
    setCart((prevCart) => {
      const targetSize = size || (product.sizes && product.sizes[0]) || "Standard";
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === targetSize
      );
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, size: targetSize, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      removeItem(index);
    } else {
      setCart((prev) => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  const openQuickView = (product) => setSelectedProduct(product);
  const closeQuickView = () => setSelectedProduct(null);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotalINR = cart.reduce(
    (sum, item) => sum + item.product.priceINR * item.quantity,
    0
  );

  return (
    <ShopContext.Provider
      value={{
        currentCurrency,
        setCurrentCurrency,
        currencyObj: CURRENCIES[currentCurrency] || CURRENCIES.INR,
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
        selectedProduct,
        openQuickView,
        closeQuickView,
        totalCartCount,
        cartSubtotalINR,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}

