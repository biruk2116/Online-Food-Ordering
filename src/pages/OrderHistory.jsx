// src/pages/OrderHistory.jsx
import React from 'react';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';

const OrderHistory = () => {
  const { orders } = useOrders();
  const { user } = useAuth();
  
  const userOrders = orders.filter(order => order.userId === user?.id);

  if (userOrders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">No orders yet</h2>
        <p className="text-gray-500 mt-2">Start ordering some delicious food!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Order History</h1>
      <div className="space-y-6">
        {userOrders.map(order => (
          <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
            <div className="p-4 border-b bg-gray-50 dark:bg-gray-700 flex justify-between items-center flex-wrap gap-2">
              <span className="font-mono text-sm">Order #{order.id}</span>
              <span className="text-sm">{new Date(order.date).toLocaleDateString()}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>{order.status}</span>
            </div>
            <div className="p-4">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between py-2">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-3 mt-2 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-orange-500">${order.total.toFixed(2)}</span>
              </div>
              <div className="mt-3 text-sm text-gray-500">
                <p>Deliver to: {order.address}</p>
                <p>Contact: {order.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;