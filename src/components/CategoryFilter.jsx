// src/components/CategoryFilter.jsx (Enhanced - Horizontal Scrollable)
import React, { useRef, useEffect } from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mb-8">
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
      >
        ◀
      </button>
      
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.name)}
            className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === cat.name
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:shadow-md'
            }`}
          >
            <img src={cat.image} alt={cat.name} className="w-12 h-12 object-contain" />
            <span className="text-sm font-semibold">{cat.name}</span>
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
      >
        ▶
      </button>
    </div>
  );
};

export default CategoryFilter;