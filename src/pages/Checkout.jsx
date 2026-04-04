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

  const subtotal = getTotalPrice();
  const deliveryFee = 2.99;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  // Backend-ready payment data structure
  const preparePaymentData = () => {
    return {
      transactionId: `TXN_${Date.now()}_${user?.id}`,
      amount: total,
      currency: 'ETB',
      paymentMethod: paymentMethod,
      customer: {
        id: user?.id,
        name: formData.name,
        email: user?.email,
        phone: formData.phone,
        address: formData.address
      },
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
      })),
      breakdown: {
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        tax: tax,
        total: total
      },
      timestamp: new Date().toISOString(),
      status: 'pending',
      callbackUrl: window.location.origin + '/payment-callback',
      metadata: {
        userAgent: navigator.userAgent,
        platform: 'web'
      }
    };
  };

  const handlePayment = async () => {
    setLoading(true);
    
    const paymentData = preparePaymentData();
    
    // Simulate API call to payment gateway
    console.log('Sending to payment gateway:', paymentData);
    
    // For real backend integration, uncomment this:
    /*
    const response = await fetch('/api/process-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(paymentData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Process order
      const orderData = {
        ...formData,
        items: cartItems,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        tax: tax,
        total: total,
        paymentMethod: paymentMethod,
        paymentId: result.paymentId,
        transactionId: paymentData.transactionId
      };
      
      placeOrder(orderData);
      clearCart();
      alert('Payment successful! Order placed.');
      navigate('/orders');
    } else {
      alert('Payment failed. Please try again.');
    }
    */
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Process order
    const orderData = {
      ...formData,
      items: cartItems,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      tax: tax,
      total: total,
      paymentMethod: paymentMethod,
      transactionId: paymentData.transactionId,
      paymentStatus: 'completed'
    };
    
    placeOrder(orderData);
    clearCart();
    alert('Order placed successfully! Check your email for confirmation.');
    navigate('/orders');
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment();
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-16">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Delivery Information</h2>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Full Name" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required 
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required 
              />
              <textarea 
                placeholder="Delivery Address" 
                rows="3" 
                value={formData.address} 
                onChange={e => setFormData({...formData, address: e.target.value})} 
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required 
              />
            </form>
          </div>
          
          {/* Payment Methods - Backend Ready */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Select Payment Method</h2>
            <div className="grid gap-4">
              {[
                { id: 'cash', name: 'Cash on Delivery', icon: '💵', description: 'Pay when you receive your order' },
                { id: 'telebirr', name: 'Telebirr', icon: '📱', description: 'Pay with Telebirr mobile money', apiEndpoint: '/api/payment/telebirr' },
                { id: 'cbe', name: 'CBE Birr', icon: '🏦', description: 'Pay with CBE Birr', apiEndpoint: '/api/payment/cbe' },
                { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, Amex', apiEndpoint: '/api/payment/card' }
              ].map(method => (
                <label 
                  key={method.id} 
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === method.id 
                      ? 'border-orange-500 bg-orange-50 dark:bg-gray-700' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    value={method.id} 
                    checked={paymentMethod === method.id} 
                    onChange={(e) => setPaymentMethod(e.target.value)} 
                    className="w-5 h-5 text-orange-500" 
                  />
                  <div className="text-3xl">{method.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold dark:text-white">{method.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{method.description}</div>
                  </div>
                  {method.apiEndpoint && (
                    <div className="text-xs text-gray-400">API Ready</div>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Order Summary</h2>
          <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="dark:text-gray-300">{item.name} x{item.quantity}</span>
                <span className="dark:text-gray-300">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t dark:border-gray-700 pt-4 space-y-2">
            <div className="flex justify-between dark:text-gray-300">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between dark:text-gray-300">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between dark:text-gray-300">
              <span>Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-2 border-t dark:border-gray-700">
              <span className="dark:text-white">Total</span>
              <span className="text-orange-500">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            onClick={handleSubmit} 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold mt-6 disabled:opacity-50 hover:scale-105 transition"
          >
            {loading ? (
              <><i className="fas fa-spinner fa-spin mr-2"></i> Processing Payment...</>
            ) : (
              <><i className="fas fa-lock mr-2"></i> Place Order • ${total.toFixed(2)}</>
            )}
          </button>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Secure payment powered by FoodieDash Payment Gateway
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;