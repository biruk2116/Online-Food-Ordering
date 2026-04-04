// src/components/RecommendationSection.jsx
import React from 'react';
import FoodCard from './FoodCard';

const RecommendationSection = ({ foods }) => {
  if (!foods.length) return null;
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <span>🌟</span> Recommended for You
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {foods.slice(0, 4).map(food => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;