import React from 'react';

const About = () => {
  const styles = {
    container: { maxWidth: 1024, margin: '0 auto', padding: '48px 16px' },
    card: { background: 'white', borderRadius: 24, padding: 40, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' },
    title: { fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, background: 'linear-gradient(135deg, #f97316, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    statGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, margin: '32px 0' },
    statBox: { textAlign: 'center', padding: 20, background: '#fef3c7', borderRadius: 16 }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ textAlign: 'center', fontSize: 64, marginBottom: 24 }}>🍕</div>
        <h1 style={styles.title}>About FoodieDash</h1>
        <p style={{ fontSize: 18, color: '#4b5563', lineHeight: 1.6, marginBottom: 32 }}>
          FoodieDash is Ethiopia's premier online food delivery platform, connecting food lovers with the best restaurants in the country. 
          Founded in 2024, we've been on a mission to make delicious food accessible to everyone, anytime, anywhere.
        </p>
        
        <div style={styles.statGrid}>
          {[
            { number: '500+', label: 'Partner Restaurants' },
            { number: '50K+', label: 'Happy Customers' },
            { number: '30min', label: 'Average Delivery' }
          ].map(stat => (
            <div key={stat.label} style={styles.statBox}>
              <div style={{ fontSize: 32, fontWeight: 'bold', color: '#f97316' }}>{stat.number}</div>
              <div style={{ color: '#6b7280', marginTop: 8 }}>{stat.label}</div>
            </div>
          ))}
        </div>
        
        <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, marginTop: 32 }}>Our Mission</h2>
        <p style={{ color: '#4b5563', lineHeight: 1.6 }}>
          To revolutionize the food delivery experience in Ethiopia by providing a seamless, reliable, and delightful platform 
          that connects people with their favorite meals, supporting local restaurants and creating memorable dining experiences at home.
        </p>
      </div>
    </div>
  );
};

export default About;