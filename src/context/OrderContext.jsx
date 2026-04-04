import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (orderDetails) => {
    const currentUser = localStorage.getItem('currentUser');
    const user = currentUser ? JSON.parse(currentUser) : null;
    
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
    const currentUser = localStorage.getItem('currentUser');
    const user = currentUser ? JSON.parse(currentUser) : null;
    return orders.filter(order => order.userId === user?.id);
  };

  const getAllOrders = () => orders;

  const updateOrderStatus = (id, status) => {
    const updated = orders.map(order => order.id === id ? { ...order, status } : order);
    setOrders(updated);
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getUserOrders, getAllOrders, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};