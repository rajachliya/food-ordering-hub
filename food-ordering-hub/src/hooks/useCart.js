import { useState, useCallback, useEffect } from 'react';

const CART_KEY = 'feastly_cart';

// load persisted cart from localStorage on init
function getInitialCart() {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [cartItems, setCartItems] = useState(getInitialCart);

  // keep localStorage in sync whenever cart changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = useCallback((item) => {
    setCartItems((prev) => {
      const found = prev.find((ci) => ci.id === item.id);
      if (found) {
        // item already in cart → bump quantity
        return prev.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== id));
  }, []);

  // delta can be +1 or -1; auto-removes when qty hits 0
  const updateQty = useCallback((id, delta) => {
    setCartItems((prev) =>
      prev
        .map((ci) => (ci.id === id ? { ...ci, quantity: ci.quantity + delta } : ci))
        .filter((ci) => ci.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const totalItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const totalPrice = cartItems.reduce((sum, ci) => sum + ci.price * ci.quantity, 0);

  return { cartItems, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice };
}
