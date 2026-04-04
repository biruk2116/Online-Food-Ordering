import React, { useState } from 'react';
import { useFood } from '../App';
import FoodCard from '../components/FoodCard';
import CategoryFilter from '../components/CategoryFilter';

const Menu = () => {
  const { foods, categories } = useFood();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFoods = foods.filter(food => {
    const matchCategory = selectedCategory === 'All' || food.category === selectedCategory;
    const matchSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       food.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search for delicious food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
        />
        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
      </div>
      
      {/* Categories with Images */}
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      
      {/* Food Grid */}
      {filteredFoods.length === 0 ? (
        <div className="text-center py-12">
          <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">No foods found. Try a different search!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFoods.map(food => <FoodCard key={food.id} food={food} />)}
        </div>
      )}
    </div>
  );
};

export default Menu;