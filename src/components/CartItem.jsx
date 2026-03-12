import React, { useContext } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useContext(CartContext);

    return (
        <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100 mb-4 transition-all hover:shadow-md">
            <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="ml-4 flex-grow">
                <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-800">{item.name}</h4>
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                <p className="text-sm text-brand-600 font-medium my-1">{item.price} ETB</p>

                <div className="flex items-center mt-2 space-x-3">
                    <button
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 transition-colors"
                    >
                        <Minus size={14} />
                    </button>

                    <span className="font-semibold text-slate-800 w-4 text-center">
                        {item.quantity}
                    </span>

                    <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                        <Plus size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
