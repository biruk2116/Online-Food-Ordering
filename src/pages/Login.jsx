import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/menu');
    } else {
      setError('Invalid email or password');
    }
  };

  const styles = {
    container: { minHeight: 'calc(100vh - 73px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' },
    card: { background: 'white', borderRadius: 24, padding: 32, maxWidth: 400, width: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
    input: { width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: 8, marginBottom: 16, fontSize: 16 },
    button: { width: '100%', padding: '12px', background: 'linear-gradient(135deg, #f97316, #ef4444)', color: 'white', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
    error: { color: '#ef4444', textAlign: 'center', marginBottom: 16, fontSize: 14 }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ textAlign: 'center', fontSize: 48, marginBottom: 16 }}>🍔</div>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 24 }}>Login to continue</p>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 24, color: '#6b7280' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#f97316', textDecoration: 'none' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;