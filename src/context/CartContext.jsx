import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showNotification = (message, type = 'success') => {
    window.dispatchEvent(new CustomEvent('showNotification', { detail: { message, type } }));
  };

  const addToCart = (food, quantity = 1) => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      showNotification('Please login first to add items to cart!', 'error');
      return false;
    }
    
    setCartItems(prev => {
      const existing = prev.find(item => item.id === food.id);
      if (existing) {
        showNotification(`Added another ${food.name} to cart!`, 'success');
        return prev.map(item =>
          item.id === food.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      showNotification(`${food.name} added to cart!`, 'success');
      return [...prev, { ...food, quantity }];
    });
    return true;
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showNotification('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, updateQuantity, removeFromCart, clearCart,
      getTotalPrice, getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};