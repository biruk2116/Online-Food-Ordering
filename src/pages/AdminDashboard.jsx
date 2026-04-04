// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { useFood } from '../context/FoodContext';
import AdminFoodForm from '../components/AdminFoodForm';
import AdminFoodTable from '../components/AdminFoodTable';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { foods, addFood, updateFood, deleteFood } = useFood();
  const [editingFood, setEditingFood] = useState(null);

  if (!user || user.email !== 'admin@foodie.com') {
    return <Navigate to="/menu" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Admin Dashboard</h1>
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
  );
};

export default AdminDashboard;