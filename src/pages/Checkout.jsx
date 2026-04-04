import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useOrders, useAuth } from '../App';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [formData, setFormData] = useState({ name: user?.name || '', phone: '', address: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const orderData = {
      ...formData,
      items: cartItems,
      total: getTotalPrice() + 2.99 + (getTotalPrice() * 0.05),
      subtotal: getTotalPrice(),
      deliveryFee: 2.99,
      tax: getTotalPrice() * 0.05,
      paymentMethod,
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email
    };
    
    placeOrder(orderData);
    clearCart();
    alert('Order placed successfully!');
    navigate('/orders');
    setLoading(false);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-16">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" required />
              <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" required />
              <textarea placeholder="Delivery Address" rows="3" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" required />
            </form>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="grid gap-4">
              {[
                { id: 'cash', name: 'Cash on Delivery', icon: '💵' },
                { id: 'telebirr', name: 'Telebirr', icon: '📱' },
                { id: 'cbe', name: 'CBE Birr', icon: '🏦' }
              ].map(method => (
                <label key={method.id} className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${paymentMethod === method.id ? 'border-orange-500 bg-orange-50 dark:bg-gray-700' : 'border-gray-200 dark:border-gray-700'}`}>
                  <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-orange-500" />
                  <div className="text-2xl">{method.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{method.name}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between"><span>Subtotal</span><span>${getTotalPrice().toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Delivery Fee</span><span>$2.99</span></div>
            <div className="flex justify-between"><span>Tax (5%)</span><span>${(getTotalPrice() * 0.05).toFixed(2)}</span></div>
            <div className="flex justify-between text-xl font-bold pt-2 border-t">
              <span>Total</span>
              <span className="text-orange-500">${(getTotalPrice() + 2.99 + (getTotalPrice() * 0.05)).toFixed(2)}</span>
            </div>
          </div>
          <button onClick={handleSubmit} disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold mt-6 disabled:opacity-50">
            {loading ? 'Processing...' : `Place Order • $${(getTotalPrice() + 2.99 + (getTotalPrice() * 0.05)).toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;