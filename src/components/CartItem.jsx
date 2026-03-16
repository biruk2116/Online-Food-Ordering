import React, { useContext } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useContext(CartContext);

    if (!item) return null;

    const {
        id,
        name = 'Item',
        image,
        price = 0,
        quantity = 1,
    } = item;

    return (
        <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100 mb-4 transition-all hover:shadow-md">
            {image ? (
                <img
                    src={image}
                    alt={name}
                    className="w-20 h-20 object-cover rounded-lg"
                />
            ) : (
                <div className="w-20 h-20 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs font-semibold">
                    No image
                </div>
            )}

            <div className="ml-4 flex-grow">
                <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-800">{name}</h4>
                    <button
                        onClick={() => removeFromCart(id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                <p className="text-sm text-brand-600 font-medium my-1">{price} ETB</p>

                <div className="flex items-center mt-2 space-x-3">
                    <button
                        onClick={() => updateQuantity(id, -1)}
                        disabled={quantity <= 1}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 transition-colors"
                    >
                        <Minus size={14} />
                    </button>

                    <span className="font-semibold text-slate-800 w-4 text-center">
                        {quantity}
                    </span>

                    <button
                        onClick={() => updateQuantity(id, 1)}
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
