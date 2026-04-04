import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart, useAuth, useSettings } from '../App';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { isDark } = useSettings();
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
    <div className={`group rounded-xl overflow-hidden shadow-sm transition-all duration-300 transform hover:-translate-y-1 ${
      isDark ? 'bg-gray-800 hover:shadow-md' : 'bg-white hover:shadow-md'
    }`}>
      <Link to={`/food/${food.id}`}>
        <div className="relative overflow-hidden h-40">
          <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow">
            ${food.price}
          </div>
        </div>
      </Link>
      
      <div className="p-3">
        <Link to={`/food/${food.id}`}>
          <h3 className={`text-sm font-semibold mb-1 hover:text-orange-500 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {food.name}
          </h3>
        </Link>
        <p className={`text-xs mb-2 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {food.shortDescription}
        </p>
        
        {/* Nutrition Dropdown */}
        <button
          onClick={() => setShowNutrition(!showNutrition)}
          className={`w-full flex items-center justify-between text-xs mb-2 px-2 py-1 rounded transition-all duration-300 ${
            isDark 
              ? 'text-orange-400 hover:bg-gray-700' 
              : 'text-orange-500 hover:bg-orange-50'
          }`}
        >
          <span><i className="fas fa-chart-line mr-1"></i>Nutrition</span>
          <i className={`fas fa-chevron-${showNutrition ? 'up' : 'down'} text-xs transition-transform duration-300`}></i>
        </button>
        
        {showNutrition && (
          <div className={`rounded p-2 mb-2 space-y-1 text-xs animate-fadeInUp ${
            isDark ? 'bg-gray-700' : 'bg-orange-50'
          }`}>
            <div className="flex justify-between">
              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>🔥 Calories</span>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{food.nutrition.calories} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>🍞 Carbs</span>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{food.nutrition.carbs}g</span>
            </div>
            <div className="flex justify-between">
              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>💪 Protein</span>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{food.nutrition.protein}g</span>
            </div>
            <div className="flex justify-between">
              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>🧈 Fats</span>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{food.nutrition.fats}g</span>
            </div>
          </div>
        )}
        
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1 ${
            isAdding 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105'
          } text-white`}
        >
          {isAdding ? (
            <><i className="fas fa-check text-xs"></i> Added!</>
          ) : (
            <><i className="fas fa-cart-plus text-xs"></i> Add</>
          )}
        </button>
      </div>
    </div>
  );
};

export default FoodCard;