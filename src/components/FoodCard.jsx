import React, { useState, useContext } from 'react';
import { Plus, Check } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { FoodContext } from '../context/FoodContext';
import RatingStars from './RatingStars';

const FoodCard = ({ food }) => {
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const { rateFood } = useContext(FoodContext);
    const [added, setAdded] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleAddToCart = () => {
        addToCart(food);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full border border-slate-100 hover:-translate-y-2">
            {/* Image Section */}
            <div className="relative overflow-hidden h-52 sm:h-60">
                <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full text-white shadow-xl border border-white/10">
                    {food.category}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <p className="text-white text-xs font-bold leading-relaxed">{food.name} Excellence</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-7 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-brand-600 transition-colors leading-tight">
                        {food.name}
                    </h3>
                    <div className="bg-brand-50 px-3 py-1.5 rounded-xl border border-brand-100 flex items-center gap-1 group-hover:scale-110 transition-transform">
                        <span className="text-lg font-black text-brand-600">{food.price}</span>
                        <span className="text-[10px] font-bold text-brand-400">ETB</span>
                    </div>
                </div>

                {/* Stars and Actions */}
                <div className="flex items-center justify-between mb-4">
                    <RatingStars 
                        rating={food.rating || 0} 
                        onRate={user?.role === 'customer' ? (ratingValue) => rateFood(food.id, user.id, ratingValue) : undefined}
                    />
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs font-black text-slate-400 hover:text-brand-500 uppercase tracking-widest transition-colors flex items-center gap-1"
                    >
                        {isExpanded ? 'Collapse' : 'Details'}
                        <svg className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                </div>

                {/* Expandable Section */}
                <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-40 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-slate-600 text-sm leading-relaxed mb-3 font-medium">
                            {food.description}
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-brand-500"></div>
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Energy: <span className="text-slate-900">{food.calories || 250} kcal</span></span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                        {user && user.role !== 'admin' ? (
                            <button
                                onClick={handleAddToCart}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl transition-all duration-300 font-bold text-sm ${added
                                        ? 'bg-green-500 text-white scale-105'
                                        : 'bg-slate-900 text-white hover:bg-brand-600 shadow-lg shadow-slate-900/10'
                                    }`}
                            >
                                {added ? <Check size={18} /> : <Plus size={18} />}
                                {added ? 'Added' : 'Order Now'}
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
