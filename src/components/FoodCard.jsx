import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!user) {
      alert('Please login first to add items to cart!');
      navigate('/login');
      return;
    }
    setIsAdding(true);
    await addToCart(food);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden h-48 cursor-pointer" onClick={() => navigate(`/food/${food.id}`)}>
        <img src={food.image} alt={food.name} className="w-full h-full object-cover hover:scale-110 transition duration-500" />
        <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 text-sm font-semibold">
          ${food.price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{food.name}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{food.shortDescription}</p>
        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-400">★</span>
          <span className="text-sm">{food.rating}</span>
        </div>
        
        {/* Nutritional Info Dropdown */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-left text-sm text-orange-500 mb-2 flex items-center justify-between"
        >
          <span>Nutritional Information</span>
          <span>{showDetails ? '▲' : '▼'}</span>
        </button>
        
        {showDetails && (
          <div className="bg-gray-50 rounded-lg p-3 mb-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">🔥 Calories:</span>
              <span className="font-semibold">{food.calories} cal</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">🍞 Carbohydrates:</span>
              <span className="font-semibold">{food.carbs}g</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">💪 Protein:</span>
              <span className="font-semibold">{food.protein}g</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">🧈 Fats:</span>
              <span className="font-semibold">{food.fats || 15}g</span>
            </div>
          </div>
        )}
        
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-2 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isAdding ? 'bg-gray-400' : 'bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105'
          } text-white`}
        >
          {isAdding ? '✓ Added!' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default FoodCard;