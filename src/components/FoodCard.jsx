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
    <div className={`card group rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <Link to={`/food/${food.id}`}>
        <div className="relative overflow-hidden h-40">
          <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
            ${food.price}
          </div>
        </div>
      </Link>
      
      <div className="p-3">
        <Link to={`/food/${food.id}`}>
          <h3 className={`text-sm font-semibold mb-1 hover:text-orange-500 transition-colors ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {food.name}
          </h3>
        </Link>
        <p className={`text-xs mb-2 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {food.shortDescription}
        </p>
        
        <button
          onClick={() => setShowNutrition(!showNutrition)}
          className={`w-full flex items-center justify-between text-xs mb-2 px-2 py-1 rounded transition-all ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <span><i className="fas fa-chart-line mr-1"></i>Nutrition</span>
          <i className={`fas fa-chevron-${showNutrition ? 'up' : 'down'} text-xs transition-transform duration-200`}></i>
        </button>
        
        {showNutrition && (
          <div className={`rounded p-2 mb-2 space-y-1 text-xs animate-fadeInUp ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex justify-between">
              <span>🔥 Calories</span>
              <span className="font-semibold">{food.nutrition.calories} kcal</span>
            </div>
            <div className="flex justify-between">
              <span>🍞 Carbs</span>
              <span className="font-semibold">{food.nutrition.carbs}g</span>
            </div>
            <div className="flex justify-between">
              <span>💪 Protein</span>
              <span className="font-semibold">{food.nutrition.protein}g</span>
            </div>
            <div className="flex justify-between">
              <span>🧈 Fats</span>
              <span className="font-semibold">{food.nutrition.fats}g</span>
            </div>
          </div>
        )}
        
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1 ${
            isAdding ? 'bg-gray-400 cursor-not-allowed' : 'btn-primary'
          }`}
        >
          {isAdding ? (
            <><i className="fas fa-check text-xs"></i> Added!</>
          ) : (
            <><i className="fas fa-cart-plus text-xs"></i> Add to Cart</>
          )}
        </button>
      </div>
    </div>
  );
};

export default FoodCard;