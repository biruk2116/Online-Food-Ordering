// src/context/OrderContext.jsx (Enhanced)
import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/localStorage';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const allOrders = storage.get('orders', []);
    setOrders(allOrders);
  }, []);

  useEffect(() => {
    storage.set('orders', orders);
  }, [orders]);

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: Date.now(),
      ...orderDetails,
      userId: user?.id,
      userName: user?.name,
      date: new Date().toISOString(),
      status: 'Pending'
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    return newOrder;
  };

  const getUserOrders = () => {
    return orders.filter(order => order.userId === user?.id);
  };

  const getAllOrders = () => {
    return orders;
  };

  const updateOrderStatus = (id, status) => {
    const updated = orders.map(order => order.id === id ? { ...order, status } : order);
    setOrders(updated);
  };

  return (
    <OrderContext.Provider value={{ 
      orders, placeOrder, getUserOrders, getAllOrders, updateOrderStatus 
    }}>
      {children}
    </OrderContext.Provider>
  );
};