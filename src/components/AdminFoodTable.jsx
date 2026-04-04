// src/components/AdminFoodTable.jsx
import React from 'react';
import RatingStars from './RatingStars';

const AdminFoodTable = ({ foods, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <table className="w-full">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr><th className="p-3 text-left">Image</th><th>Name</th><th>Price</th><th>Rating</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {foods.map(food => (
            <tr key={food.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition">
              <td className="p-3"><img src={food.image} alt={food.name} className="w-12 h-12 object-cover rounded" /></td>
              <td className="p-3 font-medium">{food.name}</td>
              <td className="p-3">${food.price}</td>
              <td className="p-3"><RatingStars rating={food.rating} /></td>
              <td className="p-3 space-x-2">
                <button onClick={() => onEdit(food)} className="text-blue-500 hover:text-blue-600">✏️</button>
                <button onClick={() => onDelete(food.id)} className="text-red-500 hover:text-red-600">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFoodTable;