import React, { useContext, useState } from 'react';
import { Plus, Check } from 'lucide-react';
import RatingStars from './RatingStars';
import { CartContext } from '../context/CartContext';

const FoodCard = ({ food }) => {
    const { addToCart } = useContext(CartContext);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(food);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-slate-100">
            <div className="relative overflow-hidden h-48 sm:h-56">
                <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-xs font-bold px-2 py-1 rounded-md text-slate-800 shadow-sm">
                    {food.category}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{food.name}</h3>
                    <span className="text-lg font-bold text-brand-600">{food.price} ETB</span>
                </div>

                <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">
                    {food.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <RatingStars rating={food.rating} />

                    <button
                        onClick={handleAddToCart}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${added
                                ? 'bg-green-500 text-white scale-110'
                                : 'bg-brand-50 text-brand-600 hover:bg-brand-500 hover:text-white'
                            }`}
                        aria-label="Add to cart"
                    >
                        {added ? <Check size={20} /> : <Plus size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
