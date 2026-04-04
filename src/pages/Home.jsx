import React from 'react';
import { Link } from 'react-router-dom';
import { useFood, useCart, useAuth } from '../App';

const Home = () => {
  const { foods } = useFood();
  const featuredFoods = foods?.slice(0, 3) || [];

  const styles = {
    hero: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
      textAlign: 'center'
    },
    section: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '80px 0'
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s'
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🍔</div>
          <h1 style={{ fontSize: 56, fontWeight: 'bold', marginBottom: 16, background: 'linear-gradient(135deg, #f97316, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            FoodieDash
          </h1>
          <p style={{ fontSize: 20, color: '#4b5563', marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>
            Delivering happiness to your doorstep. Fresh, fast, and delicious!
          </p>
          <Link to="/menu">
            <button className="btn-primary">Order Now</button>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div style={styles.section}>
        <div className="container">
          <h2 style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 48 }}>Why Choose Us?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {[
              { icon: '⚡', title: 'Fast Delivery', desc: '30-minute delivery or free' },
              { icon: '🍽️', title: 'Quality Food', desc: 'Prepared with fresh ingredients' },
              { icon: '💳', title: 'Easy Payment', desc: 'Multiple payment options' }
            ].map(f => (
              <div key={f.title} style={styles.card}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: '#6b7280' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Dishes */}
      <div style={{ ...styles.section, background: '#f3f4f6' }}>
        <div className="container">
          <h2 style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 48 }}>Featured Dishes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {featuredFoods.map(food => (
              <Link to={`/food/${food.id}`} key={food.id} style={{ textDecoration: 'none' }}>
                <div style={styles.card}>
                  <img src={food.image} alt={food.name} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 12, marginBottom: 16 }} />
                  <h3 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#1f2937' }}>{food.name}</h3>
                  <p style={{ color: '#f97316', fontWeight: 'bold', fontSize: 18 }}>${food.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;