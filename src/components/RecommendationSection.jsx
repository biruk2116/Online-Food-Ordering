import React, { useContext } from 'react';
import { FoodContext } from '../context/FoodContext';
import FoodCard from './FoodCard';

const RecommendationSection = () => {
    const { allFoods } = useContext(FoodContext);

    // Sort by rating and get top 4
    const topRated = [...allFoods].sort((a, b) => b.rating - a.rating).slice(0, 4);

    if (topRated.length === 0) return null;

    return (
        <section className="my-32">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Chef's <span className="text-brand-600">Specials</span></h2>
                    <p className="text-slate-500 font-medium mt-2 text-lg italic">Handpicked flavors recommended for you</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {topRated.map(food => (
                    <FoodCard key={`rec-${food.id}`} food={food} />
                ))}
            </div>
        </section>
    );
};

export default RecommendationSection;
