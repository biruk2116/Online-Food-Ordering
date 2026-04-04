import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../App';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const styles = {
    container: { maxWidth: 1024, margin: '0 auto', padding: '32px 16px' },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 32 },
    itemCard: { background: 'white', borderRadius: 16, padding: 16, marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    image: { width: 80, height: 80, objectFit: 'cover', borderRadius: 8 },
    summary: { background: 'white', borderRadius: 16, padding: 24, position: 'sticky', top: 100, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    checkoutBtn: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #f97316, #ef4444)', color: 'white', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer', textAlign: 'center', display: 'inline-block', textDecoration: 'none' }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 16px' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
        <h2 style={{ fontSize: 24, marginBottom: 16 }}>Your cart is empty</h2>
        <Link to="/menu" style={styles.checkoutBtn}>Browse Menu</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Cart ({cartItems.length} items)</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32 }}>
        <div>
          {cartItems.map(item => (
            <div key={item.id} style={styles.itemCard}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: 4 }}>{item.name}</h3>
                <p style={{ color: '#f97316', fontWeight: 'bold' }}>${item.price}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: '#e5e7eb', cursor: 'pointer' }}>-</button>
                <span style={{ minWidth: 32, textAlign: 'center' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: '#e5e7eb', cursor: 'pointer' }}>+</button>
                <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#ef4444' }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
        
        <div style={styles.summary}>
          <h3 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span>Subtotal</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span>Delivery Fee</span>
            <span>$2.99</span>
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb', margin: '16px 0', paddingTop: 16, display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 'bold' }}>
            <span>Total</span>
            <span style={{ color: '#f97316' }}>${(getTotalPrice() + 2.99).toFixed(2)}</span>
          </div>
          <Link to="/checkout" style={styles.checkoutBtn}>Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;