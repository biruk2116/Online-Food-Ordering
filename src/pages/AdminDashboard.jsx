import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { foods, deleteFood } = useFood();

  if (!user || user.email !== 'admin@foodie.com') {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Food Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr><th className="p-2 text-left">Name</th><th>Price</th><th>Category</th><th>Action</th></tr>
            </thead>
            <tbody>
              {foods.map(food => (
                <tr key={food.id} className="border-b">
                  <td className="p-2">{food.name}</td>
                  <td>${food.price}</td>
                  <td>{food.category}</td>
                  <td><button onClick={() => deleteFood(food.id)} className="text-red-500">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}