import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsAdding(true);
    await addToCart(food);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer" onClick={() => navigate(`/food/${food.id}`)}>
      <div className="relative overflow-hidden h-48">
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