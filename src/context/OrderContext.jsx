// src/context/OrderContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/localStorage';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = storage.get('orders', []);
    setOrders(savedOrders);
  }, []);

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: Date.now(),
      ...orderDetails,
      date: new Date().toISOString(),
      status: 'Pending'
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    storage.set('orders', updated);
    return newOrder;
  };

  const updateOrderStatus = (id, status) => {
    const updated = orders.map(order => order.id === id ? { ...order, status } : order);
    setOrders(updated);
    storage.set('orders', updated);
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};