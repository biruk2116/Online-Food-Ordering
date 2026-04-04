// src/components/RatingStars.jsx
import React from 'react';

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400">
          {i < fullStars ? '★' : (i === fullStars && hasHalfStar ? '½' : '☆')}
        </span>
      ))}
      <span className="text-sm text-gray-500 ml-2">({rating})</span>
    </div>
  );
};

export default RatingStars;