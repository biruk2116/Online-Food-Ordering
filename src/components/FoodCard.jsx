import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart, useAuth } from '../App';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert('Please login first to add items to cart!');
      return;
    }
    setIsAdding(true);
    await addToCart(food);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <Link to={`/food/${food.id}`}>
        <div className="relative overflow-hidden h-48">
          <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            ${food.price}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-center space-x-2 text-white">
              <i className="fas fa-star text-yellow-400"></i>
              <span>{food.rating}</span>
              <span className="mx-2">•</span>
              <i className="fas fa-fire"></i>
              <span>{food.nutrition.calories} cal</span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/food/${food.id}`}>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1 hover:text-orange-500 transition">{food.name}</h3>
        </Link>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2">{food.shortDescription}</p>
        
        {/* Nutrition Dropdown */}
        <button
          onClick={() => setShowNutrition(!showNutrition)}
          className="w-full flex items-center justify-between text-sm text-orange-500 mb-3 hover:bg-orange-50 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition"
        >
          <span><i className="fas fa-chart-line mr-2"></i>Nutrition Facts</span>
          <i className={`fas fa-chevron-${showNutrition ? 'up' : 'down'} transition-transform`}></i>
        </button>
        
        {showNutrition && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4 space-y-2 animate-fadeInUp">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300"><i className="fas fa-fire mr-2 text-orange-500"></i>Calories</span>
              <span className="font-semibold">{food.nutrition.calories} kcal</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300"><i className="fas fa-bread-slice mr-2 text-yellow-500"></i>Carbohydrates</span>
              <span className="font-semibold">{food.nutrition.carbs}g</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300"><i className="fas fa-dumbbell mr-2 text-blue-500"></i>Protein</span>
              <span className="font-semibold">{food.nutrition.protein}g</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300"><i className="fas fa-oil-can mr-2 text-red-500"></i>Fats</span>
              <span className="font-semibold">{food.nutrition.fats}g</span>
            </div>
          </div>
        )}
        
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-2 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isAdding ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105'
          } text-white shadow-lg`}
        >
          {isAdding ? (
            <><i className="fas fa-check"></i> Added!</>
          ) : (
            <><i className="fas fa-cart-plus"></i> Add to Cart</>
          )}
        </button>
      </div>
    </div>
  );
};

export default FoodCard;