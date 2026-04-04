import React, { useState } from 'react';
import { useFood } from '../context/FoodContext';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';

const Menu = () => {
  const { foods, categories, loading } = useFood();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFoods = foods?.filter(food => {
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (food.shortDescription && food.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  }) || [];

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
        {categories?.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex-shrink-0 px-5 py-2 rounded-full font-semibold transition ${
              selectedCategory === cat.name
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      
      {filteredFoods.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No foods found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFoods.map(food => <FoodCard key={food.id} food={food} />)}
        </div>
      )}
    </div>
  );
};

export default Menu;