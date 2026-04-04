import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, useFood, useOrders } from '../App';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { foods, categories, addFood, updateFood, deleteFood, addCategory, updateCategory, deleteCategory } = useFood();
  const { getAllOrders, updateOrderStatus } = useOrders();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingFood, setEditingFood] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [users, setUsers] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const categoryFileInputRef = useRef(null);
  
  const [foodForm, setFoodForm] = useState({
    name: '', price: '', category: 'Burger', shortDescription: '', description: '',
    nutrition: { calories: '', carbs: '', protein: '', fats: '' }, image: ''
  });
  const [categoryForm, setCategoryForm] = useState({ name: '', image: '' });

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(savedUsers);
  }, []);

  if (!user) return <Navigate to="/login" />;
  if (user.email !== 'admin@foodie.com' && user.role !== 'admin') return <Navigate to="/" />;

  const stats = {
    totalFoods: foods.length,
    totalCategories: categories.length,
    totalOrders: getAllOrders().length,
    totalUsers: users.length,
    totalRevenue: getAllOrders().reduce((sum, order) => sum + (order.total || 0), 0)
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setImagePreview(imageUrl);
        setFoodForm({ ...foodForm, image: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setCategoryImagePreview(imageUrl);
        setCategoryForm({ ...categoryForm, image: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFoodSubmit = (e) => {
    e.preventDefault();
    const foodData = {
      ...foodForm,
      price: parseFloat(foodForm.price),
      nutrition: {
        calories: parseInt(foodForm.nutrition.calories) || 0,
        carbs: parseInt(foodForm.nutrition.carbs) || 0,
        protein: parseInt(foodForm.nutrition.protein) || 0,
        fats: parseInt(foodForm.nutrition.fats) || 0
      },
      rating: 4.5
    };
    if (editingFood) {
      updateFood(editingFood.id, foodData);
      setEditingFood(null);
    } else {
      addFood(foodData);
    }
    setFoodForm({ name: '', price: '', category: 'Burger', shortDescription: '', description: '', nutrition: { calories: '', carbs: '', protein: '', fats: '' }, image: '' });
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
    setCategoryImagePreview(null);
    if (categoryFileInputRef.current) categoryFileInputRef.current.value = '';
  };

  const handleEditFood = (food) => {
    setEditingFood(food);
    setFoodForm(food);
    setImagePreview(food.image);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({ name: category.name, image: category.image });
    setCategoryImagePreview(category.image);
  };

  const handleUpdateOrderStatus = (orderId, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Processing' : 
                      currentStatus === 'Processing' ? 'Delivered' : 'Pending';
    updateOrderStatus(orderId, newStatus);
  };

  const exportData = () => {
    const data = { foods, categories, orders: getAllOrders(), users, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foodiedash-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 mt-16">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-xl fixed h-full overflow-y-auto">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold gradient-text">Admin Panel</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome, {user.name}</p>
        </div>
        <nav className="p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'foods', label: 'Food Management', icon: '🍔' },
            { id: 'categories', label: 'Categories', icon: '📁' },
            { id: 'orders', label: 'Orders', icon: '📦' },
            { id: 'users', label: 'Users', icon: '👥' }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === tab.id ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>
              <span className="text-xl">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t dark:border-gray-700">
          <button onClick={exportData} className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-300 transition">
            <i className="fas fa-download mr-2"></i> Export Data
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div className="animate-fadeInUp">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
              {[
                { title: 'Total Foods', value: stats.totalFoods, icon: '🍔', color: 'from-orange-500 to-red-500' },
                { title: 'Categories', value: stats.totalCategories, icon: '📁', color: 'from-blue-500 to-cyan-500' },
                { title: 'Total Orders', value: stats.totalOrders, icon: '📦', color: 'from-green-500 to-teal-500' },
                { title: 'Total Users', value: stats.totalUsers, icon: '👥', color: 'from-purple-500 to-pink-500' },
                { title: 'Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: '💰', color: 'from-yellow-500 to-orange-500' }
              ].map(stat => (
                <div key={stat.title} className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300`}>
                  <div className="flex justify-between items-start">
                    <div><p className="text-sm opacity-90">{stat.title}</p><p className="text-2xl font-bold mt-2">{stat.value}</p></div>
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'foods' && (
          <div className="animate-fadeInUp">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">Food Management</h1>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 dark:text-white">{editingFood ? 'Edit Food' : 'Add New Food'}</h2>
                <form onSubmit={handleFoodSubmit} className="space-y-4">
                  <input type="text" placeholder="Food Name" value={foodForm.name} onChange={e => setFoodForm({...foodForm, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                  <input type="number" step="0.01" placeholder="Price" value={foodForm.price} onChange={e => setFoodForm({...foodForm, price: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                  <select value={foodForm.category} onChange={e => setFoodForm({...foodForm, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option>Burger</option><option>Ethiopian</option><option>Beverage</option>
                  </select>
                  <input type="text" placeholder="Short Description" value={foodForm.shortDescription} onChange={e => setFoodForm({...foodForm, shortDescription: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                  <textarea placeholder="Full Description" rows="2" value={foodForm.description} onChange={e => setFoodForm({...foodForm, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                  
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">Food Image</label>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    {imagePreview && (
                      <div className="mt-2">
                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input type="number" placeholder="Calories" value={foodForm.nutrition.calories} onChange={e => setFoodForm({...foodForm, nutrition: {...foodForm.nutrition, calories: e.target.value}})} className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    <input type="number" placeholder="Carbs (g)" value={foodForm.nutrition.carbs} onChange={e => setFoodForm({...foodForm, nutrition: {...foodForm.nutrition, carbs: e.target.value}})} className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    <input type="number" placeholder="Protein (g)" value={foodForm.nutrition.protein} onChange={e => setFoodForm({...foodForm, nutrition: {...foodForm.nutrition, protein: e.target.value}})} className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    <input type="number" placeholder="Fats (g)" value={foodForm.nutrition.fats} onChange={e => setFoodForm({...foodForm, nutrition: {...foodForm.nutrition, fats: e.target.value}})} className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                  
                  <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition">{editingFood ? 'Update' : 'Add'} Food</button>
                  {editingFood && (<button type="button" onClick={() => { setEditingFood(null); setFoodForm({ name: '', price: '', category: 'Burger', shortDescription: '', description: '', nutrition: { calories: '', carbs: '', protein: '', fats: '' }, image: '' }); setImagePreview(null); }} className="w-full text-gray-500 text-sm mt-2">Cancel Edit</button>)}
                </form>
              </div>
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 overflow-x-auto">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Food List</h2>
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr><th className="p-3 text-left">Image</th><th>Name</th><th>Price</th><th>Category</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {foods.map(food => (
                      <tr key={food.id} className="border-b dark:border-gray-700">
                        <td className="p-3"><img src={food.image} alt={food.name} className="w-12 h-12 object-cover rounded" /></td>
                        <td className="p-3 dark:text-white">{food.name}</td>
                        <td className="p-3 dark:text-white">${food.price}</td>
                        <td className="p-3 dark:text-white">{food.category}</td>
                        <td className="p-3 space-x-2">
                          <button onClick={() => handleEditFood(food)} className="text-blue-500 hover:scale-110 transition">✏️</button>
                          <button onClick={() => deleteFood(food.id)} className="text-red-500 hover:scale-110 transition">🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="animate-fadeInUp">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">Category Management</h1>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 dark:text-white">{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
                <form onSubmit={handleCategorySubmit} className="space-y-4">
                  <input type="text" placeholder="Category Name" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                  
                  {/* Category Image Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">Category Image</label>
                    <input type="file" ref={categoryFileInputRef} onChange={handleCategoryImageUpload} accept="image/*" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    {categoryImagePreview && (
                      <div className="mt-2">
                        <img src={categoryImagePreview} alt="Category Preview" className="w-32 h-32 object-cover rounded-lg" />
                      </div>
                    )}
                  </div>
                  
                  <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition">{editingCategory ? 'Update' : 'Add'} Category</button>
                  {editingCategory && (<button type="button" onClick={() => { setEditingCategory(null); setCategoryForm({ name: '', image: '' }); setCategoryImagePreview(null); }} className="w-full text-gray-500 text-sm mt-2">Cancel Edit</button>)}
                </form>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Categories List</h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {categories.map(cat => (
                    <div key={cat.id} className="flex items-center gap-4 p-3 border rounded-lg dark:border-gray-700">
                      <img src={cat.image} alt={cat.name} className="w-12 h-12 object-contain" />
                      <div className="flex-1 font-semibold dark:text-white">{cat.name}</div>
                      <button onClick={() => handleEditCategory(cat)} className="text-blue-500 hover:scale-110 transition">✏️</button>
                      <button onClick={() => deleteCategory(cat.id)} className="text-red-500 hover:scale-110 transition">🗑️</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="animate-fadeInUp">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">Order Management</h1>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto p-6">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr><th className="p-3 text-left">Order #</th><th>Customer</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {getAllOrders().map(order => (
                    <tr key={order.id} className="border-b dark:border-gray-700">
                      <td className="p-3 dark:text-white">{order.orderNumber}</td>
                      <td className="p-3 dark:text-white">{order.userName}</td>
                      <td className="p-3 dark:text-white">${order.total?.toFixed(2)}</td>
                      <td className="p-3 dark:text-white">{order.paymentMethod || 'Cash'}</td>
                      <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{order.status}</span></td>
                      <td className="p-3 dark:text-white">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="p-3"><button onClick={() => handleUpdateOrderStatus(order.id, order.status)} className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Update</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="animate-fadeInUp">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">User Management</h1>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto p-6">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr><th className="p-3 text-left">ID</th><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b dark:border-gray-700">
                      <td className="p-3 dark:text-white">#{user.id}</td>
                      <td className="p-3 dark:text-white">{user.name}</td>
                      <td className="p-3 dark:text-white">{user.email}</td>
                      <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>{user.role || 'user'}</span></td>
                      <td className="p-3 dark:text-white">{new Date(user.createdAt).toLocaleDateString()}</td>
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