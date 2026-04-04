// src/components/AdminFoodForm.jsx
import React, { useState } from 'react';

const AdminFoodForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '', price: '', category: 'Burger', description: '', image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, price: parseFloat(formData.price) });
    if (!initialData) setFormData({ name: '', price: '', category: 'Burger', description: '', image: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        {initialData ? 'Edit Food Item' : 'Add New Food'}
      </h3>
      <input type="text" placeholder="Food Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input" required />
      <input type="number" step="0.01" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="input" required />
      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="input">
        <option>Burger</option><option>Ethiopian</option><option>Beverage</option>
      </select>
      <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="input" rows="2" />
      <input type="text" placeholder="Image URL" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="input" />
      <button type="submit" className="btn-primary w-full">{initialData ? 'Update' : 'Add'} Food</button>
    </form>
  );
};

export default AdminFoodForm;