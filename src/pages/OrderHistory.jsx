import React from 'react';
import { useOrders } from '../context/OrderContext';

const OrderHistory = () => {
  const { getUserOrders } = useOrders();
  const orders = getUserOrders();

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold">No orders yet</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-mono text-sm">Order #{order.id}</span>
              <span className="text-sm">{new Date(order.date).toLocaleDateString()}</span>
              <span className="px-2 py-1 bg-yellow-100 rounded-full text-xs">Pending</span>
            </div>
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between py-1">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-orange-500">${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;