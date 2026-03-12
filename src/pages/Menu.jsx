import React, { useContext } from 'react';
import { FoodContext } from '../context/FoodContext';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import FoodCard from '../components/FoodCard';
import RecommendationSection from '../components/RecommendationSection';

const Menu = () => {
    const { foods, searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useContext(FoodContext);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    Discover Ethiopian <span className="text-brand-600">Delights</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                    Explore our rich menu of traditional meals, fast food, and refreshing drinks crafted for your taste.
                </p>
            </div>

            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <CategoryFilter activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

            {foods.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16 mt-8">
                    {foods.map(food => (
                        <FoodCard key={food.id} food={food} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 mt-8">
                    <div className="text-5xl mb-4">🍽️</div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">No food found</h3>
                    <p className="text-slate-500">Try adjusting your search or category filter.</p>
                    <button
                        onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                        className="mt-6 px-6 py-2 bg-brand-50 text-brand-600 rounded-full font-medium hover:bg-brand-100 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {!searchQuery && activeCategory === 'All' && <RecommendationSection />}
        </div>
    );
};

export default Menu;
