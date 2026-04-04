// src/components/FoodCard.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import RatingStars from './RatingStars';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <div className="card group animate-fadeIn">
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
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{food.description}</p>
        <RatingStars rating={food.rating} />
        <button
          onClick={() => addToCart(food)}
          className="mt-4 w-full btn-primary py-2 flex items-center justify-center gap-2"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;