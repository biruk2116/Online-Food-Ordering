import React, { useRef } from 'react';
import { useSettings } from '../App';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  const scrollRef = useRef(null);
  const { isDark } = useSettings();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!categories || categories.length === 0) return null;

  return (
    <div className="relative mb-8">
      <button 
        onClick={() => scroll('left')}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow-md hover:scale-110 transition-all duration-300 ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <i className="fas fa-chevron-left text-xs"></i>
      </button>
      
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-8 py-3"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.name)}
            className={`flex-shrink-0 flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === cat.name
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                : isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-white text-gray-700 hover:shadow-md'
            }`}
          >
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="w-12 h-12 object-contain rounded-full"
            />
            <span className="text-xs font-medium">{cat.name}</span>
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => scroll('right')}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow-md hover:scale-110 transition-all duration-300 ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <i className="fas fa-chevron-right text-xs"></i>
      </button>
    </div>
  );
};

export default CategoryFilter;