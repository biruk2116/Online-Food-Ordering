import React from 'react';
import { useOrders, useAuth } from '../App';

const OrderHistory = () => {
  const { getUserOrders } = useOrders();
  const { user } = useAuth();
  const orders = getUserOrders();

  const styles = {
    container: { maxWidth: 1024, margin: '0 auto', padding: '32px 16px' },
    card: { background: 'white', borderRadius: 16, padding: 20, marginBottom: 20, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    badge: { padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, background: '#fef3c7', color: '#92400e' }
  };

  if (!user) {
    return <div style={{ textAlign: 'center', padding: 80 }}>Please login to view orders</div>;
  }

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 16px' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>📦</div>
        <h2 style={{ fontSize: 24, marginBottom: 16 }}>No orders yet</h2>
        <p style={{ color: '#6b7280' }}>Start ordering some delicious food!</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 32 }}>Order History</h1>
      {orders.map(order => (
        <div key={order.id} style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontWeight: 'bold' }}>Order #{order.id}</span>
            <span>{new Date(order.date).toLocaleDateString()}</span>
            <span style={styles.badge}>{order.status}</span>
          </div>
          {order.items.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, fontWeight: 'bold' }}>
            <span>Total</span>
            <span style={{ color: '#f97316' }}>${order.total.toFixed(2)}</span>
          </div>
          <div style={{ marginTop: 12, fontSize: 14, color: '#6b7280' }}>
            <p>Deliver to: {order.address}</p>
            <p>Contact: {order.phone}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;