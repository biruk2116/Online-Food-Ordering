import React, { useContext } from 'react';
import { FoodContext } from '../context/FoodContext';
import FoodCard from './FoodCard';

const RecommendationSection = () => {
    const { allFoods } = useContext(FoodContext);

    // Sort by rating and get top 4
    const topRated = [...allFoods].sort((a, b) => b.rating - a.rating).slice(0, 4);

    if (topRated.length === 0) return null;

    return (
        <div className="my-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-brand-500 bg-brand-50 p-2 rounded-xl">⭐</span> Top Rated For You
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {topRated.map(food => (
                    <FoodCard key={`rec-${food.id}`} food={food} />
                ))}
            </div>
        </div>
    );
};

export default RecommendationSection;
