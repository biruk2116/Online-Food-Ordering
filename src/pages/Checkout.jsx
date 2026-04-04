// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart, showToast } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: user?.name || '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const order = placeOrder({
        ...formData,
        items: cartItems,
        total: getTotalPrice(),
        userId: user?.id
      });
      clearCart();
      showToast('Order placed successfully!');
      navigate('/orders');
      setLoading(false);
    }, 1000);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input" required />
          <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input" required />
          <textarea placeholder="Delivery Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="input" rows="3" required />
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Placing Order...' : `Place Order • $${getTotalPrice().toFixed(2)}`}
          </button>
        </form>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between pt-4 text-xl font-bold">
            <span>Total</span>
            <span className="text-orange-500">${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;