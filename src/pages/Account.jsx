import React from 'react';
import { useAuth, useOrders } from '../App';
import { Link } from 'react-router-dom';

const Account = () => {
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-16">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl text-white">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
            <p className="text-gray-500 mb-2">{user.email}</p>
            <p className="text-sm text-gray-400">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            <div className="mt-6 pt-6 border-t dark:border-gray-700">
              <div className="flex justify-between mb-2">
                <span>Total Orders</span>
                <span className="font-bold text-orange-500">{orders.length}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Orders Section */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Order History</h2>
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-500">No orders yet</p>
                <Link to="/menu" className="inline-block mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full">Start Ordering</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="border dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold">{order.orderNumber}</p>
                        <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>{order.status}</span>
                    </div>
                    <div className="space-y-2 mb-3">
                      {order.items.slice(0, 2).map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-sm text-gray-500">+{order.items.length - 2} more items</p>
                      )}
                    </div>
                    <div className="flex justify-between pt-3 border-t dark:border-gray-700">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-orange-500">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;