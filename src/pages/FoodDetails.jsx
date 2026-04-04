// src/pages/FoodDetails.jsx (New)
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFood } from '../context/FoodContext';
import { useCart } from '../context/CartContext';
import RatingStars from '../components/RatingStars';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { foods } = useFood();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  
  const food = foods.find(f => f.id === parseInt(id));

  if (!food) {
    return <div className="container mx-auto px-4 py-16 text-center">Food not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(food, quantity);
    navigate('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button onClick={() => navigate(-1)} className="mb-6 text-orange-500 hover:text-orange-600">← Back</button>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img src={food.image} alt={food.name} className="w-full h-96 object-cover" />
        </div>
        
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{food.name}</h1>
          <RatingStars rating={food.rating} />
          <p className="text-3xl font-bold text-orange-500 mt-4">${food.price}</p>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-600 dark:text-gray-300">{food.description}</p>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl">🔥</div>
              <div className="font-semibold">{food.calories} cal</div>
              <div className="text-sm text-gray-500">Calories</div>
            </div>
            <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl">🍞</div>
              <div className="font-semibold">{food.carbs}g</div>
              <div className="text-sm text-gray-500">Carbs</div>
            </div>
            <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl">💪</div>
              <div className="font-semibold">{food.protein}g</div>
              <div className="text-sm text-gray-500">Protein</div>
            </div>
          </div>
          
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-xl font-bold hover:scale-110 transition-transform"
              >
                -
              </button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-xl font-bold hover:scale-110 transition-transform"
              >
                +
              </button>
            </div>
            <button onClick={handleAddToCart} className="flex-1 btn-primary py-3 text-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;