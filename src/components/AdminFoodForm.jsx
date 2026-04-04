import React, { useState } from 'react';

const AdminFoodForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '', price: '', category: 'Burger', 
    shortDescription: '', description: '', 
    calories: '', carbs: '', protein: '', fats: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      ...formData, 
      price: parseFloat(formData.price),
      calories: parseInt(formData.calories),
      carbs: parseInt(formData.carbs),
      protein: parseInt(formData.protein),
      fats: parseInt(formData.fats),
      rating: initialData?.rating || 4.5
    });
    if (!initialData) {
      setFormData({ name: '', price: '', category: 'Burger', shortDescription: '', description: '', calories: '', carbs: '', protein: '', fats: '', image: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {initialData ? 'Edit Food Item' : 'Add New Food'}
      </h3>
      
      <input type="text" placeholder="Food Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
      <input type="number" step="0.01" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
      
      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
        <option>Burger</option><option>Ethiopian</option><option>Beverage</option>
      </select>
      
      <input type="text" placeholder="Short Description" value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
      <textarea placeholder="Full Description" rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
      
      <div className="grid grid-cols-2 gap-4">
        <input type="number" placeholder="Calories" value={formData.calories} onChange={e => setFormData({...formData, calories: e.target.value})} className="px-4 py-2 border rounded-lg" required />
        <input type="number" placeholder="Carbohydrates (g)" value={formData.carbs} onChange={e => setFormData({...formData, carbs: e.target.value})} className="px-4 py-2 border rounded-lg" required />
        <input type="number" placeholder="Protein (g)" value={formData.protein} onChange={e => setFormData({...formData, protein: e.target.value})} className="px-4 py-2 border rounded-lg" required />
        <input type="number" placeholder="Fats (g)" value={formData.fats} onChange={e => setFormData({...formData, fats: e.target.value})} className="px-4 py-2 border rounded-lg" required />
      </div>
      
      <input type="text" placeholder="Image URL" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
      
      <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold">
        {initialData ? 'Update' : 'Add'} Food
      </button>
    </form>
  );
};

export default AdminFoodForm;