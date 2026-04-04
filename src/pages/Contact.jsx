import React, { useState } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const styles = {
    container: { maxWidth: 1024, margin: '0 auto', padding: '48px 16px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 },
    card: { background: 'white', borderRadius: 24, padding: 32, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' },
    title: { fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, background: 'linear-gradient(135deg, #f97316, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    input: { width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: 8, marginBottom: 16, fontSize: 16 },
    button: { width: '100%', padding: '12px', background: 'linear-gradient(135deg, #f97316, #ef4444)', color: 'white', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer' }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    e.target.reset();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact Us</h1>
      <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 48 }}>We'd love to hear from you!</p>
      
      <div style={styles.grid}>
        <div style={styles.card}>
          <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Get in Touch</h2>
          <div style={{ marginBottom: 16 }}>📍 Bole Road, Addis Ababa, Ethiopia</div>
          <div style={{ marginBottom: 16 }}>📞 +251 911 123 456</div>
          <div style={{ marginBottom: 16 }}>✉️ support@foodiedash.com</div>
          <div>⏰ 24/7 Customer Support</div>
        </div>
        
        <div style={styles.card}>
          <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" style={styles.input} required />
            <input type="email" placeholder="Email Address" style={styles.input} required />
            <textarea placeholder="Your Message" rows="4" style={styles.input} required></textarea>
            <button type="submit" style={styles.button}>Send Message</button>
            {submitted && <p style={{ color: '#10b981', textAlign: 'center', marginTop: 16 }}>Message sent successfully!</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;