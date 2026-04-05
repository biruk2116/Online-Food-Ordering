import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useOrders, useSettings } from '../App';

const Account = () => {
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
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>You need to be logged in to view your account.</p>
          <Link to="/login" className="btn-premium inline-block">Login Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl pt-24">
      <h1 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>My Account</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className={`rounded-2xl shadow-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-white font-bold">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{user.name}</h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
            <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between mb-2">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Total Orders</span>
                <span className="font-bold text-orange-500">{orders.length}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Orders Section */}
        <div className={`md:col-span-2 rounded-2xl shadow-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Recent Orders</h2>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📦</div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No orders yet</p>
              <Link to="/menu" className="inline-block mt-4 btn-premium">Start Ordering</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 3).map(order => (
                <div key={order.id} className={`border rounded-xl p-4 transition-all duration-300 hover:shadow-md ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                    <div>
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{order.orderNumber}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                      'bg-green-100 text-green-800'
                    }`}>{order.status}</span>
                  </div>
                  <div className="space-y-2 mb-3">
                    {order.items.slice(0, 2).map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{item.name} x{item.quantity}</span>
                        <span className={isDark ? 'text-white' : 'text-gray-800'}>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>+{order.items.length - 2} more items</p>
                    )}
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Total</span>
                    <span className="font-bold text-orange-500">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
              {orders.length > 3 && (
                <div className="text-center mt-4">
                  <Link to="/orders" className="text-orange-500 hover:text-orange-600 font-semibold">
                    View All Orders →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;