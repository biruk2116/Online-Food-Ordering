// src/components/FoodCard.jsx (Enhanced with Details)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import RatingStars from './RatingStars';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(food);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="card group animate-fadeIn cursor-pointer" onClick={() => navigate(`/food/${food.id}`)}>
      <div className="relative overflow-hidden h-48">
        <img 
          src={food.image} 
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 rounded-full px-2 py-1 text-sm font-semibold">
          ${food.price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{food.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 line-clamp-2">{food.shortDescription}</p>
        <RatingStars rating={food.rating} />
        <div className="mt-3 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
            disabled={isAdding}
            className={`flex-1 py-2 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              isAdding 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 shadow-lg hover:shadow-xl'
            } text-white`}
          >
            {isAdding ? '✓ Added!' : '🛒 Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;