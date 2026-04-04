import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useOrders, useAuth } from '../App';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: user?.name || '', phone: '', address: '' });

  const styles = {
    container: { maxWidth: 1024, margin: '0 auto', padding: '32px 16px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32 },
    card: { background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    input: { width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: 8, marginBottom: 16, fontSize: 16 },
    button: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #f97316, #ef4444)', color: 'white', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer' }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    placeOrder({ ...formData, items: cartItems, total: getTotalPrice(), paymentMethod: 'cash' });
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
    <div style={styles.container}>
      <h1 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 32 }}>Checkout</h1>
      <div style={styles.grid}>
        <div>
          <div style={styles.card}>
            <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Delivery Information</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={styles.input} required />
              <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={styles.input} required />
              <textarea placeholder="Delivery Address" rows="3" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={styles.input} required></textarea>
              <button type="submit" disabled={loading} style={styles.button}>
                {loading ? 'Processing...' : `Place Order • $${(getTotalPrice() + 2.99).toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>
        
        <div style={styles.card}>
          <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Order Summary</h2>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #e5e7eb', marginTop: 16, paddingTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span>Subtotal</span><span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span>Delivery</span><span>$2.99</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
              <span>Total</span>
              <span style={{ color: '#f97316' }}>${(getTotalPrice() + 2.99).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;