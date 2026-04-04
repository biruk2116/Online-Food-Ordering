// src/context/CartContext.jsx (Enhanced)
import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/localStorage';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const savedCart = storage.get(`cart_${user.id}`, []);
      setCartItems(savedCart);
    } else {
      setCartItems([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      storage.set(`cart_${user.id}`, cartItems);
    }
  }, [cartItems, user]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (food, quantity = 1) => {
    if (!user) {
      showNotification('Please login first to add items to cart!', 'error');
      return false;
    }
    
    setCartItems(prev => {
      const existing = prev.find(item => item.id === food.id);
      if (existing) {
        const updated = prev.map(item =>
          item.id === food.id ? { ...item, quantity: item.quantity + quantity } : item
        );
        showNotification(`Added another ${food.name} to cart!`, 'success');
        return updated;
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
      getTotalPrice, getItemCount, notification
    }}>
      {children}
    </CartContext.Provider>
  );
};