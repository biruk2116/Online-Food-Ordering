import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFood } from '../context/FoodContext';
import { useCart } from '../context/CartContext';

export default function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { foods } = useFood();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  
  const food = foods.find(f => f.id === parseInt(id));

  if (!food) return <div className="container mx-auto px-4 py-16 text-center">Food not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button onClick={() => navigate(-1)} className="mb-6 text-orange-500">← Back</button>
      <div className="grid md:grid-cols-2 gap-8">
        <img src={food.image} alt={food.name} className="w-full rounded-2xl shadow-2xl" />
        <div>
          <h1 className="text-4xl font-bold mb-2">{food.name}</h1>
          <p className="text-3xl font-bold text-orange-500">${food.price}</p>
          <p className="text-gray-600 mt-4">{food.description}</p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-100 rounded-lg">🔥 {food.calories} cal</div>
            <div className="text-center p-3 bg-gray-100 rounded-lg">🍞 {food.carbs}g carbs</div>
            <div className="text-center p-3 bg-gray-100 rounded-lg">💪 {food.protein}g protein</div>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full bg-gray-200 text-xl">-</button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full bg-gray-200 text-xl">+</button>
            </div>
            <button onClick={() => addToCart(food, quantity)} className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}