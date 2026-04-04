// src/components/CartItem.jsx
import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 dark:text-white">{item.name}</h3>
        <p className="text-orange-500 font-bold">${item.price}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 transition-colors text-xl font-bold"
        >
          -
        </button>
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 transition-colors text-xl font-bold"
        >
          +
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="ml-2 text-red-500 hover:text-red-600 transition-colors text-xl"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;