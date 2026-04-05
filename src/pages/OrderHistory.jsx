import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useOrders, useSettings } from '../App';

const OrderHistory = () => {
  const { user } = useAuth();
  const { getUserOrders } = useOrders();
  const { isDark } = useSettings();
  const orders = getUserOrders();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className={`max-w-md w-full rounded-2xl shadow-2xl p-8 text-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="text-6xl mb-4">🔒</div>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Please Login</h2>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>You need to be logged in to view your order history.</p>
          <Link to="/login" className="btn-premium inline-block">Login Now</Link>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className={`max-w-md w-full rounded-2xl shadow-2xl p-8 text-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="text-6xl mb-4">📦</div>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>No orders yet</h2>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>You haven't placed any orders yet.</p>
          <Link to="/menu" className="btn-premium inline-block">Start Ordering</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl pt-24">
      <h1 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>Order History</h1>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span className="font-mono text-sm">{order.orderNumber}</span>
                <span>{new Date(order.date).toLocaleDateString()}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'Pending' ? 'bg-yellow-500' : 
                  order.status === 'Processing' ? 'bg-blue-500' : 
                  'bg-green-500'
                }`}>{order.status}</span>
              </div>
            </div>
            <div className="p-4">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{item.name} x{item.quantity}</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-3 mt-2">
                <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Total</span>
                <span className="text-orange-500 font-bold">${order.total.toFixed(2)}</span>
              </div>
              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
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