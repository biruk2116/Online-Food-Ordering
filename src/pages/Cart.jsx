import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <Link to="/menu" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full inline-block">Browse Menu</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-orange-500 font-bold">${item.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold">-</button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold">+</button>
                <button onClick={() => removeFromCart(item.id)} className="ml-2 text-red-500 text-xl">🗑️</button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-orange-500">${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
          <Link to="/checkout" className="bg-gradient-to-r from-orange-500 to-red-500 text-white block text-center py-3 rounded-lg">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;