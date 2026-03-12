import React from 'react';

const categories = ['All', 'Traditional', 'Fast Food', 'Drinks', 'Desserts'];

const CategoryFilter = ({ activeCategory, onSelectCategory }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 my-6">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                            ? 'bg-brand-500 text-white shadow-md transform scale-105'
                            : 'bg-white text-slate-600 hover:bg-brand-50 border border-slate-200 hover:text-brand-600'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
