import React from 'react';
import { Link } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemove, getTotalPrice }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-orange-500 font-bold">${item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-gray-200">-</button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-gray-200">+</button>
                        <button onClick={() => onRemove(item.id)} className="ml-2 text-red-500">🗑️</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-orange-500">${getTotalPrice().toFixed(2)}</span>
              </div>
              <Link to="/checkout" onClick={onClose}>
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;