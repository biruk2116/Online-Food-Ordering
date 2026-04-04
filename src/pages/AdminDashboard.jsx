// src/pages/AdminDashboard.jsx (Enhanced with Sidebar)
import React, { useState } from 'react';
import { useFood } from '../context/FoodContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import AdminFoodForm from '../components/AdminFoodForm';
import AdminFoodTable from '../components/AdminFoodTable';
import CategoryManager from '../components/CategoryManager';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { foods, categories, addFood, updateFood, deleteFood, addCategory, updateCategory, deleteCategory } = useFood();
  const { getAllOrders, updateOrderStatus } = useOrders();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingFood, setEditingFood] = useState(null);

  if (!user || user.email !== 'admin@foodie.com') {
    return <Navigate to="/" />;
  }

  const stats = {
    totalFoods: foods.length,
    totalCategories: categories.length,
    totalOrders: getAllOrders().length,
    totalUsers: JSON.parse(localStorage.getItem('users') || '[]').length
  };

  const orders = getAllOrders();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Admin Panel
          </h2>
          <p className="text-sm text-gray-500 mt-1">Welcome, {user.name}</p>
        </div>
        <nav className="p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'foods', label: 'Food Management', icon: '🍔' },
            { id: 'categories', label: 'Categories', icon: '📁' },
            { id: 'orders', label: 'Orders', icon: '📦' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: 'Total Foods', value: stats.totalFoods, icon: '🍔', color: 'from-orange-500 to-red-500' },
                { title: 'Categories', value: stats.totalCategories, icon: '📁', color: 'from-blue-500 to-cyan-500' },
                { title: 'Total Orders', value: stats.totalOrders, icon: '📦', color: 'from-green-500 to-teal-500' },
                { title: 'Total Users', value: stats.totalUsers, icon: '👥', color: 'from-purple-500 to-pink-500' }
              ].map(stat => (
                <div key={stat.title} className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm opacity-90">{stat.title}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'foods' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Food Management</h1>
            <div className="grid lg:grid-cols-3 gap-8">
              <div>
                <AdminFoodForm
                  onSubmit={(food) => {
                    if (editingFood) {
                      updateFood(editingFood.id, food);
                      setEditingFood(null);
                    } else {
                      addFood(food);
                    }
                  }}
                  initialData={editingFood}
                />
                {editingFood && (
                  <button onClick={() => setEditingFood(null)} className="mt-4 text-gray-500 hover:text-gray-700 text-sm">
                    Cancel Edit
                  </button>
                )}
              </div>
              <div className="lg:col-span-2">
                <AdminFoodTable foods={foods} onEdit={setEditingFood} onDelete={deleteFood} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Category Management</h1>
            <CategoryManager 
              categories={categories}
              onAdd={addCategory}
              onUpdate={updateCategory}
              onDelete={deleteCategory}
            />
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Order Management</h1>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Customer</th>
                    <th className="p-3 text-left">Total</th>
                    <th className="p-3 text-left">Payment</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b dark:border-gray-700">
                      <td className="p-3">#{order.id}</td>
                      <td className="p-3">{order.userName}</td>
                      <td className="p-3">${order.total}</td>
                      <td className="p-3">{order.paymentMethod}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>{order.status}</span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => updateOrderStatus(order.id, order.status === 'Pending' ? 'Completed' : 'Pending')}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;