import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth, useFood, useOrders, useSettings } from '../App';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { foods, categories, addFood, updateFood, deleteFood, addCategory, updateCategory, deleteCategory } = useFood();
  const { getAllOrders, updateOrderStatus } = useOrders();
  const { isDark, heroBackground, setHeroBackground } = useSettings();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingFood, setEditingFood] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [users, setUsers] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState(heroBackground);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [adminCredentials, setAdminCredentials] = useState({ currentPassword: '', newEmail: '', newName: '' });
  const fileInputRef = useRef(null);
  const categoryFileInputRef = useRef(null);
  const heroImageInputRef = useRef(null);
  
  const [foodForm, setFoodForm] = useState({
    name: '', price: '', category: '', shortDescription: '', description: '',
    nutrition: { calories: '', carbs: '', protein: '', fats: '' }, image: ''
  });
  const [categoryForm, setCategoryForm] = useState({ name: '', image: '' });

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(savedUsers);
    if (user) {
      setAdminCredentials({ currentPassword: '', newEmail: user.email, newName: user.name });
    }
  }, [user]);

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
        setImagePreview(reader.result);
        setFoodForm({ ...foodForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImagePreview(reader.result);
        setCategoryForm({ ...categoryForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setHeroImagePreview(imageUrl);
        localStorage.setItem('heroBackground', imageUrl);
        setHeroBackground(imageUrl);
        window.dispatchEvent(new CustomEvent('heroBackgroundChanged', { detail: { imageUrl } }));
        alert('Hero background updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFoodSubmit = (e) => {
    e.preventDefault();
    if (!foodForm.category) {
      alert('Please select a category');
      return;
    }
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
    setFoodForm({ name: '', price: '', category: '', shortDescription: '', description: '', nutrition: { calories: '', carbs: '', protein: '', fats: '' }, image: '' });
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

  const handleDeleteCategory = (categoryId, categoryName) => {
    const foodsInCategory = foods.filter(food => food.category === categoryName);
    if (foodsInCategory.length > 0) {
      alert(`Cannot delete "${categoryName}" because it has ${foodsInCategory.length} food items. Please reassign or delete those foods first.`);
      return;
    }
    deleteCategory(categoryId);
    setShowDeleteConfirm(null);
  };

  const handleUpdateAdminProfile = () => {
    const usersList = JSON.parse(localStorage.getItem('users') || '[]');
    const adminIndex = usersList.findIndex(u => u.id === user.id);
    if (adminIndex !== -1) {
      usersList[adminIndex].name = adminCredentials.newName;
      usersList[adminIndex].email = adminCredentials.newEmail;
      localStorage.setItem('users', JSON.stringify(usersList));
      
      const updatedUser = { ...user, name: adminCredentials.newName, email: adminCredentials.newEmail };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      alert('Profile updated successfully! Please login again.');
      logout();
      navigate('/login');
    }
    setShowSecurityModal(false);
  };

  const handleUpdateOrderStatus = (orderId, currentStatus) => {
    const statusFlow = { 'Pending': 'Processing', 'Processing': 'Delivered', 'Delivered': 'Completed' };
    const newStatus = statusFlow[currentStatus] || 'Pending';
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
        <div className="p-6 border-b dark:border-gray-700 bg-gradient-to-r from-orange-500 to-red-500">
          <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
          <p className="text-sm text-white opacity-90 mt-1">Welcome, {user.name}</p>
        </div>
        
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-semibold dark:text-white text-sm">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
            <button onClick={() => setShowSecurityModal(true)} className="text-gray-500 hover:text-orange-500">
              <i className="fas fa-edit"></i>
            </button>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'foods', label: 'Food Management', icon: '🍔' },
            { id: 'categories', label: 'Categories', icon: '📁' },
            { id: 'hero', label: 'Hero Background', icon: '🖼️' },
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
          <button onClick={exportData} className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-300 transition mb-2">
            <i className="fas fa-download mr-2"></i> Export Data
          </button>
          <button onClick={logout} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
            <i className="fas fa-sign-out-alt mr-2"></i> Logout
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
                    <div>
                      <p className="text-sm opacity-90">{stat.title}</p>
                      <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    </div>
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
                  <input type="text" placeholder="Food Name" value={foodForm.name} onChange={e => setFoodForm({...foodForm, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" required />
                  <input type="number" step="0.01" placeholder="Price" value={foodForm.price} onChange={e => setFoodForm({...foodForm, price: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" required />
                  <select value={foodForm.category} onChange={e => setFoodForm({...foodForm, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" required>
                    <option value="">Select Category</option>
                    {categories.filter(cat => cat.name !== 'All').map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  <input type="text" placeholder="Short Description" value={foodForm.shortDescription} onChange={e => setFoodForm({...foodForm, shortDescription: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" required />
                  <textarea placeholder="Full Description" rows="2" value={foodForm.description} onChange={e => setFoodForm({...foodForm, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" required />
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">Food Image</label>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
                    {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="number" placeholder="Calories" value={foodForm.nutrition.calories} onChange={e => setFoodForm({...foodForm, nutrition: {...foodForm.nutrition, calories: e.target.value}})} className="px-4 py-2 border rounded-lg dark:bg-gray-700" />
                    <input type="number" placeholder="Carbs (g)" value={foodForm.nutrition.carbs} onChange={e => setFoodForm({...foodForm, nutrition: {...foodForm.nutrition, carbs: e.target.value}})} className="px-4 py-2 border rounded-lg dark:bg-gray-700" />
                    <input type="number" placeholder="Protein (g)" value={foodForm.nutrition.protein} onChange={e => setFoodForm({...foodForm, nutrition: {...foodForm.nutrition, protein: e.target.value}})} className="px-4 py-2 border rounded-lg dark:bg-gray-700" />
                    <input type="number" placeholder="Fats (g)" value={foodForm.nutrition.fats} onChange={e => setFoodForm({...foodForm, nutrition: {...foodForm.nutrition, fats: e.target.value}})} className="px-4 py-2 border rounded-lg dark:bg-gray-700" />
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition">{editingFood ? 'Update' : 'Add'} Food</button>
                  {editingFood && (<button type="button" onClick={() => { setEditingFood(null); setFoodForm({ name: '', price: '', category: '', shortDescription: '', description: '', nutrition: { calories: '', carbs: '', protein: '', fats: '' }, image: '' }); setImagePreview(null); }} className="w-full text-gray-500 text-sm mt-2">Cancel Edit</button>)}
                </form>
              </div>
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 overflow-x-auto">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Food List</h2>
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="p-3 text-left">Image</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-left">Category</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foods.map(food => (
                      <tr key={food.id} className="border-b dark:border-gray-700">
                        <td className="p-3"><img src={food.image} alt={food.name} className="w-12 h-12 object-cover rounded" /></td>
                        <td className="p-3 dark:text-white">{food.name}</td>
                        <td className="p-3 dark:text-white">${food.price}</td>
                        <td className="p-3 dark:text-white">{food.category}</td>
                        <td className="p-3 space-x-2">
                          <button onClick={() => { setEditingFood(food); setFoodForm(food); setImagePreview(food.image); }} className="text-blue-500 hover:scale-110 transition">✏️</button>
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
                  <input type="text" placeholder="Category Name" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" required />
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">Category Image</label>
                    <input type="file" ref={categoryFileInputRef} onChange={handleCategoryImageUpload} accept="image/*" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
                    {categoryImagePreview && <img src={categoryImagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition">{editingCategory ? 'Update' : 'Add'} Category</button>
                  {editingCategory && (<button type="button" onClick={() => { setEditingCategory(null); setCategoryForm({ name: '', image: '' }); setCategoryImagePreview(null); }} className="w-full text-gray-500 text-sm mt-2">Cancel Edit</button>)}
                </form>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Categories List</h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {categories.map(cat => {
                    const foodCount = foods.filter(food => food.category === cat.name).length;
                    return (
                      <div key={cat.id} className="flex items-center gap-4 p-3 border rounded-lg dark:border-gray-700">
                        <img src={cat.image} alt={cat.name} className="w-12 h-12 object-contain" />
                        <div className="flex-1">
                          <div className="font-semibold dark:text-white">{cat.name}</div>
                          <div className="text-xs text-gray-500">{foodCount} food items</div>
                        </div>
                        {cat.name !== 'All' && (
                          <div className="space-x-2">
                            <button onClick={() => { setEditingCategory(cat); setCategoryForm({ name: cat.name, image: cat.image }); setCategoryImagePreview(cat.image); }} className="text-blue-500 hover:scale-110 transition">✏️</button>
                            <button onClick={() => setShowDeleteConfirm(cat)} className="text-red-500 hover:scale-110 transition">🗑️</button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Background Upload Section */}
        {activeTab === 'hero' && (
          <div className="animate-fadeInUp">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">Hero Background Settings</h1>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 dark:text-white">Home Page Hero Background</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Upload a background image for the home page hero section. This image will be displayed full-screen.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Current Background Preview</label>
                  <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <img src={heroImagePreview} alt="Current Hero Background" className="w-full h-full object-cover" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Upload New Image</label>
                  <input type="file" ref={heroImageInputRef} onChange={handleHeroImageUpload} accept="image/*" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
                  <p className="text-xs text-gray-500 mt-2">Recommended size: 1920x1080px or larger. Supported formats: JPG, PNG, WebP</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 dark:text-white">Tips for best results:</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Use high-quality images with good resolution</li>
                    <li>• Ensure the main subject is centered or properly positioned</li>
                    <li>• Avoid images with too much text or clutter</li>
                    <li>• The image will be slightly zoomed on hover for effect</li>
                  </ul>
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
                  <tr>
                    <th className="p-3 text-left">Order #</th>
                    <th className="p-3 text-left">Customer</th>
                    <th className="p-3 text-left">Total</th>
                    <th className="p-3 text-left">Payment</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getAllOrders().map(order => (
                    <tr key={order.id} className="border-b dark:border-gray-700">
                      <td className="p-3 dark:text-white">{order.orderNumber}</td>
                      <td className="p-3 dark:text-white">{order.userName}</td>
                      <td className="p-3 dark:text-white">${order.total?.toFixed(2)}</td>
                      <td className="p-3 dark:text-white">{order.paymentMethod || 'Cash'}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>{order.status}</span>
                      </td>
                      <td className="p-3 dark:text-white">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="p-3">
                        <button onClick={() => handleUpdateOrderStatus(order.id, order.status)} className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
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

        {activeTab === 'users' && (
          <div className="animate-fadeInUp">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">User Management</h1>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto p-6">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-left">Orders</th>
                    <th className="p-3 text-left">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => {
                    const userOrders = getAllOrders().filter(o => o.userId === u.id).length;
                    return (
                      <tr key={u.id} className="border-b dark:border-gray-700">
                        <td className="p-3 dark:text-white">#{u.id}</td>
                        <td className="p-3 dark:text-white">{u.name}</td>
                        <td className="p-3 dark:text-white">{u.email}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                            {u.role || 'user'}
                          </span>
                        </td>
                        <td className="p-3 dark:text-white">{userOrders} orders</td>
                        <td className="p-3 dark:text-white">{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">⚠️</div>
              <h2 className="text-2xl font-bold dark:text-white">Delete Category</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Are you sure you want to delete "{showDeleteConfirm.name}"?
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg hover:bg-gray-400 transition">
                Cancel
              </button>
              <button onClick={() => handleDeleteCategory(showDeleteConfirm.id, showDeleteConfirm.name)} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Modal for Admin Profile Update */}
      {showSecurityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold dark:text-white">Update Admin Profile</h2>
              <button onClick={() => setShowSecurityModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateAdminProfile(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Full Name</label>
                <input type="text" value={adminCredentials.newName} onChange={e => setAdminCredentials({...adminCredentials, newName: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Email Address</label>
                <input type="email" value={adminCredentials.newEmail} onChange={e => setAdminCredentials({...adminCredentials, newEmail: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Current Password (for verification)</label>
                <input type="password" placeholder="Enter your password" value={adminCredentials.currentPassword} onChange={e => setAdminCredentials({...adminCredentials, currentPassword: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" required />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;