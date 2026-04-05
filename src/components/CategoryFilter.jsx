import React, { useRef } from 'react';
import { useSettings } from '../App';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  const scrollRef = useRef(null);
  const { isDark } = useSettings();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!categories || categories.length === 0) return null;

  return (
    <div className="relative mb-6">
      <button 
        onClick={() => scroll('left')}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-1.5 shadow-md hover:scale-110 transition-all duration-200 ${
          isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <i className="fas fa-chevron-left text-xs"></i>
      </button>
      
      <div 
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-7 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.name)}
            className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 ${
              selectedCategory === cat.name
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                : isDark 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="w-8 h-8 object-contain"
            />
            <span className="text-xs font-medium">{cat.name}</span>
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => scroll('right')}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-1.5 shadow-md hover:scale-110 transition-all duration-200 ${
          isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <i className="fas fa-chevron-right text-xs"></i>
      </button>
    </div>
  );
};

export default CategoryFilter;