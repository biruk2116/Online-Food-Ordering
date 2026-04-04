// src/pages/Checkout.jsx (Enhanced with Payment Methods)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user, showNotification } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [formData, setFormData] = useState({ 
    name: user?.name || '', 
    phone: '', 
    address: '' 
  });

  const paymentMethods = [
    { id: 'cash', name: 'Cash on Delivery', icon: '💵', description: 'Pay when you receive' },
    { id: 'telebirr', name: 'Telebirr', icon: '📱', description: 'Pay with Telebirr' },
    { id: 'cbe', name: 'CBE Birr', icon: '🏦', description: 'Pay with CBE Birr' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const paymentData = {
      user: { id: user.id, name: user.name, email: user.email },
      items: cartItems,
      total: getTotalPrice(),
      paymentMethod,
      status: 'completed',
      timestamp: new Date().toISOString(),
      delivery: formData
    };
    
    const order = placeOrder({
      ...formData,
      items: cartItems,
      total: getTotalPrice(),
      paymentMethod,
      paymentData
    });
    
    clearCart();
    showNotification('Order placed successfully! Check your email for confirmation.', 'success');
    navigate('/orders');
    setLoading(false);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Checkout</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Information */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input" required />
              <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input" required />
              <textarea placeholder="Delivery Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="input" rows="3" required />
            </form>
          </div>
          
          {/* Payment Methods */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="grid gap-4">
              {paymentMethods.map(method => (
                <label key={method.id} className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  paymentMethod === method.id ? 'border-orange-500 bg-orange-50 dark:bg-gray-700' : 'border-gray-200 dark:border-gray-700'
                }`}>
                  <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-orange-500" />
                  <div className="text-2xl">{method.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{method.name}</div>
                    <div className="text-sm text-gray-500">{method.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-orange-500">${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
          <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full py-3 disabled:opacity-50">
            {loading ? 'Processing...' : `Place Order • $${getTotalPrice().toFixed(2)}`}
          </button>
          <p className="text-xs text-gray-500 text-center mt-4">
            By placing an order, you agree to our Terms and Conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;