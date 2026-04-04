import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';
import { useOrders } from '../context/OrderContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { foods, categories, addFood, updateFood, deleteFood, addCategory, updateCategory, deleteCategory } = useFood();
  const { getAllOrders, updateOrderStatus } = useOrders();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingFood, setEditingFood] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [foodForm, setFoodForm] = useState({ name: '', price: '', category: 'Burger', description: '', image: '' });
  const [categoryForm, setCategoryForm] = useState({ name: '', image: '' });

  if (!user || user.email !== 'admin@foodie.com') {
    return <Navigate to="/" />;
  }

  const stats = {
    totalFoods: foods.length,
    totalCategories: categories.length,
    totalOrders: getAllOrders().length,
    totalUsers: JSON.parse(localStorage.getItem('users') || '[]').length
  };

  const handleFoodSubmit = (e) => {
    e.preventDefault();
    const foodData = { ...foodForm, price: parseFloat(foodForm.price) };
    if (editingFood) {
      updateFood(editingFood.id, foodData);
      setEditingFood(null);
    } else {
      addFood(foodData);
    }
    setFoodForm({ name: '', price: '', category: 'Burger', description: '', image: '' });
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory.id, categoryForm);
      setEditingCategory(null);
    } else {
      addCategory(categoryForm);
    }
    setCategoryForm({ name: '', image: '' });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                  : 'hover:bg-gray-100 text-gray-700'
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Foods', value: stats.totalFoods, icon: '🍔', color: 'from-orange-500 to-red-500' },
                { title: 'Categories', value: stats.totalCategories, icon: '📁', color: 'from-blue-500 to-cyan-500' },
                { title: 'Total Orders', value: stats.totalOrders, icon: '📦', color: 'from-green-500 to-teal-500' },
                { title: 'Total Users', value: stats.totalUsers, icon: '👥', color: 'from-purple-500 to-pink-500' }
              ].map(stat => (
                <div key={stat.title} className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition`}>
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
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-4">{editingFood ? 'Edit Food' : 'Add New Food'}</h2>
                <form onSubmit={handleFoodSubmit} className="space-y-4">
                  <input type="text" placeholder="Food Name" value={foodForm.name} onChange={e => setFoodForm({...foodForm, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                  <input type="number" step="0.01" placeholder="Price" value={foodForm.price} onChange={e => setFoodForm({...foodForm, price: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                  <select value={foodForm.category} onChange={e => setFoodForm({...foodForm, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                    <option>Burger</option><option>Ethiopian</option><option>Beverage</option>
                  </select>
                  <textarea placeholder="Description" rows="2" value={foodForm.description} onChange={e => setFoodForm({...foodForm, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Image URL" value={foodForm.image} onChange={e => setFoodForm({...foodForm, image: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                  <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg">{editingFood ? 'Update' : 'Add'} Food</button>
                  {editingFood && (
                    <button type="button" onClick={() => { setEditingFood(null); setFoodForm({ name: '', price: '', category: 'Burger', description: '', image: '' }); }} className="w-full text-gray-500 text-sm">Cancel Edit</button>
                  )}
                </form>
              </div>
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Food List</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr><th className="p-2 text-left">Name</th><th>Price</th><th>Category</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {foods.map(food => (
                        <tr key={food.id} className="border-b">
                          <td className="p-2">{food.name}</td>
                          <td className="p-2">${food.price}</td>
                          <td className="p-2">{food.category}</td>
                          <td className="p-2 space-x-2">
                            <button onClick={() => { setEditingFood(food); setFoodForm(food); }} className="text-blue-500">✏️</button>
                            <button onClick={() => deleteFood(food.id)} className="text-red-500">🗑️</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Category Management</h1>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-4">{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
                <form onSubmit={handleCategorySubmit} className="space-y-4">
                  <input type="text" placeholder="Category Name" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                  <input type="text" placeholder="Image URL" value={categoryForm.image} onChange={e => setCategoryForm({...categoryForm, image: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                  <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg">{editingCategory ? 'Update' : 'Add'} Category</button>
                  {editingCategory && (
                    <button type="button" onClick={() => { setEditingCategory(null); setCategoryForm({ name: '', image: '' }); }} className="w-full text-gray-500 text-sm">Cancel Edit</button>
                  )}
                </form>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Categories List</h2>
                <div className="space-y-3">
                  {categories.map(cat => (
                    <div key={cat.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <img src={cat.image} alt={cat.name} className="w-12 h-12 object-contain" />
                      <div className="flex-1 font-semibold">{cat.name}</div>
                      <button onClick={() => { setEditingCategory(cat); setCategoryForm({ name: cat.name, image: cat.image }); }} className="text-blue-500">✏️</button>
                      <button onClick={() => deleteCategory(cat.id)} className="text-red-500">🗑️</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Order Management</h1>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr><th className="p-3 text-left">Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {getAllOrders().map(order => (
                    <tr key={order.id} className="border-b">
                      <td className="p-3">#{order.id}</td>
                      <td className="p-3">{order.userName}</td>
                      <td className="p-3">${order.total}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>{order.status}</span>
                      </td>
                      <td className="p-3">
                        <button onClick={() => updateOrderStatus(order.id, order.status === 'Pending' ? 'Completed' : 'Pending')} className="text-blue-500">Update</button>
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