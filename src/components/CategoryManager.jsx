// src/components/CategoryManager.jsx (New)
import React, { useState } from 'react';

const CategoryManager = ({ categories, onAdd, onUpdate, onDelete }) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', image: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      onUpdate(editingCategory.id, formData);
      setEditingCategory(null);
    } else {
      onAdd(formData);
    }
    setFormData({ name: '', image: '' });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Category Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input" required />
          <input type="text" placeholder="Image URL" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="input" required />
          <button type="submit" className="btn-primary w-full">{editingCategory ? 'Update' : 'Add'} Category</button>
          {editingCategory && (
            <button type="button" onClick={() => { setEditingCategory(null); setFormData({ name: '', image: '' }); }} className="text-gray-500 text-sm w-full">
              Cancel Edit
            </button>
          )}
        </form>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Categories List</h2>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {categories.map(cat => (
            <div key={cat.id} className="flex items-center gap-4 p-3 border rounded-lg">
              <img src={cat.image} alt={cat.name} className="w-12 h-12 object-contain" />
              <div className="flex-1 font-semibold">{cat.name}</div>
              <button onClick={() => { setEditingCategory(cat); setFormData({ name: cat.name, image: cat.image }); }} className="text-blue-500 hover:text-blue-600">✏️</button>
              <button onClick={() => onDelete(cat.id)} className="text-red-500 hover:text-red-600">🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;