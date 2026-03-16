import React from 'react';

const categories = ['All', 'Traditional', 'Fast Food', 'Traditional Drinks', 'Modern Drinks', 'Other Drinks', 'Desserts'];

const CategoryFilter = ({ activeCategory, onSelectCategory }) => {
    return (
        <div className="relative w-full md:w-48">
            <select
                value={activeCategory}
                onChange={(e) => onSelectCategory(e.target.value)}
                className="w-full appearance-none bg-black/20 border border-white/10 text-white text-xs font-bold py-2.5 px-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all cursor-pointer hover:bg-black/40"
            >
                {categories.map(category => (
                    <option key={category} value={category} className="bg-slate-900 text-white">
                        {category === 'All' ? 'All Categories' : category}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-brand-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
        </div>
    );
};

export default CategoryFilter;
