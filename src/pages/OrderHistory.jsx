import React from 'react';
import { useAuth, useOrders } from '../App';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const { user } = useAuth();
  const { getUserOrders } = useOrders();
  const orders = getUserOrders();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center mt-16">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold mb-4">Please Login</h2>
        <Link to="/login" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full">Login</Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center mt-16">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
        <Link to="/menu" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full">Start Ordering</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-16">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span className="font-mono text-sm">{order.orderNumber}</span>
                <span>{new Date(order.date).toLocaleDateString()}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Pending' ? 'bg-yellow-500' : 'bg-green-500'}`}>{order.status}</span>
              </div>
            </div>
            <div className="p-4">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between py-2">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-3 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-orange-500">${order.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-500">
                <p>Deliver to: {order.address}</p>
                <p>Contact: {order.phone}</p>
                <p>Payment: {order.paymentMethod || 'Cash on Delivery'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;