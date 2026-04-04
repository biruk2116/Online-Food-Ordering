import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../App';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center mt-16">
        <div className="text-6xl mb-4 animate-bounce">🛒</div>
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/menu" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full inline-block">Browse Menu</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-16">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-orange-500 font-bold">${item.price}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300">-</button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300">+</button>
                  <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-600">Remove</button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between"><span>Subtotal</span><span>${getTotalPrice().toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Delivery Fee</span><span>$2.99</span></div>
            <div className="flex justify-between"><span>Tax (5%)</span><span>${(getTotalPrice() * 0.05).toFixed(2)}</span></div>
          </div>
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-orange-500">${(getTotalPrice() + 2.99 + (getTotalPrice() * 0.05)).toFixed(2)}</span>
            </div>
          </div>
          <Link to="/checkout" className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold text-center hover:scale-105 transition">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;